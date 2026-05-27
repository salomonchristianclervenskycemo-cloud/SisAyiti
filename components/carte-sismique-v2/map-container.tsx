'use client'

import { useCallback, useState } from 'react'
import dynamic from 'next/dynamic'
import type maplibregl from 'maplibre-gl'
import { useLang } from '@/lib/lang-context'
import { useFilteredEvents } from '@/hooks/use-map-filters'
import { useSeismicStore } from '@/lib/seismic-store'
import { MapTopBar } from './map-top-bar'
import { MapBottomBar } from './map-bottom-bar'
import { MapToolbar } from './map-toolbar'
import { MapLegendOverlay } from './map-legend-overlay'
import { MapCoordinates } from './map-coordinates'
import { MapHoverCard } from './map-hover-card'
import { SidebarPanel } from './sidebar-panel'

import { mapEmptyFullT, mapLoadingT, toMapLocale } from '@/lib/translations/map'

function MapCanvasLoader() {
  const { lang } = useLang()
  const mapLang = toMapLocale(lang)
  return (
    <div className="w-full h-full flex items-center justify-center bg-[#0a0a14]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-2 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin" />
        <span className="text-cyan-400/80 font-mono text-sm">{mapLoadingT[mapLang]}</span>
      </div>
    </div>
  )
}

const MapCanvas = dynamic(
  () => import('./map-canvas').then((m) => m.MapCanvas),
  {
    ssr: false,
    loading: () => <MapCanvasLoader />,
  }
)

export function MapContainer() {
  const { lang } = useLang()
  const mapLang = toMapLocale(lang)

  const [map, setMap] = useState<maplibregl.Map | null>(null)
  const [coords, setCoords] = useState<{ lng: number; lat: number } | null>(null)

  const isLoading = useSeismicStore((s) => s.isLoading)
  const hoveredMapEvent = useSeismicStore((s) => s.hoveredMapEvent)
  const filteredEvents = useFilteredEvents()
  const eventCount = filteredEvents.length
  const fetchDays = useSeismicStore((s) => s.fetchDays)
  const filters = useSeismicStore((s) => s.filters)
  const liveEnabled = useSeismicStore((s) => s.liveEnabled)

  const handleMapReady = useCallback((m: maplibregl.Map) => {
    setMap(m)
  }, [])

  const showEmpty = !isLoading && eventCount === 0

  return (
    <div className="relative w-full h-[calc(100vh-4rem)] bg-[#0a0a14] overflow-hidden">
      {/* Carte plein écran */}
      <div className="absolute inset-0">
        <MapCanvas onMapReady={handleMapReady} onCoordsChange={setCoords} />
      </div>

      {/* Overlays UI */}
      <MapTopBar lang={lang} />
      <MapToolbar lang={lang} map={map} />
      <MapLegendOverlay lang={lang} />
      <MapBottomBar lang={lang} />
      <MapCoordinates map={map} coords={coords} />
      <MapHoverCard map={map} event={hoveredMapEvent} />
      <SidebarPanel lang={lang} />

      {showEmpty && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 z-[998] pointer-events-none max-w-md px-4">
          <div className="pointer-events-auto rounded-xl bg-amber-500/10 backdrop-blur-xl border border-amber-500/30 px-4 py-3 text-center">
            <p className="text-sm font-semibold text-amber-200">{mapEmptyFullT[mapLang].title}</p>
            <p className="text-xs text-amber-200/70 mt-1">{mapEmptyFullT[mapLang].hint}</p>
          </div>
        </div>
      )}
    </div>
  )
}
