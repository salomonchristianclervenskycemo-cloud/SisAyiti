import { aggregateSeismicEvents } from '@/lib/surveillance/seismic-aggregator'
import { fetchResolvedSurveillanceFeed } from '@/lib/surveillance/fetch-resolved-feed'
import {
  readSurveillanceServerCache,
  surveillanceServerCacheKey,
  writeSurveillanceServerCache,
  SURVEILLANCE_SERVER_FRESH_TTL_SEC,
} from '@/lib/surveillance/server-cache'
import type { SeismicAggregationResult } from '@/lib/surveillance/types'

jest.mock('@/lib/surveillance/seismic-aggregator', () => ({
  aggregateSeismicEvents: jest.fn(),
}))

const aggregateMock = aggregateSeismicEvents as jest.MockedFunction<typeof aggregateSeismicEvents>

function sampleResult(): SeismicAggregationResult {
  return {
    events: [
      {
        id: 'usgs-1',
        event_id: 'usgs-1',
        datetime_utc: '2024-06-01T12:00:00Z',
        datetime_local: '2024-06-01T08:00:00',
        latitude: 18.5,
        longitude: -72.3,
        depth_km: 10,
        magnitude: 4.2,
        magnitude_type: 'mb',
        source: 'USGS',
        validation_status: 'validé',
        last_updated: '2024-06-01T12:00:00Z',
        official_link: null,
        region: 'Haiti',
        tsunami: false,
        felt: false,
        is_haiti_region: true,
        merged_sources: ['USGS'],
      },
    ],
    haiti_events: [],
    global_events: [],
    meta: {
      fetched_at_utc: new Date().toISOString(),
      sources: [{ source: 'USGS', state: 'ok', event_count: 1, latency_ms: 100 }],
      is_degraded: false,
      dedup_removed: 0,
    },
  }
}

describe('fetchResolvedSurveillanceFeed cache fast path', () => {
  const key = surveillanceServerCacheKey(7, 2, true)

  beforeEach(async () => {
    jest.clearAllMocks()
    await writeSurveillanceServerCache(key, sampleResult(), SURVEILLANCE_SERVER_FRESH_TTL_SEC)
  })

  it('returns cached data without awaiting aggregation', async () => {
    const slow = new Promise<SeismicAggregationResult>(() => {
      /* never resolves */
    })
    aggregateMock.mockReturnValue(slow)

    const { resolved, server_cache } = await fetchResolvedSurveillanceFeed({
      days: 7,
      min_magnitude: 2,
      include_global: true,
    })

    expect(server_cache).toBe(true)
    expect(resolved.result.events).toHaveLength(1)
    expect(resolved.result.events[0].id).toBe('usgs-1')
  })

  it('writes fresh cache after slow aggregation on miss', async () => {
    const freshKey = surveillanceServerCacheKey(3, 3, false)
    aggregateMock.mockResolvedValue(sampleResult())

    await fetchResolvedSurveillanceFeed({
      days: 3,
      min_magnitude: 3,
      include_global: false,
    })

    const cached = await readSurveillanceServerCache(
      freshKey,
      SURVEILLANCE_SERVER_FRESH_TTL_SEC * 1000
    )
    expect(cached?.events.length).toBe(1)
  })
})
