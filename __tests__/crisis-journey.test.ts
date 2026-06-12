import {
  isCrisisRelevantEvent,
  pickActiveCrisisEvent,
  CRISIS_MIN_MAGNITUDE,
} from '@/lib/crisis-journey'
import type { SeismicEventUI } from '@/lib/seismic-types'

function ev(partial: Partial<SeismicEventUI> & { id: string }): SeismicEventUI {
  return {
    id: partial.id,
    magnitude: partial.magnitude ?? 5,
    depth: partial.depth ?? 10,
    latitude: partial.latitude ?? 18.5,
    longitude: partial.longitude ?? -72.3,
    region: partial.region ?? 'Haiti region',
    source: 'USGS',
    risk: partial.risk ?? 'medium',
    eventTime: partial.eventTime ?? new Date().toISOString(),
    ...partial,
  }
}

describe('crisis journey', () => {
  it('ignores low magnitude events', () => {
    expect(
      isCrisisRelevantEvent(
        ev({ id: '1', magnitude: CRISIS_MIN_MAGNITUDE - 0.5 })
      )
    ).toBe(false)
  })

  it('picks strongest recent Haiti event', () => {
    const now = Date.now()
    const events = [
      ev({
        id: 'a',
        magnitude: 4.5,
        eventTime: new Date(now - 3600_000).toISOString(),
      }),
      ev({
        id: 'b',
        magnitude: 5.2,
        eventTime: new Date(now - 7200_000).toISOString(),
      }),
    ]
    expect(pickActiveCrisisEvent(events)?.id).toBe('b')
  })
})
