import { useSeismicStore } from '@/lib/seismic-store'

describe('seismic store map style', () => {
  beforeEach(() => {
    useSeismicStore.setState({ mapStyle: 'satellite' })
  })

  it('switches between dark and satellite', () => {
    useSeismicStore.getState().setMapStyle('dark')
    expect(useSeismicStore.getState().mapStyle).toBe('dark')
    useSeismicStore.getState().setMapStyle('satellite')
    expect(useSeismicStore.getState().mapStyle).toBe('satellite')
  })
})
