'use client'

import { useState } from 'react'
import { ChevronDown, GraduationCap, ShieldCheck } from 'lucide-react'
import { useLang } from '@/lib/lang-context'
import { useApp } from '@/lib/app-context'
import { cn } from '@/lib/utils'
import { ActualitePathProgress } from './actualite-path-progress'
import { ActualiteScienceNav } from './actualite-science-nav'
import { ActualiteQuizPanel } from './actualite-quiz-panel'

type Props = {
  onOpenMap?: () => void
}

export function ActualiteEducationSection({ onOpenMap }: Props) {
  const { t } = useLang()
  const { setActiveModule } = useApp()
  const [open, setOpen] = useState(false)

  return (
    <section className="rounded-2xl border border-border/60 bg-card/50 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-3 px-4 py-3 sm:px-5 sm:py-4 text-left hover:bg-muted/40 transition-colors"
        aria-expanded={open}
      >
        <span className="flex items-center gap-3 min-w-0">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20">
            <GraduationCap size={18} />
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-bold text-foreground">{t('act.education.title')}</span>
            <span className="block text-xs text-muted-foreground truncate">{t('act.subtitleLong')}</span>
          </span>
        </span>
        <ChevronDown
          size={18}
          className={cn('shrink-0 text-muted-foreground transition-transform', open && 'rotate-180')}
          aria-hidden
        />
      </button>

      {open && (
        <div className="px-4 pb-5 sm:px-5 space-y-5 border-t border-border/40 pt-4">
          <ActualitePathProgress onOpenMap={onOpenMap} />
          <ActualiteScienceNav />
          <ActualiteQuizPanel />
          <button
            type="button"
            onClick={() => setActiveModule('prevention')}
            className="w-full flex items-center justify-center gap-2 px-5 py-4 rounded-2xl border border-primary/30 bg-primary/5 text-sm font-bold hover:bg-primary/10 transition-colors"
          >
            <ShieldCheck size={18} /> {t('act.cta.prevention')}
          </button>
        </div>
      )}
    </section>
  )
}
