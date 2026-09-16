import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthUser } from '@/lib/auth'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type') // upcoming | past | all
  const admin = await getAuthUser()
  const now = new Date()

  let where: Record<string, unknown> = admin ? {} : { status: 'published' }

  if (type === 'upcoming') {
    where = { ...where, date: { gte: now } }
  } else if (type === 'past') {
    where = { ...where, date: { lt: now } }
  }

  const events = await prisma.event.findMany({
    where,
    orderBy: type === 'past' ? { date: 'desc' } : { date: 'asc' },
    include: { program: { select: { title: true, slug: true } } },
  })

  return NextResponse.json({ events })
}

export async function POST(request: NextRequest) {
  const user = await getAuthUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const data = await request.json()
  if (data.date) data.date = new Date(data.date)

  const event = await prisma.event.create({ data })
  return NextResponse.json({ event }, { status: 201 })
}
