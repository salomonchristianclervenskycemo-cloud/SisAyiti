import {
  normalizeOfficialLinkUrl,
  officialLinkSourceLabel,
  resolveOfficialLink,
} from '@/lib/surveillance/official-link'
import type { SurveillanceSeismicEvent } from '@/lib/surveillance/types'

function baseEvent(overrides: Partial<SurveillanceSeismicEvent> = {}): SurveillanceSeismicEvent {
  return {
    id: 'usgs-test123',
    usgs_id: null,
    emsc_id: null,
    source: 'USGS',
    merged_sources: ['USGS'],
    latitude: 18.5,
    longitude: -72.3,
    depth_km: 10,
    magnitude: 4.2,
    magnitude_type: 'mb',
    datetime_utc: '2026-05-26T12:00:00.000Z',
    region: 'Haiti',
    is_haiti_region: true,
    tsunami: false,
    felt: false,
    validation_status: 'confirmé',
    official_link: null,
    ...overrides,
  }
}

describe('resolveOfficialLink', () => {
  it('uses official_link when present', () => {
    const url = 'https://earthquake.usgs.gov/earthquakes/eventpage/us7000abc'
    expect(resolveOfficialLink(baseEvent({ official_link: url, usgs_id: 'us7000abc' }))).toBe(url)
  })

  it('builds USGS URL from usgs_id', () => {
    const link = resolveOfficialLink(baseEvent({ id: 'x', usgs_id: 'us7000abc' }))
    expect(link).toBe('https://earthquake.usgs.gov/earthquakes/eventpage/us7000abc')
  })

  it('builds USGS URL from merged- prefixed id', () => {
    const link = resolveOfficialLink(
      baseEvent({ id: 'merged-us7000xyz', usgs_id: 'us7000xyz', merged_sources: ['USGS', 'EMSC'] })
    )
    expect(link).toBe('https://earthquake.usgs.gov/earthquakes/eventpage/us7000xyz')
  })

  it('builds EMSC URL with eventdetails.html?unid=', () => {
    const link = resolveOfficialLink(
      baseEvent({
        id: 'emsc-1',
        usgs_id: null,
        emsc_id: '20260526_0000123',
        source: 'EMSC',
        merged_sources: ['EMSC'],
      })
    )
    expect(link).toBe(
      'https://www.seismicportal.eu/eventdetails.html?unid=20260526_0000123'
    )
  })

  it('fixes legacy EMSC /event/details?id= URLs', () => {
    const legacy = 'https://www.seismicportal.eu/event/details?id=20260526_0000123'
    expect(normalizeOfficialLinkUrl(legacy)).toBe(
      'https://www.seismicportal.eu/eventdetails.html?unid=20260526_0000123'
    )
    expect(
      resolveOfficialLink(
        baseEvent({
          source: 'EMSC',
          merged_sources: ['EMSC'],
          official_link: legacy,
          emsc_id: null,
        })
      )
    ).toBe('https://www.seismicportal.eu/eventdetails.html?unid=20260526_0000123')
  })

  it('prefers USGS when merged sources include USGS', () => {
    const link = resolveOfficialLink(
      baseEvent({
        id: 'merged-us7000aaa',
        usgs_id: 'us7000aaa',
        emsc_id: '20260526_0000999',
        merged_sources: ['USGS', 'EMSC'],
        official_link: 'https://www.seismicportal.eu/event/details?id=20260526_0000999',
      })
    )
    expect(link).toContain('earthquake.usgs.gov/earthquakes/eventpage/us7000aaa')
  })

  it('falls back to ui usgsId', () => {
    const link = resolveOfficialLink(null, {
      id: 'custom',
      usgsId: 'us7000ui',
      source: 'USGS',
      latitude: 0,
      longitude: 0,
      depth: 0,
      magnitude: 3,
      eventType: 'earthquake',
      eventTime: '2026-01-01T00:00:00Z',
      tsunami: false,
      felt: false,
      reviewed: false,
      risk: 'low',
    })
    expect(link).toContain('us7000ui')
  })

  it('returns null when no identifiers', () => {
    expect(resolveOfficialLink(baseEvent({ id: 'unknown', usgs_id: null, emsc_id: null }))).toBeNull()
  })
})

describe('officialLinkSourceLabel', () => {
  it('detects USGS and EMSC', () => {
    expect(officialLinkSourceLabel('https://earthquake.usgs.gov/earthquakes/eventpage/x')).toBe('USGS')
    expect(
      officialLinkSourceLabel('https://www.seismicportal.eu/eventdetails.html?unid=1')
    ).toBe('EMSC')
    expect(officialLinkSourceLabel('https://example.com')).toBe('other')
  })
})
