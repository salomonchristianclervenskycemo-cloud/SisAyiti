/**
 * Seismic Data Service
 * Integrates USGS and EMSC real-time seismic data
 */

import axios from 'axios'
import { parseGeoJsonCoordinates, isInHispaniolaRegion } from './seismic-coords'

// ============================================
// Type Definitions
// ============================================

export interface USGSFeature {
  properties: {
    mag: number
    place: string
    time: number
    updated: number
    url: string
    detail: string
    felt?: number
    cdi?: number
    mmi?: number
    alert?: string
    status: string
    tsunami: number
    sig: number
    net: string
    code: string
    ids: string
    sources: string
    types: string
    nst?: number
    dmin?: number
    rms?: number
    gap?: number
    magType: string
    type: string
    title: string
  }
  geometry: {
    type: 'Point'
    coordinates: [number, number, number] // [lon, lat, depth]
  }
  id: string
}

export interface EMSCGeoFeature {
  id?: string
  properties: {
    unid?: string
    source_id?: string
    mag?: number
    depth?: number
    time?: string
    flynn_region?: string
    auth?: string
  }
  geometry: {
    type: 'Point'
    coordinates: [number, number, number]
  }
}

export interface SeismicEventData {
  usgsId?: string
  emscId?: string
  source: 'USGS' | 'EMSC'
  latitude: number
  longitude: number
  depth: number
  magnitude: number
  magnitudeType?: string
  eventType: string
  eventTime: Date
  region?: string
  tsunami?: boolean
  felt?: boolean
  reviewed?: boolean
}

// ============================================
// USGS Client
// ============================================

export class USGSClient {
  private baseUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary'
  private fdsnUrl = 'https://earthquake.usgs.gov/fdsnws/event/1/query'
  private timeout = 10000

  /**
   * Fetch earthquakes from USGS in the last N days
   * @param days Number of days to lookback (1-30)
   * @param minMagnitude Minimum magnitude filter
   * @returns Array of seismic events
   */
  async fetchEarthquakes(days: number = 7, minMagnitude: number = 2.5) {
    try {
      const endpoint = this.getEndpoint(days)
      const response = await axios.get<{ features: USGSFeature[] }>(endpoint, {
        timeout: this.timeout,
      })

      return response.data.features
        .filter((f) => f.properties.mag >= minMagnitude)
        .map((feature) => this.transformUSGSFeature(feature))
    } catch (error) {
      console.error('USGS API Error:', error)
      return []
    }
  }

  /**
   * Fetch real-time earthquakes (last hour)
   */
  async fetchRecentEarthquakes(minMagnitude: number = 2.5) {
    return this.fetchEarthquakes(1, minMagnitude)
  }

  /**
   * Fetch earthquakes in a specific bounding box
   * @param bbox [minLon, minLat, maxLon, maxLat]
   */
  async fetchByBoundingBox(
    bbox: [number, number, number, number],
    minMagnitude: number = 2.5
  ) {
    try {
      const [minLon, minLat, maxLon, maxLat] = bbox
      const url = `${this.baseUrl}/all_month.geojson?orderby=magnitude`
      const response = await axios.get<{ features: USGSFeature[] }>(url, {
        timeout: this.timeout,
      })

      return response.data.features
        .filter((f) => {
          const [lon, lat] = f.geometry.coordinates
          return (
            lon >= minLon &&
            lon <= maxLon &&
            lat >= minLat &&
            lat <= maxLat &&
            f.properties.mag >= minMagnitude
          )
        })
        .map((feature) => this.transformUSGSFeature(feature))
    } catch (error) {
      console.error('USGS Bounding Box Error:', error)
      return []
    }
  }

  private getEndpoint(days: number): string {
    if (days === 1) return `${this.baseUrl}/all_hour.geojson`
    if (days === 7) return `${this.baseUrl}/all_week.geojson`
    if (days === 30) return `${this.baseUrl}/all_month.geojson`
    return `${this.baseUrl}/all_month.geojson`
  }

