'use client'

import { riskColor, type RiskLevel } from '@/lib/seismic-types'
import type { Lang } from '@/lib/i18n'
import { mapLegendPanelT, toMapLocale } from '@/lib/translations/map'

const ITEMS: { risk: RiskLevel; mag: string }[] = [
  { risk: 'critical', mag: 'M 6.5+' },
  { risk: 'high', mag: 'M 5.5-6.4' },
  { risk: 'medium', mag: 'M 4.5-5.4' },
  { risk: 'low', mag: 'M <4.5' },
]

export function LegendPanel({ lang }: { lang: Lang }) {
  const t = mapLegendPanelT[toMapLocale(lang)]

  return (
    <div className="bg-black/40 border border-cyan-500/20 rounded-xl p-4 w-full text-xs pointer-events-auto">
      <h3 className="font-bold text-cyan-400 mb-3 text-[10px] uppercase tracking-widest flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
        {t.title}
      </h3>
      <div className="space-y-1.5">
        {ITEMS.map((item) => (
          <div key={item.risk} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: riskColor(item.risk), boxShadow: `0 0 10px ${riskColor(item.risk)}` }}
            />
            <span className="text-gray-300 text-[10px]">
              {item.mag} — {t[item.risk]}
            </span>
          </div>
        ))}
      </div>
      <div className="border-t border-cyan-500/20 pt-1.5 mt-2 space-y-1">
        <div className="flex items-center gap-2">
          <div className="w-6 h-0.5 bg-red-500 border border-dashed" />
          <span className="text-gray-400 text-[9px]">Septentrionale</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-0.5 bg-red-600" />
          <span className="text-gray-400 text-[9px]">Enriquillo-PG</span>
        </div>
      </div>
    </div>
  )
}
