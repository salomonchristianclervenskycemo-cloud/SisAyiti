'use client'

import { useState } from 'react'
import { ChevronDown, GraduationCap } from 'lucide-react'
import { useLang } from '@/lib/lang-context'
import { cn } from '@/lib/utils'
import { HomeScienceNav } from './home-science-nav'
import { HomeQuizPanel } from './home-quiz-panel'

export function HomeEducationSection() {
  const { t } = useLang()
  const [open, setOpen] = useState(false)

  return (
    <section className="rounded-2xl border border-border/60 bg-card/40 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-3 px-4 py-3 sm:px-5 sm:py-4 text-left hover:bg-muted/30 transition-colors"
        aria-expanded={open}
      >
        <span className="flex items-center gap-3 min-w-0">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20">
            <GraduationCap size={18} />
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-bold text-foreground">{t('home.education.title')}</span>
            <span className="block text-xs text-muted-foreground">{t('home.education.hint')}</span>
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
          <HomeScienceNav />
          <HomeQuizPanel />
        </div>
      )}
    </section>
  )
}