  /**
   * Requête FDSN USGS — catalogue officiel, bbox Hispaniola (référence fiable).
   * https://earthquake.usgs.gov/fdsnws/event/1/
   */
  async fetchFDSNByBBox(
    bbox: [number, number, number, number],
    minMagnitude: number,
    days: number
  ): Promise<SeismicEventData[]> {
    try {
      const [minLon, minLat, maxLon, maxLat] = bbox
      const startTime = new Date(Date.now() - days * 24 * 60 * 60 * 1000)
      const response = await axios.get<{ features: USGSFeature[] }>(this.fdsnUrl, {
        params: {
          format: 'geojson',
          starttime: startTime.toISOString().slice(0, 10),
          minlatitude: minLat,
          maxlatitude: maxLat,
          minlongitude: minLon,
          maxlongitude: maxLon,
          minmagnitude: minMagnitude,
          orderby: 'time',
          limit: 1000,
        },
        timeout: 12000,
      })
      return response.data.features
        .filter((f) => (f.properties.mag ?? 0) >= minMagnitude)
        .map((f) => this.transformUSGSFeature(f))
        .filter((e) => isInHispaniolaRegion(e.latitude, e.longitude))
    } catch (error) {
      console.error('USGS FDSN API Error:', error)
      return []
    }
  }

  private transformUSGSFeature(feature: USGSFeature): SeismicEventData {
    const { latitude, longitude, depthKm } = parseGeoJsonCoordinates(feature.geometry.coordinates)
    return {
      usgsId: feature.id,
      source: 'USGS',
      latitude,
      longitude,
      depth: depthKm,
      magnitude: feature.properties.mag,
      magnitudeType: feature.properties.magType,
      eventType: feature.properties.type,
      eventTime: new Date(feature.properties.time),
      region: feature.properties.place,
      tsunami: feature.properties.tsunami === 1,
      felt: feature.properties.felt !== undefined,
      reviewed: feature.properties.status === 'reviewed',
    }
  }
}

// ============================================
// EMSC Client
// ============================================

export class EMSCClient {
  private baseUrl = 'https://www.seismicportal.eu/fdsnws/event/1/query'
  private timeout = 10000

  /**
   * Fetch earthquakes from EMSC
   * @param minMagnitude Minimum magnitude
   * @param minutes Lookback period in minutes
   */
  async fetchEarthquakes(minMagnitude: number = 2.5, minutes: number = 1440) {
    try {
      const startTime = new Date(Date.now() - minutes * 60 * 1000)
      const response = await axios.get<{ features: EMSCGeoFeature[] }>(
        this.baseUrl,
        {
          params: {
            format: 'json',
            starttime: startTime.toISOString(),
            minmagnitude: minMagnitude,
            limit: 1000,
          },
          timeout: this.timeout,
        }
      )

      return response.data.features
        .map((f) => this.transformEMSCFeature(f))
        .filter((e) => e !== null) as SeismicEventData[]
    } catch (error) {
      console.error('EMSC API Error:', error)
      return []
    }
  }

  /**
   * Fetch real-time earthquakes (last hour)
   */
  async fetchRecentEarthquakes(minMagnitude: number = 2.5) {
    return this.fetchEarthquakes(minMagnitude, 60)
  }

  /**
   * Fetch earthquakes in bounding box
   */
  async fetchByBoundingBox(
    bbox: [number, number, number, number],
    minMagnitude: number = 2.5
  ) {
    try {
      const [minLon, minLat, maxLon, maxLat] = bbox
      const startTime = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // 30 days

      const response = await axios.get<{ features: EMSCGeoFeature[] }>(
        this.baseUrl,
        {
          params: {
            format: 'json',
            starttime: startTime.toISOString(),
            minmagnitude: minMagnitude,
            minlatitude: minLat,
            maxlatitude: maxLat,
            minlongitude: minLon,
            maxlongitude: maxLon,
            limit: 1000,
          },
          timeout: this.timeout,
        }
      )

      return response.data.features
        .map((f) => this.transformEMSCFeature(f))
        .filter((e) => e !== null) as SeismicEventData[]
    } catch (error) {
      console.error('EMSC Bounding Box Error:', error)
      return []
    }
  }

