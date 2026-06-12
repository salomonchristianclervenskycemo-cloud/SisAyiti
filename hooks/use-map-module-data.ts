'use client'

/**
 * Données dédiées au module Carte (Haïti) — indépendant du flux Actualités / surveillance.
 */
import { useCallback, useEffect, useRef } from 'react'
import { useApp } from '@/lib/app-context'
import { useSeismicStore } from '@/lib/seismic-store'
import { enrichSeismicEvents } from '@/lib/seismic-event-enrich'
import { mergeWithHistoricalEvents } from '@/lib/seismic-events-merge'
import type { SeismicEventUI } from '@/lib/seismic-types'
import { api } from '@/lib/api-client'
import {
  readSeismicEventsCache,
  readStaleSeismicEventsCache,
  writeSeismicEventsCache,
} from '@/lib/seismic-events-cache'
import { isStoreHydrationFresh } from '@/lib/seismic-hydration'
import { filterEventsNearFocus, isEventOutsideHaitiMap } from '@/lib/map-viewport'
import { filterEventsForHaitiMap } from '@/lib/seismic-haiti-filter'

const MAP_CACHE_SCOPE = 'carte-haiti'

function readMapCache(days: number, minMag: number) {
  const raw = readSeismicEventsCache(days, minMag)
  if (!raw || raw.source !== MAP_CACHE_SCOPE) return null
  return raw
}

function writeMapCache(
  days: number,
  minMag: number,
  events: SeismicEventUI[],
  timestamp: string
) {
  writeSeismicEventsCache(days, minMag, events, timestamp, MAP_CACHE_SCOPE)
}

function mergeSelectedEvent(events: SeismicEventUI[]): SeismicEventUI[] {
  const selected = useSeismicStore.getState().selectedEvent
  if (!selected) return events
  if (events.some((e) => e.id === selected.id)) return events
  return [selected, ...events]
}

export function useMapModuleData() {
  const { activeModule } = useApp()
  const enabled = activeModule === 'carte'

  const fetchDays = useSeismicStore((s) => s.fetchDays)
  const minMagnitude = useSeismicStore((s) => s.filters?.magnitude?.min ?? 2)
  const setEvents = useSeismicStore((s) => s.setEvents)
  const setLoading = useSeismicStore((s) => s.setLoading)
  const setLastSync = useSeismicStore((s) => s.setLastSync)
  const setDataSource = useSeismicStore((s) => s.setDataSource)
  const setDataHydration = useSeismicStore((s) => s.setDataHydration)
  const dataHydration = useSeismicStore((s) => s.dataHydration)
  const storeEvents = useSeismicStore((s) => s.events)
  const mapViewportExpanded = useSeismicStore((s) => s.mapViewportExpanded)
  const selectedEvent = useSeismicStore((s) => s.selectedEvent)

  const backgroundRef = useRef(false)

  const loadFromApi = useCallback(
    async (opts: { silent?: boolean } = {}) => {
      const cached = readMapCache(fetchDays, minMagnitude)

      if (!opts.silent) {
        if (cached) {
          setEvents(mergeSelectedEvent(enrichSeismicEvents(cached.events)))
          setLastSync(cached.timestamp)
          setDataSource(cached.source ?? MAP_CACHE_SCOPE)
          setLoading(false)
        } else {
          setLoading(true)
        }
      }

      try {
        const focus = useSeismicStore.getState().selectedEvent
        const expanded =
          useSeismicStore.getState().mapViewportExpanded &&
          focus != null &&
          isEventOutsideHaitiMap(focus)

        const data = await api.getSeismicEvents({
          days: fetchDays,
          minMagnitude,
          limit: 800,
          global: expanded,
        })

        if (data.success && Array.isArray(data.events)) {
          const ui = data.events.filter(
            (e): e is SeismicEventUI =>
              Number.isFinite(e?.latitude) && Number.isFinite(e?.longitude)
          )
          let scoped: SeismicEventUI[]
          if (expanded && focus) {
            scoped = filterEventsNearFocus(ui, focus)
          } else {
            scoped = filterEventsForHaitiMap(ui)
          }
          const enriched = enrichSeismicEvents(
            expanded
              ? mergeSelectedEvent(scoped)
              : mergeWithHistoricalEvents(mergeSelectedEvent(scoped))
          )
          const ts = data.timestamp ?? new Date().toISOString()

          setEvents(enriched)
          setLastSync(ts)
          setDataSource(data.source ?? (expanded ? 'carte-global-focus' : MAP_CACHE_SCOPE))
          setDataHydration({
            scope: 'carte',
            days: fetchDays,
            minMagnitude,
            includeGlobal: expanded,
            syncedAt: ts,
            source: data.source ?? MAP_CACHE_SCOPE,
          })
          setFiltersForMap(fetchDays)
          if (!expanded) {
            writeMapCache(fetchDays, minMagnitude, enriched, ts)
          }
        } else if (!cached && !opts.silent) {
          setEvents(mergeWithHistoricalEvents([]))
          setDataSource('error')
        }
      } catch (err) {
        console.error('[carte] Failed to load Haiti map events:', err)
        const stale = readStaleSeismicEventsCache(fetchDays, minMagnitude)
        if (stale?.source === MAP_CACHE_SCOPE) {
          setEvents(mergeSelectedEvent(enrichSeismicEvents(stale.events)))
          setLastSync(stale.timestamp)
          setDataSource('cache-stale')
        } else if (!opts.silent) {
          setEvents(mergeWithHistoricalEvents([]))
          setDataSource('error')
        }
      } finally {
        if (!opts.silent) setLoading(false)
      }
    },
    [fetchDays, minMagnitude, setEvents, setLoading, setLastSync, setDataSource, setDataHydration]
  )

  const fetchMapData = useCallback(async () => {
    if (!enabled) return

    const carteHydrationOk = isStoreHydrationFresh(
      dataHydration,
      fetchDays,
      minMagnitude,
      'carte',
      false
    )

    const needsGlobalFocus =
      mapViewportExpanded &&
      selectedEvent != null &&
      isEventOutsideHaitiMap(selectedEvent)

    if (storeEvents.length > 0 && carteHydrationOk && !needsGlobalFocus) {
      setLoading(false)
      if (!backgroundRef.current) {
        backgroundRef.current = true
        void loadFromApi({ silent: true }).finally(() => {
          backgroundRef.current = false
        })
      }
      return
    }

    await loadFromApi()
  }, [
    enabled,
    storeEvents.length,
    dataHydration,
    fetchDays,
    minMagnitude,
    mapViewportExpanded,
    selectedEvent,
    loadFromApi,
    setLoading,
  ])

  useEffect(() => {
    if (!enabled) return
    fetchMapData()
  }, [enabled, fetchMapData])

  useEffect(() => {
    if (!enabled) return
    const unsub = useSeismicStore.subscribe((state, prev) => {
      if (
        state.fetchDays !== prev.fetchDays ||
        state.filters.magnitude.min !== prev.filters.magnitude.min ||
        state.mapViewportExpanded !== prev.mapViewportExpanded ||
        state.mapFocusEventId !== prev.mapFocusEventId
      ) {
        fetchMapData()
      }
    })
    return unsub
  }, [enabled, fetchMapData])

  return { refetch: fetchMapData }
}

function setFiltersForMap(days: number) {
  useSeismicStore.getState().setFilters({
    dateRange: {
      start: new Date(Date.now() - days * 24 * 60 * 60 * 1000),
      end: new Date(),
    },
  })
}
