import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import bcrypt from 'bcryptjs'
import { signInSchema } from '@/lib/validations'
import { signMobileToken } from '@/lib/auth-mobile-token'
import { AUTH_ERROR } from '@/lib/auth-errors'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsed = signInSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: AUTH_ERROR.MISSING_CREDENTIALS },
        { status: 400 }
      )
    }

    const { email, password } = parsed.data
    const user = await db.user.findUnique({ where: { email } })
    if (!user) {
      return NextResponse.json(
        { success: false, error: AUTH_ERROR.USER_NOT_FOUND },
        { status: 401 }
      )
    }

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      return NextResponse.json(
        { success: false, error: AUTH_ERROR.INVALID_PASSWORD },
        { status: 401 }
      )
    }

    const token = await signMobileToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    })

    return NextResponse.json({
      success: true,
      token,
      expiresIn: 30 * 24 * 60 * 60,
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
    })
  } catch (error) {
    console.error('[auth/mobile/login]', error)
    return NextResponse.json({ success: false, error: 'SERVER_ERROR' }, { status: 500 })
  }
}
