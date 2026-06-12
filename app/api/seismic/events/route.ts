import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getCache, setCache } from '@/lib/redis'
import { normalizeLonLat } from '@/lib/seismic-coords'
import { mergeWithHistoricalEvents } from '@/lib/seismic-events-merge'
import { dbEventToUI, type SeismicEventUI } from '@/lib/seismic-types'
import { buildSeismicEventsApiPayload } from '@/lib/surveillance/build-events-response'
import { fetchResolvedSurveillanceFeed } from '@/lib/surveillance/fetch-resolved-feed'

export const dynamic = 'force-dynamic'

const CACHE_TTL = 5 * 60
const DB_TIMEOUT = 3000
const CACHE_TIMEOUT = 1500

type EventsResponse = {
  success: boolean
  count: number
  events: SeismicEventUI[]
  timestamp: string
  source?: string
  mode?: string
  status_message_key?: string
}

async function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error(`Timeout after ${ms}ms`)), ms)
    ),
  ])
}

async function fetchDbFallback(
  minMagnitude: number,
  days: number,
  limit: number
): Promise<SeismicEventUI[]> {
  const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000)
  const dbEvents = await withTimeout(
    prisma.seismicEvent.findMany({
      where: {
        magnitude: { gte: minMagnitude },
        eventTime: { gte: startDate },
      },
      orderBy: [{ eventTime: 'desc' }, { magnitude: 'desc' }],
      take: limit,
    }),
    DB_TIMEOUT
  )

  return dbEvents.map((e) => {
    const { latitude, longitude } = normalizeLonLat(e.longitude, e.latitude)
    return dbEventToUI({ ...e, latitude, longitude })
  })
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const limit = Math.min(parseInt(searchParams.get('limit') || '100', 10), 1000)
    const minMagnitude = Math.max(parseFloat(searchParams.get('minMagnitude') || '2'), 0)
    const days = Math.min(Math.max(parseInt(searchParams.get('days') || '7', 10), 1), 30)
    const includeGlobal = searchParams.get('global') !== 'false'

    const cacheKey = `seismic:events:v2:${limit}:${minMagnitude}:${days}:${includeGlobal ? 1 : 0}`

    try {
      const cached = await withTimeout(getCache<EventsResponse>(cacheKey), CACHE_TIMEOUT)
      if (cached?.events?.length) {
        return NextResponse.json({
          ...cached,
          events: mergeWithHistoricalEvents(cached.events).slice(0, limit),
          count: Math.min(mergeWithHistoricalEvents(cached.events).length, limit),
        })
      }
    } catch {
      /* continue */
    }

    const { resolved, server_cache } = await fetchResolvedSurveillanceFeed({
      days,
      min_magnitude: minMagnitude,
      include_global: includeGlobal,
    })

    let payload = buildSeismicEventsApiPayload(resolved, {
      limit,
      server_cache,
    })

    if (payload.events.length === 0) {
      try {
        const dbMapped = await fetchDbFallback(minMagnitude, days, limit)
        if (dbMapped.length > 0) {
          const merged = mergeWithHistoricalEvents(dbMapped).slice(0, limit)
          payload = {
            success: true,
            count: merged.length,
            events: merged,
            timestamp: new Date().toISOString(),
            source: 'database',
            mode: resolved.mode,
            status_message_key: resolved.status_message_key,
          }
        }
      } catch (e) {
        console.warn('[events] DB fallback failed:', (e as Error).message)
      }
    }

    if (payload.events.length === 0 && payload.mode === 'error') {
      const merged = mergeWithHistoricalEvents([])
      payload = {
        ...payload,
        success: true,
        count: merged.length,
        events: merged,
        source: 'historical-only',
      }
    }

    const response: EventsResponse = {
      success: payload.success,
      count: payload.count,
      events: payload.events,
      timestamp: payload.timestamp,
      source: payload.source,
      mode: payload.mode,
      status_message_key: payload.status_message_key,
    }

    withTimeout(setCache(cacheKey, response, CACHE_TTL), CACHE_TIMEOUT).catch(() => {})

    return NextResponse.json(response, {
      headers: { 'Cache-Control': 'no-store' },
    })
  } catch (error) {
    console.error('[events] Unexpected error:', error)
    return NextResponse.json(
      {
        success: false,
        count: 0,
        events: [],
        error: 'Internal server error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}
