'use client'

import { format } from 'date-fns'
import { fr, enUS, es } from 'date-fns/locale'
import { useSeismicStore } from '@/lib/seismic-store'
import { Loader2 } from 'lucide-react'
import type { Lang } from '@/lib/i18n'
import { mapTopBarT, toMapLocale } from '@/lib/translations/map'

function dateLocale(lang: Lang) {
  if (lang === 'fr') return fr
  if (lang === 'en') return enUS
  if (lang === 'es') return es
  return undefined
}

export function MapTopBar({ lang }: { lang: Lang }) {
  const t = mapTopBarT[toMapLocale(lang)]
  const isLoading = useSeismicStore((s) => s.isLoading)
  const liveConnected = useSeismicStore((s) => s.liveConnected)
  const liveEnabled = useSeismicStore((s) => s.liveEnabled)
  const lastSync = useSeismicStore((s) => s.lastSync)
  const eventCount = useSeismicStore((s) => s.events.length)
  const dataSource = useSeismicStore((s) => s.dataSource)

  const isActive = liveEnabled && liveConnected

  return (
    <div className="absolute top-3 left-1/2 -translate-x-1/2 z-[1000] pointer-events-none flex flex-col items-center gap-1">
      <div className="pointer-events-auto flex items-center gap-3 px-5 py-2.5 rounded-xl bg-black/55 backdrop-blur-xl border border-white/10 shadow-2xl">
        <div className="text-center">
          <h1 className="text-sm md:text-base font-bold text-white tracking-tight whitespace-nowrap">
            {t.title}
          </h1>
          <p className="text-[10px] text-gray-400 hidden sm:block">{t.subtitle}</p>
        </div>

        <div className="w-px h-8 bg-white/10 hidden sm:block" />

        <div className="flex items-center gap-2">
          {isLoading ? (
            <Loader2 className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
          ) : (
            <span
              className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider ${
                isActive
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}
              />
              {isActive ? t.active : t.sync}
            </span>
          )}
        </div>

        {lastSync && (
          <div className="hidden md:block text-right">
            <p className="text-[9px] text-gray-500 uppercase tracking-wider">{t.lastUpdated}</p>
            <p className="text-[11px] font-mono text-gray-300">
              {format(new Date(lastSync), 'dd MMM yyyy, HH:mm', { locale: dateLocale(lang) })}
            </p>
          </div>
        )}
      </div>

      <div className="pointer-events-auto flex items-center gap-2 text-[10px] font-mono text-gray-500">
        <span>
          {eventCount} {t.events}
        </span>
        {dataSource && (
          <>
            <span className="text-gray-600">·</span>
            <span className="text-cyan-600/80 uppercase">{dataSource}</span>
          </>
        )}
      </div>
    </div>
  )
}
