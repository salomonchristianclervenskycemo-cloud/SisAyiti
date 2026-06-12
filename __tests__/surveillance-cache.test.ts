import {
  surveillanceParamsKey,
  SURVEILLANCE_CACHE_FRESH_MS,
} from '@/lib/surveillance/cache'

describe('surveillance cache keys', () => {
  it('builds stable params key', () => {
    expect(
      surveillanceParamsKey({ days: 7, min_magnitude: 2, include_global: true })
    ).toBe('7:2:1')
    expect(
      surveillanceParamsKey({ days: 7, min_magnitude: 2, include_global: false })
    ).toBe('7:2:0')
  })

  it('fresh TTL is 5 minutes', () => {
    expect(SURVEILLANCE_CACHE_FRESH_MS).toBe(5 * 60 * 1000)
  })
})
