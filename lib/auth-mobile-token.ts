import { encode, decode } from 'next-auth/jwt'
import type { JWT } from 'next-auth/jwt'

const MAX_AGE = 30 * 24 * 60 * 60

function secret(): string {
  const s = process.env.NEXTAUTH_SECRET
  if (!s) throw new Error('NEXTAUTH_SECRET is not configured')
  return s
}

export async function signMobileToken(user: {
  id: string
  email: string
  name?: string | null
  role?: string
}): Promise<string> {
  const token: JWT = {
    sub: user.id,
    id: user.id,
    email: user.email,
    name: user.name ?? undefined,
    role: user.role,
  }
  return encode({ token, secret: secret(), maxAge: MAX_AGE })
}

export async function verifyMobileToken(bearer: string | null | undefined): Promise<JWT | null> {
  if (!bearer?.startsWith('Bearer ')) return null
  const raw = bearer.slice(7).trim()
  if (!raw) return null
  try {
    return await decode({ token: raw, secret: secret() })
  } catch {
    return null
  }
}

export async function resolveUserIdFromRequest(req: Request): Promise<string | null> {
  const token = await verifyMobileToken(req.headers.get('authorization'))
  return (token?.id as string | undefined) ?? (token?.sub as string | undefined) ?? null
}
