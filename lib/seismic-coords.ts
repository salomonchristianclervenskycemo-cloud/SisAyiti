/**
 * Normalisation des coordonnées sismiques (GeoJSON = [longitude, latitude, depth]).
 * Références : USGS FDSN (https://earthquake.usgs.gov/fdsnws/event/1/), GeoJSON RFC 7946.
 */

/** Hispaniola + zone côtière (Haïti, RD, Cuba orientale, Jamaïque nord) */
export const HISPANIOLA_BBOX = {
  minLat: 17.0,
  maxLat: 21.0,
  minLon: -75.0,
  maxLon: -68.0,
} as const

export type LonLat = { longitude: number; latitude: number }

/** Détecte un éventuel inversion lat/lon pour la zone Caraïbes */
export function normalizeLonLat(longitude: number, latitude: number): LonLat {
  const inLatRange = (v: number) => v >= HISPANIOLA_BBOX.minLat && v <= HISPANIOLA_BBOX.maxLat
  const inLonRange = (v: number) => v >= HISPANIOLA_BBOX.minLon && v <= HISPANIOLA_BBOX.maxLon

  // Cas classique d'inversion : [lat, lon] stocké comme lon/lat
  if (inLatRange(longitude) && inLonRange(latitude)) {
    return { latitude: longitude, longitude: latitude }
  }

  if (inLatRange(latitude) && inLonRange(longitude)) {
    return { latitude, longitude }
  }

  // Hors zone : garder l'ordre GeoJSON standard si lon ∈ [-180,180]
  if (Math.abs(longitude) <= 180 && Math.abs(latitude) <= 90) {
    return { latitude, longitude }
  }

  if (Math.abs(latitude) <= 180 && Math.abs(longitude) <= 90) {
    return { latitude: longitude, longitude: latitude }
  }

  return { latitude, longitude }
}

export function parseGeoJsonCoordinates(
  coordinates: [number, number] | [number, number, number]
): LonLat & { depthKm: number } {
  const [a, b, depthRaw] = coordinates
  const depthKm = Math.abs(Number(depthRaw ?? 0) || 0)
  const { latitude, longitude } = normalizeLonLat(a, b)
  return { latitude, longitude, depthKm }
}

export function isInHispaniolaRegion(lat: number, lon: number): boolean {
  return (
    lat >= HISPANIOLA_BBOX.minLat &&
    lat <= HISPANIOLA_BBOX.maxLat &&
    lon >= HISPANIOLA_BBOX.minLon &&
    lon <= HISPANIOLA_BBOX.maxLon
  )
}
