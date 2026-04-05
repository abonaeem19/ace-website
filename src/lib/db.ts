import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

function createPrismaClient(): PrismaClient {
  try {
    if (!process.env.DATABASE_URL) {
      console.warn("⚠️ DATABASE_URL not set - database operations will fail gracefully");
    }
    return new PrismaClient();
  } catch (error) {
    console.error("Failed to create Prisma client:", error);
    return new PrismaClient();
  }
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;