import type { SeismicEventUI } from '@/lib/seismic-types'

/** Limite de points MapLibre (perf navigateur) */
export const MAPLIBRE_EVENT_CAP = 400

export function capEventsForMap(events: SeismicEventUI[], limit = MAPLIBRE_EVENT_CAP): SeismicEventUI[] {
  if (events.length <= limit) return events
  return [...events].sort((a, b) => b.magnitude - a.magnitude).slice(0, limit)
}
