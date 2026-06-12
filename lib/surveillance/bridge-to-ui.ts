import { magnitudeToRisk, type SeismicEventUI } from '@/lib/seismic-types'
import type { SurveillanceSeismicEvent } from './types'

/** Pont vers le store carte / legacy `SeismicEventUI` */
export function surveillanceEventToUI(e: SurveillanceSeismicEvent): SeismicEventUI {
  return {
    id: e.id,
    usgsId: e.usgs_id,
    emscId: e.emsc_id,
    source: e.merged_sources[0] ?? e.source,
    latitude: e.latitude,
    longitude: e.longitude,
    depth: e.depth_km,
    magnitude: e.magnitude,
    magnitudeType: e.magnitude_type,
    eventType: 'earthquake',
    eventTime: e.datetime_utc,
    region: e.region,
    district: e.is_haiti_region ? 'Haïti / Hispaniola' : e.region,
    tsunami: e.tsunami,
    felt: e.felt,
    reviewed: e.validation_status === 'confirmé' || e.validation_status === 'révisé',
    risk: magnitudeToRisk(e.magnitude, e.is_haiti_region ? 80 : 500),
  }
}

export function surveillanceEventsToUI(events: SurveillanceSeismicEvent[]): SeismicEventUI[] {
  return events.map(surveillanceEventToUI)
}
