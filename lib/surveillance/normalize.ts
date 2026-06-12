import type { SeismicDataSource, SurveillanceSeismicEvent, ValidationStatus } from './types'

const NA_STRINGS = new Set(['n/a', 'na', 'null', 'undefined', '—', '-'])

export function sanitizeNumber(
  value: unknown,
  fallback: number,
  min = -Infinity,
  max = Infinity
): number {
  const n = typeof value === 'number' ? value : Number(value)
  if (!Number.isFinite(n)) return fallback
  return Math.min(max, Math.max(min, n))
}

export function sanitizeString(value: unknown, fallback: string | null = null): string | null {
  if (value == null) return fallback
  const s = String(value).trim()
  if (!s || NA_STRINGS.has(s.toLowerCase())) return fallback
  return s
}

export function sanitizeMagnitude(value: unknown): number {
  return sanitizeNumber(value, 0, 0, 10)
}

export function sanitizeDepthKm(value: unknown): number {
  return sanitizeNumber(value, 0, 0, 700)
}

export function sanitizeCoordinates(lat: unknown, lon: unknown): { latitude: number; longitude: number } | null {
  const latitude = sanitizeNumber(lat, NaN, -90, 90)
  const longitude = sanitizeNumber(lon, NaN, -180, 180)
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return null
  return { latitude, longitude }
}

export function mapUsgsValidationStatus(status: string | undefined, reviewed?: boolean): ValidationStatus {
  const s = (status ?? '').toLowerCase()
  if (reviewed || s === 'reviewed') return 'confirmé'
  if (s === 'automatic') return 'automatique'
  if (s === 'updated') return 'révisé'
  return 'provisoire'
}

export function mapEmscValidationStatus(auth?: string): ValidationStatus {
  const a = (auth ?? '').toLowerCase()
  if (a.includes('manual') || a.includes('review')) return 'révisé'
  if (a.includes('aut')) return 'automatique'
  return 'provisoire'
}

/** Supprime les champs invalides sans faire échouer le pipeline */
export function validateSurveillanceEvent(
  raw: Partial<SurveillanceSeismicEvent>
): SurveillanceSeismicEvent | null {
  const coords = sanitizeCoordinates(raw.latitude, raw.longitude)
  if (!coords) return null

  const magnitude = sanitizeMagnitude(raw.magnitude)
  if (magnitude <= 0) return null

  const datetime_utc = sanitizeString(raw.datetime_utc)
  if (!datetime_utc) return null

  const id = sanitizeString(raw.id) ?? sanitizeString(raw.event_id)
  if (!id) return null

  const source = raw.source as SeismicDataSource
  if (source !== 'USGS' && source !== 'EMSC' && source !== 'local') return null

  return {
    id,
    event_id: sanitizeString(raw.event_id) ?? id,
    datetime_utc,
    datetime_local: sanitizeString(raw.datetime_local) ?? datetime_utc,
    latitude: coords.latitude,
    longitude: coords.longitude,
    depth_km: sanitizeDepthKm(raw.depth_km),
    magnitude,
    magnitude_type: sanitizeString(raw.magnitude_type),
    source,
    validation_status: raw.validation_status ?? 'provisoire',
    last_updated: sanitizeString(raw.last_updated) ?? datetime_utc,
    official_link: sanitizeString(raw.official_link),
    region: sanitizeString(raw.region),
    tsunami: Boolean(raw.tsunami),
    felt: Boolean(raw.felt),
    is_haiti_region: Boolean(raw.is_haiti_region),
    merged_sources: raw.merged_sources?.length ? raw.merged_sources : [source],
    usgs_id: sanitizeString(raw.usgs_id),
    emsc_id: sanitizeString(raw.emsc_id),
  }
}
