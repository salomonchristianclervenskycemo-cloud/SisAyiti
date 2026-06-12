import { computeSurveillanceAlerts } from '@/lib/surveillance/alerts'
import type { SurveillanceSeismicEvent } from '@/lib/surveillance/types'

function ev(mag: number, haiti: boolean, tsunami = false): SurveillanceSeismicEvent {
  const d = new Date().toISOString()
  return {
    id: `a-${mag}`,
    event_id: `a-${mag}`,
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
    tsunami,
    felt: false,
    is_haiti_region: haiti,
    merged_sources: ['USGS'],
    usgs_id: null,
    emsc_id: null,
  }
}

describe('computeSurveillanceAlerts', () => {
  it('prioritizes critical Haiti and tsunami events', () => {
    const alerts = computeSurveillanceAlerts([
      ev(3.5, false),
      ev(5.2, true),
      ev(6.8, false, true),
    ])
    expect(alerts.length).toBeGreaterThanOrEqual(2)
    expect(alerts[0].level).toBe('critical')
    expect(alerts.some((a) => a.tsunami)).toBe(true)
  })
})
