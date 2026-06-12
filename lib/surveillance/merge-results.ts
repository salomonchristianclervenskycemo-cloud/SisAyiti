import { deduplicateSurveillanceEvents } from './deduplication'
import type { SeismicAggregationResult, SeismicAggregationMeta } from './types'

function mergeMeta(
  primary: SeismicAggregationMeta,
  secondary: SeismicAggregationMeta
): SeismicAggregationMeta {
  const sourceMap = new Map(
    [...primary.sources, ...secondary.sources].map((s) => [s.source, s])
  )
  return {
    fetched_at_utc: primary.fetched_at_utc,
    global_count: primary.global_count,
    haiti_count: primary.haiti_count,
    deduplicated_count: primary.deduplicated_count,
    sources: Array.from(sourceMap.values()),
    is_live: primary.is_live || secondary.is_live,
    is_degraded: primary.is_degraded || secondary.is_degraded,
  }
}

/**
 * Fusionne un flux live (éventuellement partiel) avec un cache stale pour enrichir la liste.
 */
export function mergeSurveillanceAggregationResults(
  primary: SeismicAggregationResult,
  secondary: SeismicAggregationResult | null
): SeismicAggregationResult {
  if (!secondary || secondary.events.length === 0) return primary

  const combined = deduplicateSurveillanceEvents([
    ...primary.events,
    ...secondary.events,
  ]).sort(
    (a, b) => new Date(b.datetime_utc).getTime() - new Date(a.datetime_utc).getTime()
  )

  const haiti_events = combined.filter((e) => e.is_haiti_region)
  const global_events = combined.filter((e) => !e.is_haiti_region)

  return {
    events: combined,
    haiti_events,
    global_events,
    meta: {
      ...mergeMeta(primary.meta, secondary.meta),
      global_count: global_events.length,
      haiti_count: haiti_events.length,
      deduplicated_count: combined.length,
    },
  }
}
