import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthUser } from '@/lib/auth'

export async function GET() {
  const settings = await prisma.siteSetting.findMany()
  const map: Record<string, string> = {}
  settings.forEach((s) => (map[s.key] = s.value))
  return NextResponse.json({ settings: map })
}

export async function PUT(request: NextRequest) {
  const user = await getAuthUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const updates = await request.json()

  await Promise.all(
    Object.entries(updates).map(([key, value]) =>
      prisma.siteSetting.upsert({
        where: { key },
        update: { value: String(value) },
        create: { key, value: String(value) },
      })
    )
  )

  return NextResponse.json({ success: true })
}
