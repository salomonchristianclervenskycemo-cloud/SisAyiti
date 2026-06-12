import { resolveSurveillanceFeed } from '@/lib/surveillance/feed-resolver'
import type { SeismicAggregationResult } from '@/lib/surveillance/types'

function mockResult(events: number, overrides: Partial<SeismicAggregationResult['meta']> = {}): SeismicAggregationResult {
  const ev = Array.from({ length: events }, (_, i) => ({
    id: `e-${i}`,
    event_id: `e-${i}`,
    datetime_utc: new Date(Date.now() - i * 120_000).toISOString(),
    datetime_local: new Date(Date.now() - i * 120_000).toISOString(),
    latitude: 18.5 + i * 0.2,
    longitude: -72.3 - i * 0.2,
    depth_km: 10,
    magnitude: 4,
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
    usgs_id: null,
    emsc_id: null,
  }))
  return {
    events: ev,
    haiti_events: ev,
    global_events: ev,
    meta: {
      fetched_at_utc: new Date().toISOString(),
      global_count: events,
      haiti_count: events,
      deduplicated_count: events,
      sources: [],
      is_live: true,
      is_degraded: false,
      ...overrides,
    },
  }
}

describe('resolveSurveillanceFeed', () => {
  it('returns live when network succeeds', () => {
    const r = resolveSurveillanceFeed({
      live: mockResult(2),
      freshCache: null,
      staleCache: null,
      networkError: null,
    })
    expect(r.mode).toBe('live')
    expect(r.from_cache).toBe(false)
  })

  it('returns offline when network fails but stale cache exists', () => {
    const stale = mockResult(3, { is_live: false, is_degraded: true })
    const r = resolveSurveillanceFeed({
      live: null,
      freshCache: null,
      staleCache: stale,
      networkError: 'Network error',
    })
    expect(r.mode).toBe('offline')
    expect(r.from_cache).toBe(true)
    expect(r.result.events).toHaveLength(3)
  })

  it('returns degraded when partial source failure', () => {
    const live = mockResult(1, {
      sources: [
        { source: 'USGS', state: 'ok', count: 1, latency_ms: 100, error_message: null },
        { source: 'EMSC', state: 'error', count: 0, latency_ms: 100, error_message: 'fail' },
      ],
    })
    const r = resolveSurveillanceFeed({
      live,
      freshCache: null,
      staleCache: null,
      networkError: null,
    })
    expect(r.mode).toBe('degraded')
  })

  it('merges stale cache when partial failure and stale has more events', () => {
    const live = mockResult(1, {
      sources: [
        { source: 'USGS', state: 'ok', count: 1, latency_ms: 100, error_message: null },
        { source: 'EMSC', state: 'error', count: 0, latency_ms: 100, error_message: 'fail' },
      ],
    })
    const stale = mockResult(5, { is_live: false, is_degraded: true })
    const r = resolveSurveillanceFeed({
      live,
      freshCache: null,
      staleCache: stale,
      networkError: null,
    })
    expect(r.mode).toBe('degraded')
    expect(r.result.events.length).toBeGreaterThanOrEqual(5)
    expect(r.status_message_key).toBe('surv.status.degradedMerged')
  })
})
