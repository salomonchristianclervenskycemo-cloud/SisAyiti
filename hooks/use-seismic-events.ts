'use client'

import { useCallback, useEffect } from 'react'
import { useSeismicStore } from '@/lib/seismic-store'
import { enrichSeismicEvents } from '@/lib/seismic-event-enrich'
import type { SeismicEventUI } from '@/lib/seismic-types'
import { api } from '@/lib/api-client'
import {
  readSeismicEventsCache,
  readStaleSeismicEventsCache,
  writeSeismicEventsCache,
} from '@/lib/seismic-events-cache'

export function useSeismicEvents(days?: number, minMagnitude?: number) {
  const storeDays = useSeismicStore((s) => s.fetchDays)
  const storeMinMag = useSeismicStore((s) => s.filters?.magnitude?.min ?? 2)
  const setEvents = useSeismicStore((s) => s.setEvents)
  const setLoading = useSeismicStore((s) => s.setLoading)
  const setLastSync = useSeismicStore((s) => s.setLastSync)
  const setDataSource = useSeismicStore((s) => s.setDataSource)

  const effectiveDays = days ?? storeDays
  const effectiveMinMag = minMagnitude ?? storeMinMag

  const fetchEvents = useCallback(async () => {
    if (effectiveDays <= 0) return

    const cached = readSeismicEventsCache(effectiveDays, effectiveMinMag)
    if (cached) {
      setEvents(enrichSeismicEvents(cached.events))
      setLastSync(cached.timestamp)
      setDataSource(cached.source ?? 'cache')
      setLoading(false)
    } else {
      setLoading(true)
    }

    try {
      const data = await api.getSeismicEvents({
        days: effectiveDays,
        minMagnitude: effectiveMinMag,
        limit: 1000,
        global: true,
      })
      if (data.success && Array.isArray(data.events)) {
        const ui = data.events.filter(
          (e): e is SeismicEventUI =>
            Number.isFinite(e?.latitude) && Number.isFinite(e?.longitude)
        )
        const enriched = enrichSeismicEvents(ui)
        setEvents(enriched)
        setLastSync(data.timestamp ?? new Date().toISOString())
        setDataSource(data.source ?? null)
        writeSeismicEventsCache(
          effectiveDays,
          effectiveMinMag,
          enriched,
          data.timestamp ?? new Date().toISOString(),
          data.source
        )
        useSeismicStore.getState().setFilters({
          dateRange: {
            start: new Date(Date.now() - effectiveDays * 24 * 60 * 60 * 1000),
            end: new Date(),
          },
        })
      } else if (!cached) {
        setEvents([])
        setDataSource('error')
      }
    } catch (err) {
      console.error('Failed to load seismic events:', err)
      const stale = readStaleSeismicEventsCache(effectiveDays, effectiveMinMag)
      if (stale) {
        setEvents(enrichSeismicEvents(stale.events))
        setLastSync(stale.timestamp)
        setDataSource('cache-stale')
      } else {
        setEvents([])
        setDataSource('error')
      }
    } finally {
      setLoading(false)
    }
  }, [effectiveDays, effectiveMinMag, setEvents, setLoading, setLastSync, setDataSource])

  useEffect(() => {
    if (effectiveDays <= 0) {
      setLoading(false)
      return
    }
    fetchEvents()
  }, [fetchEvents, effectiveDays, setLoading])

  return { refetch: fetchEvents }
}
