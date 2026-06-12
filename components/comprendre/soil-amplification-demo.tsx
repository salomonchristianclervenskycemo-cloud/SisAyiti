'use client'

import { useState } from 'react'
import { useLang } from '@/lib/lang-context'
import { ScienceCallout } from '@/components/comprendre/science-callout'
import { SoilShakeDiagram } from '@/components/comprendre/soil-shake-diagram'
import { cn } from '@/lib/utils'

export function SoilAmplificationDemo() {
  const { t } = useLang()
  const [playing, setPlaying] = useState(false)
  const [profile, setProfile] = useState<'rock' | 'soft' | 'both'>('both')

  const run = () => {
    setPlaying(true)
    setProfile('both')
    window.setTimeout(() => setPlaying(false), 2800)
  }

  return (
    <div className="space-y-5">
      <ScienceCallout
        whatKey="comp.soil.what"
        whyKey="comp.soil.why"
        haitiKey="comp.soil.haiti"
        limitsKey="comp.soil.limits"
        impactKey="comp.soil.impact"
      />

      <div className="flex flex-wrap gap-2">
        {(['rock', 'soft', 'both'] as const).map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setProfile(p)}
            className={cn(
              'px-4 py-2 rounded-xl text-xs font-bold border transition-all',
              profile === p
                ? p === 'rock'
                  ? 'bg-emerald-500/15 border-emerald-500/40'
                  : p === 'soft'
                    ? 'bg-amber-500/15 border-amber-500/40'
                    : 'bg-primary/15 border-primary/40'
                : 'border-border text-muted-foreground'
            )}
          >
            {p === 'rock' ? t('comp.soil.rock') : p === 'soft' ? t('comp.soil.soft') : t('comp.soil.compare')}
          </button>
        ))}
      </div>

      <SoilShakeDiagram playing={playing} highlight={profile} />

      <div className="rounded-xl border border-orange-500/25 bg-orange-500/5 p-4">
        <div className="flex items-start gap-3">
          <svg viewBox="0 0 80 60" className="w-16 h-12 shrink-0" aria-hidden>
            <rect x="10" y="35" width="60" height="20" fill="#d97706" opacity="0.5" rx="2" />
            <ellipse cx="25" cy="42" rx="10" ry="4" fill="#38bdf8" opacity="0.7">
              <animate attributeName="rx" values="6;14;6" dur="1s" repeatCount="indefinite" />
            </ellipse>
            <ellipse cx="55" cy="48" rx="12" ry="4" fill="#38bdf8" opacity="0.7">
              <animate attributeName="rx" values="8;16;8" dur="0.9s" repeatCount="indefinite" />
            </ellipse>
            <rect x="30" y="12" width="20" height="22" fill="#64748b" opacity="0.6" transform="rotate(8 40 23)" />
          </svg>
          <div>
            <h4 className="font-bold text-sm text-foreground mb-1">{t('comp.soil.liquefactionTitle')}</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">{t('comp.soil.liquefaction')}</p>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={run}
        className="w-full py-3 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90"
      >
        {t('comp.soil.simulate')}
      </button>
    </div>
  )
}
