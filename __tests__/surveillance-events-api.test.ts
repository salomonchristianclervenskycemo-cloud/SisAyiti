import { buildSeismicEventsApiPayload } from '@/lib/surveillance/build-events-response'
import { surveillanceModeToDataSource } from '@/lib/surveillance/fetch-resolved-feed'
import type { SeismicAggregationResult } from '@/lib/surveillance/types'

function mockResolved(
  events: number,
  mode: 'live' | 'degraded' | 'offline' | 'error' = 'live'
) {
  const ev = Array.from({ length: events }, (_, i) => ({
    id: `e-${i}`,
    event_id: `e-${i}`,
    datetime_utc: new Date(Date.now() - i * 120_000).toISOString(),
    datetime_local: new Date().toISOString(),
    latitude: 18.5 + i * 0.2,
    longitude: -72.3,
    depth_km: 10,
    magnitude: 3 + i * 0.1,
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
    usgs_id: `u-${i}`,
    emsc_id: null,
  }))
  const result: SeismicAggregationResult = {
    events: ev,
    haiti_events: ev,
    global_events: [],
    meta: {
      fetched_at_utc: new Date().toISOString(),
      global_count: 0,
      haiti_count: events,
      deduplicated_count: events,
      sources: [],
      is_live: mode === 'live',
      is_degraded: mode !== 'live',
    },
  }
  return {
    result,
    mode,
    status_message_key: 'surv.status.live',
    from_cache: false,
    network_error: null,
  }
}

describe('buildSeismicEventsApiPayload', () => {
  it('limits events and maps source for live mode', () => {
    const payload = buildSeismicEventsApiPayload(mockResolved(10), {
      limit: 3,
      server_cache: false,
    })
    expect(payload.count).toBe(3)
    expect(payload.source).toBe('surveillance-live')
    expect(payload.events).toHaveLength(3)
  })
})

describe('surveillanceModeToDataSource', () => {
  it('maps degraded and server cache', () => {
    expect(surveillanceModeToDataSource('degraded', false)).toBe('degraded')
    expect(surveillanceModeToDataSource('offline', true)).toBe('server-cache')
  })
})
