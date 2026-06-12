import axios from 'axios'
import { parseGeoJsonCoordinates, isInHispaniolaRegion } from '@/lib/seismic-coords'
import type { EMSCGeoFeature } from '@/lib/seismic-service'
import { EMSC_EVENT_DETAILS_BASE } from '../constants'
import { toHaitiLocalIso, toUtcIso, parseEventTime } from '../datetime'
import {
  mapEmscValidationStatus,
  sanitizeString,
  validateSurveillanceEvent,
} from '../normalize'
import type { SourceFetchReport, SurveillanceSeismicEvent } from '../types'

const FDSN_URL = 'https://www.seismicportal.eu/fdsnws/event/1/query'

function emscOfficialLink(feature: EMSCGeoFeature): string | null {
  const unid = feature.properties.unid ?? feature.properties.source_id ?? feature.id
  if (!unid) return null
  return `${EMSC_EVENT_DETAILS_BASE}?unid=${encodeURIComponent(unid)}`
}

function mapEmscFeature(feature: EMSCGeoFeature, forceHaiti = false): SurveillanceSeismicEvent | null {
  try {
    const coords = parseGeoJsonCoordinates(feature.geometry.coordinates)
    const p = feature.properties
    const mag = p.mag ?? 0
    if (mag <= 0) return null

    const eventDate = parseEventTime(p.time)
    if (!eventDate) return null

    const isHaiti = forceHaiti || isInHispaniolaRegion(coords.latitude, coords.longitude)
    const emscId = sanitizeString(p.unid ?? p.source_id ?? feature.id) ?? `emsc-${coords.longitude}-${coords.latitude}`

    return validateSurveillanceEvent({
      id: `emsc-${emscId}`,
      event_id: emscId,
      datetime_utc: toUtcIso(eventDate),
      datetime_local: toHaitiLocalIso(eventDate),
      latitude: coords.latitude,
      longitude: coords.longitude,
      depth_km: coords.depthKm || Math.abs(Number(p.depth) || 0),
      magnitude: mag,
      magnitude_type: null,
      source: 'EMSC',
      validation_status: mapEmscValidationStatus(p.auth),
      last_updated: toUtcIso(eventDate),
      official_link: emscOfficialLink(feature),
      region: sanitizeString(p.flynn_region),
      tsunami: false,
      felt: false,
      is_haiti_region: isHaiti,
      merged_sources: ['EMSC'],
      usgs_id: null,
      emsc_id: emscId,
    })
  } catch {
    return null
  }
}

function errorReport(started: number, err: unknown): SourceFetchReport {
  const msg = err instanceof Error ? err.message : 'EMSC fetch failed'
  const isTimeout = msg.toLowerCase().includes('timeout')
  return {
    source: 'EMSC',
    state: isTimeout ? 'timeout' : 'error',
    count: 0,
    latency_ms: Date.now() - started,
    error_message: msg,
  }
}

export async function fetchEmscGlobal(
  minMagnitude: number,
  days: number,
  timeoutMs: number
): Promise<{ events: SurveillanceSeismicEvent[]; report: SourceFetchReport }> {
  const started = Date.now()
  const minutes = Math.min(days * 24 * 60, 43_200)
  try {
    const startTime = new Date(Date.now() - minutes * 60 * 1000)
    const response = await axios.get<{ features: EMSCGeoFeature[] }>(FDSN_URL, {
      params: {
        format: 'json',
        starttime: startTime.toISOString(),
        minmagnitude: minMagnitude,
        limit: 1000,
      },
      timeout: timeoutMs,
    })
    const mapped: SurveillanceSeismicEvent[] = []
    for (const f of response.data.features ?? []) {
      const ev = mapEmscFeature(f)
      if (ev) mapped.push(ev)
    }
    return {
      events: mapped,
      report: {
        source: 'EMSC',
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

export async function fetchEmscHaitiBBox(
  bbox: [number, number, number, number],
  minMagnitude: number,
  days: number,
  timeoutMs: number
): Promise<{ events: SurveillanceSeismicEvent[]; report: SourceFetchReport }> {
  const started = Date.now()
  const [minLon, minLat, maxLon, maxLat] = bbox
  try {
    const startTime = new Date(Date.now() - days * 24 * 60 * 60 * 1000)
    const response = await axios.get<{ features: EMSCGeoFeature[] }>(FDSN_URL, {
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
      timeout: timeoutMs,
    })
    const mapped: SurveillanceSeismicEvent[] = []
    for (const f of response.data.features ?? []) {
      const ev = mapEmscFeature(f, true)
      if (ev) mapped.push(ev)
    }
    return {
      events: mapped,
      report: {
        source: 'EMSC',
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
