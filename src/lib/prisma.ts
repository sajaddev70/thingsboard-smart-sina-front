import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  if (!process.env.DATABASE_URL) {
    // Return a dummy object or handle locally if needed
    // In dev, we just want to avoid the crash
    return new PrismaClient();
  }
  return new PrismaClient();
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;
