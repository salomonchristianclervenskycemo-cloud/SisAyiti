import axios from 'axios'
import { parseGeoJsonCoordinates, isInHispaniolaRegion } from '@/lib/seismic-coords'
import type { USGSFeature } from '@/lib/seismic-service'
import { toHaitiLocalIso, toUtcIso, parseEventTime } from '../datetime'
import {
  mapUsgsValidationStatus,
  sanitizeString,
  validateSurveillanceEvent,
} from '../normalize'
import type { SourceFetchReport, SurveillanceSeismicEvent } from '../types'

const SUMMARY_BASE = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary'
const FDSN_URL = 'https://earthquake.usgs.gov/fdsnws/event/1/query'

function summaryEndpoint(days: number): string {
  if (days <= 1) return `${SUMMARY_BASE}/all_hour.geojson`
  if (days <= 7) return `${SUMMARY_BASE}/all_week.geojson`
  return `${SUMMARY_BASE}/all_month.geojson`
}

function mapUsgsFeature(feature: USGSFeature): SurveillanceSeismicEvent | null {
  const coords = parseGeoJsonCoordinates(feature.geometry.coordinates)
  const eventDate = parseEventTime(feature.properties.time)
  if (!eventDate) return null

  const updatedDate = parseEventTime(feature.properties.updated) ?? eventDate
  const reviewed = feature.properties.status === 'reviewed'
  const isHaiti = isInHispaniolaRegion(coords.latitude, coords.longitude)

  return validateSurveillanceEvent({
    id: `usgs-${feature.id}`,
    event_id: feature.id,
    datetime_utc: toUtcIso(eventDate),
    datetime_local: toHaitiLocalIso(eventDate),
    latitude: coords.latitude,
    longitude: coords.longitude,
    depth_km: coords.depthKm,
    magnitude: feature.properties.mag,
    magnitude_type: sanitizeString(feature.properties.magType),
    source: 'USGS',
    validation_status: mapUsgsValidationStatus(feature.properties.status, reviewed),
    last_updated: toUtcIso(updatedDate),
    official_link:
      sanitizeString(feature.properties.url) ??
      `https://earthquake.usgs.gov/earthquakes/eventpage/${feature.id}`,
    region: sanitizeString(feature.properties.place),
    tsunami: feature.properties.tsunami === 1,
    felt: feature.properties.felt != null && feature.properties.felt > 0,
    is_haiti_region: isHaiti,
    merged_sources: ['USGS'],
    usgs_id: feature.id,
    emsc_id: null,
  })
}

function errorReport(started: number, err: unknown): SourceFetchReport {
  const msg = err instanceof Error ? err.message : 'USGS fetch failed'
  const isTimeout = msg.toLowerCase().includes('timeout')
  return {
    source: 'USGS',
    state: isTimeout ? 'timeout' : 'error',
    count: 0,
    latency_ms: Date.now() - started,
    error_message: msg,
  }
}

export async function fetchUsgsGlobal(
  days: number,
  minMagnitude: number,
  timeoutMs: number
): Promise<{ events: SurveillanceSeismicEvent[]; report: SourceFetchReport }> {
  const started = Date.now()
  try {
    const response = await axios.get<{ features: USGSFeature[] }>(summaryEndpoint(days), {
      timeout: timeoutMs,
    })
    const mapped: SurveillanceSeismicEvent[] = []
    for (const f of response.data.features) {
      if ((f.properties.mag ?? 0) < minMagnitude) continue
      const ev = mapUsgsFeature(f)
      if (ev) mapped.push(ev)
    }
    return {
      events: mapped,
      report: {
        source: 'USGS',
        state: 'ok',
        count: mapped.length,
        latency_ms: Date.now() - started,
        error_message: null,
      },
    }
  } catch (err) {
    return { events: [], report: errorReport(started, err) }
  }
}

export async function fetchUsgsHaitiBBox(
  bbox: [number, number, number, number],
  days: number,
  minMagnitude: number,
  timeoutMs: number
): Promise<{ events: SurveillanceSeismicEvent[]; report: SourceFetchReport }> {
  const started = Date.now()
  const [minLon, minLat, maxLon, maxLat] = bbox
  try {
    const startTime = new Date(Date.now() - days * 24 * 60 * 60 * 1000)
    const response = await axios.get<{ features: USGSFeature[] }>(FDSN_URL, {
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
      timeout: timeoutMs,
    })
    const mapped: SurveillanceSeismicEvent[] = []
    for (const f of response.data.features) {
      if ((f.properties.mag ?? 0) < minMagnitude) continue
      const ev = mapUsgsFeature(f)
      if (ev?.is_haiti_region) mapped.push(ev)
    }
    return {
      events: mapped,
      report: {
        source: 'USGS',
        state: 'ok',
        count: mapped.length,
        latency_ms: Date.now() - started,
        error_message: null,
      },
    }
  } catch (err) {
    return { events: [], report: errorReport(started, err) }
  }
}
