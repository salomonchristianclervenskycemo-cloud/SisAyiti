'use client'



import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { useSeismicStore } from '@/lib/seismic-store'

import { mergeWithHistoricalEvents } from '@/lib/seismic-events-merge'

import { enrichSeismicEvents } from '@/lib/seismic-event-enrich'

import {

  readFreshSurveillanceCache,

  readStaleSurveillanceCache,

  writeSurveillanceCache,

  SURVEILLANCE_CACHE_FRESH_MS,

  type SurveillanceCacheParams,

} from '@/lib/surveillance/cache'

import { resolveSurveillanceFeed, type SurveillanceFeedMode } from '@/lib/surveillance/feed-resolver'

import { mergeSurveillanceAggregationResults } from '@/lib/surveillance/merge-results'

import { surveillanceEventsToUI } from '@/lib/surveillance/bridge-to-ui'

import { computeSurveillanceKpis, type SurveillanceKpis } from '@/lib/surveillance/kpis'

import { SURVEILLANCE_DASHBOARD_DAYS } from '@/lib/surveillance/constants'

import type { SeismicAggregationMeta, SurveillanceSeismicEvent } from '@/lib/surveillance/types'

import type { SurveillanceApiResponse } from '@/app/api/seismic/surveillance/route'



export const SURVEILLANCE_POLL_MS = 5 * 60 * 1000



export interface SurveillanceDashboardState {

  events: SurveillanceSeismicEvent[]

  haiti_events: SurveillanceSeismicEvent[]

  global_events: SurveillanceSeismicEvent[]

  meta: SeismicAggregationMeta | null

  mode: SurveillanceFeedMode

  status_message_key: string

  from_cache: boolean

  is_refreshing: boolean

  last_sync: string | null

  network_error: string | null

  kpis: SurveillanceKpis

  retry_count: number

  cache_age_ms: number | null

}



const EMPTY_KPIS = computeSurveillanceKpis([])



const INITIAL_STATE: SurveillanceDashboardState = {

  events: [],

  haiti_events: [],

  global_events: [],

  meta: null,

  mode: 'live',

  status_message_key: 'surv.status.loading',

  from_cache: false,

  is_refreshing: true,

  last_sync: null,

  network_error: null,

  kpis: EMPTY_KPIS,

  retry_count: 0,

  cache_age_ms: null,

}



export interface UseSurveillanceDashboardOptions {

  days?: number

  min_magnitude?: number

  include_global?: boolean

  /** Pousse aussi vers le store carte / module legacy */

  syncToSeismicStore?: boolean

  /** Rafraîchissement automatique (ms), 0 = désactivé */

  poll_interval_ms?: number

}



async function fetchSurveillanceApi(

  params: SurveillanceCacheParams

): Promise<{ data: SurveillanceApiResponse | null; error: string | null; retries: number }> {

  const q = new URLSearchParams({

    days: String(params.days),

    minMagnitude: String(params.min_magnitude),

    global: params.include_global ? 'true' : 'false',

  })



  try {
    const res = await fetch(`/api/seismic/surveillance?${q}`, {
      cache: 'no-store',
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(45_000),
    })
    if (!res.ok) {
      return { data: null, error: `HTTP ${res.status}`, retries: 1 }
    }
    const data = (await res.json()) as SurveillanceApiResponse
    return { data, error: null, retries: 1 }
  } catch (err) {
    return {
      data: null,
      error: err instanceof Error ? err.message : 'Network error',
      retries: 1,
    }
  }
}



