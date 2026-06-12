import { filterEventsForHaitiMap } from '@/lib/seismic-haiti-filter'
import type { SeismicEventUI } from '@/lib/seismic-types'

function ev(lat: number, lng: number, region = 'Haiti'): SeismicEventUI {
  return {
    id: `e-${lat}-${lng}`,
    source: 'USGS',
    latitude: lat,
    longitude: lng,
    depth: 10,
    magnitude: 4,
    eventTime: new Date().toISOString(),
    region,
    eventType: 'earthquake',
    tsunami: false,
    felt: false,
    reviewed: true,
    risk: 'medium',
  }
}

describe('filterEventsForHaitiMap', () => {
  it('keeps Hispaniola events', () => {
    const out = filterEventsForHaitiMap([ev(18.5, -72.3)])
    expect(out).toHaveLength(1)
  })

  it('drops distant Pacific events', () => {
    const out = filterEventsForHaitiMap([ev(35, 140, 'Japan')])
    expect(out).toHaveLength(0)
  })
})
