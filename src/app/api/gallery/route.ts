import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthUser } from '@/lib/auth'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const admin = await getAuthUser()

  const where: Record<string, unknown> = admin ? {} : { status: 'published' }
  if (category && category !== 'All') where.category = category

  const images = await prisma.galleryImage.findMany({
    where,
    orderBy: { order: 'asc' },
  })

  return NextResponse.json({ images })
}

export async function POST(request: NextRequest) {
  const user = await getAuthUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const data = await request.json()
  const image = await prisma.galleryImage.create({ data })
  return NextResponse.json({ image }, { status: 201 })
}
