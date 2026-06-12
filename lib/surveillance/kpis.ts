import type { SurveillanceSeismicEvent } from './types'

const MS_24H = 24 * 60 * 60 * 1000
/** Tolérance horloge / parsing ISO */
const MS_24H_FUTURE_SLACK = 60_000

export function isEventInLast24Hours(
  datetimeUtc: string,
  nowMs: number = Date.now()
): boolean {
  const t = new Date(datetimeUtc).getTime()
  if (!Number.isFinite(t)) return false
  const age = nowMs - t
  return age >= -MS_24H_FUTURE_SLACK && age <= MS_24H
}

export interface SurveillanceKpis {
  count_24h: number
  count_total: number
  max_magnitude_24h: number
  max_magnitude_all: number
  active_alerts: number
  avg_depth_km: number
  haiti_count_24h: number
  tsunami_count: number
}

export function computeSurveillanceKpis(events: SurveillanceSeismicEvent[]): SurveillanceKpis {
  const now = Date.now()
  const in24h = events.filter((e) => isEventInLast24Hours(e.datetime_utc, now))

  const maxMag = (list: SurveillanceSeismicEvent[]) =>
    list.length ? Math.max(...list.map((e) => e.magnitude)) : 0

  const avgDepth =
    events.length > 0
      ? events.reduce((a, e) => a + e.depth_km, 0) / events.length
      : 0

  const isAlert = (e: SurveillanceSeismicEvent) =>
    e.magnitude >= 5.5 || (e.is_haiti_region && e.magnitude >= 4.5) || e.tsunami

  return {
    count_24h: in24h.length,
    count_total: events.length,
    max_magnitude_24h: maxMag(in24h),
    max_magnitude_all: maxMag(events),
    active_alerts: events.filter(isAlert).length,
    avg_depth_km: Math.round(avgDepth * 10) / 10,
    haiti_count_24h: in24h.filter((e) => e.is_haiti_region).length,
    tsunami_count: events.filter((e) => e.tsunami).length,
  }
}
