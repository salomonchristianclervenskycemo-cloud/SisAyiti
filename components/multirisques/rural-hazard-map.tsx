'use client'

import { useEffect, useRef } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { useTheme } from 'next-themes'
import {
  HAITI_RURAL_MAP_CENTER,
  HAITI_RURAL_MAP_ZOOM,
  RURAL_HAZARD_ZONES,
  getRuralZoneById,
} from '@/lib/rural-hazard-data'
import { RURAL_MAP_STYLE_DARK, RURAL_MAP_STYLE_LIGHT } from '@/lib/rural-map-style'
import { useLang } from '@/lib/lang-context'

const RISK_COLORS = {
  critical: '#ef4444',
  high: '#f97316',
  medium: '#eab308',
} as const

type RuralHazardMapProps = {
  selectedZoneId: string | null
  onSelectZone?: (id: string) => void
}

function setupZoneLayers(map: maplibregl.Map) {
  if (map.getSource('rural-zones')) return

  const geojson: GeoJSON.FeatureCollection = {
    type: 'FeatureCollection',
    features: RURAL_HAZARD_ZONES.map((z) => ({
      type: 'Feature',
      id: z.id,
      properties: {
        id: z.id,
        name: z.name,
        riskLevel: z.riskLevel,
      },
      geometry: {
        type: 'Point',
        coordinates: [z.lon, z.lat],
      },
    })),
  }

  map.addSource('rural-zones', {
    type: 'geojson',
    data: geojson,
    promoteId: 'id',
  })

  map.addLayer({
    id: 'rural-zones-halo',
    type: 'circle',
    source: 'rural-zones',
    paint: {
      'circle-radius': 16,
      'circle-color': [
        'match',
        ['get', 'riskLevel'],
        'critical',
        RISK_COLORS.critical,
        'high',
        RISK_COLORS.high,
        RISK_COLORS.medium,
      ],
      'circle-opacity': 0.3,
    },
  })

  map.addLayer({
    id: 'rural-zones-point',
    type: 'circle',
    source: 'rural-zones',
    paint: {
      'circle-radius': 8,
      'circle-color': [
        'match',
        ['get', 'riskLevel'],
        'critical',
        RISK_COLORS.critical,
        'high',
        RISK_COLORS.high,
        RISK_COLORS.medium,
      ],
      'circle-stroke-width': 2,
      'circle-stroke-color': '#ffffff',
      'circle-opacity': 1,
    },
  })
}

export function RuralHazardMap({ selectedZoneId, onSelectZone }: RuralHazardMapProps) {
  const { t } = useLang()
  const { resolvedTheme } = useTheme()
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<maplibregl.Map | null>(null)
  const selectedZoneIdRef = useRef(selectedZoneId)
  const onSelectRef = useRef(onSelectZone)
  selectedZoneIdRef.current = selectedZoneId
  onSelectRef.current = onSelectZone

  const flyToZone = (map: maplibregl.Map, zoneId: string) => {
    const zone = getRuralZoneById(zoneId)
    if (!zone) return
    map.flyTo({
      center: [zone.lon, zone.lat],
      zoom: zone.zoom,
      duration: 1100,
      essential: true,
    })
    if (map.getLayer('rural-zones-point')) {
      map.setPaintProperty('rural-zones-point', 'circle-radius', [
        'case',
        ['==', ['get', 'id'], zoneId],
        11,
        8,
      ])
    }
  }

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const isDark = resolvedTheme === 'dark' || !resolvedTheme
    const style = (isDark ? RURAL_MAP_STYLE_DARK : RURAL_MAP_STYLE_LIGHT) as maplibregl.StyleSpecification

    const map = new maplibregl.Map({
      container,
      style,
      center: HAITI_RURAL_MAP_CENTER,
      zoom: HAITI_RURAL_MAP_ZOOM,
      minZoom: 6,
      maxZoom: 14,
      maxBounds: [
        [-75.2, 17.2],
        [-71.0, 20.4],
      ],
      attributionControl: false,
    })

    mapRef.current = map

    const onPointClick = (e: maplibregl.MapLayerMouseEvent) => {
      const id = e.features?.[0]?.properties?.id as string | undefined
      if (id) onSelectRef.current?.(id)
    }

    const onLoad = () => {
      setupZoneLayers(map)
      map.resize()
      map.on('click', 'rural-zones-point', onPointClick)
      map.on('mouseenter', 'rural-zones-point', () => {
        map.getCanvas().style.cursor = 'pointer'
      })
      map.on('mouseleave', 'rural-zones-point', () => {
        map.getCanvas().style.cursor = ''
      })
      const id = selectedZoneIdRef.current
      if (id) flyToZone(map, id)
    }

    map.on('load', onLoad)

    const resizeObserver = new ResizeObserver(() => {
      map.resize()
    })
    resizeObserver.observe(container)

    const resizeTimer = window.setTimeout(() => map.resize(), 350)

    return () => {
      window.clearTimeout(resizeTimer)
      resizeObserver.disconnect()
      try {
        map.off('click', 'rural-zones-point', onPointClick)
      } catch {
        /* ok */
      }
      map.remove()
      mapRef.current = null
    }
  }, [resolvedTheme])

  useEffect(() => {
    const map = mapRef.current
    if (!map || !selectedZoneId) return

    const run = () => {
      if (!map.loaded()) return
      if (!map.getSource('rural-zones')) setupZoneLayers(map)
      flyToZone(map, selectedZoneId)
    }

    if (map.loaded()) run()
    else map.once('load', run)
  }, [selectedZoneId])

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-border/50 shadow-inner bg-muted/20">
      <div ref={containerRef} className="w-full h-[300px] md:h-[340px]" />
      <div className="absolute bottom-2 left-2 px-2 py-1 rounded-md bg-background/90 backdrop-blur text-[10px] text-muted-foreground border border-border/50 pointer-events-none">
        {t('multi.geo.attribution')} · CARTO / OSM
      </div>
    </div>
  )
}
