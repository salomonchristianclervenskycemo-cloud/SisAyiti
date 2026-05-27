/**
 * Noms de lieux lisibles pour Haïti / Hispaniola (communes + libellés USGS).
 */

const HAITI_COMMUNES: Array<{ name: string; lat: number; lon: number; dept?: string }> = [
  { name: 'Port-au-Prince', lat: 18.5392, lon: -72.335, dept: 'Ouest' },
  { name: 'Léogâne', lat: 18.5108, lon: -72.6334, dept: 'Ouest' },
  { name: 'Carrefour', lat: 18.5344, lon: -72.4092, dept: 'Ouest' },
  { name: 'Gressier', lat: 18.5409, lon: -72.5269, dept: 'Ouest' },
  { name: 'Jacmel', lat: 18.2343, lon: -72.5354, dept: 'Sud-Est' },
  { name: 'Les Cayes', lat: 18.1933, lon: -73.746, dept: 'Sud' },
  { name: 'Jérémie', lat: 18.6525, lon: -74.1187, dept: 'Grand\'Anse' },
  { name: 'Cap-Haïtien', lat: 19.7596, lon: -72.2042, dept: 'Nord' },
  { name: 'Gonaïves', lat: 19.4515, lon: -72.689, dept: 'Artibonite' },
  { name: 'Hinche', lat: 19.15, lon: -72.0167, dept: 'Centre' },
  { name: 'Fort-Liberté', lat: 19.662, lon: -71.8382, dept: 'Nord-Est' },
  { name: 'Port-de-Paix', lat: 19.9386, lon: -72.8309, dept: 'Nord-Ouest' },
  { name: 'Mirebalais', lat: 18.8355, lon: -72.1046, dept: 'Centre' },
  { name: 'Saint-Marc', lat: 19.1082, lon: -72.6938, dept: 'Artibonite' },
  { name: 'Baradères', lat: 18.4825, lon: -73.6388, dept: 'Nippes' },
  { name: 'Petit-Goâve', lat: 18.4313, lon: -72.8663, dept: 'Ouest' },
  { name: 'Grand-Goâve', lat: 18.4289, lon: -72.7699, dept: 'Ouest' },
  { name: 'Aquin', lat: 18.283, lon: -73.393, dept: 'Sud' },
  { name: 'Miragoâne', lat: 18.442, lon: -73.088, dept: 'Nippes' },
]

function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

function nearestCommune(lat: number, lon: number) {
  let best = HAITI_COMMUNES[0]
  let d = Infinity
  for (const c of HAITI_COMMUNES) {
    const dist = haversineKm(lat, lon, c.lat, c.lon)
    if (dist < d) {
      d = dist
      best = c
    }
  }
  return { ...best, distanceKm: d }
}

/** Nettoie les libellés EMSC génériques */
function isGenericRegion(region: string | null | undefined): boolean {
  if (!region) return true
  const u = region.toUpperCase().trim()
  return (
    u === 'HAITI REGION' ||
    u === 'HAITI' ||
    u.includes('HAITI REGION') ||
    u === 'DOMINICAN REPUBLIC REGION' ||
    u === 'CUBA REGION' ||
    u.length < 4
  )
}

/** Extrait un lieu lisible depuis le champ USGS `place` */
function parseUsgsPlace(place: string): string | null {
  const m = place.match(/^\d+\s*km\s+\w+\s+of\s+(.+)$/i)
  if (m) return m[1].trim()
  if (place.includes('Haiti') || place.includes('Haïti')) return place
  return place
}

/**
 * Libellé affiché sur la carte et dans les popups.
 */
export function resolvePlaceLabel(
  latitude: number,
  longitude: number,
  rawRegion?: string | null
): string {
  if (rawRegion && !isGenericRegion(rawRegion)) {
    const parsed = parseUsgsPlace(rawRegion)
    if (parsed && !isGenericRegion(parsed)) return parsed
  }

  const near = nearestCommune(latitude, longitude)
  if (near.distanceKm <= 55) {
    return `${near.name}, ${near.dept ?? 'Haïti'}`
  }
  if (near.distanceKm <= 120) {
    return `Proximité de ${near.name} (${Math.round(near.distanceKm)} km)`
  }

  if (latitude >= 17.5 && latitude <= 20.5 && longitude >= -74.5 && longitude <= -71.5) {
    return `Territoire haïtien (${latitude.toFixed(2)}°N)`
  }

  return rawRegion && !isGenericRegion(rawRegion) ? rawRegion : 'Région Hispaniola'
}

export function inferDepartment(lat: number, lon: number): string | null {
  const near = nearestCommune(lat, lon)
  return near.distanceKm <= 80 ? near.dept ?? null : null
}

export function formatEventDateHaiti(iso: string): string {
  try {
    return new Date(iso).toLocaleString('fr-HT', {
      timeZone: 'America/Port-au-Prince',
      weekday: 'short',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return iso
  }
}
