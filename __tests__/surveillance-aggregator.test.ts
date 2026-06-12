import {
  areEventsDuplicate,
  deduplicateSurveillanceEvents,
} from '@/lib/surveillance/deduplication'
import { validateSurveillanceEvent } from '@/lib/surveillance/normalize'
import type { SurveillanceSeismicEvent } from '@/lib/surveillance/types'

function baseEvent(overrides: Partial<SurveillanceSeismicEvent>): SurveillanceSeismicEvent {
  const raw = validateSurveillanceEvent({
    id: 'test-1',
    event_id: 'test-1',
    datetime_utc: '2024-01-15T12:00:00.000Z',
    datetime_local: '2024-01-15T07:00:00',
    latitude: 18.5,
    longitude: -72.3,
    depth_km: 10,
    magnitude: 4.2,
    magnitude_type: 'Mw',
    source: 'USGS',
    validation_status: 'automatique',
    last_updated: '2024-01-15T12:05:00.000Z',
    official_link: 'https://example.com',
    region: 'Haiti',
    tsunami: false,
    felt: false,
    is_haiti_region: true,
    merged_sources: ['USGS'],
    usgs_id: 'us1',
    emsc_id: null,
    ...overrides,
  })
  if (!raw) throw new Error('invalid fixture')
  return raw
}

describe('surveillance deduplication', () => {
  it('detects duplicates within 60s and 0.5°', () => {
    const a = baseEvent({})
    const b = baseEvent({
      id: 'emsc-2',
      event_id: 'emsc-2',
      source: 'EMSC',
      merged_sources: ['EMSC'],
      datetime_utc: '2024-01-15T12:00:30.000Z',
      latitude: 18.55,
      longitude: -72.25,
      emsc_id: 'e2',
      usgs_id: null,
    })
    expect(areEventsDuplicate(a, b)).toBe(true)
  })

  it('does not merge events far apart in time', () => {
    const a = baseEvent({})
    const b = baseEvent({
      id: 'far',
      event_id: 'far',
      datetime_utc: '2024-01-15T14:00:00.000Z',
    })
    expect(areEventsDuplicate(a, b)).toBe(false)
  })

  it('merges duplicates preferring USGS', () => {
    const usgs = baseEvent({ magnitude: 4.0 })
    const emsc = baseEvent({
      id: 'emsc-x',
      event_id: 'emsc-x',
      source: 'EMSC',
      merged_sources: ['EMSC'],
      magnitude: 4.5,
      datetime_utc: '2024-01-15T12:00:20.000Z',
      emsc_id: 'ex',
      usgs_id: null,
    })
    const result = deduplicateSurveillanceEvents([emsc, usgs])
    expect(result).toHaveLength(1)
    expect(result[0].merged_sources).toContain('USGS')
    expect(result[0].merged_sources).toContain('EMSC')
    expect(result[0].magnitude).toBe(4.5)
  })
})

describe('surveillance normalize', () => {
  it('rejects invalid coordinates and N/A magnitude', () => {
    expect(
      validateSurveillanceEvent({
        id: 'bad',
        event_id: 'bad',
        datetime_utc: '2024-01-01T00:00:00Z',
        datetime_local: '2024-01-01T00:00:00',
        latitude: NaN,
        longitude: -72,
        depth_km: 5,
        magnitude: 0,
        magnitude_type: null,
        source: 'USGS',
        validation_status: 'provisoire',
        last_updated: '2024-01-01T00:00:00Z',
        official_link: null,
        region: null,
        tsunami: false,
        felt: false,
        is_haiti_region: false,
        merged_sources: ['USGS'],
        usgs_id: null,
        emsc_id: null,
      })
    ).toBeNull()
  })
})
