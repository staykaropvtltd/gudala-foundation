import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthUser } from '@/lib/auth'

export async function GET(request: NextRequest) {
  const admin = await getAuthUser()
  const where = admin ? {} : { status: 'published' }

  const stories = await prisma.impactStory.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    include: { program: { select: { title: true, slug: true } } },
  })

  return NextResponse.json({ stories })
}

export async function POST(request: NextRequest) {
  const user = await getAuthUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const data = await request.json()
  if (data.date) data.date = new Date(data.date)

  const story = await prisma.impactStory.create({ data })
  return NextResponse.json({ story }, { status: 201 })
}
