'use client'

import { useLang } from '@/lib/lang-context'
import { cn } from '@/lib/utils'
import type { PreventionPhase } from '@/lib/translations/prevention'
import { CalendarClock, Zap, HeartPulse } from 'lucide-react'

const PHASES: { id: PreventionPhase; icon: typeof CalendarClock; labelKey: string; descKey: string; color: string }[] = [
  { id: 'avant', icon: CalendarClock, labelKey: 'prev.phase.avant', descKey: 'prev.phase.avantDesc', color: '#3b82f6' },
  { id: 'pendant', icon: Zap, labelKey: 'prev.phase.pendant', descKey: 'prev.phase.pendantDesc', color: '#ef4444' },
  { id: 'apres', icon: HeartPulse, labelKey: 'prev.phase.apres', descKey: 'prev.phase.apresDesc', color: '#22c55e' },
]

type Props = {
  active: PreventionPhase
  onChange: (p: PreventionPhase) => void
  compact?: boolean
}

export function PreventionPhaseNav({ active, onChange, compact }: Props) {
  const { t } = useLang()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {PHASES.map((p) => {
        const Icon = p.icon
        const isActive = active === p.id
        return (
          <button
            key={p.id}
            type="button"
            onClick={() => onChange(p.id)}
            className={cn(
              'relative text-left rounded-2xl border-2 p-4 transition-all',
              compact && 'p-3',
              isActive
                ? 'border-primary/50 bg-primary/10 shadow-[0_0_20px_rgba(59,130,246,0.12)]'
                : 'border-border/50 bg-card hover:border-primary/25'
            )}
          >
            <div className="flex items-center gap-2 mb-1">
              <Icon size={compact ? 18 : 20} style={{ color: p.color }} />
              <span className={cn('font-black tracking-wide', compact ? 'text-sm' : 'text-base')}>{t(p.labelKey)}</span>
            </div>
            {!compact && <p className="text-xs text-muted-foreground leading-relaxed">{t(p.descKey)}</p>}
            {isActive && <div className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full" style={{ backgroundColor: p.color }} />}
          </button>
        )
      })}
    </div>
  )
}
