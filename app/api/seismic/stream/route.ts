import { surveillanceEventsToUI } from '@/lib/surveillance/bridge-to-ui'
import {
  readSurveillanceServerCache,
  surveillanceServerCacheKey,
  SURVEILLANCE_SERVER_STALE_TTL_SEC,
} from '@/lib/surveillance/server-cache'
import {
  diffNewEventIds,
  streamSnapshotKey,
} from '@/lib/surveillance/stream-snapshot'
import type { SeismicEventUI } from '@/lib/seismic-types'

export const dynamic = 'force-dynamic'

/** Heartbeat uniquement — pas d'agrégation USGS/EMSC par tick (évite blocage serveur) */
const HEARTBEAT_MS = 30_000
const MAX_SSE_MS = 120_000

export async function GET(request: Request) {
  const url = new URL(request.url)
  const days = Math.min(Math.max(parseInt(url.searchParams.get('days') || '7', 10), 1), 30)
  const minMagnitude = Math.max(parseFloat(url.searchParams.get('minMagnitude') || '2'), 0)
  const includeGlobal = url.searchParams.get('global') !== 'false'
  const cacheKey = surveillanceServerCacheKey(days, minMagnitude, includeGlobal)
  const snapKey = streamSnapshotKey(days, minMagnitude, includeGlobal)
  const staleMaxAgeMs = SURVEILLANCE_SERVER_STALE_TTL_SEC * 1000

  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    start(controller) {
      const send = (data: object) => {
        try {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`))
        } catch {
          /* client disconnected */
        }
      }

      const started = Date.now()

      const tick = async () => {
        if (Date.now() - started > MAX_SSE_MS) {
          send({ type: 'closed', reason: 'max_duration', timestamp: new Date().toISOString() })
          clearInterval(interval)
          controller.close()
          return
        }

        try {
          const cached = await readSurveillanceServerCache(cacheKey, staleMaxAgeMs)
          if (!cached?.events?.length) {
            send({
              type: 'heartbeat',
              timestamp: new Date().toISOString(),
              hint: 'awaiting_surveillance_cache',
            })
            return
          }

          const ui = surveillanceEventsToUI(cached.events)
          const ids = ui.map((e) => e.id)
          const newIds = diffNewEventIds(snapKey, ids)
          const newEvents: SeismicEventUI[] =
            newIds.length > 0 ? ui.filter((e) => newIds.includes(e.id)) : []

          if (newEvents.length > 0) {
            send({
              type: 'events',
              ui_events: newEvents,
              timestamp: new Date().toISOString(),
            })
          } else {
            send({
              type: 'heartbeat',
              count: ui.length,
              timestamp: new Date().toISOString(),
            })
          }
        } catch (err) {
          send({
            type: 'error',
            message: err instanceof Error ? err.message : 'tick failed',
            timestamp: new Date().toISOString(),
          })
        }
      }

      send({ type: 'connected', timestamp: new Date().toISOString() })
      tick()
      const interval = setInterval(tick, HEARTBEAT_MS)

      request.signal.addEventListener('abort', () => {
        clearInterval(interval)
        try {
          controller.close()
        } catch {
          /* already closed */
        }
      })
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  })
}
