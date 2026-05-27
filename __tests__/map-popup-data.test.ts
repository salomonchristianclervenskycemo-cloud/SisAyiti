import { buildEarthquakePopupData } from '@/lib/map-popup-data'

describe('buildEarthquakePopupData', () => {
  it('returns localized labels and computed depth', () => {
    const data = buildEarthquakePopupData({
      magnitude: 5.2,
      depth: 12,
      region: 'Port-au-Prince',
      source: 'USGS',
      eventTime: '2024-01-15T12:00:00.000Z',
      latitude: 18.5,
      longitude: -72.3,
      lang: 'fr',
    })
    expect(data.magnitude).toBe(5.2)
    expect(data.depthKm).toBeGreaterThan(0)
    expect(data.labels.depth).toBeTruthy()
    expect(data.region).toBe('Port-au-Prince')
  })
})
