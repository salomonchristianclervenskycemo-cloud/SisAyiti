'use client'

import dynamic from 'next/dynamic'
import { useAnalytics } from '@/hooks/use-analytics'
import type { RiskLevel } from '@/lib/seismic-types'
import type { Lang } from '@/lib/i18n'
import { mapStatsT, toMapLocale } from '@/lib/translations/map'

const MiniChart = dynamic(
  () => import('@/components/shared/mini-chart').then((m) => m.MiniChart),
  { ssr: false, loading: () => <div className="h-20 animate-pulse bg-white/5 rounded" /> }
)

export function StatisticsPanel({ lang }: { lang: Lang }) {
  const t = mapStatsT[toMapLocale(lang)]
  const stats = useAnalytics(7)

  if (!stats) {
    return (
      <div className="bg-black/80 border border-cyan-500/30 rounded-lg p-3 text-xs text-gray-500 animate-pulse">
        {t.loading}
      </div>
    )
  }

  const emptyRisk: Record<RiskLevel, number> = { critical: 0, high: 0, medium: 0, low: 0 }

  return (
    <div className="bg-black/60 backdrop-blur-md border border-cyan-500/30 rounded-xl p-4 w-64 text-xs shadow-lg shadow-cyan-900/20">
      <h4 className="font-bold text-cyan-400 uppercase tracking-widest text-[10px] mb-3 flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
        {t.title}
      </h4>
      <div className="grid grid-cols-2 gap-2 mb-2 font-mono">
        <div>
          <span className="text-gray-500 block">{t.total}</span>
          <span className="text-white text-lg">{stats.totalEvents}</span>
        </div>
        <div>
          <span className="text-gray-500 block">M max</span>
          <span className="text-red-400 text-lg">{stats.highestMagnitude.toFixed(1)}</span>
        </div>
        <div>
          <span className="text-gray-500 block">24h</span>
          <span className="text-cyan-300">{stats.eventsLast24h}</span>
        </div>
        <div>
          <span className="text-gray-500 block">Moy</span>
          <span className="text-cyan-300">{stats.avgMagnitude.toFixed(2)}</span>
        </div>
      </div>
      <MiniChart data={stats.riskDistribution ?? emptyRisk} />
    </div>
  )
}
