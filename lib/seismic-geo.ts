import { RISK_COLORS } from './seismic-map-style'

/** Port-au-Prince — référence pour distance affichée */
export const HAITI_REFERENCE = { lat: 18.5392, lng: -72.335, label: 'Port-au-Prince' }

export const HAITI_MAX_BOUNDS: [[number, number], [number, number]] = [
  [-76.0, 17.2],
  [-68.5, 20.8],
]

/** Profondeur fiable en km (EMSC peut renvoyer des valeurs négatives) */
export function normalizeDepthKm(depth: number | null | undefined): number {
  const d = Number(depth)
  if (!Number.isFinite(d)) return 0
  return Math.abs(d)
}

export function depthToColor(depthKm: number): string {
  const d = normalizeDepthKm(depthKm)
  if (d < 30) return RISK_COLORS.critical
  if (d < 70) return RISK_COLORS.high
  if (d < 150) return RISK_COLORS.medium
  return RISK_COLORS.low
}

export function formatCoordinates(lat: number, lng: number): string {
  const latHem = lat >= 0 ? 'N' : 'S'
  const lngHem = lng >= 0 ? 'E' : 'W'
  return `${Math.abs(lat).toFixed(4)}°${latHem}, ${Math.abs(lng).toFixed(4)}°${lngHem}`
}

export function formatCoordinatesDMS(lat: number, lng: number): string {
  return `${toDMS(lat, 'lat')}, ${toDMS(lng, 'lng')}`
}

function toDMS(value: number, axis: 'lat' | 'lng'): string {
  const abs = Math.abs(value)
  const d = Math.floor(abs)
  const minTotal = (abs - d) * 60
  const m = Math.floor(minTotal)
  const s = Math.round((minTotal - m) * 60)
  const hemi =
    axis === 'lat' ? (value >= 0 ? 'N' : 'S') : value >= 0 ? 'E' : 'W'
  return `${d}°${m}'${s}"${hemi}`
}

/** Haversine distance in km */
export function distanceKm(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

export function isInHaitiBounds(lat: number, lng: number): boolean {
  return lat >= 17.5 && lat <= 20.5 && lng >= -74.5 && lng <= -71.5
}