export function useSurveillanceDashboard(options: UseSurveillanceDashboardOptions = {}) {

  const storeMinMag = useSeismicStore((s) => s.filters?.magnitude?.min ?? 2)

  const setEvents = useSeismicStore((s) => s.setEvents)

  const setLoading = useSeismicStore((s) => s.setLoading)

  const setLastSync = useSeismicStore((s) => s.setLastSync)

  const setDataSource = useSeismicStore((s) => s.setDataSource)

  const setLiveConnected = useSeismicStore((s) => s.setLiveConnected)
  const setDataHydration = useSeismicStore((s) => s.setDataHydration)
  const setFilters = useSeismicStore((s) => s.setFilters)



  const days = options.days ?? SURVEILLANCE_DASHBOARD_DAYS

  const min_magnitude = options.min_magnitude ?? storeMinMag

  const include_global = options.include_global !== false

  /** Par défaut false — le module Carte possède son propre flux (Haïti) */
  const syncToStore = options.syncToSeismicStore === true

  const pollMs = options.poll_interval_ms ?? SURVEILLANCE_POLL_MS



  const cacheParams: SurveillanceCacheParams = useMemo(

    () => ({ days, min_magnitude, include_global }),

    [days, min_magnitude, include_global]

  )



  const [state, setState] = useState<SurveillanceDashboardState>(INITIAL_STATE)

  const refreshInFlight = useRef(false)



  const applyResolved = useCallback(

    (

      resolved: ReturnType<typeof resolveSurveillanceFeed>,

      timestamp: string,

      extras: Partial<Pick<SurveillanceDashboardState, 'retry_count' | 'cache_age_ms'>> = {}

    ) => {

      const kpis = computeSurveillanceKpis(resolved.result.events)

      setState({

        events: resolved.result.events,

        haiti_events: resolved.result.haiti_events,

        global_events: resolved.result.global_events,

        meta: resolved.result.meta,

        mode: resolved.mode,

        status_message_key: resolved.status_message_key,

        from_cache: resolved.from_cache,

        is_refreshing: false,

        last_sync: timestamp,

        network_error: resolved.network_error,

        kpis,

        retry_count: extras.retry_count ?? 0,

        cache_age_ms: extras.cache_age_ms ?? null,

      })



      if (syncToStore) {

        const ui = enrichSeismicEvents(

          mergeWithHistoricalEvents(surveillanceEventsToUI(resolved.result.events))

        )

        setEvents(ui)

        setLastSync(timestamp)

        setLiveConnected(resolved.mode === 'live' || resolved.mode === 'degraded')

        setDataSource(

          resolved.from_cache

            ? 'offline-cache'

            : resolved.mode === 'degraded'

              ? 'degraded'

              : resolved.mode === 'offline'

                ? 'offline'

                : 'surveillance-live'

        )

        setLoading(false)

        setDataHydration({
          scope: 'surveillance',
          days,
          minMagnitude: min_magnitude,
          includeGlobal: include_global,
          syncedAt: timestamp,
          source: resolved.from_cache
            ? 'offline-cache'
            : resolved.mode === 'live'
              ? 'surveillance-live'
              : resolved.mode,
        })

        setFilters({
          dateRange: {
            start: new Date(Date.now() - days * 24 * 60 * 60 * 1000),
            end: new Date(),
          },
        })

      }

    },

    [
      syncToStore,
      setEvents,
      setLastSync,
      setDataSource,
      setLoading,
      setLiveConnected,
      setDataHydration,
      setFilters,
      days,
      min_magnitude,
    ]

  )



  const refresh = useCallback(async () => {

    if (days <= 0) {

      setState((s) => ({ ...s, is_refreshing: false }))

      setLoading(false)

      return

    }

    if (refreshInFlight.current) return

    refreshInFlight.current = true



    try {

      const freshCache = readFreshSurveillanceCache(cacheParams)

      const staleCache = readStaleSurveillanceCache(cacheParams)



      if (freshCache) {

        const resolved = resolveSurveillanceFeed({

          live: null,

          freshCache: freshCache.result,

          staleCache: staleCache?.result ?? null,

          networkError: null,

        })

        applyResolved(

          {

            ...resolved,

            from_cache: true,

            mode: 'live',

            status_message_key: 'surv.status.cacheFresh',

          },

          freshCache.result.meta.fetched_at_utc,

          { cache_age_ms: Date.now() - freshCache.saved_at }

        )

      } else if (staleCache && !freshCache) {

        setState((s) => ({

          ...s,

          is_refreshing: true,

          status_message_key: 'surv.status.loading',

          cache_age_ms: Date.now() - staleCache.saved_at,

        }))

        if (syncToStore) setLoading(true)

      } else {

        setState((s) => ({ ...s, is_refreshing: true, status_message_key: 'surv.status.loading' }))

        if (syncToStore) setLoading(true)

      }



      const { data, error, retries } = await fetchSurveillanceApi(cacheParams)



      if (data?.success !== false && data?.events) {

        const live = {

          events: data.events,

          haiti_events: data.haiti_events,

          global_events: data.global_events,

          meta: data.meta,

        }

        writeSurveillanceCache(cacheParams, live)



        let mergedLive = live

        const stale = readStaleSurveillanceCache(cacheParams)

        if (

          data.mode === 'degraded' &&

          stale?.result &&

          stale.result.events.length > live.events.length

        ) {

          mergedLive = mergeSurveillanceAggregationResults(live, stale.result)

        }



        const resolved = resolveSurveillanceFeed({

          live: mergedLive,

          freshCache: null,

          staleCache: stale?.result ?? null,

          networkError: null,

        })

        applyResolved(

          {

            ...resolved,

            mode: (data.mode as SurveillanceFeedMode) ?? resolved.mode,

            status_message_key: data.status_message_key ?? resolved.status_message_key,

            from_cache: data.from_cache ?? false,

            network_error: data.network_error ?? null,

          },

          data.timestamp ?? new Date().toISOString(),

          { retry_count: retries }

        )

        return

      }



      const resolved = resolveSurveillanceFeed({

        live: data

          ? {

              events: data.events ?? [],

              haiti_events: data.haiti_events ?? [],

              global_events: data.global_events ?? [],

              meta: data.meta,

            }

          : null,

        freshCache: freshCache?.result ?? null,

        staleCache: staleCache?.result ?? null,

        networkError: error ?? data?.network_error ?? 'Fetch failed',

      })

      applyResolved(resolved, resolved.result.meta.fetched_at_utc, {

        retry_count: retries,

        cache_age_ms: staleCache ? Date.now() - staleCache.saved_at : freshCache ? Date.now() - freshCache.saved_at : null,

      })

    } finally {

      refreshInFlight.current = false

    }

  }, [cacheParams, days, applyResolved, syncToStore, setLoading])



  useEffect(() => {

    refresh()

  }, [refresh])



  useEffect(() => {

    if (pollMs <= 0) return



    const tick = () => {

      if (typeof document !== 'undefined' && document.visibilityState === 'hidden') return

      refresh()

    }



    const id = window.setInterval(tick, pollMs)

    const onVisible = () => {

      if (document.visibilityState === 'visible') refresh()

    }

    document.addEventListener('visibilitychange', onVisible)

    return () => {

      window.clearInterval(id)

      document.removeEventListener('visibilitychange', onVisible)

    }

  }, [pollMs, refresh])



  const sourcesHealthy = useMemo(() => {

    const reports = state.meta?.sources ?? []

    if (!reports.length) return null

    return reports.filter((s) => s.state === 'ok').length

  }, [state.meta?.sources])



  return {

    ...state,

    refresh,

    cacheParams,

    sources_healthy_count: sourcesHealthy,

    poll_interval_ms: pollMs,

  }

}

