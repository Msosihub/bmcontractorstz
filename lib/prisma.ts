/**
 * Prisma Client Setup
 * -------------------
 * This file creates a reusable Prisma Client instance for the app.
 *
 * Why this file matters:
 * - It connects the Next.js app to the Neon Postgres database.
 * - It prevents creating too many Prisma clients during local development.
 * - It will be imported anywhere we need database access.
 */

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

/**
 * Prisma 7 uses a database adapter.
 * We pass the Neon DATABASE_URL here.
 */
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: ["error", "warn"],
  });

/**
 * In development, reuse the same Prisma instance.
 * This avoids too many database connections during hot reload.
 */
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
