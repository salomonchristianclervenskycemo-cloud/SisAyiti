'use client'

import { useEffect, useRef } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { setSeismicMapFocusEventId, useSeismicStore } from '@/lib/seismic-store'
import { DEFAULT_LAYERS } from '@/lib/seismic-types'
import { getMapDisplayEvents, useMapFilteredEvents } from '@/hooks/use-map-filters'
import { CARTO_DARK_STYLE, SATELLITE_STYLE } from '@/lib/seismic-layers-data'
import {
  boundsAroundEvent,
  focusZoomForEvent,
  HAITI_MAX_BOUNDS,
  isEventOutsideHaitiMap,
} from '@/lib/map-viewport'
import { HAITI_CENTER } from '@/lib/seismic-map-style'
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

  const filteredEvents = useMapFilteredEvents()
  const mapStyle = useSeismicStore((s) => s.mapStyle)
  const layers = useSeismicStore((s) => s.layers) ?? DEFAULT_LAYERS
  const setSelectedEvent = useSeismicStore((s) => s.setSelectedEvent)
  const selectedId = useSeismicStore((s) => s.selectedEvent?.id)
  const mapFocusEventId = useSeismicStore((s) => s.mapFocusEventId)
  const mapViewportExpanded = useSeismicStore((s) => s.mapViewportExpanded)
  const events = useSeismicStore((s) => s.events)

  const applyMapViewportConstraints = (map: maplibregl.Map, expanded: boolean) => {
    try {
      if (expanded) {
        map.setMaxBounds(null)
      } else {
        map.setMaxBounds(HAITI_MAX_BOUNDS)
      }
    } catch {
      /* ignore if map destroyed */
    }
  }

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
      maxBounds: useSeismicStore.getState().mapViewportExpanded ? undefined : HAITI_MAX_BOUNDS,
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
          const filtered = getMapDisplayEvents(
            st.events,
            st.filters,
            st.selectedEvent,
            st.mapFocusEventId
          )
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

    map.on('error', (e) => {
      console.warn('[map] MapLibre error (non bloquant):', e.error?.message ?? e)
    })

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
    if (!map || !readyRef.current) return

    const pushData = () => {
      if (!map.getSource('earthquakes')) return false
      updateEarthquakeData(map, filteredEvents)
      applyLayerVisibility(map, layers)
      return true
    }

    if (pushData()) return

    const timer = window.setInterval(() => {
      if (pushData()) window.clearInterval(timer)
    }, 100)

    return () => window.clearInterval(timer)
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
  /*  Focus carte (navigation depuis Actualités)                       */
  /* ---------------------------------------------------------------- */
  useEffect(() => {
    const map = mapRef.current
    if (!map || !readyRef.current || !mapFocusEventId) return

    const st = useSeismicStore.getState()
    const ev =
      st.selectedEvent?.id === mapFocusEventId
        ? st.selectedEvent
        : st.events.find((e) => e.id === mapFocusEventId) ?? st.selectedEvent
    if (!ev) return

    const outside = isEventOutsideHaitiMap(ev)
    applyMapViewportConstraints(map, outside)

    if (st.selectedEvent?.id !== ev.id) setSelectedEvent(ev)
    highlightSelectedEvent(map, ev.id)

    if (outside) {
      map.fitBounds(boundsAroundEvent(ev.latitude, ev.longitude), {
        padding: 72,
        maxZoom: focusZoomForEvent(ev, true),
        duration: 1000,
      })
    } else {
      map.flyTo({
        center: [ev.longitude, ev.latitude],
        zoom: focusZoomForEvent(ev, false),
        duration: 1000,
        essential: true,
      })
    }
    setSeismicMapFocusEventId(null)
  }, [mapFocusEventId, filteredEvents, setSelectedEvent])

  /* ---------------------------------------------------------------- */
  /*  Contraintes vue Haïti / contexte global                          */
  /* ---------------------------------------------------------------- */
  useEffect(() => {
    const map = mapRef.current
    if (!map || !readyRef.current) return
    applyMapViewportConstraints(map, mapViewportExpanded)
  }, [mapViewportExpanded])

  /* ---------------------------------------------------------------- */
  /*  Highlight événement sélectionné                                  */
  /* ---------------------------------------------------------------- */
  useEffect(() => {
    const map = mapRef.current
    if (!map || !readyRef.current || mapFocusEventId) return
    highlightSelectedEvent(map, selectedId ?? null)
    if (!selectedId) return
    const ev = events.find((e) => e.id === selectedId)
    if (ev) {
      const outside = mapViewportExpanded || isEventOutsideHaitiMap(ev)
      if (outside) {
        map.fitBounds(boundsAroundEvent(ev.latitude, ev.longitude), {
          padding: 64,
          maxZoom: focusZoomForEvent(ev, true),
          duration: 800,
        })
      } else {
        map.flyTo({
          center: [ev.longitude, ev.latitude],
          zoom: focusZoomForEvent(ev, false),
          duration: 800,
          essential: true,
        })
      }
    }
  }, [selectedId, events, mapFocusEventId, mapViewportExpanded])

  return <div ref={containerRef} className="w-full h-full" />
}
