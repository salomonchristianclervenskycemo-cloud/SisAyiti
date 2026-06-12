import {
  DEDUP_COORD_TOLERANCE_DEG,
  DEDUP_TIME_TOLERANCE_MS,
} from './constants'
import type { SeismicDataSource, SurveillanceSeismicEvent } from './types'

const SOURCE_PRIORITY: Record<SeismicDataSource, number> = {
  USGS: 3,
  local: 2,
  EMSC: 1,
}

function eventTimeMs(e: SurveillanceSeismicEvent): number {
  return new Date(e.datetime_utc).getTime()
}

export function areEventsDuplicate(a: SurveillanceSeismicEvent, b: SurveillanceSeismicEvent): boolean {
  const dt = Math.abs(eventTimeMs(a) - eventTimeMs(b))
  if (dt > DEDUP_TIME_TOLERANCE_MS) return false
  return (
    Math.abs(a.latitude - b.latitude) <= DEDUP_COORD_TOLERANCE_DEG &&
    Math.abs(a.longitude - b.longitude) <= DEDUP_COORD_TOLERANCE_DEG
  )
}

function pickPreferred(
  current: SurveillanceSeismicEvent,
  candidate: SurveillanceSeismicEvent
): SurveillanceSeismicEvent {
  const curP = SOURCE_PRIORITY[current.source] ?? 0
  const candP = SOURCE_PRIORITY[candidate.source] ?? 0

  let winner = current
  if (candP > curP) winner = candidate
  else if (candP === curP && candidate.magnitude > current.magnitude) winner = candidate

  const merged_sources = Array.from(
    new Set([...current.merged_sources, ...candidate.merged_sources, current.source, candidate.source])
  )

  return {
    ...winner,
    merged_sources,
    usgs_id: current.usgs_id ?? candidate.usgs_id,
    emsc_id: current.emsc_id ?? candidate.emsc_id,
    magnitude: Math.max(current.magnitude, candidate.magnitude),
    last_updated:
      new Date(current.last_updated) >= new Date(candidate.last_updated)
        ? current.last_updated
        : candidate.last_updated,
    validation_status:
      SOURCE_PRIORITY[winner.source] >= SOURCE_PRIORITY[current.source]
        ? winner.validation_status
        : current.validation_status,
    official_link: winner.official_link ?? current.official_link ?? candidate.official_link,
    region: winner.region ?? current.region ?? candidate.region,
    tsunami: current.tsunami || candidate.tsunami,
    felt: current.felt || candidate.felt,
    is_haiti_region: current.is_haiti_region || candidate.is_haiti_region,
    id: `merged-${winner.usgs_id ?? winner.emsc_id ?? winner.event_id}`,
    event_id: `merged-${winner.usgs_id ?? winner.emsc_id ?? winner.event_id}`,
  }
}

/**
 * Fusionne les doublons (±60 s, ±0.5°). Priorité USGS > local > EMSC.
 */
export function deduplicateSurveillanceEvents(
  events: SurveillanceSeismicEvent[]
): SurveillanceSeismicEvent[] {
  const sorted = [...events].sort((a, b) => {
    if (b.magnitude !== a.magnitude) return b.magnitude - a.magnitude
    return eventTimeMs(b) - eventTimeMs(a)
  })

  const clusters: SurveillanceSeismicEvent[][] = []

  for (const event of sorted) {
    let placed = false
    for (const cluster of clusters) {
      if (cluster.some((existing) => areEventsDuplicate(existing, event))) {
        cluster.push(event)
        placed = true
        break
      }
    }
    if (!placed) clusters.push([event])
  }

  return clusters.map((cluster) =>
    cluster.reduce((acc, cur) => pickPreferred(acc, cur))
  )
}
