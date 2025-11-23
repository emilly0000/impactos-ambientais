import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Dados incompletos" },
        { status: 400 }
      );
    }

    // Buscar o usuário exatamente como o NextAuth busca:
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !user.password) {
      return NextResponse.json(
        { success: false, message: "Email ou senha incorretos" },
        { status: 401 }
      );
    }

    // Comparar senha com o mesmo hash que o NextAuth usa
    const ok = await bcrypt.compare(password, user.password);

    if (!ok) {
      return NextResponse.json(
        { success: false, message: "Email ou senha incorretos" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.log("MOBILE LOGIN ERROR:", err);
    return NextResponse.json(
      { success: false, message: "Erro interno no servidor" },
      { status: 500 }
    );
  }
}
