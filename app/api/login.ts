// pages/api/login.ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, senha } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) return res.status(401).json({ message: "Email ou senha incorretos" });

  const match = await bcrypt.compare(senha, user.password);
  if (!match) return res.status(401).json({ message: "Email ou senha incorretos" });

  return res.status(200).json({ id: user.id, name: user.name, email: user.email });
}
