import {
  setSeismicMapFocusEventId,
  setSeismicMapViewportExpanded,
  useSeismicStore,
} from '@/lib/seismic-store'

describe('seismic store viewport helpers', () => {
  beforeEach(() => {
    useSeismicStore.setState({
      mapViewportExpanded: false,
      mapFocusEventId: null,
    })
  })

  it('updates mapViewportExpanded via setState helper', () => {
    setSeismicMapViewportExpanded(true)
    expect(useSeismicStore.getState().mapViewportExpanded).toBe(true)
    setSeismicMapViewportExpanded(false)
    expect(useSeismicStore.getState().mapViewportExpanded).toBe(false)
  })

  it('exposes setMapViewportExpanded on store', () => {
    expect(typeof useSeismicStore.getState().setMapViewportExpanded).toBe('function')
  })

  it('updates mapFocusEventId via helper', () => {
    setSeismicMapFocusEventId('usgs-test')
    expect(useSeismicStore.getState().mapFocusEventId).toBe('usgs-test')
    setSeismicMapFocusEventId(null)
    expect(useSeismicStore.getState().mapFocusEventId).toBeNull()
  })
})
