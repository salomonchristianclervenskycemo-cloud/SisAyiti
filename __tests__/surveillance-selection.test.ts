import {
  isHistoricalCatalogEvent,
  pickDefaultSurveillanceEvent,
} from '@/lib/surveillance/selection'
import type { SeismicEventUI } from '@/lib/seismic-types'

function ui(id: string, time: string, mag = 4): SeismicEventUI {
  return {
    id,
    source: 'USGS',
    latitude: 18.5,
    longitude: -72.3,
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

describe('surveillance selection', () => {
  it('detects historical catalog ids', () => {
    expect(isHistoricalCatalogEvent(ui('historical-2021-08-14', '2021-08-14T12:00:00Z'))).toBe(true)
    expect(isHistoricalCatalogEvent(ui('usgs-abc', '2026-05-26T12:00:00Z'))).toBe(false)
  })

  it('picks most recent live event, not historical', () => {
    const live = ui('usgs-live', '2026-05-26T18:00:00Z', 5.6)
    const hist = ui('historical-2021-08-14', '2021-08-14T12:00:00Z', 7.2)
    const picked = pickDefaultSurveillanceEvent([hist, live])
    expect(picked?.id).toBe('usgs-live')
  })
})
