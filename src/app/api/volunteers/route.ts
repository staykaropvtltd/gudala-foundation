import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthUser } from '@/lib/auth'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().min(6).max(20),
  city: z.string().min(2).max(100),
  interest: z.string().min(2),
  availability: z.string().min(2),
  message: z.string().max(1000).optional().default(''),
})

export async function GET(request: NextRequest) {
  const user = await getAuthUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status')
  const where = status ? { status } : {}

  const volunteers = await prisma.volunteer.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json({ volunteers })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid data', details: parsed.error.flatten() }, { status: 400 })
  }

  const volunteer = await prisma.volunteer.create({ data: parsed.data })
  return NextResponse.json({ volunteer, success: true }, { status: 201 })
}
