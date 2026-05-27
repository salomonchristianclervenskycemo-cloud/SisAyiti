'use client'

import { useSeismicStore } from '@/lib/seismic-store'
import { DEFAULT_FILTERS } from '@/lib/seismic-types'
import type { Lang } from '@/lib/i18n'
import { mapBottomBarFullT, toMapLocale } from '@/lib/translations/map'

type PeriodKey = '1' | '7' | '30'
type MagKey = 'all' | '3' | '4' | '5'

export function MapBottomBar({ lang }: { lang: Lang }) {
  const t = mapBottomBarFullT[toMapLocale(lang)]
  const fetchDays = useSeismicStore((s) => s.fetchDays)
  const setFetchDays = useSeismicStore((s) => s.setFetchDays)
  const filters = useSeismicStore((s) => s.filters) ?? DEFAULT_FILTERS
  const magnitudeFilter = filters.magnitude ?? DEFAULT_FILTERS.magnitude
  const setFilters = useSeismicStore((s) => s.setFilters)
  const liveEnabled = useSeismicStore((s) => s.liveEnabled)
  const setLiveEnabled = useSeismicStore((s) => s.setLiveEnabled)

  const periodKey = String(fetchDays) as PeriodKey
  const magMin = magnitudeFilter.min
  const magKey: MagKey =
    magMin >= 5 ? '5' : magMin >= 4 ? '4' : magMin >= 3 ? '3' : 'all'

  const setPeriod = (days: PeriodKey) => {
    const d = parseInt(days, 10)
    setFetchDays(d)
    setFilters({
      dateRange: {
        start: new Date(Date.now() - d * 24 * 60 * 60 * 1000),
        end: new Date(),
      },
    })
  }

  const setMag = (key: MagKey) => {
    const min = key === 'all' ? 2 : parseInt(key, 10)
    setFilters({ magnitude: { ...magnitudeFilter, min } })
  }

  return (
    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-[1000] pointer-events-none">
      <div className="pointer-events-auto flex flex-wrap items-center justify-center gap-2 px-3 py-2 rounded-xl bg-black/55 backdrop-blur-xl border border-white/10 shadow-2xl">
        <SelectGroup
          label={t.period}
          value={periodKey}
          options={(['1', '7', '30'] as PeriodKey[]).map((k) => ({
            value: k,
            label: t.periods[k],
          }))}
          onChange={(v) => setPeriod(v as PeriodKey)}
        />

        <div className="w-px h-6 bg-white/10" />

        <SelectGroup
          label={t.magnitude}
          value={magKey}
          options={(['all', '3', '4', '5'] as MagKey[]).map((k) => ({
            value: k,
            label: t.mags[k],
          }))}
          onChange={(v) => setMag(v as MagKey)}
        />

        <div className="w-px h-6 bg-white/10" />

        <button
          type="button"
          onClick={() => setLiveEnabled(!liveEnabled)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            liveEnabled
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
              : 'bg-white/5 text-gray-400 border border-white/10 hover:text-white'
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${liveEnabled ? 'bg-emerald-400 animate-pulse' : 'bg-gray-500'}`}
          />
          {t.realtime}
        </button>
      </div>
    </div>
  )
}

function SelectGroup({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: { value: string; label: string }[]
  onChange: (v: string) => void
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] text-gray-500 uppercase tracking-wider hidden sm:inline">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-white/5 border border-white/10 rounded-lg px-2 py-1.5 text-xs text-gray-200 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 cursor-pointer"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-gray-900">
            {o.label}
          </option>
        ))}
      </select>
    </div>
  )
}
