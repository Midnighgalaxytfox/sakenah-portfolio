/**
 * lib/prisma.js
 * Lazy-initialize Prisma Client and reuse across lambda invocations.
 */
let __prisma;

export async function getPrisma() {
  if (globalThis.__prisma) return globalThis.__prisma;
  // dynamic import to avoid build-time import errors
  const { PrismaClient } = await import('@prisma/client');
  globalThis.__prisma = new PrismaClient();
  return globalThis.__prisma;
}
