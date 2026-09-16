import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { prisma } from './prisma'

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-change-me'

export interface AdminPayload {
  id: string
  email: string
  name: string
  role: string
}

export function signToken(payload: AdminPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

export function verifyToken(token: string): AdminPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AdminPayload
  } catch {
    return null
  }
}

export async function getAuthUser(): Promise<AdminPayload | null> {
  const cookieStore = cookies()
  const token = cookieStore.get('admin_token')?.value
  if (!token) return null
  return verifyToken(token)
}

export async function requireAuth() {
  const user = await getAuthUser()
  if (!user) {
    throw new Error('Unauthorized')
  }
  return user
}

export async function validateAdminCredentials(
  email: string,
  password: string
): Promise<AdminPayload | null> {
  const bcrypt = await import('bcryptjs')
  const admin = await prisma.adminUser.findUnique({ where: { email } })
  if (!admin) return null
  const isValid = await bcrypt.compare(password, admin.password)
  if (!isValid) return null
  return { id: admin.id, email: admin.email, name: admin.name, role: admin.role }
}
