import {
  depthToColor,
  distanceKm,
  formatCoordinates,
  HAITI_REFERENCE,
  isInHaitiBounds,
  normalizeDepthKm,
} from './seismic-geo'
import { formatEventDateHaiti } from './haiti-region-resolver'
import type { Lang } from '@/shared/i18n'
import { readStoredLang } from '@/shared/i18n'
import { mapPopupT, toMapLocale } from './translations/map'

export type EarthquakePopupData = {
  magnitude: number
  depthKm: number
  color: string
  region: string
  timeStr: string
  coords: string
  distKm: number
  source: string
  inZone: boolean
  historical: boolean
  labels: (typeof mapPopupT)['fr']
}

export function buildEarthquakePopupData(props: {
  magnitude: number
  depth: number
  region: string
  source: string
  eventTime: string
  latitude: number
  longitude: number
  historical?: boolean
  lang?: Lang
}): EarthquakePopupData {
  const lang = props.lang ?? readStoredLang() ?? 'fr'
  const labels = mapPopupT[toMapLocale(lang)]
  const depthKm = normalizeDepthKm(props.depth)
  const color = depthToColor(depthKm)

  return {
    magnitude: props.magnitude,
    depthKm,
    color,
    region: props.region || labels.fallback,
    timeStr: formatEventDateHaiti(props.eventTime),
    coords: formatCoordinates(props.latitude, props.longitude),
    distKm: distanceKm(props.latitude, props.longitude, HAITI_REFERENCE.lat, HAITI_REFERENCE.lng),
    source: props.source,
    inZone: isInHaitiBounds(props.latitude, props.longitude),
    historical: props.historical === true,
    labels,
  }
}
