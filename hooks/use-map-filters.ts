'use client'

import { useMemo } from 'react'
import { useSeismicStore } from '@/lib/seismic-store'
import { isPinnedHistoricalEvent } from '@/lib/haiti-historical-seismic'
import { normalizeDepthKm } from '@/lib/seismic-geo'
import { DEFAULT_FILTERS, type MapFilters, type SeismicEventUI } from '@/lib/seismic-types'
import { filterEventsForHaitiMap } from '@/lib/seismic-haiti-filter'

/** Accepte "USGS", "EMSC", "USGS+EMSC" (agrégateur surveillance) */
export function eventMatchesSources(eventSource: string, allowed: string[]): boolean {
  const normalized = eventSource.trim().toUpperCase()
  const allowedSet = new Set(allowed.map((s) => s.trim().toUpperCase()))
  if (allowedSet.has(normalized)) return true
  const parts = normalized
    .split('+')
    .flatMap((p) => p.split(','))
    .map((p) => p.trim())
    .filter(Boolean)
  return parts.some((p) => allowedSet.has(p))
}

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
  const nowMs = Date.now()

  return events.filter((e) => {
    // Séismes majeurs historiques : toujours visibles (hors filtre date/magnitude)
    if (isPinnedHistoricalEvent(e.id)) return true

    if (e.magnitude < magnitude.min || e.magnitude > magnitude.max) return false
    const depthKm = normalizeDepthKm(e.depth)
    if (depthKm < depth.min || depthKm > depth.max) return false
    if (!riskLevel.includes(e.risk)) return false
    if (!eventMatchesSources(e.source, sources)) return false
    const t = new Date(e.eventTime).getTime()
    const endMs = Math.max(end.getTime(), nowMs)
    if (t < start.getTime() || t > endMs + 60_000) return false
    return true
  })
}

export function useFilteredEvents() {
  const events = useSeismicStore((s) => s.events)
  const filters = useSeismicStore((s) => s.filters)

  return useMemo(() => filterSeismicEvents(events, filters), [events, filters])
}

/** Carte Haïti : filtre géographique + filtres UI ; garde toujours l'événement sélectionné (ex. depuis Actualités) */
export function getMapDisplayEvents(
  events: SeismicEventUI[],
  filters: MapFilters | null | undefined,
  selected: SeismicEventUI | null,
  focusId: string | null
): SeismicEventUI[] {
  const inRegion = filterEventsForHaitiMap(events)
  let filtered = filterSeismicEvents(inRegion, filters)
  const pinId = focusId ?? selected?.id
  if (pinId) {
    const pin =
      selected?.id === pinId ? selected : events.find((e) => e.id === pinId) ?? selected
    if (pin && !filtered.some((e) => e.id === pin.id)) {
      filtered = [pin, ...filtered]
    }
  }
  return filtered
}

export function useMapFilteredEvents() {
  const events = useSeismicStore((s) => s.events)
  const filters = useSeismicStore((s) => s.filters)
  const selected = useSeismicStore((s) => s.selectedEvent)
  const focusId = useSeismicStore((s) => s.mapFocusEventId)

  return useMemo(
    () => getMapDisplayEvents(events, filters, selected, focusId),
    [events, filters, selected, focusId]
  )
}
