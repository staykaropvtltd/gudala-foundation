import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthUser } from '@/lib/auth'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().max(20).optional().default(''),
  subject: z.string().min(2).max(200),
  message: z.string().min(10).max(2000),
})

export async function GET() {
  const user = await getAuthUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json({ messages })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid data', details: parsed.error.flatten() }, { status: 400 })
  }

  const message = await prisma.contactMessage.create({ data: parsed.data })
  return NextResponse.json({ message, success: true }, { status: 201 })
}
