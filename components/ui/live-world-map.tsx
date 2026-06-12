"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import maplibregl from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"
import { useTheme } from "next-themes"
import { SeismicEventUI, RiskLevel } from "@/lib/seismic-types"
import { CARTO_DARK_STYLE, CARTO_LIGHT_STYLE } from "@/lib/seismic-layers-data"
import { capEventsForMap } from "@/lib/map-event-cap"
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

const MINI_MAP_EVENT_CAP = 120

function eventsToGeoJSON(events: SeismicEventUI[]): GeoJSON.FeatureCollection {
  return {
    type: "FeatureCollection",
    features: events.map((e) => ({
      type: "Feature",
      geometry: { type: "Point", coordinates: [e.longitude, e.latitude] },
      properties: {
        id: e.id,
        mag: e.magnitude,
        color: RISK_COLORS[e.risk] ?? RISK_COLORS.low,
        depth: e.depth,
        place: e.region,
      },
    })),
  }
}

export function LiveWorldMap({ events, selectedEventId, onSelectEvent }: LiveWorldMapProps) {
  const mapEvents = capEventsForMap(events, MINI_MAP_EVENT_CAP)

  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<maplibregl.Map | null>(null)
  const layersReadyRef = useRef(false)
  const lastFlownEventId = useRef<string | null>(null)
  const { resolvedTheme } = useTheme()
  const eventsRef = useRef(mapEvents)
  const onSelectRef = useRef(onSelectEvent)
  eventsRef.current = mapEvents
  onSelectRef.current = onSelectEvent

  const [mapLoaded, setMapLoaded] = useState(false)

  const pushEventsToMap = useCallback((map: maplibregl.Map) => {
    const source = map.getSource("earthquakes-live") as maplibregl.GeoJSONSource | undefined
    if (!source) return false
    source.setData(eventsToGeoJSON(eventsRef.current))
    return true
  }, [])

  const setupLayers = useCallback((map: maplibregl.Map) => {
    if (layersReadyRef.current && map.getSource("earthquakes-live")) {
      pushEventsToMap(map)
      return
    }

    if (!map.getSource("earthquakes-live")) {
      map.addSource("earthquakes-live", {
        type: "geojson",
        data: eventsToGeoJSON(eventsRef.current),
        cluster: true,
        clusterMaxZoom: 5,
        clusterRadius: 50,
      })
    }

    if (!map.getLayer("clusters")) {
      map.addLayer({
        id: "clusters",
        type: "circle",
        source: "earthquakes-live",
        filter: ["has", "point_count"],
        paint: {
          "circle-color": [
            "step",
            ["get", "point_count"],
            "#3b82f6",
            10,
            "#eab308",
            50,
            "#f97316",
          ],
          "circle-radius": ["step", ["get", "point_count"], 15, 10, 20, 50, 25],
          "circle-opacity": 0.8,
          "circle-stroke-width": 2,
          "circle-stroke-color": "rgba(255,255,255,0.5)",
        },
      })
    }

    if (!map.getLayer("unclustered-halo")) {
      map.addLayer({
        id: "unclustered-halo",
        type: "circle",
        source: "earthquakes-live",
        filter: ["!", ["has", "point_count"]],
        paint: {
          "circle-radius": [
            "interpolate",
            ["linear"],
            ["zoom"],
            1,
            ["*", ["coalesce", ["get", "mag"], 2], 1.5],
            8,
            ["*", ["coalesce", ["get", "mag"], 2], 5],
          ],
          "circle-color": ["get", "color"],
          "circle-opacity": 0.3,
          "circle-stroke-width": 1,
          "circle-stroke-color": ["get", "color"],
          "circle-stroke-opacity": 0.5,
        },
      })
    }

    if (!map.getLayer("unclustered-point")) {
      map.addLayer({
        id: "unclustered-point",
        type: "circle",
        source: "earthquakes-live",
        filter: ["!", ["has", "point_count"]],
        paint: {
          "circle-radius": [
            "interpolate",
            ["linear"],
            ["zoom"],
            1,
            ["max", 2, ["/", ["coalesce", ["get", "mag"], 2], 1.5]],
            8,
            ["max", 4, ["*", ["coalesce", ["get", "mag"], 2], 1.2]],
          ],
          "circle-color": ["get", "color"],
          "circle-opacity": 0.9,
          "circle-stroke-width": 1,
          "circle-stroke-color": "#ffffff",
        },
      })

      map.on("click", "clusters", (e) => {
        const features = map.queryRenderedFeatures(e.point, { layers: ["clusters"] })
        if (!features[0]?.properties?.cluster_id) return
        const clusterId = features[0].properties.cluster_id as number
        const source = map.getSource("earthquakes-live") as maplibregl.GeoJSONSource
        source
          .getClusterExpansionZoom(clusterId)
          .then((zoom) => {
            if (features[0].geometry?.type === "Point") {
              map.easeTo({
                center: features[0].geometry.coordinates as [number, number],
                zoom,
              })
            }
          })
          .catch(() => {})
      })

      map.on("click", "unclustered-point", (e) => {
        if (!e.features?.length) return
        const eventId = e.features[0].properties?.id as string
        const fullEvent = eventsRef.current.find((ev) => ev.id === eventId)
        if (fullEvent) onSelectRef.current?.(fullEvent)
      })

      map.on("mouseenter", "clusters", () => {
        map.getCanvas().style.cursor = "pointer"
      })
      map.on("mouseleave", "clusters", () => {
        map.getCanvas().style.cursor = ""
      })
      map.on("mouseenter", "unclustered-point", () => {
        map.getCanvas().style.cursor = "pointer"
      })
      map.on("mouseleave", "unclustered-point", () => {
        map.getCanvas().style.cursor = ""
      })
    }

    layersReadyRef.current = true
    pushEventsToMap(map)
  }, [pushEventsToMap])

  useEffect(() => {
    if (!mapContainer.current) return

    layersReadyRef.current = false
    setMapLoaded(false)

    if (mapRef.current) {
      mapRef.current.remove()
      mapRef.current = null
    }

    const isDark = resolvedTheme === "dark" || !resolvedTheme
    const style = (isDark ? CARTO_DARK_STYLE : CARTO_LIGHT_STYLE) as maplibregl.StyleSpecification

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style,
      center: [0, 20],
      zoom: 1,
      interactive: true,
      attributionControl: false,
    })

    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "bottom-right")

    const onLoad = () => {
      map.resize()
      setupLayers(map)
      setMapLoaded(true)
    }

    map.once("load", onLoad)
    mapRef.current = map

    const ro =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => map.resize())
        : null
    if (ro && mapContainer.current) ro.observe(mapContainer.current)

    return () => {
      ro?.disconnect()
      map.off("load", onLoad)
      layersReadyRef.current = false
      map.remove()
      mapRef.current = null
      setMapLoaded(false)
    }
  }, [resolvedTheme, setupLayers])

  useEffect(() => {
    const map = mapRef.current
    if (!map || !mapLoaded) return
    if (pushEventsToMap(map)) return

    const timer = window.setInterval(() => {
      if (pushEventsToMap(map)) window.clearInterval(timer)
    }, 100)
    return () => window.clearInterval(timer)
  }, [mapEvents, mapLoaded, pushEventsToMap])

  useEffect(() => {
    const map = mapRef.current
    if (!map || !mapLoaded || !selectedEventId) return
    if (lastFlownEventId.current === selectedEventId) return

    const selectedEvent = events.find((e) => e.id === selectedEventId)
    if (selectedEvent) {
      map.flyTo({
        center: [selectedEvent.longitude, selectedEvent.latitude],
        zoom: Math.max(map.getZoom(), 4),
        duration: 1200,
        essential: true,
      })
      lastFlownEventId.current = selectedEventId
    }
  }, [selectedEventId, events, mapLoaded])

  return (
    <div className="relative w-full h-full min-h-[220px] rounded-xl overflow-hidden bg-secondary/20">
      <div ref={mapContainer} className="absolute inset-0 w-full h-full min-h-[220px]" />
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_20px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_0_40px_rgba(0,0,0,0.5)]" />
    </div>
  )
}
