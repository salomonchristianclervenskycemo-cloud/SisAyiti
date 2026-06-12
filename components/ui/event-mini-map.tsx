"use client"

import { useEffect, useRef, useState } from "react"
import maplibregl from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"
import { SeismicEventUI } from "@/lib/seismic-types"
import { useTheme } from "next-themes"
import { CARTO_DARK_STYLE, CARTO_LIGHT_STYLE } from "@/lib/seismic-layers-data"

interface EventMiniMapProps {
  event: SeismicEventUI
  color: string
}

/** Carte épicentre légère — pas de clusters ni animation continue */
export function EventMiniMap({ event, color }: EventMiniMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<maplibregl.Map | null>(null)
  const lastEventId = useRef<string | null>(null)
  const { resolvedTheme } = useTheme()
  const [mapLoaded, setMapLoaded] = useState(false)

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return

    setMapLoaded(false)
    const isDark = resolvedTheme === "dark" || !resolvedTheme
    const style = (isDark ? CARTO_DARK_STYLE : CARTO_LIGHT_STYLE) as maplibregl.StyleSpecification

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style,
      center: [event.longitude, event.latitude],
      zoom: 5,
      interactive: false,
      attributionControl: false,
      renderWorldCopies: false,
    })

    map.on("load", () => {
      setMapLoaded(true)
      map.addSource("epicenter", {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: { type: "Point", coordinates: [event.longitude, event.latitude] },
          properties: { mag: event.magnitude },
        },
      })
      map.addLayer({
        id: "epicenter-halo",
        type: "circle",
        source: "epicenter",
        paint: {
          "circle-radius": 18,
          "circle-color": color,
          "circle-opacity": 0.25,
          "circle-stroke-width": 1,
          "circle-stroke-color": color,
          "circle-stroke-opacity": 0.4,
        },
      })
      map.addLayer({
        id: "epicenter-core",
        type: "circle",
        source: "epicenter",
        paint: {
          "circle-radius": 6,
          "circle-color": "#ffffff",
          "circle-stroke-width": 2,
          "circle-stroke-color": color,
        },
      })
    })

    mapRef.current = map
    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [resolvedTheme, event.longitude, event.latitude, event.magnitude, color])

  useEffect(() => {
    const map = mapRef.current
    if (!map || !mapLoaded) return

    if (lastEventId.current !== event.id) {
      map.jumpTo({ center: [event.longitude, event.latitude], zoom: Math.max(map.getZoom(), 6) })
      lastEventId.current = event.id
    }

    const source = map.getSource("epicenter") as maplibregl.GeoJSONSource | undefined
    if (source) {
      source.setData({
        type: "Feature",
        geometry: { type: "Point", coordinates: [event.longitude, event.latitude] },
        properties: { mag: event.magnitude },
      })
    }
    if (map.getLayer("epicenter-halo")) {
      map.setPaintProperty("epicenter-halo", "circle-color", color)
      map.setPaintProperty("epicenter-halo", "circle-stroke-color", color)
    }
    if (map.getLayer("epicenter-core")) {
      map.setPaintProperty("epicenter-core", "circle-stroke-color", color)
    }
  }, [event, color, mapLoaded])

  return (
    <div className="relative w-full h-full min-h-[220px] rounded-xl overflow-hidden border border-border/50 shadow-inner">
      <div ref={mapContainer} className="absolute inset-0 w-full h-full" />
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_20px_rgba(0,0,0,0.08)] dark:shadow-[inset_0_0_32px_rgba(0,0,0,0.45)]" />
      <div className="absolute top-3 left-3 pointer-events-none">
        <div className="px-2 py-1 bg-background/80 backdrop-blur-md border border-border rounded-md text-[10px] font-mono font-bold text-foreground shadow-sm">
          {event.latitude.toFixed(3)}°, {event.longitude.toFixed(3)}°
        </div>
      </div>
    </div>
  )
}
