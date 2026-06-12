import { computeSurveillanceKpis } from '@/lib/surveillance/kpis'
import type { SurveillanceSeismicEvent } from '@/lib/surveillance/types'

function ev(mag: number, hoursAgo: number, haiti = true): SurveillanceSeismicEvent {
  const d = new Date(Date.now() - hoursAgo * 60 * 60 * 1000).toISOString()
  return {
    id: `e-${mag}-${hoursAgo}`,
    event_id: `e-${mag}`,
    datetime_utc: d,
    datetime_local: d,
    latitude: 18.5,
    longitude: -72.3,
    depth_km: 12,
    magnitude: mag,
    magnitude_type: 'Mw',
    source: 'USGS',
    validation_status: 'automatique',
    last_updated: d,
    official_link: null,
    region: 'Haiti',
    tsunami: false,
    felt: false,
    is_haiti_region: haiti,
    merged_sources: ['USGS'],
    usgs_id: null,
    emsc_id: null,
  }
}

describe('computeSurveillanceKpis', () => {
  it('counts 24h events and max magnitude', () => {
    const kpis = computeSurveillanceKpis([ev(4, 2), ev(5.5, 30), ev(3, 1)])
    expect(kpis.count_24h).toBe(2)
    expect(kpis.max_magnitude_24h).toBe(4)
    expect(kpis.max_magnitude_all).toBe(5.5)
    expect(kpis.haiti_count_24h).toBe(2)
  })

  it('max magnitude 24h uses the strongest event in the window', () => {
    const kpis = computeSurveillanceKpis([ev(5.6, 1), ev(6.9, 20)])
    expect(kpis.max_magnitude_24h).toBe(6.9)
    expect(kpis.max_magnitude_all).toBe(6.9)
  })

  it('flags active alerts for strong or haiti events', () => {
    const kpis = computeSurveillanceKpis([ev(5.6, 1), ev(4.6, 1, true)])
    expect(kpis.active_alerts).toBe(2)
  })
})
