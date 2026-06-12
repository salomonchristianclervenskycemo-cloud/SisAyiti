/**
 * Résolution du flux : live, dégradé, hors-ligne — zéro écran noir.
 */

import { mergeSurveillanceAggregationResults } from './merge-results'
import type { SeismicAggregationResult } from './types'

export type SurveillanceFeedMode = 'live' | 'degraded' | 'offline' | 'error'

export interface ResolvedSurveillanceFeed {
  result: SeismicAggregationResult
  mode: SurveillanceFeedMode
  status_message_key: string
  from_cache: boolean
  network_error: string | null
}

function emptyResult(): SeismicAggregationResult {
  const now = new Date().toISOString()
  return {
    events: [],
    haiti_events: [],
    global_events: [],
    meta: {
      fetched_at_utc: now,
      global_count: 0,
      haiti_count: 0,
      deduplicated_count: 0,
      sources: [],
      is_live: false,
      is_degraded: true,
    },
  }
}

function hasPartialSourceFailure(meta: SeismicAggregationResult['meta']): boolean {
  const reports = meta.sources
  if (reports.length < 2) return false
  const ok = reports.some((r) => r.state === 'ok')
  const fail = reports.some((r) => r.state !== 'ok')
  return ok && fail
}

export function resolveSurveillanceFeed(input: {
  live: SeismicAggregationResult | null
  freshCache: SeismicAggregationResult | null
  staleCache: SeismicAggregationResult | null
  networkError: string | null
}): ResolvedSurveillanceFeed {
  const { live, freshCache, staleCache, networkError } = input

  if (live) {
    if (live.events.length > 0) {
      const partial = hasPartialSourceFailure(live.meta)
      const allDown = live.meta.is_degraded && !live.meta.is_live
      if (allDown) {
        /* continue to cache fallback below */
      } else if (partial) {
        const merged =
          staleCache && staleCache.events.length > live.events.length
            ? mergeSurveillanceAggregationResults(live, staleCache)
            : live
        return {
          result: merged,
          mode: 'degraded',
          status_message_key: 'surv.status.degradedMerged',
          from_cache: merged !== live,
          network_error: null,
        }
      }
      return {
        result: live,
        mode: 'live',
        status_message_key: 'surv.status.live',
        from_cache: false,
        network_error: null,
      }
    } else if (live.meta.is_live) {
      return {
        result: live,
        mode: 'live',
        status_message_key: 'surv.status.noEvents',
        from_cache: false,
        network_error: null,
      }
    }
  }

  const fallback = staleCache ?? freshCache
  if (fallback && fallback.events.length > 0) {
    return {
      result: {
        ...fallback,
        meta: { ...fallback.meta, is_live: false, is_degraded: true },
      },
      mode: 'offline',
      status_message_key: 'surv.status.offline',
      from_cache: true,
      network_error: networkError,
    }
  }

  if (live) {
    return {
      result: live,
      mode: 'degraded',
      status_message_key: 'surv.status.degraded',
      from_cache: false,
      network_error: networkError,
    }
  }

  return {
    result: emptyResult(),
    mode: 'error',
    status_message_key: 'surv.status.error',
    from_cache: false,
    network_error: networkError,
  }
}
