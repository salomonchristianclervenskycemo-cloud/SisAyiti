"use client"

import { useEffect, useRef, useState } from "react"
import maplibregl from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"
import { useTheme } from "next-themes"
import { SeismicEventUI, RiskLevel } from "@/lib/seismic-types"

interface LiveWorldMapProps {
  events: SeismicEventUI[]
  selectedEventId?: string | null
  onSelectEvent?: (event: SeismicEventUI) => void
}

const RISK_COLORS: Record<RiskLevel, string> = {
  critical: "#ef4444",
  high: "#f97316",
  medium: "#eab308",
  low: "#3b82f6",
}

export function LiveWorldMap({ events, selectedEventId, onSelectEvent }: LiveWorldMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<maplibregl.Map | null>(null)
  const viewState = useRef<{ center: [number, number], zoom: number } | null>(null)
  const lastFlownEventId = useRef<string | null>(null)
  const { resolvedTheme } = useTheme()
  const eventsRef = useRef(events)
  const onSelectRef = useRef(onSelectEvent)
  eventsRef.current = events
  onSelectRef.current = onSelectEvent

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
      center: viewState.current?.center || [0, 20],
      zoom: viewState.current?.zoom || 1,
      interactive: true,
      attributionControl: false,
    })

    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "bottom-right")

    map.on("load", () => {
      setMapLoaded(true)

      // Source pour les séismes
      map.addSource("earthquakes-live", {
        type: "geojson",
        data: { type: "FeatureCollection", features: [] },
        cluster: true,
        clusterMaxZoom: 5,
        clusterRadius: 50
      })

      // Couche : Clusters
      map.addLayer({
        id: "clusters",
        type: "circle",
        source: "earthquakes-live",
        filter: ["has", "point_count"],
        paint: {
          "circle-color": [
            "step",
            ["get", "point_count"],
            "#3b82f6", // low
            10,
            "#eab308", // medium
            50,
            "#f97316"  // high
          ],
          "circle-radius": [
            "step",
            ["get", "point_count"],
            15,
            10,
            20,
            50,
            25
          ],
          "circle-opacity": 0.8,
          "circle-stroke-width": 2,
          "circle-stroke-color": "rgba(255,255,255,0.5)"
        }
      })

      // Couche : Compte des clusters
      map.addLayer({
        id: "cluster-count",
        type: "symbol",
        source: "earthquakes-live",
        filter: ["has", "point_count"],
        layout: {
          "text-field": "{point_count_abbreviated}",
          "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
          "text-size": 12
        },
        paint: {
          "text-color": "#ffffff"
        }
      })

      // Couche : Halo pulsant pour les points non-clusterisés
      map.addLayer({
        id: "unclustered-halo",
        type: "circle",
        source: "earthquakes-live",
        filter: ["!", ["has", "point_count"]],
        paint: {
          "circle-radius": [
            "interpolate", ["linear"], ["zoom"],
            1, ["*", ["get", "mag"], 1.5],
            8, ["*", ["get", "mag"], 5]
          ],
          "circle-color": ["get", "color"],
          "circle-opacity": 0.3,
          "circle-stroke-width": 1,
          "circle-stroke-color": ["get", "color"],
          "circle-stroke-opacity": 0.5
        }
      })

      // Couche : Points non-clusterisés
      map.addLayer({
        id: "unclustered-point",
        type: "circle",
        source: "earthquakes-live",
        filter: ["!", ["has", "point_count"]],
        paint: {
          "circle-radius": [
            "interpolate", ["linear"], ["zoom"],
            1, ["max", 2, ["/", ["get", "mag"], 1.5]],
            8, ["max", 4, ["*", ["get", "mag"], 1.2]]
          ],
          "circle-color": ["get", "color"],
          "circle-opacity": 0.9,
          "circle-stroke-width": 1,
          "circle-stroke-color": "#ffffff"
        }
      })

      // Interaction : Clic sur un cluster pour zoomer
      map.on('click', 'clusters', (e) => {
        const features = map.queryRenderedFeatures(e.point, { layers: ['clusters'] })
        const clusterId = features[0].properties.cluster_id
        const source = map.getSource('earthquakes-live') as maplibregl.GeoJSONSource
        
        source.getClusterExpansionZoom(clusterId).then((zoom) => {
          map.easeTo({
            center: (features[0].geometry as GeoJSON.Point).coordinates as [number, number],
            zoom: zoom
          })
        }).catch(() => {})
      })

      // Interaction : Clic sur un point pour le sélectionner
      map.on('click', 'unclustered-point', (e) => {
        if (!e.features || e.features.length === 0) return
        const eventId = e.features[0].properties?.id as string
        const fullEvent = eventsRef.current.find((ev) => ev.id === eventId)
        if (fullEvent) onSelectRef.current?.(fullEvent)
      })

      // Curseur pointer
      map.on('mouseenter', 'clusters', () => { map.getCanvas().style.cursor = 'pointer' })
      map.on('mouseleave', 'clusters', () => { map.getCanvas().style.cursor = '' })
      map.on('mouseenter', 'unclustered-point', () => { map.getCanvas().style.cursor = 'pointer' })
      map.on('mouseleave', 'unclustered-point', () => { map.getCanvas().style.cursor = '' })
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

  // Mise à jour des données
  useEffect(() => {
    const map = mapRef.current
    if (!map || !mapLoaded) return

    const source = map.getSource("earthquakes-live") as maplibregl.GeoJSONSource
    if (source) {
      const geojson: GeoJSON.FeatureCollection = {
        type: "FeatureCollection",
        features: events.map(e => ({
          type: "Feature",
          geometry: { type: "Point", coordinates: [e.longitude, e.latitude] },
          properties: {
            id: e.id,
            mag: e.magnitude,
            color: RISK_COLORS[e.risk],
            depth: e.depth,
            place: e.region
          }
        }))
      }
      source.setData(geojson)
    }
  }, [events, mapLoaded])

  // Animation de pulsation
  useEffect(() => {
    const map = mapRef.current
    if (!map || !mapLoaded) return

    let animationId: number
    let phase = 0

    const animate = () => {
      if (!mapRef.current) return // Stop loop if map is destroyed

      if (mapRef.current.getStyle() && mapRef.current.getLayer("unclustered-halo")) {
        phase += 0.05
        const scale = 1 + 0.3 * Math.sin(phase)
        
        mapRef.current.setPaintProperty("unclustered-halo", "circle-radius", [
          "interpolate", ["linear"], ["zoom"],
          1, ["*", ["get", "mag"], 1.5 * scale],
          8, ["*", ["get", "mag"], 5 * scale]
        ])
      }
      
      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => cancelAnimationFrame(animationId)
  }, [mapLoaded])

  // Centrer sur l'événement sélectionné
  useEffect(() => {
    const map = mapRef.current
    if (!map || !mapLoaded || !selectedEventId) return

    if (lastFlownEventId.current === selectedEventId) return

    const selectedEvent = events.find(e => e.id === selectedEventId)
    if (selectedEvent) {
      map.flyTo({
        center: [selectedEvent.longitude, selectedEvent.latitude],
        zoom: Math.max(map.getZoom(), 4),
        duration: 2000,
        essential: true
      })
      lastFlownEventId.current = selectedEventId
    }
  }, [selectedEventId, events, mapLoaded])

  return (
    <div className="relative w-full h-full min-h-[250px] rounded-xl overflow-hidden bg-secondary/20">
      <div ref={mapContainer} className="absolute inset-0 w-full h-full" />
      {/* Overlay gradient pour intégration douce */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_20px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_0_40px_rgba(0,0,0,0.5)]" />
    </div>
  )
}
