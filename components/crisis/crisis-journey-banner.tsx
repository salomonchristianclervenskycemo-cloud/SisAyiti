'use client'

import { useEffect, useMemo, useState } from 'react'
import { AlertTriangle, BookOpen, Home, Shield, X } from 'lucide-react'
import { useLang } from '@/lib/lang-context'
import { useApp } from '@/lib/app-context'
import { useSeismicStore } from '@/lib/seismic-store'
import {
  dismissCrisisEvent,
  pickActiveCrisisEvent,
  setCrisisMode,
} from '@/lib/crisis-journey'
import { cn } from '@/lib/utils'

export function CrisisJourneyBanner() {
  const { t } = useLang()
  const { setActiveModule } = useApp()
  const events = useSeismicStore((s) => s.events)
  const [hidden, setHidden] = useState(false)

  const event = useMemo(() => pickActiveCrisisEvent(events), [events])

  useEffect(() => {
    setHidden(false)
  }, [event?.id])

  if (!event || hidden) return null

  const summary = t('crisis.event.summary')
    .replace('{mag}', event.magnitude.toFixed(1))
    .replace('{depth}', String(Math.round(event.depth)))
    .replace('{place}', event.region || 'Ayiti')

  const start = (module: 'comprendre' | 'prevention' | 'diagnostic') => {
    setCrisisMode(true, event.id)
    setActiveModule(module)
  }

  return (
    <div
      role="alert"
      className="mx-4 md:mx-6 mt-2 mb-0 rounded-xl border border-amber-500/40 bg-amber-500/10 dark:bg-amber-950/40 px-4 py-3 shadow-sm"
    >
      <div className="flex items-start gap-3">
        <AlertTriangle className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" size={22} />
        <div className="flex-1 min-w-0">
          <p className="font-bold text-sm text-foreground">{t('crisis.banner.title')}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{summary}</p>
          <p className="text-xs text-muted-foreground mt-1">{t('crisis.banner.subtitle')}</p>
          <div className="flex flex-wrap gap-2 mt-3">
            <button
              type="button"
              onClick={() => start('comprendre')}
              className={cn(
                'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold',
                'bg-card border border-border hover:border-primary/40 transition-colors'
              )}
            >
              <BookOpen size={14} /> {t('crisis.step1')}
            </button>
            <button
              type="button"
              onClick={() => start('prevention')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Shield size={14} /> {t('crisis.step2')}
            </button>
            <button
              type="button"
              onClick={() => start('diagnostic')}
              className={cn(
                'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold',
                'bg-card border border-border hover:border-primary/40 transition-colors'
              )}
            >
              <Home size={14} /> {t('crisis.step3')}
            </button>
          </div>
        </div>
        <button
          type="button"
          aria-label={t('crisis.banner.dismiss')}
          onClick={() => {
            dismissCrisisEvent(event.id)
            setHidden(true)
          }}
          className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/80"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  )
}
