// utils/sendResetEmail.ts
import nodemailer from "nodemailer";

export async function sendResetEmail(to: string, token: string) {
  const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${encodeURIComponent(
    token
  )}&email=${encodeURIComponent(to)}`;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT || 587),
    secure: false, // false for TLS (587)
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const html = `
    <p>Olá,</p>
    <p>Você solicitou a redefinição de senha. Clique no link abaixo (válido por 1 hora):</p>
    <p><a href="${resetUrl}">${resetUrl}</a></p>
    <p>Se você não solicitou, ignore esta mensagem.</p>
  `;

  try {
    const info = await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to,
      subject: "Redefinir senha — EcoIndústria",
      html,
    });

    // logs úteis para debug (ver console do servidor)
    console.log("sendResetEmail -> info:", {
      messageId: info.messageId,
      accepted: info.accepted,
      rejected: info.rejected,
      response: info.response,
    });

    return { ok: true, info };
  } catch (error) {
    console.error("sendResetEmail error:", error);
    return { ok: false, error };
  }
}
