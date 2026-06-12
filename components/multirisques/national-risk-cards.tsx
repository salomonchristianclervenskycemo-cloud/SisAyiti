'use client'

import { AlertTriangle } from 'lucide-react'
import { useLang } from '@/lib/lang-context'
import { NATIONAL_RISK_STATS } from '@/lib/national-risk-stats'
import { cn } from '@/lib/utils'

export function NationalRiskCards() {
  const { t } = useLang()

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {NATIONAL_RISK_STATS.map((risk) => {
        const barColor =
          risk.severity === 'high'
            ? 'bg-red-500'
            : risk.severity === 'medium'
              ? 'bg-yellow-500'
              : 'bg-green-500'

        return (
          <div
            key={risk.id}
            className={cn(
              'relative overflow-hidden rounded-2xl border border-border/40 bg-card/60 backdrop-blur-xl p-6',
              'shadow-sm transition-all duration-300 hover:border-primary/30'
            )}
          >
            <div className="flex items-start gap-4">
              <div
                className={cn(
                  'w-12 h-12 rounded-xl flex items-center justify-center shrink-0',
                  risk.severity === 'high'
                    ? 'bg-red-500/10 text-red-500 border border-red-500/20'
                    : risk.severity === 'medium'
                      ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                      : 'bg-green-500/10 text-green-500 border border-green-500/20'
                )}
              >
                <AlertTriangle size={24} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-foreground mb-1">{t(risk.titleKey)}</h3>
                <p className="text-xs text-muted-foreground mb-3">
                  {t('multi.riskStat.level')}:{' '}
                  <span className="font-semibold text-foreground">
                    {risk.severity === 'high'
                      ? t('multi.riskStat.high')
                      : t('multi.riskStat.medium')}
                  </span>
                  {' — '}
                  {t(risk.reasonKey)}
                </p>
                <div className="h-1.5 rounded-full bg-muted/50 overflow-hidden mb-2">
                  <div
                    className={cn('h-full rounded-full transition-all duration-700', barColor)}
                    style={{ width: `${risk.levelPercent}%` }}
                  />
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{t(risk.descKey)}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
