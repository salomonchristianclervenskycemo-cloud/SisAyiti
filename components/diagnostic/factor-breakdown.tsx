'use client'

import { useLang } from '@/lib/lang-context'
import { cn } from '@/lib/utils'
import type { FactorBreakdown } from '@/lib/building-vulnerability'

const FACTOR_KEYS: Record<FactorBreakdown['id'], string> = {
  structure: 'diag.factor.structure',
  foundation: 'diag.factor.foundation',
  condition: 'diag.factor.condition',
  age: 'diag.factor.age',
  terrain: 'diag.factor.terrain',
}

const RISK_KEYS: Record<FactorBreakdown['risk'], string> = {
  low: 'diag.factor.risk.low',
  medium: 'diag.factor.risk.medium',
  high: 'diag.factor.risk.high',
}

export function FactorBreakdown({ factors }: { factors: FactorBreakdown[] }) {
  const { t } = useLang()

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-bold text-foreground">{t('diag.results.breakdown')}</h4>
      {factors.map((f) => {
        const pct = Math.round(((4 - f.score) / 3) * 100)
        return (
          <div key={f.id} className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-foreground">{t(FACTOR_KEYS[f.id])}</span>
              <span
                className={cn(
                  'font-bold',
                  f.risk === 'low' && 'text-emerald-600',
                  f.risk === 'medium' && 'text-amber-600',
                  f.risk === 'high' && 'text-red-600'
                )}
              >
                {t(RISK_KEYS[f.risk])}
              </span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div
                className={cn(
                  'h-full transition-all duration-700',
                  f.risk === 'low' && 'bg-emerald-500',
                  f.risk === 'medium' && 'bg-amber-500',
                  f.risk === 'high' && 'bg-red-500'
                )}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
