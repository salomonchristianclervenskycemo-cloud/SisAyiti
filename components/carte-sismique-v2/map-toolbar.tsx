'use client'

import { useState } from 'react'
import type maplibregl from 'maplibre-gl'
import {
  Crosshair,
  BookOpen,
  Filter,
  Layers,
  LocateFixed,
  Minus,
  Moon,
  Plus,
  Satellite,
} from 'lucide-react'
import { useSeismicStore } from '@/lib/seismic-store'
import { resetMapToHaitiView } from '@/lib/map-viewport'
import { getCurrentPosition, isGeolocationSupported } from '@/shared/geolocation'
import { LayerToggle } from './layer-toggle'
import { FilterPanel } from './filter-panel'
import type { Lang } from '@/lib/i18n'
import { mapToolbarT, toMapLocale } from '@/lib/translations/map'

const glassBtn =
  'flex items-center justify-center min-h-11 min-w-11 p-2.5 rounded-lg bg-black/55 backdrop-blur-xl border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-all shadow-lg'

export function MapToolbar({
  lang,
  map,
  onAfterResetHaiti,
  showGuide,
  onToggleGuide,
}: {
  lang: Lang
  map: maplibregl.Map | null
  /** Recharge le flux Haïti après « Centrer Haïti » */
  onAfterResetHaiti?: () => void
  showGuide?: boolean
  onToggleGuide?: () => void
}) {
  const tb = mapToolbarT[toMapLocale(lang)]
  const [showLayers, setShowLayers] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [geoError, setGeoError] = useState<string | null>(null)
  const mapStyle = useSeismicStore((s) => s.mapStyle)
  const setMapStyle = useSeismicStore((s) => s.setMapStyle)

  const zoom = (delta: number) => {
    if (!map) return
    map.zoomTo(map.getZoom() + delta, { duration: 300 })
  }

  const fitHaiti = () => {
    if (!map) return
    resetMapToHaitiView(map, { onAfterReset: onAfterResetHaiti })
  }

  const locateMe = async () => {
    if (!map) return
    setGeoError(null)
    if (!isGeolocationSupported()) {
      setGeoError(tb.geoUnsupported)
      return
    }
    try {
      const pos = await getCurrentPosition()
      map.flyTo({
        center: [pos.longitude, pos.latitude],
        zoom: Math.max(map.getZoom(), 10),
        duration: 900,
      })
    } catch {
      setGeoError(tb.geoDenied)
    }
  }

  return (
    <>
      <div className="absolute left-3 top-1/2 -translate-y-1/2 z-[1000] flex flex-col gap-1.5 pointer-events-auto">
        <button type="button" className={glassBtn} onClick={() => zoom(1)} aria-label={tb.zoomIn}>
          <Plus size={18} />
        </button>
        <button type="button" className={glassBtn} onClick={() => zoom(-1)} aria-label={tb.zoomOut}>
          <Minus size={18} />
        </button>
        <button type="button" className={glassBtn} onClick={fitHaiti} aria-label={tb.centerHaiti}>
          <Crosshair size={18} />
        </button>
        <button type="button" className={glassBtn} onClick={locateMe} aria-label={tb.locateMe}>
          <LocateFixed size={18} />
        </button>

        <div className="h-1" />

        <button
          type="button"
          className={`${glassBtn} ${mapStyle === 'dark' ? 'text-cyan-400 border-cyan-500/40' : ''}`}
          onClick={() => setMapStyle('dark')}
          aria-label={tb.dark}
        >
          <Moon size={18} />
        </button>
        <button
          type="button"
          className={`${glassBtn} ${mapStyle === 'satellite' ? 'text-cyan-400 border-cyan-500/40' : ''}`}
          onClick={() => setMapStyle('satellite')}
          aria-label={tb.satellite}
        >
          <Satellite size={18} />
        </button>

        <div className="h-1" />

        <button
          type="button"
          className={`${glassBtn} ${showLayers ? 'text-cyan-400 border-cyan-500/40' : ''}`}
          onClick={() => {
            setShowLayers((v) => !v)
            setShowFilters(false)
          }}
          aria-label={tb.layers}
        >
          <Layers size={18} />
        </button>
        <button
          type="button"
          className={`${glassBtn} ${showFilters ? 'text-cyan-400 border-cyan-500/40' : ''}`}
          onClick={() => {
            setShowFilters((v) => !v)
            setShowLayers(false)
          }}
          aria-label={tb.filters}
        >
          <Filter size={18} />
        </button>

        <div className="h-1" />

        <button
          type="button"
          className={`${glassBtn} ${showGuide ? 'text-cyan-400 border-cyan-500/40' : ''}`}
          onClick={() => {
            onToggleGuide?.()
            setShowLayers(false)
            setShowFilters(false)
          }}
          aria-label={tb.guide}
        >
          <BookOpen size={18} />
        </button>
      </div>

      {geoError && (
        <div
          role="alert"
          className="absolute left-16 top-1/2 -translate-y-1/2 z-[1000] max-w-[220px] rounded-lg bg-red-950/90 border border-red-500/40 px-3 py-2 text-xs text-red-100 pointer-events-auto"
        >
          {geoError}
        </div>
      )}

      {showLayers && (
        <div className="absolute left-16 top-1/2 -translate-y-1/2 z-[1000] w-52 pointer-events-auto">
          <LayerToggle lang={lang} />
        </div>
      )}

      {showFilters && (
        <div className="absolute left-16 top-1/2 -translate-y-1/2 z-[1000] w-64 max-h-[70vh] overflow-y-auto pointer-events-auto">
          <FilterPanel lang={lang} />
        </div>
      )}
    </>
  )
}
