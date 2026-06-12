'use client'

import { useLang } from '@/lib/lang-context'
import { HAITI_EARTHQUAKE_PHASES } from '@/shared/ville-game'
import { INTENSITY_COLORS } from '@/lib/labo-constants'

const PHASE_COLORS = ['#22c55e', '#f59e0b', '#ef4444', '#b91c1c']

export function VilleCampaignIntro() {
  const { t } = useLang()

  return (
    <div className="rounded-2xl border border-orange-500/30 bg-gradient-to-br from-orange-500/8 via-background to-red-500/5 p-4 md:p-5">
      <p className="text-xs text-muted-foreground leading-relaxed mb-4">{t('ville.campaign.intro')}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {HAITI_EARTHQUAKE_PHASES.map((ph, i) => (
          <div
            key={ph.id}
            className="rounded-xl border border-border/50 bg-card/80 p-3 space-y-1"
            style={{ borderLeftWidth: 3, borderLeftColor: PHASE_COLORS[i] }}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-black text-muted-foreground uppercase">
                {t('ville.phase')} {ph.id}
              </span>
              <span
                className="text-xs font-black px-2 py-0.5 rounded-md"
                style={{ color: INTENSITY_COLORS[Math.min(12, Math.round(ph.magnitude))], backgroundColor: `${PHASE_COLORS[i]}18` }}
              >
                M{ph.magnitude}
              </span>
            </div>
            <h4 className="text-sm font-bold text-foreground leading-tight">{t(ph.labelKey)}</h4>
            <p className="text-[11px] text-muted-foreground leading-relaxed">{t(ph.detailKey)}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
