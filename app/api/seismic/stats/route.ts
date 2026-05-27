import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getCache, setCache } from '@/lib/redis'
import { CACHE_TTL, statsCacheKey } from '@/lib/cache-strategy'
import { dbEventToUI, type RiskLevel, type SeismicStats } from '@/lib/seismic-types'

const EMPTY_RISK: Record<RiskLevel, number> = {
  critical: 0,
  high: 0,
  medium: 0,
  low: 0,
}

function emptyStatsResponse() {
  return {
    success: true,
    totalEvents: 0,
    avgMagnitude: 0,
    highestMagnitude: 0,
    eventsLast24h: 0,
    eventsLast7d: 0,
    riskDistribution: { ...EMPTY_RISK },
    topAffectedAreas: [] as Array<{ area: string; count: number }>,
    timestamp: new Date().toISOString(),
  }
}

export async function GET(request: NextRequest) {
  try {
    const days = Math.min(parseInt(request.nextUrl.searchParams.get('days') || '7'), 30)
    const cacheKey = statsCacheKey(days)

    try {
      const cached = await getCache<SeismicStats & { success: boolean }>(cacheKey)
      if (cached?.success && cached.riskDistribution) {
        return NextResponse.json(cached)
      }
    } catch {
      /* cache optional */
    }

    const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000)
    const now = new Date()
    const day24 = new Date(Date.now() - 24 * 60 * 60 * 1000)
    const day7 = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)

    let events: Awaited<ReturnType<typeof prisma.seismicEvent.findMany>> = []
    try {
      events = await prisma.seismicEvent.findMany({
        where: { eventTime: { gte: startDate } },
        orderBy: { eventTime: 'desc' },
      })
    } catch (e) {
      console.warn('[stats] DB unavailable:', (e as Error).message)
      return NextResponse.json(emptyStatsResponse())
    }

    const uiEvents = events.map((e) => dbEventToUI(e))
    const riskDistribution: Record<RiskLevel, number> = { ...EMPTY_RISK }
    uiEvents.forEach((e) => {
      if (e.risk in riskDistribution) riskDistribution[e.risk]++
    })

    const areaCounts = new Map<string, number>()
    events.forEach((e) => {
      const area = e.region ?? e.district ?? 'Inconnu'
      areaCounts.set(area, (areaCounts.get(area) ?? 0) + 1)
    })

    const magnitudes = events.map((e) => e.magnitude)
    const stats: SeismicStats = {
      totalEvents: events.length,
      avgMagnitude: magnitudes.length
        ? magnitudes.reduce((a, b) => a + b, 0) / magnitudes.length
        : 0,
      highestMagnitude: magnitudes.length ? Math.max(...magnitudes) : 0,
      eventsLast24h: events.filter((e) => e.eventTime >= day24).length,
      eventsLast7d: events.filter((e) => e.eventTime >= day7).length,
      riskDistribution,
      topAffectedAreas: [...areaCounts.entries()]
        .map(([area, count]) => ({ area, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5),
    }

    const response = { success: true, ...stats, timestamp: now.toISOString() }
    try {
      await setCache(cacheKey, response, CACHE_TTL.stats)
    } catch {
      /* cache optional */
    }
    return NextResponse.json(response)
  } catch (error) {
    console.error('Seismic stats API error:', error)
    return NextResponse.json(emptyStatsResponse())
  }
}
