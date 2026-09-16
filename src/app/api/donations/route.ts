import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthUser } from '@/lib/auth'
import { z } from 'zod'

const schema = z.object({
  donorName: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().min(6).max(20),
  panNumber: z.string().max(20).optional().default(''),
  amount: z.number().positive(),
})

export async function GET(request: NextRequest) {
  const user = await getAuthUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const donations = await prisma.donation.findMany({
    orderBy: { createdAt: 'desc' },
  })

  const total = donations.reduce((sum, d) => sum + (d.status === 'successful' ? d.amount : 0), 0)
  return NextResponse.json({ donations, total })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid data', details: parsed.error.flatten() }, { status: 400 })
  }

  const donation = await prisma.donation.create({
    data: { ...parsed.data, status: 'pending' },
  })

  return NextResponse.json({ donation, success: true }, { status: 201 })
}
