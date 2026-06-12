import type maplibregl from 'maplibre-gl'
import { HAITI_MAX_BOUNDS } from '@/lib/seismic-geo'
import { isInHaitiMapRegion } from '@/lib/seismic-haiti-filter'
import { HAITI_BOUNDS_FIT } from '@/lib/seismic-map-style'
import { setSeismicMapViewportExpanded, useSeismicStore } from '@/lib/seismic-store'
import type { SeismicEventUI } from '@/lib/seismic-types'

/** Contexte régional autour d’un séisme hors Haïti (degrés) */
export const FOCUS_REGION_PAD_DEG = 8

export function isEventOutsideHaitiMap(event: Pick<SeismicEventUI, 'latitude' | 'longitude'>): boolean {
  return !isInHaitiMapRegion(event.latitude, event.longitude)
}

export function boundsAroundEvent(
  lat: number,
  lng: number,
  padDeg = FOCUS_REGION_PAD_DEG
): [[number, number], [number, number]] {
  return [
    [lng - padDeg, lat - padDeg],
    [lng + padDeg, lat + padDeg],
  ]
}

export function filterEventsNearFocus(
  events: SeismicEventUI[],
  focus: SeismicEventUI,
  padDeg = FOCUS_REGION_PAD_DEG
): SeismicEventUI[] {
  const minLat = focus.latitude - padDeg
  const maxLat = focus.latitude + padDeg
  const minLng = focus.longitude - padDeg
  const maxLng = focus.longitude + padDeg
  return events.filter(
    (e) =>
      e.id === focus.id ||
      (e.latitude >= minLat &&
        e.latitude <= maxLat &&
        e.longitude >= minLng &&
        e.longitude <= maxLng)
  )
}

export function focusZoomForEvent(
  event: Pick<SeismicEventUI, 'latitude' | 'longitude' | 'magnitude'>,
  outsideHaiti: boolean
): number {
  if (!outsideHaiti) return Math.max(9.5, 10)
  if (event.magnitude >= 6.5) return 5.5
  if (event.magnitude >= 5) return 6
  return 6.5
}

export { HAITI_MAX_BOUNDS }

/** Réinitialise la vue Carte sur Haïti (bouton centrer / fin du mode global) */
export function resetMapToHaitiView(
  map: maplibregl.Map,
  options?: { onAfterReset?: () => void }
): void {
  setSeismicMapViewportExpanded(false)
  const store = useSeismicStore.getState()
  if (typeof store.setDataHydration === 'function') {
    store.setDataHydration(null)
  } else {
    useSeismicStore.setState({ dataHydration: null })
  }
  try {
    map.setMaxBounds(HAITI_MAX_BOUNDS)
    map.fitBounds(HAITI_BOUNDS_FIT, { padding: 48, duration: 900 })
  } catch {
    /* carte démontée */
  }
  options?.onAfterReset?.()
}
