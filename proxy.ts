import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyMobileToken } from '@/lib/auth-mobile-token'

async function isAuthorized(req: NextRequest): Promise<boolean> {
  const cookieToken = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  if (cookieToken) return true
  const bearer = await verifyMobileToken(req.headers.get('authorization'))
  return !!bearer
}

export default async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (pathname === '/api/scores') {
    return NextResponse.next()
  }

  if (pathname === '/api/diagnostics' || pathname === '/api/simulations') {
    if (req.method === 'GET') return NextResponse.next()
    if (await isAuthorized(req)) return NextResponse.next()
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/api/diagnostics', '/api/scores', '/api/simulations'],
}
