/**
 * Service d'agrégation multi-sources — Tableau de Surveillance Sismique.
 * USGS (principal) + EMSC (recoupement) + BBOX Haïti.
 */

import { deduplicateSurveillanceEvents } from './deduplication'
import {
  DEFAULT_AGGREGATION_OPTIONS,
  HAITI_SURVEILLANCE_BBOX,
} from './constants'
import { fetchEmscGlobal, fetchEmscHaitiBBox } from './sources/emsc-source'
import { fetchUsgsGlobal, fetchUsgsHaitiBBox } from './sources/usgs-source'
import type {
  AggregationOptions,
  SeismicAggregationResult,
  SourceFetchReport,
  SurveillanceSeismicEvent,
} from './types'

function mergeReports(reports: SourceFetchReport[]): SourceFetchReport[] {
  const bySource = new Map<string, SourceFetchReport>()
  for (const r of reports) {
    const prev = bySource.get(r.source)
    if (!prev || r.state === 'ok') bySource.set(r.source, r)
    else if (prev.state !== 'ok') bySource.set(r.source, r)
  }
  return Array.from(bySource.values())
}

function sortByTimeDesc(events: SurveillanceSeismicEvent[]): SurveillanceSeismicEvent[] {
  return [...events].sort(
    (a, b) => new Date(b.datetime_utc).getTime() - new Date(a.datetime_utc).getTime()
  )
}

/**
 * Agrège USGS + EMSC en parallèle, déduplique, priorise Haïti.
 */
export async function aggregateSeismicEvents(
  options: AggregationOptions = {}
): Promise<SeismicAggregationResult> {
  const opts = { ...DEFAULT_AGGREGATION_OPTIONS, ...options }
  const days = Math.min(Math.max(opts.days ?? 7, 1), 30)
  const minMag = opts.min_magnitude ?? 2.0
  const timeout = opts.source_timeout_ms ?? 12_000
  const includeGlobal = opts.include_global !== false

  const reports: SourceFetchReport[] = []
  const rawBatches: SurveillanceSeismicEvent[][] = []

  const fetches: Promise<void>[] = []

  if (includeGlobal) {
    fetches.push(
      fetchUsgsGlobal(days, minMag, timeout).then(({ events, report }) => {
        reports.push(report)
        rawBatches.push(events)
      })
    )
    fetches.push(
      fetchEmscGlobal(minMag, days, timeout).then(({ events, report }) => {
        reports.push(report)
        rawBatches.push(events)
      })
    )
  }

  fetches.push(
    fetchUsgsHaitiBBox(HAITI_SURVEILLANCE_BBOX, days, minMag, timeout).then(({ events, report }) => {
      reports.push({ ...report, source: 'USGS' })
      rawBatches.push(events.map((e) => ({ ...e, is_haiti_region: true })))
    })
  )

  fetches.push(
    fetchEmscHaitiBBox(HAITI_SURVEILLANCE_BBOX, minMag, days, timeout).then(({ events, report }) => {
      reports.push({ ...report, source: 'EMSC' })
      rawBatches.push(events.map((e) => ({ ...e, is_haiti_region: true })))
    })
  )

  await Promise.allSettled(fetches)

  const mergedReports = mergeReports(reports)
  const flat = rawBatches.flat()
  const deduplicated = deduplicateSurveillanceEvents(flat)
  const events = sortByTimeDesc(deduplicated)
  const haiti_events = sortByTimeDesc(events.filter((e) => e.is_haiti_region))
  const global_events = sortByTimeDesc(events)

  const usgsOk = mergedReports.some((r) => r.source === 'USGS' && r.state === 'ok')
  const emscOk = mergedReports.some((r) => r.source === 'EMSC' && r.state === 'ok')
  const is_live = usgsOk || emscOk
  const is_degraded = !is_live

  return {
    events,
    haiti_events,
    global_events,
    meta: {
      fetched_at_utc: new Date().toISOString(),
      global_count: global_events.length,
      haiti_count: haiti_events.length,
      deduplicated_count: events.length,
      sources: mergedReports,
      is_live,
      is_degraded,
    },
  }
}
