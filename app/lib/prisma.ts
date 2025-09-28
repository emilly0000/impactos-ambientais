// app/lib/prisma.ts
import { PrismaClient } from '@prisma/client';

declare global {
  // Garante que não cria múltiplas instâncias em dev
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export default prisma;
