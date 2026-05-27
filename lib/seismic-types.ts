import { normalizeLonLat } from './seismic-coords'

export type RiskLevel = 'critical' | 'high' | 'medium' | 'low'
export type MapStyle = 'dark' | 'satellite'

export interface MapFilters {
  magnitude: { min: number; max: number }
  depth: { min: number; max: number }
  dateRange: { start: Date; end: Date }
  riskLevel: RiskLevel[]
  sources: string[]
}

export interface SeismicEventUI {
  id: string
  usgsId?: string | null
  emscId?: string | null
  source: string
  latitude: number
  longitude: number
  depth: number
  magnitude: number
  magnitudeType?: string | null
  eventType: string
  eventTime: string
  region?: string | null
  district?: string | null
  tsunami: boolean
  felt: boolean
  reviewed: boolean
  risk: RiskLevel
}

export interface SeismicStats {
  totalEvents: number
  avgMagnitude: number
  highestMagnitude: number
  eventsLast24h: number
  eventsLast7d: number
  riskDistribution: Record<RiskLevel, number>
  topAffectedAreas: Array<{ area: string; count: number }>
}

export interface LayerVisibility {
  earthquakes: boolean
  faults: boolean
  liquefaction: boolean
  riskZones: boolean
  heatmap: boolean
  clusters: boolean
}

export const DEFAULT_FILTERS: MapFilters = {
  magnitude: { min: 2, max: 10 },
  depth: { min: 0, max: 700 }, // profondeur normalisée (valeur absolue en km)
  dateRange: {
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    end: new Date(),
  },
  riskLevel: ['critical', 'high', 'medium', 'low'],
  sources: ['USGS', 'EMSC'],
}

export const DEFAULT_LAYERS: LayerVisibility = {
  earthquakes: true,
  faults: true,
  liquefaction: true,
  riskZones: false,
  heatmap: false,
  clusters: true,
}

export function magnitudeToRisk(magnitude: number, distanceKm = 0): RiskLevel {
  if (magnitude >= 6.5 || (magnitude >= 5.5 && distanceKm < 100)) return 'critical'
  if (magnitude >= 5.5 || (magnitude >= 4.5 && distanceKm < 150)) return 'high'
  if (magnitude >= 4.5) return 'medium'
  return 'low'
}

export function riskColor(risk: RiskLevel): string {
  switch (risk) {
    case 'critical':
      return '#ff3333'
    case 'high':
      return '#ff6b6b'
    case 'medium':
      return '#ffb700'
    default:
      return '#00f2ff'
  }
}

export function dbEventToUI(
  event: {
    id: string
    usgsId?: string | null
    emscId?: string | null
    source: string
    latitude: number
    longitude: number
    depth: number
    magnitude: number
    magnitudeType?: string | null
    eventType: string
    eventTime: Date
    region?: string | null
    district?: string | null
    tsunami: boolean
    felt: boolean
    reviewed: boolean
  },
  haitiCenter = { lat: 18.97, lon: -72.29 }
): SeismicEventUI {
  const distance = haversineKm(event.latitude, event.longitude, haitiCenter.lat, haitiCenter.lon)
  const { latitude, longitude } = normalizeLonLat(event.longitude, event.latitude)
  return {
    ...event,
    latitude,
    longitude,
    depth: Math.abs(Number(event.depth) || 0),
    region: event.region ?? '',
    district: event.district ?? '',
    eventTime: event.eventTime.toISOString(),
    risk: magnitudeToRisk(event.magnitude, distance),
  }
}

function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}
