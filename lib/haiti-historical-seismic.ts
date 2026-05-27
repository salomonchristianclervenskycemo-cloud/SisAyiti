import type { SeismicEventUI } from './seismic-types'

/**
 * Séismes majeurs Haïti — toujours visibles sur la carte (coords USGS / EERI).
 * Réf. : USGS 2010rja6, USGS 2021 Haiti, séismes historiques documentés.
 */
export const HAITI_HISTORICAL_EVENTS: SeismicEventUI[] = [
  {
    id: 'historical-2010-01-12',
    source: 'USGS',
    usgsId: 'us2010rja6',
    latitude: 18.457,
    longitude: -72.533,
    depth: 13,
    magnitude: 7.0,
    magnitudeType: 'Mw',
    eventType: 'earthquake',
    eventTime: '2010-01-12T21:53:10.000Z',
    region: 'Léogâne — Grand séisme du 12 janvier 2010',
    district: 'Ouest',
    tsunami: true,
    felt: true,
    reviewed: true,
    risk: 'critical',
  },
  {
    id: 'historical-2021-08-14',
    source: 'USGS',
    usgsId: 'us7000f7y8',
    latitude: 18.352,
    longitude: -73.4801,
    depth: 10,
    magnitude: 7.2,
    magnitudeType: 'Mw',
    eventType: 'earthquake',
    eventTime: '2021-08-14T12:29:09.000Z',
    region: 'Les Cayes — Nippes (séisme du 14 août 2021)',
    district: 'Sud',
    tsunami: false,
    felt: true,
    reviewed: true,
    risk: 'critical',
  },
  {
    id: 'historical-1842-05-07',
    source: 'USGS',
    latitude: 19.76,
    longitude: -72.2,
    depth: 15,
    magnitude: 8.1,
    magnitudeType: 'Ms',
    eventType: 'earthquake',
    eventTime: '1842-05-07T17:00:00.000Z',
    region: 'Cap-Haïtien — Séisme de 1842 (faille septentrionale)',
    district: 'Nord',
    tsunami: true,
    felt: true,
    reviewed: true,
    risk: 'critical',
  },
  {
    id: 'historical-1751-10-18',
    source: 'USGS',
    latitude: 18.55,
    longitude: -72.35,
    depth: 10,
    magnitude: 7.5,
    eventType: 'earthquake',
    eventTime: '1751-10-18T12:00:00.000Z',
    region: 'Port-au-Prince — Séisme historique de 1751',
    district: 'Ouest',
    tsunami: false,
    felt: true,
    reviewed: false,
    risk: 'critical',
  },
  {
    id: 'historical-1770-06-03',
    source: 'USGS',
    latitude: 18.55,
    longitude: -72.35,
    depth: 12,
    magnitude: 7.5,
    eventType: 'earthquake',
    eventTime: '1770-06-03T00:00:00.000Z',
    region: 'Port-au-Prince — Séisme de 1770',
    district: 'Ouest',
    tsunami: false,
    felt: true,
    reviewed: false,
    risk: 'critical',
  },
]

/** Toujours injecter les séismes majeurs (indépendant de la période filtre) */
export function getHistoricalEventsForPeriod(_days?: number): SeismicEventUI[] {
  return HAITI_HISTORICAL_EVENTS
}

export function isPinnedHistoricalEvent(id: string): boolean {
  return id.startsWith('historical-')
}
