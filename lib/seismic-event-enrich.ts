import { inferDepartment, resolvePlaceLabel } from './haiti-region-resolver'
import { isPinnedHistoricalEvent } from './haiti-historical-seismic'
import type { SeismicEventUI } from './seismic-types'

export function enrichSeismicEvent(event: SeismicEventUI): SeismicEventUI {
  const region = isPinnedHistoricalEvent(event.id)
    ? event.region ?? resolvePlaceLabel(event.latitude, event.longitude, event.region)
    : resolvePlaceLabel(event.latitude, event.longitude, event.region)

  return {
    ...event,
    region,
    district: event.district ?? inferDepartment(event.latitude, event.longitude),
  }
}

export function enrichSeismicEvents(events: SeismicEventUI[]): SeismicEventUI[] {
  return events.map(enrichSeismicEvent)
}
