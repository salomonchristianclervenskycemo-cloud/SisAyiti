import { eventMatchesSources, filterSeismicEvents } from '@/hooks/use-map-filters'
import { DEFAULT_FILTERS, type SeismicEventUI } from '@/lib/seismic-types'

function ev(source: string): SeismicEventUI {
  return {
    id: '1',
    source,
    latitude: 18.5,
    longitude: -72.3,
    depth: 10,
    magnitude: 4,
    eventTime: new Date().toISOString(),
    region: 'Haiti',
    eventType: 'earthquake',
    tsunami: false,
    felt: false,
    reviewed: true,
    risk: 'medium',
  }
}

describe('eventMatchesSources', () => {
  it('matches merged USGS+EMSC labels from surveillance', () => {
    expect(eventMatchesSources('USGS+EMSC', DEFAULT_FILTERS.sources)).toBe(true)
  })

  it('matches single USGS', () => {
    expect(eventMatchesSources('USGS', DEFAULT_FILTERS.sources)).toBe(true)
  })
})

describe('filterSeismicEvents surveillance sources', () => {
  it('keeps events with USGS+EMSC source', () => {
    const out = filterSeismicEvents([ev('USGS+EMSC')], DEFAULT_FILTERS)
    expect(out).toHaveLength(1)
  })
})
