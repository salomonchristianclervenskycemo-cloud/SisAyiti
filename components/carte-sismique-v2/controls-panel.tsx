'use client'

import { useSeismicStore } from '@/lib/seismic-store'
import type { Lang } from '@/lib/i18n'
import { mapControlsT, toMapLocale } from '@/lib/translations/map'

export function ControlsPanel({ lang }: { lang: Lang }) {
  const t = mapControlsT[toMapLocale(lang)]
  const mapStyle = useSeismicStore((s) => s.mapStyle)
  const setMapStyle = useSeismicStore((s) => s.setMapStyle)

  return (
    <div className="flex gap-2 bg-black/60 backdrop-blur-md p-1.5 rounded-xl border border-cyan-500/30 shadow-lg shadow-cyan-900/20">
      <button
        type="button"
        onClick={() => setMapStyle('dark')}
        className={`px-4 py-2 rounded-lg text-xs font-bold tracking-wide transition-all ${
          mapStyle === 'dark'
            ? 'bg-cyan-500 text-black shadow-[0_0_10px_rgba(0,242,255,0.5)]'
            : 'text-gray-400 hover:text-cyan-300 hover:bg-cyan-500/10'
        }`}
      >
        {t.dark}
      </button>
      <button
        type="button"
        onClick={() => setMapStyle('satellite')}
        className={`px-4 py-2 rounded-lg text-xs font-bold tracking-wide transition-all ${
          mapStyle === 'satellite'
            ? 'bg-cyan-500 text-black shadow-[0_0_10px_rgba(0,242,255,0.5)]'
            : 'text-gray-400 hover:text-cyan-300 hover:bg-cyan-500/10'
        }`}
      >
        {t.satellite}
      </button>
    </div>
  )
}
