"use client"

import { useEffect, useRef, useState } from "react"
import maplibregl from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"
import { SeismicEventUI } from "@/lib/seismic-types"
import { useTheme } from "next-themes"

interface EventMiniMapProps {
  event: SeismicEventUI
  color: string
}

export function EventMiniMap({ event, color }: EventMiniMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<maplibregl.Map | null>(null)
  const viewState = useRef<{ center: [number, number], zoom: number } | null>(null)
  const lastEventId = useRef<string | null>(null)
  const { resolvedTheme } = useTheme()
  const [mapLoaded, setMapLoaded] = useState(false)

  // Initialisation de la carte
  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return

    setMapLoaded(false)

    const isDark = resolvedTheme === "dark" || !resolvedTheme
    const styleUrl = isDark 
      ? "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
      : "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: styleUrl,
      center: viewState.current?.center || [event.longitude, event.latitude],
      zoom: viewState.current?.zoom || 5,
      interactive: true,
      attributionControl: false,
    })

    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "bottom-right")

    map.on("load", () => {
      setMapLoaded(true)
      
      // Ajouter la source pour l'épicentre
      map.addSource("epicenter", {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: { type: "Point", coordinates: [event.longitude, event.latitude] },
          properties: { mag: event.magnitude }
        }
      })

      // Couche : Halo pulsant
      map.addLayer({
        id: "epicenter-halo",
        type: "circle",
        source: "epicenter",
        paint: {
          "circle-radius": [
            "interpolate", ["linear"], ["zoom"],
            2, ["*", ["get", "mag"], 2],
            10, ["*", ["get", "mag"], 15]
          ],
          "circle-color": color,
          "circle-opacity": 0.2,
          "circle-stroke-width": 1,
          "circle-stroke-color": color,
          "circle-stroke-opacity": 0.5
        }
      })

      // Couche : Point central
      map.addLayer({
        id: "epicenter-core",
        type: "circle",
        source: "epicenter",
        paint: {
          "circle-radius": [
            "interpolate", ["linear"], ["zoom"],
            2, 2,
            10, 6
          ],
          "circle-color": "#ffffff",
          "circle-stroke-width": 2,
          "circle-stroke-color": color
        }
      })
    })

    mapRef.current = map

    return () => {
      if (mapRef.current) {
        viewState.current = {
          center: mapRef.current.getCenter().toArray() as [number, number],
          zoom: mapRef.current.getZoom()
        }
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [resolvedTheme]) // Re-init si le thème change

  // Mise à jour de la position quand l'événement change
  useEffect(() => {
    const map = mapRef.current
    if (!map || !mapLoaded) return

    // Fly to new location ONLY if event changed
    if (lastEventId.current !== event.id) {
      map.flyTo({
        center: [event.longitude, event.latitude],
        zoom: Math.max(map.getZoom(), 6),
        duration: 1500,
        essential: true
      })
      lastEventId.current = event.id
    }

    // Update source data
    const source = map.getSource("epicenter") as maplibregl.GeoJSONSource
    if (source) {
      source.setData({
        type: "Feature",
        geometry: { type: "Point", coordinates: [event.longitude, event.latitude] },
        properties: { mag: event.magnitude }
      })
    }

    // Update colors
    if (map.getStyle() && map.getLayer("epicenter-halo")) {
      map.setPaintProperty("epicenter-halo", "circle-color", color)
      map.setPaintProperty("epicenter-halo", "circle-stroke-color", color)
    }
    if (map.getStyle() && map.getLayer("epicenter-core")) {
      map.setPaintProperty("epicenter-core", "circle-stroke-color", color)
    }

  }, [event, color, mapLoaded])

  return (
    <div className="relative w-full h-full min-h-[250px] rounded-xl overflow-hidden border border-border/50 shadow-inner">
      <div ref={mapContainer} className="absolute inset-0 w-full h-full" />
      {/* Overlay gradient pour intégration douce */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_20px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_0_40px_rgba(0,0,0,0.8)]" />
      
      {/* Badge info sur la carte */}
      <div className="absolute top-3 left-3 pointer-events-none">
        <div className="px-2 py-1 bg-background/80 backdrop-blur-md border border-border rounded-md text-[10px] font-mono font-bold text-foreground shadow-sm">
          {event.latitude.toFixed(3)}°, {event.longitude.toFixed(3)}°
        </div>
      </div>
    </div>
  )
}
