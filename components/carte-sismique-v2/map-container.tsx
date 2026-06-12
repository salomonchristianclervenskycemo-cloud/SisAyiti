'use client'

import { useCallback, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import type maplibregl from 'maplibre-gl'
import { useLang } from '@/lib/lang-context'
import { useMapFilteredEvents } from '@/hooks/use-map-filters'
import { useSeismicStore } from '@/lib/seismic-store'
import { recordCarteEventExplored } from '@/lib/offline-education'
import { CarteGuidePanel } from './carte-guide-panel'
import { MapTopBar } from './map-top-bar'
import { MapBottomBar } from './map-bottom-bar'
import { MapToolbar } from './map-toolbar'
import { MapLegendOverlay } from './map-legend-overlay'
import { MapCoordinates } from './map-coordinates'
import { MapHoverCard } from './map-hover-card'
import { SidebarPanel } from './sidebar-panel'

import { mapEmptyFullT, mapLoadingT, toMapLocale } from '@/lib/translations/map'
import { useMapModuleData } from '@/hooks/use-map-module-data'
import { ModuleEmptyState } from '@/components/ui/module-empty-state'
import { MapErrorBoundary } from './map-error-boundary'

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
  const { lang, t } = useLang()
  const mapLang = toMapLocale(lang)

  const [map, setMap] = useState<maplibregl.Map | null>(null)
  const [coords, setCoords] = useState<{ lng: number; lat: number } | null>(null)
  const [showGuide, setShowGuide] = useState(false)

  const isLoading = useSeismicStore((s) => s.isLoading)
  const selectedEvent = useSeismicStore((s) => s.selectedEvent)
  const hoveredMapEvent = useSeismicStore((s) => s.hoveredMapEvent)
  const filteredEvents = useMapFilteredEvents()
  const eventCount = filteredEvents.length
  const dataSource = useSeismicStore((s) => s.dataSource)
  const { refetch } = useMapModuleData()

  const handleMapReady = useCallback((m: maplibregl.Map) => {
    setMap(m)
  }, [])

  const showEmpty = !isLoading && eventCount === 0

  useEffect(() => {
    if (selectedEvent?.id) recordCarteEventExplored(selectedEvent.id)
  }, [selectedEvent?.id])

  return (
    <div className="relative w-full h-[calc(100vh-4rem)] bg-[#0a0a14] overflow-hidden">
      {/* Carte plein écran */}
      <div className="absolute inset-0">
        <MapErrorBoundary
          fallback={
            <div className="w-full h-full flex items-center justify-center bg-[#0a0a14] p-6">
              <ModuleEmptyState
                variant="error"
                title={mapEmptyFullT[mapLang].title}
                hint={mapEmptyFullT[mapLang].hint}
                primaryAction={{
                  label: t('mod.empty.retry'),
                  onClick: () => window.location.reload(),
                }}
              />
            </div>
          }
        >
          <MapCanvas onMapReady={handleMapReady} onCoordsChange={setCoords} />
        </MapErrorBoundary>
      </div>

      {/* Overlays UI */}
      <MapTopBar lang={lang} />
      <MapToolbar
        lang={lang}
        map={map}
        onAfterResetHaiti={() => void refetch()}
        showGuide={showGuide}
        onToggleGuide={() => setShowGuide((v) => !v)}
      />
      <CarteGuidePanel open={showGuide} onClose={() => setShowGuide(false)} />
      <MapLegendOverlay lang={lang} />
      <MapBottomBar lang={lang} />
      <MapCoordinates map={map} coords={coords} />
      <MapHoverCard map={map} event={hoveredMapEvent} />
      <SidebarPanel lang={lang} />

      {showEmpty && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 z-[998] max-w-md w-full px-4 pointer-events-none">
          <ModuleEmptyState
            variant={dataSource === 'error' ? 'error' : 'warning'}
            title={mapEmptyFullT[mapLang].title}
            hint={mapEmptyFullT[mapLang].hint}
            className="pointer-events-auto border-amber-500/35 bg-background/90 backdrop-blur-xl"
            primaryAction={{
              label: t('mod.empty.retry'),
              onClick: () => void refetch(),
            }}
          />
        </div>
      )}
    </div>
  )
}
