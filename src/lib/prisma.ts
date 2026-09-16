import { PrismaClient } from '@prisma/client'

// Validate DATABASE_URL at module load time on the server.
// This runs before any query, giving a clear error instead of a cryptic
// Prisma message when the env var is missing or empty in Vercel.
if (typeof window === 'undefined') {
  const url = process.env.DATABASE_URL
  if (!url || url.trim() === '') {
    throw new Error(
      'Missing DATABASE_URL environment variable. ' +
      'Set it in Vercel → Project → Settings → Environment Variables → Production. ' +
      'Value must be a non-empty PostgreSQL connection string.'
    )
  }
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
