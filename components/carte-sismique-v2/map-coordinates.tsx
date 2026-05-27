'use client'

import { useEffect, useRef } from 'react'
import maplibregl from 'maplibre-gl'

export function MapCoordinates({
  map,
  coords,
}: {
  map: maplibregl.Map | null
  coords: { lng: number; lat: number } | null
}) {
  const scaleRef = useRef<maplibregl.ScaleControl | null>(null)

  useEffect(() => {
    if (!map || scaleRef.current) return

    const scale = new maplibregl.ScaleControl({ maxWidth: 100, unit: 'metric' })
    map.addControl(scale, 'bottom-right')
    scaleRef.current = scale

    return () => {
      if (scaleRef.current) {
        try {
          map.removeControl(scaleRef.current)
        } catch {
          /* map may already be removed */
        }
        scaleRef.current = null
      }
    }
  }, [map])

  if (!coords) return null

  const latDir = coords.lat >= 0 ? 'N' : 'S'
  const lngDir = coords.lng >= 0 ? 'E' : 'W'

  return (
    <div className="absolute bottom-3 right-3 z-[999] pointer-events-none">
      <div className="pointer-events-auto px-3 py-1.5 rounded-lg bg-black/55 backdrop-blur-xl border border-white/10 shadow-lg">
        <p className="text-[10px] font-mono text-gray-300">
          {Math.abs(coords.lat).toFixed(4)}°{latDir}, {Math.abs(coords.lng).toFixed(4)}°{lngDir}
        </p>
      </div>
    </div>
  )
}
