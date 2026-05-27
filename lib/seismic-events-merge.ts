import { getHistoricalEventsForPeriod } from './haiti-historical-seismic'
import { enrichSeismicEvents } from './seismic-event-enrich'
import type { SeismicEventUI } from './seismic-types'

/** Fusionne toujours les séismes historiques majeurs (catalogue Haïti). */
export function mergeWithHistoricalEvents(events: SeismicEventUI[]): SeismicEventUI[] {
  const historical = getHistoricalEventsForPeriod()
  const byId = new Map<string, SeismicEventUI>()
  for (const ev of enrichSeismicEvents([...events, ...historical])) {
    byId.set(ev.id, ev)
  }
  return Array.from(byId.values())
}
