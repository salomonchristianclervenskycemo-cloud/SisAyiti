'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'
import type { SeismicEventUI } from '@/lib/seismic-types'
import { FAULT_LINES_GEOJSON, FAULT_PALETTE } from '@/lib/haiti-fault-geo'
import { HAITI_BOUNDS, SATELLITE_STYLE, CARTO_DARK_STYLE } from '@/lib/seismic-layers-data'

const CITIES_GEOJSON: GeoJSON.FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    { type: 'Feature', properties: { name: 'PAP', key: 'comp.faultMap.pap' }, geometry: { type: 'Point', coordinates: [-72.335, 18.539] } },
    { type: 'Feature', properties: { name: 'Cap', key: 'comp.faultMap.cap' }, geometry: { type: 'Point', coordinates: [-72.201, 19.759] } },
    { type: 'Feature', properties: { name: 'Léogâne', key: 'comp.faultMap.leogane' }, geometry: { type: 'Point', coordinates: [-72.633, 18.511] } },
  ],
}

type Props = {
  events?: SeismicEventUI[]
  className?: string
  minHeight?: number
  interactive?: boolean
  showLegend?: boolean
  satellite?: boolean
}

function eventsToGeoJSON(events: SeismicEventUI[]): GeoJSON.FeatureCollection {
  return {
    type: 'FeatureCollection',
    features: events.map((e) => ({
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [e.longitude, e.latitude] },
      properties: {
        id: e.id,
        mag: e.magnitude,
        color: e.magnitude >= 5 ? '#ef4444' : e.magnitude >= 4 ? '#f97316' : '#2e8bc0',
      },
    })),
  }
}

function addFaultLayers(map: maplibregl.Map) {
  const { epgf, sept } = FAULT_PALETTE

  if (!map.getSource('fault-lines')) {
    map.addSource('fault-lines', { type: 'geojson', data: FAULT_LINES_GEOJSON })
  }

  const addLine = (
    id: string,
    filter: maplibregl.FilterSpecification,
    paint: maplibregl.LineLayerSpecification['paint'],
    layout?: maplibregl.LineLayerSpecification['layout']
  ) => {
    if (!map.getLayer(id)) {
      map.addLayer({
        id,
        type: 'line',
        source: 'fault-lines',
        filter,
        paint,
        ...(layout ? { layout } : {}),
      })
    }
  }

  addLine('home-fault-sept-glow', ['==', ['get', 'id'], 'septentrionale'], {
    'line-color': sept.glow,
    'line-width': ['interpolate', ['linear'], ['zoom'], 7, 6, 10, 10],
    'line-opacity': 0.35,
    'line-blur': 3,
  })
  addLine('home-fault-sept-core', ['==', ['get', 'id'], 'septentrionale'], {
    'line-color': sept.core,
    'line-width': ['interpolate', ['linear'], ['zoom'], 7, 2, 10, 3],
    'line-opacity': 0.9,
    'line-dasharray': [3, 2],
  })
  addLine('home-fault-epgf-glow', ['==', ['get', 'id'], 'enriquillo'], {
    'line-color': epgf.glow,
    'line-width': ['interpolate', ['linear'], ['zoom'], 7, 8, 10, 14],
    'line-opacity': 0.4,
    'line-blur': 4,
  })
  addLine('home-fault-epgf-core', ['==', ['get', 'id'], 'enriquillo'], {
    'line-color': epgf.core,
    'line-width': ['interpolate', ['linear'], ['zoom'], 7, 2.5, 10, 4],
    'line-opacity': 1,
  })
}

function addCityLayers(map: maplibregl.Map) {
  if (!map.getSource('haiti-cities')) {
    map.addSource('haiti-cities', { type: 'geojson', data: CITIES_GEOJSON })
  }
  if (!map.getLayer('haiti-cities-dot')) {
    map.addLayer({
      id: 'haiti-cities-dot',
      type: 'circle',
      source: 'haiti-cities',
      paint: {
        'circle-radius': 5,
        'circle-color': '#22c55e',
        'circle-stroke-width': 2,
        'circle-stroke-color': '#ffffff',
      },
    })
  }
  if (!map.getLayer('haiti-cities-label')) {
    map.addLayer({
      id: 'haiti-cities-label',
      type: 'symbol',
      source: 'haiti-cities',
      layout: {
        'text-field': ['get', 'name'],
        'text-size': 11,
        'text-offset': [0, 1.2],
        'text-anchor': 'top',
        'text-font': ['Open Sans Regular', 'Arial Unicode MS Regular'],
      },
      paint: {
        'text-color': '#ffffff',
        'text-halo-color': 'rgba(0,0,0,0.75)',
        'text-halo-width': 1.5,
      },
    })
  }
}

