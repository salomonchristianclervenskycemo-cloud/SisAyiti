/**
 * Résolution serveur partagée — /api/seismic/surveillance et /api/seismic/events.
 */

import { aggregateSeismicEvents } from './seismic-aggregator'
import { resolveSurveillanceFeed, type ResolvedSurveillanceFeed } from './feed-resolver'
import { mergeSurveillanceAggregationResults } from './merge-results'
import {
  readSurveillanceServerCache,
  surveillanceServerCacheKey,
  writeSurveillanceServerCache,
  SURVEILLANCE_SERVER_FRESH_TTL_SEC,
  SURVEILLANCE_SERVER_STALE_TTL_SEC,
} from './server-cache'
import type { SeismicAggregationResult } from './types'

const backgroundRefresh = new Map<string, Promise<void>>()

async function revalidateSurveillanceCache(
  options: FetchResolvedSurveillanceOptions,
  cacheKey: string
): Promise<void> {
  const existing = backgroundRefresh.get(cacheKey)
  if (existing) return existing

  const job = (async () => {
    try {
      const live = await aggregateSeismicEvents({
        days: Math.min(Math.max(options.days, 1), 30),
        min_magnitude: Math.max(options.min_magnitude, 0),
        include_global: options.include_global !== false,
        source_timeout_ms: options.source_timeout_ms ?? 14_000,
      })
      if (live.events.length > 0) {
        await writeSurveillanceServerCache(cacheKey, live, SURVEILLANCE_SERVER_STALE_TTL_SEC)
      }
    } catch (err) {
      console.warn('[surveillance] background revalidate failed:', err)
    } finally {
      backgroundRefresh.delete(cacheKey)
    }
  })()

  backgroundRefresh.set(cacheKey, job)
  return job
}

export interface FetchResolvedSurveillanceOptions {
  days: number
  min_magnitude: number
  include_global?: boolean
  source_timeout_ms?: number
}

export interface FetchResolvedSurveillanceResult {
  resolved: ResolvedSurveillanceFeed
  server_cache: boolean
  network_error: string | null
}

export async function fetchResolvedSurveillanceFeed(
  options: FetchResolvedSurveillanceOptions
): Promise<FetchResolvedSurveillanceResult> {
  const days = Math.min(Math.max(options.days, 1), 30)
  const min_magnitude = Math.max(options.min_magnitude, 0)
  const include_global = options.include_global !== false
  const source_timeout_ms = options.source_timeout_ms ?? 14_000

  const cacheKey = surveillanceServerCacheKey(days, min_magnitude, include_global)
  const freshMaxAgeMs = SURVEILLANCE_SERVER_FRESH_TTL_SEC * 1000
  const staleMaxAgeMs = SURVEILLANCE_SERVER_STALE_TTL_SEC * 1000

  const serverFresh = await readSurveillanceServerCache(cacheKey, freshMaxAgeMs)
  const serverStale = await readSurveillanceServerCache(cacheKey, staleMaxAgeMs)

  /** Fast path : cache serveur frais → réponse immédiate + refresh en arrière-plan */
  if (serverFresh?.events?.length) {
    void revalidateSurveillanceCache(
      { days, min_magnitude, include_global, source_timeout_ms },
      cacheKey
    )
    const resolved = resolveSurveillanceFeed({
      live: serverFresh,
      freshCache: null,
      staleCache: serverStale,
      networkError: null,
    })
    return {
      resolved: { ...resolved, from_cache: true },
      server_cache: true,
      network_error: null,
    }
  }

  let live: SeismicAggregationResult | null = null
  let networkError: string | null = null
  let serverCacheUsed = false

  try {
    live = await aggregateSeismicEvents({
      days,
      min_magnitude,
      include_global,
      source_timeout_ms,
    })
    if (live.events.length > 0) {
      await writeSurveillanceServerCache(
        cacheKey,
        live,
        SURVEILLANCE_SERVER_STALE_TTL_SEC
      )
    }
  } catch (err) {
    networkError = err instanceof Error ? err.message : 'Aggregation failed'
    console.error('[surveillance] aggregate error:', networkError)
  }

  if (!live || (live.meta.is_degraded && live.events.length === 0)) {
    const fallback = serverFresh ?? serverStale
    if (fallback) {
      live = fallback
      serverCacheUsed = true
      networkError = networkError ?? 'Using server cache'
    }
  } else if (
    live.meta.sources.some((s) => s.state !== 'ok') &&
    serverStale &&
    serverStale.events.length > live.events.length
  ) {
    live = mergeSurveillanceAggregationResults(live, serverStale)
    serverCacheUsed = true
  }

  const resolved = resolveSurveillanceFeed({
    live,
    freshCache: null,
    staleCache: serverStale,
    networkError,
  })

  return {
    resolved,
    server_cache: serverCacheUsed,
    network_error: networkError,
  }
}

/** Libellé `source` pour les clients carte / mobile */
export function surveillanceModeToDataSource(
  mode: ResolvedSurveillanceFeed['mode'],
  server_cache: boolean
): string {
  if (server_cache && mode !== 'live') return 'server-cache'
  switch (mode) {
    case 'live':
      return 'surveillance-live'
    case 'degraded':
      return 'degraded'
    case 'offline':
      return 'offline-cache'
    default:
      return 'error'
  }
}
