import { NextRequest, NextResponse } from 'next/server'
import { validateAdminCredentials, signToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 })
    }

    const user = await validateAdminCredentials(email, password)
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const token = signToken(user)
    const response = NextResponse.json({ user, success: true })
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })

    return response
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.error('[/api/auth] Login error:', message)

    if (message.includes('DATABASE_URL') || message.includes('database') || message.includes('ECONNREFUSED')) {
      return NextResponse.json(
        { error: 'Database not configured. Set DATABASE_URL in Vercel environment variables.' },
        { status: 500 }
      )
    }
    if (message.includes('JWT_SECRET')) {
      return NextResponse.json(
        { error: 'JWT_SECRET not configured. Set it in Vercel environment variables.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true })
  response.cookies.delete('admin_token')
  return response
}