function addQuakeLayers(map: maplibregl.Map, data: GeoJSON.FeatureCollection) {
  if (!map.getSource('home-quakes')) {
    map.addSource('home-quakes', { type: 'geojson', data })
  } else {
    (map.getSource('home-quakes') as maplibregl.GeoJSONSource).setData(data)
  }
  if (!map.getLayer('home-quakes-halo')) {
    map.addLayer({
      id: 'home-quakes-halo',
      type: 'circle',
      source: 'home-quakes',
      paint: {
        'circle-radius': ['interpolate', ['linear'], ['get', 'mag'], 2, 8, 5, 18, 7, 28],
        'circle-color': ['get', 'color'],
        'circle-opacity': 0.25,
      },
    })
  }
  if (!map.getLayer('home-quakes-point')) {
    map.addLayer({
      id: 'home-quakes-point',
      type: 'circle',
      source: 'home-quakes',
      paint: {
        'circle-radius': ['interpolate', ['linear'], ['get', 'mag'], 2, 3, 5, 6, 7, 9],
        'circle-color': ['get', 'color'],
        'circle-stroke-width': 1.5,
        'circle-stroke-color': '#ffffff',
        'circle-opacity': 0.95,
      },
    })
  }
}

export function HomeHaitiMapLibre({
  events = [],
  className,
  minHeight = 300,
  interactive = false,
  showLegend = false,
  satellite = true,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<maplibregl.Map | null>(null)
  const { resolvedTheme } = useTheme()
  const [ready, setReady] = useState(false)
  const eventsRef = useRef(events)
  eventsRef.current = events

  const setupLayers = useCallback((map: maplibregl.Map) => {
    addFaultLayers(map)
    addCityLayers(map)
    addQuakeLayers(map, eventsToGeoJSON(eventsRef.current))
    map.fitBounds(
      [[HAITI_BOUNDS[0], HAITI_BOUNDS[1]], [HAITI_BOUNDS[2], HAITI_BOUNDS[3]]],
      { padding: 32, duration: 0, maxZoom: 9 }
    )
  }, [])

  useEffect(() => {
    if (!containerRef.current) return

    setReady(false)
    if (mapRef.current) {
      mapRef.current.remove()
      mapRef.current = null
    }

    const isDark = resolvedTheme === 'dark' || !resolvedTheme
    const style = (satellite ? SATELLITE_STYLE : isDark ? CARTO_DARK_STYLE : CARTO_DARK_STYLE) as maplibregl.StyleSpecification

    const map = new maplibregl.Map({
      container: containerRef.current,
      style,
      bounds: [[HAITI_BOUNDS[0], HAITI_BOUNDS[1]], [HAITI_BOUNDS[2], HAITI_BOUNDS[3]]],
      fitBoundsOptions: { padding: 32, maxZoom: 9 },
      interactive,
      attributionControl: false,
      dragRotate: false,
      pitchWithRotate: false,
      touchPitch: false,
    })

    map.on('load', () => {
      map.resize()
      setupLayers(map)
      setReady(true)
    })

    mapRef.current = map
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(() => map.resize()) : null
    if (ro && containerRef.current) ro.observe(containerRef.current)

    return () => {
      ro?.disconnect()
      map.remove()
      mapRef.current = null
      setReady(false)
    }
  }, [resolvedTheme, interactive, satellite, setupLayers])

  useEffect(() => {
    const map = mapRef.current
    if (!map || !ready) return
    const src = map.getSource('home-quakes') as maplibregl.GeoJSONSource | undefined
    if (src) src.setData(eventsToGeoJSON(events))
  }, [events, ready])

  return (
    <div className={cn('relative rounded-xl overflow-hidden', className)} style={{ minHeight }}>
      <div ref={containerRef} className="absolute inset-0 w-full h-full" style={{ minHeight }} />
      <div
        className="absolute inset-0 pointer-events-none rounded-xl"
        style={{
          background: 'linear-gradient(180deg, rgba(13,43,85,0.15) 0%, transparent 40%, rgba(13,43,85,0.25) 100%)',
        }}
        aria-hidden
      />
      {showLegend && (
        <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-3 text-[10px] font-semibold bg-background/80 backdrop-blur-md border border-border/50 rounded-lg px-3 py-2 pointer-events-none">
          <span className="flex items-center gap-1.5 text-foreground">
            <span className="w-5 h-1 rounded-full bg-red-500" />
            EPGF
          </span>
          <span className="flex items-center gap-1.5 text-foreground">
            <span className="w-5 h-0.5 border-t-2 border-dashed border-blue-400" />
            Septentrionale
          </span>
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-primary" />
            Séismes récents
          </span>
        </div>
      )}
      {!ready && (
        <div className="absolute inset-0 bg-muted/40 animate-pulse rounded-xl" aria-hidden />
      )}
    </div>
  )
}
