'use client'

import { useMemo } from 'react'
import { useSeismicStore } from '@/lib/seismic-store'
import { isPinnedHistoricalEvent } from '@/lib/haiti-historical-seismic'
import { normalizeDepthKm } from '@/lib/seismic-geo'
import { DEFAULT_FILTERS, type MapFilters, type SeismicEventUI } from '@/lib/seismic-types'

export function filterSeismicEvents(
  events: SeismicEventUI[],
  filters: MapFilters | null | undefined
): SeismicEventUI[] {
  if (!Array.isArray(events) || !filters) return events ?? []

  const magnitude = filters.magnitude ?? DEFAULT_FILTERS.magnitude
  const depth = filters.depth ?? DEFAULT_FILTERS.depth
  const riskLevel = filters.riskLevel ?? DEFAULT_FILTERS.riskLevel
  const sources = filters.sources ?? DEFAULT_FILTERS.sources
  const dateRange = filters.dateRange ?? DEFAULT_FILTERS.dateRange
  const start =
    dateRange.start instanceof Date
      ? dateRange.start
      : new Date(dateRange.start ?? DEFAULT_FILTERS.dateRange.start)
  const end =
    dateRange.end instanceof Date
      ? dateRange.end
      : new Date(dateRange.end ?? DEFAULT_FILTERS.dateRange.end)

  return events.filter((e) => {
    // Séismes majeurs historiques : toujours visibles (hors filtre date/magnitude)
    if (isPinnedHistoricalEvent(e.id)) return true

    if (e.magnitude < magnitude.min || e.magnitude > magnitude.max) return false
    const depthKm = normalizeDepthKm(e.depth)
    if (depthKm < depth.min || depthKm > depth.max) return false
    if (!riskLevel.includes(e.risk)) return false
    if (!sources.includes(e.source)) return false
    const t = new Date(e.eventTime).getTime()
    if (t < start.getTime() || t > end.getTime()) return false
    return true
  })
}

export function useFilteredEvents() {
  const events = useSeismicStore((s) => s.events)
  const filters = useSeismicStore((s) => s.filters)

  return useMemo(() => filterSeismicEvents(events, filters), [events, filters])
}
