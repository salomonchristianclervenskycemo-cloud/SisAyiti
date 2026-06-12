import { HISPANIOLA_BBOX } from '@/lib/seismic-coords'
import { isInHaitiBounds } from '@/lib/seismic-geo'
import { isPinnedHistoricalEvent } from '@/lib/haiti-historical-seismic'
import type { SeismicEventUI } from '@/lib/seismic-types'

/** Zone carte Haïti / Hispaniola (légèrement plus large que isInHaitiBounds strict) */
export function isInHaitiMapRegion(lat: number, lng: number): boolean {
  if (isInHaitiBounds(lat, lng)) return true
  return (
    lat >= HISPANIOLA_BBOX.minLat &&
    lat <= HISPANIOLA_BBOX.maxLat &&
    lng >= HISPANIOLA_BBOX.minLon &&
    lng <= HISPANIOLA_BBOX.maxLon
  )
}

export function isHaitiTaggedEvent(e: SeismicEventUI): boolean {
  const region = `${e.region ?? ''} ${e.district ?? ''}`.toLowerCase()
  return (
    region.includes('haiti') ||
    region.includes('haïti') ||
    region.includes('hispaniola') ||
    region.includes('ayiti')
  )
}

/** Événements pertinents pour la carte nationale (Haïti + historiques épinglés) */
export function filterEventsForHaitiMap(events: SeismicEventUI[]): SeismicEventUI[] {
  return events.filter(
    (e) =>
      isPinnedHistoricalEvent(e.id) ||
      isInHaitiMapRegion(e.latitude, e.longitude) ||
      isHaitiTaggedEvent(e)
  )
}
