'use client'

import { RISK_COLORS } from '@/lib/seismic-map-style'
import { FAULT_PALETTE } from '@/lib/haiti-fault-geo'
import type { RiskLevel } from '@/lib/seismic-types'
import type { Lang } from '@/lib/i18n'
import { mapLegendOverlayT, mapRiskChipT, toMapLocale } from '@/lib/translations/map'

const RISK_LEVELS: RiskLevel[] = ['critical', 'high', 'medium', 'low']

function FaultSwatch({
  color,
  glow,
  dashed,
}: {
  color: string
  glow: string
  dashed?: boolean
}) {
  return (
    <div className="relative w-10 h-3 shrink-0">
      <div
        className="absolute inset-0 rounded-full blur-[3px] opacity-60"
        style={{ backgroundColor: glow }}
      />
      <div
        className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-[3px] rounded-full"
        style={{
          background: dashed
            ? `repeating-linear-gradient(90deg, ${color} 0 5px, transparent 5px 8px)`
            : `linear-gradient(90deg, #fb923c, ${color}, ${glow})`,
          boxShadow: `0 0 6px ${glow}88`,
        }}
      />
    </div>
  )
}

export function MapLegendOverlay({ lang }: { lang: Lang }) {
  const mapLang = toMapLocale(lang)
  const t = mapLegendOverlayT[mapLang]
  const riskLabels = mapRiskChipT[mapLang]

  return (
    <div className="absolute bottom-16 left-16 z-[999] pointer-events-auto max-w-[210px]">
      <div className="rounded-xl bg-black/55 backdrop-blur-xl border border-white/10 shadow-2xl p-3 text-[10px]">
        <h3 className="font-bold text-white/90 uppercase tracking-widest mb-2 flex items-center gap-1.5">
          <span className="w-1 h-3 bg-cyan-400 rounded-full" />
          {t.legend}
        </h3>

        <p className="text-gray-500 uppercase tracking-wider mb-1">{t.magnitude}</p>
        <div className="flex items-end gap-2 mb-3 pb-2 border-b border-white/10">
          {[4, 6, 8].map((m) => (
            <div key={m} className="flex flex-col items-center gap-0.5">
              <div
                className="rounded-full border border-white/20"
                style={{
                  width: m === 4 ? 8 : m === 6 ? 14 : 20,
                  height: m === 4 ? 8 : m === 6 ? 14 : 20,
                  backgroundColor: RISK_COLORS.high,
                  boxShadow: `0 0 8px ${RISK_COLORS.high}66`,
                }}
              />
              <span className="text-gray-400">M{m}</span>
            </div>
          ))}
        </div>

        <p className="text-gray-500 uppercase tracking-wider mb-1">{t.depth}</p>
        <div className="space-y-1 mb-3 pb-2 border-b border-white/10">
          {RISK_LEVELS.map((level) => (
            <div key={level} className="flex items-center gap-2">
              <div
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: RISK_COLORS[level], boxShadow: `0 0 6px ${RISK_COLORS[level]}` }}
              />
              <span className="text-gray-300">{riskLabels[level]}</span>
            </div>
          ))}
        </div>

        <p className="text-gray-500 uppercase tracking-wider mb-1.5">{t.faults}</p>
        <div className="space-y-2">
          <div className="flex items-center gap-2.5">
            <FaultSwatch color={FAULT_PALETTE.sept.core} glow={FAULT_PALETTE.sept.glow} dashed />
            <span className="text-gray-300 leading-tight">{t.sept}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <FaultSwatch color={FAULT_PALETTE.epgf.core} glow={FAULT_PALETTE.epgf.glow} />
            <span className="text-gray-300 leading-tight">{t.enriq}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
