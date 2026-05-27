'use client'

import { useSeismicStore } from '@/lib/seismic-store'
import { DEFAULT_FILTERS, type RiskLevel } from '@/lib/seismic-types'
import type { Lang } from '@/lib/i18n'
import { mapFilterT, mapRiskChipT, toMapLocale } from '@/lib/translations/map'

export function FilterPanel({ lang }: { lang: Lang }) {
  const t = mapFilterT[toMapLocale(lang)]
  const riskLabels = mapRiskChipT[toMapLocale(lang)]
  const filters = useSeismicStore((s) => s.filters) ?? DEFAULT_FILTERS
  const setFilters = useSeismicStore((s) => s.setFilters)
  const magnitude = filters.magnitude ?? DEFAULT_FILTERS.magnitude
  const depth = filters.depth ?? DEFAULT_FILTERS.depth
  const riskLevel = filters.riskLevel ?? DEFAULT_FILTERS.riskLevel
  const sources = filters.sources ?? DEFAULT_FILTERS.sources

  const toggleRisk = (risk: RiskLevel) => {
    const next = riskLevel.includes(risk)
      ? riskLevel.filter((r) => r !== risk)
      : [...riskLevel, risk]
    setFilters({ riskLevel: next })
  }

  return (
    <div className="rounded-xl bg-black/55 backdrop-blur-xl border border-white/10 shadow-2xl p-4 w-full text-xs space-y-4">
      <h4 className="font-bold text-cyan-400 uppercase tracking-widest text-[10px] flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
        {t.title}
      </h4>

      <div>
        <label htmlFor="filter-mag-min" className="text-gray-400 block mb-1">
          {t.magMin}: {magnitude.min}
        </label>
        <input
          id="filter-mag-min"
          type="range"
          min={2}
          max={8}
          step={0.5}
          value={magnitude.min}
          aria-valuemin={2}
          aria-valuemax={8}
          aria-valuenow={magnitude.min}
          aria-valuetext={`${magnitude.min}`}
          onChange={(e) =>
            setFilters({ magnitude: { ...magnitude, min: parseFloat(e.target.value) } })
          }
          className="w-full accent-cyan-400"
        />
      </div>

      <div>
        <label htmlFor="filter-depth-max" className="text-gray-400 block mb-1">
          {t.depthMax}: {depth.max}
        </label>
        <input
          id="filter-depth-max"
          type="range"
          min={0}
          max={300}
          step={10}
          value={depth.max}
          aria-valuemin={0}
          aria-valuemax={300}
          aria-valuenow={depth.max}
          aria-valuetext={`${depth.max} km`}
          onChange={(e) =>
            setFilters({ depth: { ...depth, max: parseFloat(e.target.value) } })
          }
          className="w-full accent-cyan-400"
        />
      </div>

      <div className="flex flex-wrap gap-1" role="group" aria-label={t.title}>
        {(['critical', 'high', 'medium', 'low'] as RiskLevel[]).map((r) => (
          <button
            key={r}
            type="button"
            aria-pressed={riskLevel.includes(r)}
            onClick={() => toggleRisk(r)}
            className={`px-2 py-0.5 rounded text-[10px] border ${
              riskLevel.includes(r)
                ? 'border-cyan-400 bg-cyan-500/20 text-cyan-300'
                : 'border-gray-600 text-gray-500'
            }`}
          >
            {riskLabels[r]}
          </button>
        ))}
      </div>

      <div className="flex gap-2" role="group" aria-label={t.sources}>
        {['USGS', 'EMSC'].map((src) => (
          <button
            key={src}
            type="button"
            aria-pressed={sources.includes(src)}
            onClick={() => {
              const next = sources.includes(src)
                ? sources.filter((s) => s !== src)
                : [...sources, src]
              setFilters({ sources: next })
            }}
            className={`px-2 py-0.5 rounded text-[10px] border ${
              sources.includes(src)
                ? 'border-cyan-400 text-cyan-300'
                : 'border-gray-600 text-gray-500'
            }`}
          >
            {src}
          </button>
        ))}
      </div>
    </div>
  )
}
