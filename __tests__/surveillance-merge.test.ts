import { mergeSurveillanceAggregationResults } from '@/lib/surveillance/merge-results'
import type { SeismicAggregationResult } from '@/lib/surveillance/types'

function mockResult(id: string, mag: number, hoursAgo = 0): SeismicAggregationResult {
  const when = new Date(Date.now() - hoursAgo * 3600_000).toISOString()
  const ev = {
    id,
    event_id: id,
    datetime_utc: when,
    datetime_local: when,
    latitude: 18.5 + mag * 0.1,
    longitude: -72.3 - mag * 0.1,
    depth_km: 10,
    magnitude: mag,
    magnitude_type: 'Mw',
    source: 'USGS' as const,
    validation_status: 'automatique' as const,
    last_updated: new Date().toISOString(),
    official_link: null,
    region: 'Haiti',
    tsunami: false,
    felt: false,
    is_haiti_region: true,
    merged_sources: ['USGS' as const],
    usgs_id: id,
    emsc_id: null,
  }
  return {
    events: [ev],
    haiti_events: [ev],
    global_events: [],
    meta: {
      fetched_at_utc: new Date().toISOString(),
      global_count: 0,
      haiti_count: 1,
      deduplicated_count: 1,
      sources: [],
      is_live: true,
      is_degraded: false,
    },
  }
}

describe('mergeSurveillanceAggregationResults', () => {
  it('deduplicates and keeps distinct events', () => {
    const a = mockResult('a', 4, 1)
    const b = mockResult('b', 5, 48)
    const merged = mergeSurveillanceAggregationResults(a, b)
    expect(merged.events).toHaveLength(2)
    expect(merged.events.map((e) => e.magnitude).sort()).toEqual([4, 5])
  })
})