  private transformEMSCFeature(feature: EMSCGeoFeature): SeismicEventData | null {
    try {
      const { latitude, longitude, depthKm } = parseGeoJsonCoordinates(feature.geometry.coordinates)
      const p = feature.properties
      const mag = p.mag ?? 0
      if (!mag) return null
      if (!isInHispaniolaRegion(latitude, longitude)) return null
      return {
        emscId: p.unid ?? p.source_id ?? feature.id ?? `${longitude}-${latitude}-${p.time}`,
        source: 'EMSC',
        latitude,
        longitude,
        depth: depthKm || Math.abs(Number(p.depth) || 0),
        magnitude: mag,
        eventType: 'earthquake',
        eventTime: new Date(p.time ?? Date.now()),
        region: p.flynn_region,
      }
    } catch (e) {
      console.error('EMSC transform error:', e)
      return null
    }
  }
}

// ============================================
// Seismic Data Processor
// ============================================

export class SeismicDataProcessor {
  private usgs: USGSClient
  private emsc: EMSCClient

  constructor() {
    this.usgs = new USGSClient()
    this.emsc = new EMSCClient()
  }

  /**
   * Fetch and merge data from both sources
   */
  async fetchCombinedData(minMagnitude: number = 2.5, days: number = 7) {
    const [usgsEvents, emscEvents] = await Promise.all([
      this.usgs.fetchEarthquakes(Math.min(days, 30), minMagnitude),
      this.emsc.fetchEarthquakes(minMagnitude, Math.min(days * 24 * 60, 43200)), // max 30 days
    ])

    // Deduplicate events (same location + time within 5 minutes)
    return this.deduplicateEvents([...usgsEvents, ...emscEvents])
  }

  /**
   * Données Hispaniola — USGS FDSN (prioritaire) + EMSC, déduplication.
   */
  async fetchHaitiData(minMagnitude: number = 2.0, days: number = 30) {
    const haitiBbox: [number, number, number, number] = [-75.0, 17.0, -68.0, 21.0]
    const [usgsEvents, emscEvents] = await Promise.all([
      this.usgs.fetchFDSNByBBox(haitiBbox, minMagnitude, days),
      this.emsc.fetchByBoundingBox(haitiBbox, minMagnitude),
    ])

    return this.deduplicateEvents([...usgsEvents, ...emscEvents])
  }

  /**
   * Classify events by risk level based on proximity to Haiti
   */
  classifyRiskLevel(event: SeismicEventData): string {
    const haitiCenter = { lat: 18.97, lon: -72.29 }
    const distance = this.calculateDistance(
      event.latitude,
      event.longitude,
      haitiCenter.lat,
      haitiCenter.lon
    )

    if (distance < 100 && event.magnitude >= 4.5) return 'CRITICAL'
    if (distance < 200 && event.magnitude >= 5.5) return 'HIGH'
    if (distance < 500 && event.magnitude >= 6.0) return 'MEDIUM'
    return 'LOW'
  }

  /**
   * Deduplicates events from multiple sources
   * Events are considered duplicates if within 5km and 5 minutes
   */
  private deduplicateEvents(events: SeismicEventData[]): SeismicEventData[] {
    const seen = new Set<string>()
    const deduplicated: SeismicEventData[] = []

    const sorted = [...events].sort((a, b) => {
      if (b.magnitude !== a.magnitude) return b.magnitude - a.magnitude
      if (a.source === 'USGS' && b.source !== 'USGS') return -1
      if (b.source === 'USGS' && a.source !== 'USGS') return 1
      return b.eventTime.getTime() - a.eventTime.getTime()
    })

    for (const event of sorted) {
      const key = this.getEventKey(event)

      let isDuplicate = false
      for (const existingKey of seen) {
        if (this.eventsMatch(key, existingKey)) {
          isDuplicate = true
          break
        }
      }

      if (!isDuplicate) {
        seen.add(key)
        deduplicated.push(event)
      }
    }

    return deduplicated
  }

  private getEventKey(event: SeismicEventData): string {
    const timeKey = Math.floor(event.eventTime.getTime() / (5 * 60 * 1000)) // 5 min buckets
    const latKey = Math.floor(event.latitude * 100)
    const lonKey = Math.floor(event.longitude * 100)
    return `${timeKey}-${latKey}-${lonKey}`
  }

  private eventsMatch(key1: string, key2: string): boolean {
    return key1 === key2
  }

  private calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const R = 6371 // Earth's radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLon = ((lon2 - lon1) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }
}

// Export instances for direct use
export const usgsClient = new USGSClient()
export const emscClient = new EMSCClient()
export const seismicProcessor = new SeismicDataProcessor()
