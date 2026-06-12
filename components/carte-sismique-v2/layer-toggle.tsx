'use client'

import { useSeismicStore } from '@/lib/seismic-store'
import { DEFAULT_LAYERS, type LayerVisibility } from '@/lib/seismic-types'
import { CircleDot, Flame, GitBranch, Layers, Map, Waves } from 'lucide-react'
import type { Lang } from '@/lib/i18n'
import { mapLayerToggleT, toMapLocale } from '@/lib/translations/map'

type LayerKey = keyof LayerVisibility

const LAYER_ICONS: Record<LayerKey, React.ReactNode> = {
  earthquakes: <CircleDot size={16} className="text-cyan-400" />,
  clusters: <Layers size={16} className="text-sky-400" />,
  faults: <GitBranch size={16} className="text-red-400" />,
  liquefaction: <Waves size={16} className="text-rose-400" />,
  riskZones: <Map size={16} className="text-red-400" />,
  heatmap: <Flame size={16} className="text-amber-400" />,
}

export function LayerToggle({ lang }: { lang: Lang }) {
  const t = mapLayerToggleT[toMapLocale(lang)]
  const layers = useSeismicStore((s) => s.layers) ?? DEFAULT_LAYERS
  const setLayers = useSeismicStore((s) => s.setLayers)

  const order: LayerKey[] = [
    'earthquakes',
    'clusters',
    'faults',
    'liquefaction',
    'riskZones',
    'heatmap',
  ]

  return (
    <div className="rounded-xl bg-black/60 backdrop-blur-xl border border-white/10 shadow-2xl p-3 w-64 text-xs">
      <h4 className="font-bold text-white/90 uppercase tracking-widest text-[10px] flex items-center gap-2 mb-3 px-1">
        <Layers size={12} className="text-cyan-400" />
        {t.title}
      </h4>
      <div className="space-y-1">
        {order.map((key) => {
          const meta = t.layers[key]
          const on = layers[key]
          return (
            <button
              key={key}
              type="button"
              onClick={() => setLayers({ [key]: !on })}
              className={`w-full flex items-center gap-3 p-2.5 rounded-lg text-left transition-all ${
                on
                  ? 'bg-cyan-500/15 border border-cyan-500/30'
                  : 'bg-white/5 border border-transparent hover:bg-white/10'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                  on ? 'bg-black/40' : 'bg-black/20 opacity-60'
                }`}
              >
                {LAYER_ICONS[key]}
              </div>
              <div className="flex-1 min-w-0">
                <div className={`font-semibold ${on ? 'text-white' : 'text-gray-400'}`}>
                  {meta.label}
                </div>
                <div className="text-[10px] text-gray-500 truncate">
                  {meta.desc}
                </div>
              </div>
              <div
                className={`w-9 h-5 rounded-full shrink-0 transition-colors relative ${
                  on ? 'bg-cyan-500' : 'bg-gray-600'
                }`}
              >
                <div
                  className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${
                    on ? 'left-4' : 'left-0.5'
                  }`}
                />
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
