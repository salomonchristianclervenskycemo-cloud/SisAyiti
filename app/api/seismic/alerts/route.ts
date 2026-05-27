import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getCache, setCache } from '@/lib/redis'
import { CACHE_TTL } from '@/lib/cache-strategy'

export async function GET(request: NextRequest) {
  try {
    const activeOnly = request.nextUrl.searchParams.get('active') !== 'false'
    const limit = Math.min(parseInt(request.nextUrl.searchParams.get('limit') || '50'), 200)
    const cacheKey = `seismic:alerts:${activeOnly}:${limit}`

    const cached = await getCache<{ success: boolean; alerts: unknown[] }>(cacheKey)
    if (cached) return NextResponse.json(cached)

    const alerts = await prisma.realTimeAlert.findMany({
      where: activeOnly ? { isActive: true, dismissed: false } : {},
      include: {
        event: {
          select: {
            id: true,
            magnitude: true,
            latitude: true,
            longitude: true,
            region: true,
            eventTime: true,
            source: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    })

    const response = { success: true, count: alerts.length, alerts, timestamp: new Date().toISOString() }
    await setCache(cacheKey, response, CACHE_TTL.realtime)
    return NextResponse.json(response)
  } catch (error) {
    console.error('Seismic alerts API error:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch alerts' }, { status: 500 })
  }
}
