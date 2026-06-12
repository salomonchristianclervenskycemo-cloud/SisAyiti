import {
  isStoreHydrationFresh,
  SEISMIC_STORE_FRESH_MS,
  type SeismicDataHydration,
} from '@/lib/seismic-hydration'

describe('seismic hydration', () => {
  const surveillance: SeismicDataHydration = {
    scope: 'surveillance',
    days: 7,
    minMagnitude: 2,
    includeGlobal: true,
    syncedAt: new Date().toISOString(),
    source: 'surveillance-live',
  }

  it('matches when scope and params align', () => {
    expect(isStoreHydrationFresh(surveillance, 7, 2, 'surveillance', true)).toBe(true)
  })

  it('rejects carte scope with surveillance hydration', () => {
    expect(isStoreHydrationFresh(surveillance, 7, 2, 'carte', false)).toBe(false)
  })

  it('rejects mismatched includeGlobal', () => {
    expect(isStoreHydrationFresh(surveillance, 7, 2, 'surveillance', false)).toBe(false)
  })

  it('rejects stale sync', () => {
    const old: SeismicDataHydration = {
      ...surveillance,
      syncedAt: new Date(Date.now() - SEISMIC_STORE_FRESH_MS - 1000).toISOString(),
    }
    expect(isStoreHydrationFresh(old, 7, 2, 'surveillance', true)).toBe(false)
  })
})
