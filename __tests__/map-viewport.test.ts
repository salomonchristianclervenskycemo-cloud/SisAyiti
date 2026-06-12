import {
  filterEventsNearFocus,
  isEventOutsideHaitiMap,
} from '@/lib/map-viewport'
import type { SeismicEventUI } from '@/lib/seismic-types'

function ev(id: string, lat: number, lng: number): SeismicEventUI {
  return {
    id,
    source: 'USGS',
    latitude: lat,
    longitude: lng,
    depth: 10,
    magnitude: 5,
    eventType: 'earthquake',
    eventTime: '2026-05-26T12:00:00Z',
    tsunami: false,
    felt: false,
    reviewed: true,
    risk: 'medium',
  }
}

describe('map-viewport', () => {
  it('detects events outside Haiti map region', () => {
    expect(isEventOutsideHaitiMap(ev('x', 35, 25))).toBe(true)
    expect(isEventOutsideHaitiMap(ev('y', 18.5, -72.3))).toBe(false)
  })

  it('filters regional context around focus', () => {
    const focus = ev('focus', 35, 25)
    const near = ev('near', 36, 26)
    const far = ev('far', 10, 10)
    const result = filterEventsNearFocus([focus, near, far], focus, 5)
    expect(result.map((e) => e.id).sort()).toEqual(['focus', 'near'])
  })
})
