/** Browser geolocation helper — RN can swap with expo-location. */

export type GeoPosition = { latitude: number; longitude: number; accuracy?: number }

export function isGeolocationSupported(): boolean {
  return typeof navigator !== 'undefined' && 'geolocation' in navigator
}

export function getCurrentPosition(timeoutMs = 12_000): Promise<GeoPosition> {
  return new Promise((resolve, reject) => {
    if (!isGeolocationSupported()) {
      reject(new Error('GEOLOCATION_UNSUPPORTED'))
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        resolve({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
        }),
      (err) => reject(err),
      { enableHighAccuracy: true, timeout: timeoutMs, maximumAge: 60_000 }
    )
  })
}
