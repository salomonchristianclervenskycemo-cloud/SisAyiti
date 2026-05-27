/** Payload for React hover card on the seismic map (replaces MapLibre HTML popups). */

export type MapHoverEvent = {
  id: string
  magnitude: number
  depth: number
  region: string
  source: string
  eventTime: string
  latitude: number
  longitude: number
  historical: boolean
  lngLat: [number, number]
}
