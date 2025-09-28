
import prisma from '../../../lib/prisma'; 
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, password } = body;

  if (!name || !email || !password) {
    return NextResponse.json({ message: "Preencha todos os campos" }, { status: 400 });
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) return NextResponse.json({ message: "Email já cadastrado" }, { status: 400 });

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });

  return NextResponse.json({ message: "Usuário criado com sucesso", user }, { status: 201 });
}
