'use client'

import { useSeismicStore } from '@/lib/seismic-store'
import type { Lang } from '@/lib/i18n'
import { realtimeBadgeT, toMapLocale } from '@/lib/translations/map'

export function RealTimeBadge({ lang }: { lang: Lang }) {
  const t = realtimeBadgeT[toMapLocale(lang)]
  const live = useSeismicStore((s) => s.liveConnected)
  const lastSync = useSeismicStore((s) => s.lastSync)

  return (
    <div className="flex items-center gap-2 px-3 py-1 rounded bg-black/50 border border-cyan-500/30 backdrop-blur">
      <div
        className={`w-2 h-2 rounded-full ${live ? 'bg-lime-400 animate-pulse' : 'bg-amber-500'}`}
      />
      <span className="text-xs font-mono text-cyan-400">
        {live ? t.live : t.sync}
      </span>
      {lastSync && (
        <span className="text-[10px] text-gray-500 hidden sm:inline">
          {new Date(lastSync).toLocaleTimeString()}
        </span>
      )}
    </div>
  )
}
