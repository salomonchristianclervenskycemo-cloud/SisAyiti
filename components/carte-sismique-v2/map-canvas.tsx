'use client'

import { useEffect, useRef } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { useSeismicStore } from '@/lib/seismic-store'
import { DEFAULT_LAYERS } from '@/lib/seismic-types'
import { filterSeismicEvents, useFilteredEvents } from '@/hooks/use-map-filters'
import { CARTO_DARK_STYLE, SATELLITE_STYLE } from '@/lib/seismic-layers-data'
import { HAITI_CENTER } from '@/lib/seismic-map-style'
import { HAITI_MAX_BOUNDS } from '@/lib/seismic-geo'
import { isPinnedHistoricalEvent } from '@/lib/haiti-historical-seismic'
import {
  applyLayerVisibility,
  highlightSelectedEvent,
  setupMapLayers,
  startPulseAnimation,
  updateEarthquakeData,
} from '@/lib/setup-map-layers'

export type MapCanvasProps = {
  onMapReady?: (map: maplibregl.Map) => void
  onCoordsChange?: (coords: { lng: number; lat: number } | null) => void
}

export function MapCanvas({ onMapReady, onCoordsChange }: MapCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<maplibregl.Map | null>(null)
  const readyRef = useRef(false)
  const stopPulseRef = useRef<(() => void) | null>(null)
  const stylingRef = useRef(false)
  const initStyleRef = useRef(true)
  const onSelectRef = useRef<((id: string, coords: [number, number]) => void) | undefined>(undefined)
  const onHoverRef = useRef<((event: import('@/lib/map-hover-types').MapHoverEvent | null) => void) | undefined>(undefined)

  const filteredEvents = useFilteredEvents()
  const mapStyle = useSeismicStore((s) => s.mapStyle)
  const layers = useSeismicStore((s) => s.layers) ?? DEFAULT_LAYERS
  const setSelectedEvent = useSeismicStore((s) => s.setSelectedEvent)
  const selectedId = useSeismicStore((s) => s.selectedEvent?.id)
  const events = useSeismicStore((s) => s.events)

  /* ---------------------------------------------------------------- */
  /*  Initialisation unique de la carte                                */
  /* ---------------------------------------------------------------- */
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    const style = mapStyle === 'satellite' ? SATELLITE_STYLE : CARTO_DARK_STYLE

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: style as maplibregl.StyleSpecification,
      center: HAITI_CENTER,
      zoom: 7.8,
      minZoom: 5,
      maxZoom: 15,
      maxBounds: HAITI_MAX_BOUNDS,
      attributionControl: false,
      maxPitch: 0,
    })

    mapRef.current = map
    onMapReady?.(map)

    // Callback de sélection événement (stocké en ref pour ne pas recréer)
    onSelectRef.current = (id: string, coordinates: [number, number]) => {
      const ev = useSeismicStore.getState().events.find((x) => x.id === id)
      if (!ev) return
      setSelectedEvent(ev)
      highlightSelectedEvent(map, id)
      map.flyTo({ center: coordinates, zoom: Math.max(map.getZoom(), 9.5), duration: 800, essential: true })
    }

    onHoverRef.current = (event) => {
      useSeismicStore.getState().setHoveredMapEvent(event)
    }

    const runSetup = (isStyleChange = false) => {
      const state = useSeismicStore.getState()
      const currentEvents = state.events.length > 0 ? state.events : []

      setupMapLayers(map, {
        initialEvents: currentEvents,
        onSelectEvent: onSelectRef.current,
        onHoverEvent: onHoverRef.current,
        isStyleChange,
      })
        .then(() => {
          readyRef.current = true
          const st = useSeismicStore.getState()
          const filtered = filterSeismicEvents(st.events, st.filters)
          updateEarthquakeData(map, filtered)
          applyLayerVisibility(map, st.layers)

          if (stopPulseRef.current) stopPulseRef.current()
          stopPulseRef.current = startPulseAnimation(map)

          const sel = st.selectedEvent?.id
          if (sel) highlightSelectedEvent(map, sel)

          // Centrer sur les séismes historiques si présents
          const pinned = filtered.filter((e) => isPinnedHistoricalEvent(e.id))
          if (pinned.length > 0) {
            const lngs = pinned.map((e) => e.longitude)
            const lats = pinned.map((e) => e.latitude)
            map.fitBounds(
              [
                [Math.min(...lngs) - 0.5, Math.min(...lats) - 0.4],
                [Math.max(...lngs) + 0.5, Math.max(...lats) + 0.4],
              ],
              { padding: 80, maxZoom: 8.5, duration: 800 }
            )
          }
        })
        .catch((err) => console.error('[map] setup failed:', err))
    }

    map.once('load', () => runSetup(false))

    map.on('style.load', () => {
      if (!stylingRef.current) return
      stylingRef.current = false
      readyRef.current = false
      runSetup(true)
    })

    map.on('mousemove', (e) => onCoordsChange?.({ lng: e.lngLat.lng, lat: e.lngLat.lat }))
    map.on('mouseout', () => onCoordsChange?.(null))

    return () => {
      if (stopPulseRef.current) stopPulseRef.current()
      readyRef.current = false
      map.remove()
      mapRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* ---------------------------------------------------------------- */
  /*  Mise à jour données quand filteredEvents change                  */
  /* ---------------------------------------------------------------- */
  useEffect(() => {
    const map = mapRef.current
    if (!map) return
    if (map.getSource('earthquakes')) {
      updateEarthquakeData(map, filteredEvents)
    }
    if (readyRef.current) {
      applyLayerVisibility(map, layers)
    }
  }, [filteredEvents, events.length, layers])

  /* ---------------------------------------------------------------- */
  /*  Visibilité couches                                               */
  /* ---------------------------------------------------------------- */
  useEffect(() => {
    const map = mapRef.current
    if (!map || !readyRef.current) return
    applyLayerVisibility(map, layers)
  }, [layers])

  /* ---------------------------------------------------------------- */
  /*  Changement de style de carte (dark / satellite)                  */
  /* ---------------------------------------------------------------- */
  useEffect(() => {
    if (initStyleRef.current) {
      initStyleRef.current = false
      return
    }
    const map = mapRef.current
    if (!map) return

    if (stopPulseRef.current) stopPulseRef.current()
    readyRef.current = false
    stylingRef.current = true

    const newStyle = mapStyle === 'satellite' ? SATELLITE_STYLE : CARTO_DARK_STYLE
    map.setStyle(newStyle as maplibregl.StyleSpecification)
  }, [mapStyle])

  /* ---------------------------------------------------------------- */
  /*  Highlight événement sélectionné                                  */
  /* ---------------------------------------------------------------- */
  useEffect(() => {
    const map = mapRef.current
    if (!map || !readyRef.current) return
    highlightSelectedEvent(map, selectedId ?? null)
    if (!selectedId) return
    const ev = events.find((e) => e.id === selectedId)
    if (ev) {
      map.flyTo({
        center: [ev.longitude, ev.latitude],
        zoom: Math.max(map.getZoom(), 9.5),
        duration: 800,
        essential: true,
      })
    }
  }, [selectedId, events])

  return <div ref={containerRef} className="w-full h-full" />
}
