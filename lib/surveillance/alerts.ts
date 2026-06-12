import { resolveOfficialLink } from './official-link'
import type { SurveillanceSeismicEvent } from './types'

export type SurveillanceAlertLevel = 'critical' | 'high' | 'medium' | 'info'

export interface SurveillanceAlert {
  id: string
  event_id: string
  level: SurveillanceAlertLevel
  title_key: string
  message: string
  magnitude: number
  region: string | null
  is_haiti_region: boolean
  tsunami: boolean
  datetime_utc: string
  official_link: string | null
}

function alertLevel(e: SurveillanceSeismicEvent): SurveillanceAlertLevel {
  if (e.tsunami || e.magnitude >= 6.5) return 'critical'
  if (e.is_haiti_region && e.magnitude >= 5) return 'critical'
  if (e.magnitude >= 5.5) return 'high'
  if (e.is_haiti_region && e.magnitude >= 4.5) return 'high'
  if (e.magnitude >= 4.5) return 'medium'
  return 'info'
}

/**
 * Alertes dérivées du flux surveillance (seuil + zone Haïti + tsunami).
 */
export function computeSurveillanceAlerts(
  events: SurveillanceSeismicEvent[],
  options: { max?: number; minMagnitude?: number } = {}
): SurveillanceAlert[] {
  const max = options.max ?? 20
  const minMag = options.minMagnitude ?? 4.5
  const MS_48H = 48 * 60 * 60 * 1000
  const now = Date.now()

  return events
    .filter((e) => {
      const recent = now - new Date(e.datetime_utc).getTime() <= MS_48H
      return recent && (e.magnitude >= minMag || e.tsunami || (e.is_haiti_region && e.magnitude >= 4))
    })
    .sort((a, b) => b.magnitude - a.magnitude)
    .slice(0, max)
    .map((e) => {
      const level = alertLevel(e)
      const region = e.region ?? (e.is_haiti_region ? 'Haïti / Hispaniola' : null)
      let title_key = 'surv.alert.strong'
      if (e.tsunami) title_key = 'surv.alert.tsunami'
      else if (level === 'critical') title_key = 'surv.alert.critical'
      else if (e.is_haiti_region) title_key = 'surv.alert.haiti'

      return {
        id: `alert-${e.id}`,
        event_id: e.id,
        level,
        title_key,
        message: `${region ?? '—'} · M${e.magnitude.toFixed(1)} · ${e.depth_km.toFixed(0)} km`,
        magnitude: e.magnitude,
        region,
        is_haiti_region: e.is_haiti_region,
        tsunami: e.tsunami,
        datetime_utc: e.datetime_utc,
        official_link: resolveOfficialLink(e),
      }
    })
}
