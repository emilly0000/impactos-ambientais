// app/api/auth/reset-password/route.ts
import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, token, newPassword } = await req.json();
    if (!email || !token || !newPassword) {
      return NextResponse.json({ ok: false, error: "missing" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return NextResponse.json({ ok: false }, { status: 400 });

    // busca tokens ativos do user
  const tokens = await (prisma as any).passwordResetToken.findMany({
  where: { userId: user.id },
});

    if (!tokens || tokens.length === 0) {
      return NextResponse.json({ ok: false, error: "token_not_found" }, { status: 400 });
    }

    // verifica token e validade. percorre tokens e compara bcrypt
    let matchedToken = null;
    for (const t of tokens) {
      if (new Date(t.expiresAt) < new Date()) continue;
      const match = await bcrypt.compare(token, t.tokenHash);
      if (match) {
        matchedToken = t;
        break;
      }
    }

    if (!matchedToken) {
      return NextResponse.json({ ok: false, error: "invalid_or_expired" }, { status: 400 });
    }

    // atualiza senha (hash)
    const hashed = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashed },
    });

    // apaga tokens relacionados (invalida)
    await prisma.passwordResetToken.deleteMany({ where: { userId: user.id } });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("reset-password error:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
