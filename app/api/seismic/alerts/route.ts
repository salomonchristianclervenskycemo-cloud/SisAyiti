import { NextRequest, NextResponse } from 'next/server'
import { getCache, setCache } from '@/lib/redis'
import { CACHE_TTL } from '@/lib/cache-strategy'
import { computeSurveillanceAlerts } from '@/lib/surveillance/alerts'
import { fetchResolvedSurveillanceFeed } from '@/lib/surveillance/fetch-resolved-feed'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const limit = Math.min(parseInt(searchParams.get('limit') || '20', 10), 50)
    const days = Math.min(Math.max(parseInt(searchParams.get('days') || '7', 10), 1), 30)
    const minMagnitude = Math.max(parseFloat(searchParams.get('minMagnitude') || '4'), 0)
    const includeGlobal = searchParams.get('global') !== 'false'
    const cacheKey = `surveillance:alerts:v1:${limit}:${days}:${minMagnitude}:${includeGlobal ? 1 : 0}`

    const cached = await getCache<{ success: boolean; alerts: unknown[]; source: string }>(cacheKey)
    if (cached?.alerts) return NextResponse.json(cached)

    const { resolved } = await fetchResolvedSurveillanceFeed({
      days,
      min_magnitude: minMagnitude,
      include_global: includeGlobal,
    })

    let alerts = computeSurveillanceAlerts(resolved.result.events, { max: limit })

    if (alerts.length === 0) {
      try {
        const dbAlerts = await prisma.realTimeAlert.findMany({
          where: { isActive: true, dismissed: false },
          include: {
            event: {
              select: {
                id: true,
                magnitude: true,
                region: true,
                eventTime: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
          take: limit,
        })
        if (dbAlerts.length > 0) {
          const response = {
            success: true,
            count: dbAlerts.length,
            alerts: dbAlerts,
            source: 'database',
            mode: resolved.mode,
            timestamp: new Date().toISOString(),
          }
          await setCache(cacheKey, response, CACHE_TTL.realtime)
          return NextResponse.json(response)
        }
      } catch {
        /* DB optionnelle */
      }
    }

    const response = {
      success: true,
      count: alerts.length,
      alerts,
      source: 'surveillance',
      mode: resolved.mode,
      status_message_key: resolved.status_message_key,
      timestamp: new Date().toISOString(),
    }

    await setCache(cacheKey, response, CACHE_TTL.realtime)
    return NextResponse.json(response)
  } catch (error) {
    console.error('[alerts] error:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch alerts' }, { status: 500 })
  }
}
