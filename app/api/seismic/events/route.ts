import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getCache, setCache } from '@/lib/redis'
import { seismicProcessor } from '@/lib/seismic-service'
import { normalizeLonLat } from '@/lib/seismic-coords'
import { mergeWithHistoricalEvents } from '@/lib/seismic-events-merge'
import { dbEventToUI, type SeismicEventUI } from '@/lib/seismic-types'

const CACHE_TTL = 5 * 60 // 5 minutes
const DB_TIMEOUT = 3000
const CACHE_TIMEOUT = 1500

type EventsResponse = {
  success: boolean
  count: number
  events: SeismicEventUI[]
  timestamp: string
  source?: string
}

async function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error(`Timeout after ${ms}ms`)), ms)
    ),
  ])
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const limit = Math.min(parseInt(searchParams.get('limit') || '100'), 1000)
    const minMagnitude = parseFloat(searchParams.get('minMagnitude') || '2.0')
    const days = Math.min(parseInt(searchParams.get('days') || '7'), 30)

    const cacheKey = `seismic:events:${limit}:${minMagnitude}:${days}`

    // 1. Try Redis cache first
    try {
      const cached = await withTimeout(getCache<EventsResponse>(cacheKey), CACHE_TIMEOUT)
      if (cached?.events) {
        return NextResponse.json({
          ...cached,
          events: mergeWithHistoricalEvents(cached.events),
          count: mergeWithHistoricalEvents(cached.events).length,
        })
      }
    } catch {
      // Cache miss or timeout — continue
    }

    // 2. Try database
    const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000)
    let dbEvents: any[] = []
    try {
      dbEvents = await withTimeout(
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
    } catch (e) {
      console.warn('[events] DB unavailable, falling back to live API:', (e as Error).message)
    }

    let response: EventsResponse

    if (dbEvents.length > 0) {
      const mapped = dbEvents.map((e) => {
        const { latitude, longitude } = normalizeLonLat(e.longitude, e.latitude)
        return dbEventToUI({ ...e, latitude, longitude })
      })
      const merged = mergeWithHistoricalEvents(mapped)

      response = {
        success: true,
        count: merged.length,
        events: merged,
        timestamp: new Date().toISOString(),
        source: 'database',
      }
    } else {
      // 3. Fallback: fetch live data from USGS/EMSC
      try {
        const live = await withTimeout(seismicProcessor.fetchHaitiData(minMagnitude, days), 12000)
        const mapped = live.map((e, i) => {
          const { latitude, longitude } = normalizeLonLat(e.longitude, e.latitude)
          return dbEventToUI({
            id: e.usgsId ?? e.emscId ?? `live-${i}`,
            latitude,
            longitude,
            usgsId: e.usgsId,
            emscId: e.emscId,
            source: e.source,
            depth: e.depth,
            magnitude: e.magnitude,
            magnitudeType: e.magnitudeType,
            eventType: e.eventType,
            eventTime: e.eventTime,
            region: e.region,
            district: null,
            tsunami: e.tsunami ?? false,
            felt: e.felt ?? false,
            reviewed: e.reviewed ?? false,
          })
        })
        const merged = mergeWithHistoricalEvents(mapped)
        response = {
          success: true,
          count: merged.length,
          events: merged,
          timestamp: new Date().toISOString(),
          source: 'live',
        }
      } catch (e) {
        console.warn('[events] Live API also failed:', (e as Error).message)
        const merged = mergeWithHistoricalEvents([])
        response = {
          success: true,
          count: merged.length,
          events: merged,
          timestamp: new Date().toISOString(),
          source: 'historical-only',
        }
      }
    }

    // 4. Write to cache (non-blocking)
    withTimeout(setCache(cacheKey, response, CACHE_TTL), CACHE_TIMEOUT).catch(() => {})

    return NextResponse.json(response)
  } catch (error) {
    console.error('[events] Unexpected error:', error)
    return NextResponse.json(
      { success: false, count: 0, events: [], error: 'Internal server error', timestamp: new Date().toISOString() },
      { status: 500 }
    )
  }
}
