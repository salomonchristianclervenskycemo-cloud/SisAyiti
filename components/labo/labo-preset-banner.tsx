'use client'

import { useLang } from '@/lib/lang-context'
import type { LaboPreset } from '@/lib/offline-education'
import { Stethoscope, X } from 'lucide-react'

type Props = {
  preset: LaboPreset
  onDismiss: () => void
}

export function LaboPresetBanner({ preset, onDismiss }: Props) {
  const { t } = useLang()

  const qualityKey =
    preset.buildingQuality === 'poor'
      ? 'labo.quality.poor'
      : preset.buildingQuality === 'good'
        ? 'labo.quality.excellent'
        : 'labo.quality.average'

  return (
    <div className="rounded-2xl border-2 border-primary/35 bg-gradient-to-br from-primary/10 via-background to-cyan-500/5 p-4 md:p-5">
      <div className="flex gap-3 items-start">
        <div className="w-11 h-11 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
          <Stethoscope size={22} className="text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-black text-foreground text-sm">{t('labo.preset.title')}</h3>
            <button
              type="button"
              onClick={onDismiss}
              className="p-1 rounded-lg hover:bg-secondary text-muted-foreground shrink-0"
              aria-label="Fermer"
            >
              <X size={16} />
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{t('labo.preset.subtitle')}</p>
          <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-bold">
            <span className="px-2.5 py-1 rounded-lg bg-card border border-border">Mw {preset.magnitude}</span>
            <span className="px-2.5 py-1 rounded-lg bg-card border border-border">{preset.distance} km</span>
            <span className="px-2.5 py-1 rounded-lg bg-card border border-border">{preset.soilId}</span>
            <span className="px-2.5 py-1 rounded-lg bg-card border border-border">{t(qualityKey)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
