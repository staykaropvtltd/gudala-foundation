import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthUser } from '@/lib/auth'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const admin = await getAuthUser()

  const where: Record<string, unknown> = admin ? {} : { status: 'published' }
  if (category && category !== 'All') where.category = category

  const programs = await prisma.program.findMany({
    where,
    orderBy: { order: 'asc' },
  })

  return NextResponse.json({ programs })
}

export async function POST(request: NextRequest) {
  const user = await getAuthUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const data = await request.json()
  const program = await prisma.program.create({ data })
  return NextResponse.json({ program }, { status: 201 })
}
