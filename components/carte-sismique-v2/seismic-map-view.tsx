'use client'

import type { SeismicMapViewProps } from './seismic-map-view.types'
import { MapContainer } from './map-container'

/** Web implementation of SeismicMapView (MapLibre). */
export function SeismicMapView(_props: SeismicMapViewProps) {
  return <MapContainer />
}

export type { SeismicMapViewProps } from './seismic-map-view.types'
