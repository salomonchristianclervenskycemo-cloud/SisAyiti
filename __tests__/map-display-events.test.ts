import { getMapDisplayEvents } from '@/hooks/use-map-filters'
import { DEFAULT_FILTERS, type SeismicEventUI } from '@/lib/seismic-types'

function event(id: string, lat: number, lng: number, mag: number, time: string): SeismicEventUI {
  return {
    id,
    source: 'USGS',
    latitude: lat,
    longitude: lng,
    depth: 10,
    magnitude: mag,
    eventType: 'earthquake',
    eventTime: time,
    tsunami: false,
    felt: false,
    reviewed: true,
    risk: 'low',
  }
}

describe('getMapDisplayEvents', () => {
  it('pins selected event outside Haiti filter', () => {
    const global = event('usgs-far', 45, 10, 5.5, '2026-05-26T10:00:00Z')
    const haiti = event('usgs-near', 18.5, -72.3, 3.2, '2026-05-26T11:00:00Z')
    const filters = {
      ...DEFAULT_FILTERS,
      magnitude: { min: 2, max: 10 },
      dateRange: { start: new Date('2026-05-25'), end: new Date('2026-05-27') },
    }
    const displayed = getMapDisplayEvents([global, haiti], filters, global, null)
    expect(displayed.some((e) => e.id === 'usgs-far')).toBe(true)
    expect(displayed.some((e) => e.id === 'usgs-near')).toBe(true)
  })
})
