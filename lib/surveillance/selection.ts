import { isPinnedHistoricalEvent } from '@/lib/haiti-historical-seismic'
import type { SeismicEventUI } from '@/lib/seismic-types'

export function isHistoricalCatalogEvent(event: SeismicEventUI): boolean {
  return isPinnedHistoricalEvent(event.id)
}

export function sortEventsByTimeDesc(events: SeismicEventUI[]): SeismicEventUI[] {
  return [...events].sort(
    (a, b) => new Date(b.eventTime).getTime() - new Date(a.eventTime).getTime()
  )
}

/** Sélection par défaut : le plus récent du flux live (hors catalogue historique). */
export function pickDefaultSurveillanceEvent(
  filteredEvents: SeismicEventUI[]
): SeismicEventUI | null {
  const live = filteredEvents.filter((e) => !isHistoricalCatalogEvent(e))
  if (live.length > 0) return live[0]
  return filteredEvents[0] ?? null
}
