import { capEventsForMap, MAPLIBRE_EVENT_CAP } from '@/lib/map-event-cap'
import type { SeismicEventUI } from '@/lib/seismic-types'

function ev(id: string, mag: number): SeismicEventUI {
  return {
    id,
    latitude: 18.5,
    longitude: -72.3,
    depth: 10,
    magnitude: mag,
    eventTime: new Date().toISOString(),
    region: 'Haiti',
    source: 'USGS',
    risk: 'low',
    tsunami: false,
    reviewed: true,
  }
}

describe('capEventsForMap', () => {
  it('returns same array when under cap', () => {
    const events = [ev('a', 3), ev('b', 4)]
    expect(capEventsForMap(events)).toBe(events)
  })

  it('keeps strongest events when over cap', () => {
    const events = Array.from({ length: MAPLIBRE_EVENT_CAP + 50 }, (_, i) =>
      ev(`e${i}`, i < 10 ? 6 : 2)
    )
    const capped = capEventsForMap(events)
    expect(capped).toHaveLength(MAPLIBRE_EVENT_CAP)
    expect(capped.every((e) => e.magnitude >= 2)).toBe(true)
    expect(capped.filter((e) => e.magnitude >= 6).length).toBeGreaterThanOrEqual(10)
  })
})
