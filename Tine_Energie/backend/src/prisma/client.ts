import { PrismaClient } from '@prisma/client';

// Ensure PrismaClient is reused across hot reloads to prevent
// exhausting database connections. During development, we attach the
// client instance to globalThis so it's reused if the module is
// re-imported.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;
