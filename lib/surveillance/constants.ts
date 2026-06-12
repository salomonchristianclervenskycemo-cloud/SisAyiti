import { HISPANIOLA_BBOX } from '@/lib/seismic-coords'

/** BBOX stricte Haïti / Hispaniola — priorisation alertes locales */
export const HAITI_SURVEILLANCE_BBOX: [number, number, number, number] = [
  HISPANIOLA_BBOX.minLon,
  HISPANIOLA_BBOX.minLat,
  HISPANIOLA_BBOX.maxLon,
  HISPANIOLA_BBOX.maxLat,
]

/** Tolérance déduplication (spécification produit) */
export const DEDUP_TIME_TOLERANCE_MS = 60_000
export const DEDUP_COORD_TOLERANCE_DEG = 0.5

export const HAITI_IANA_TIMEZONE = 'America/Port-au-Prince'

export const DEFAULT_AGGREGATION_OPTIONS = {
  days: 7,
  min_magnitude: 2.0,
  include_global: true,
  source_timeout_ms: 12_000,
} as const

/** Période par défaut du module Actualités (évite fetchDays=30 de la carte) */
export const SURVEILLANCE_DASHBOARD_DAYS = 7

/** Fiche événement EMSC (ancien `/event/details?id=` → 404) */
export const EMSC_EVENT_DETAILS_BASE = 'https://www.seismicportal.eu/eventdetails.html'
/** @deprecated Utiliser EMSC_EVENT_DETAILS_BASE */
export const EMSC_PORTAL_EVENT_BASE = EMSC_EVENT_DETAILS_BASE
export const USGS_EVENT_PAGE_BASE = 'https://earthquake.usgs.gov/earthquakes/eventpage'
