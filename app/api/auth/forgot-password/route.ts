import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

const TOKEN_BYTES = 32;
const TOKEN_EXPIRATION_MINUTES = 60; // 1 hora

async function sendResetEmail(to: string, token: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail", // usar Gmail diretamente
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}&email=${encodeURIComponent(to)}`;

  const mailHtml = `
    <p>Olá,</p>
    <p>Você pediu para redefinir sua senha. Clique no link abaixo para criar uma nova senha (válido por 1 hora):</p>
    <p><a href="${resetUrl}">Redefinir senha</a></p>
    <p>Se você não pediu, ignore este e-mail.</p>
  `;

  return await transporter.sendMail({
    from: process.env.FROM_EMAIL,
    to,
    subject: "Redefinir senha — EcoIndústria",
    html: mailHtml,
  });
}

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ ok: false, message: "Email não fornecido." }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ ok: true, message: "Se o email existir, um link será enviado." });
    }

    try {
      const token = crypto.randomBytes(TOKEN_BYTES).toString("hex");
      const tokenHash = await bcrypt.hash(token, 10);
      const expiresAt = new Date(Date.now() + TOKEN_EXPIRATION_MINUTES * 60 * 1000);

      await prisma.passwordResetToken.create({
        data: {
          userId: user.id,
          tokenHash,
          expiresAt,
        },
      });

      await sendResetEmail(email, token);

      return NextResponse.json({ ok: true, message: "Link de recuperação enviado com sucesso." });
    } catch (error) {
      console.error("Erro ao processar recuperação de senha:", error);
      return NextResponse.json({ ok: false, message: "Erro interno ao processar solicitação." }, { status: 500 });
    }
  } catch (err) {
    console.error("forgot-password error:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
