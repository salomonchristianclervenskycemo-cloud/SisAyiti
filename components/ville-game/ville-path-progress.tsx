'use client'

import { useEffect, useState } from 'react'
import { useLang } from '@/lib/lang-context'
import { useApp } from '@/lib/app-context'
import { loadVilleProgress } from '@/lib/offline-education'
import { BookOpen, Stethoscope, FlaskConical, ShieldCheck } from 'lucide-react'

export function VillePathProgress() {
  const { t } = useLang()
  const { setActiveModule } = useApp()
  const [progress, setProgress] = useState({ maxPhasesReached: 0, campaignsCompleted: 0 })

  useEffect(() => {
    const refresh = () => setProgress(loadVilleProgress())
    refresh()
    window.addEventListener('sisayiti-ville-progress', refresh)
    return () => window.removeEventListener('sisayiti-ville-progress', refresh)
  }, [])

  const progressText = t('ville.path.progress')
    .replace('{phases}', String(progress.maxPhasesReached))
    .replace('{campaigns}', String(progress.campaignsCompleted))

  return (
    <div className="rounded-2xl border border-teal-500/25 bg-teal-500/5 p-4 space-y-3">
      <div>
        <h3 className="font-bold text-foreground text-sm">{t('ville.path.title')}</h3>
        <p className="text-xs text-muted-foreground mt-1">{t('ville.path.hint')}</p>
        {(progress.maxPhasesReached > 0 || progress.campaignsCompleted > 0) && (
          <p className="text-xs text-teal-600 dark:text-teal-400 font-semibold mt-1">{progressText}</p>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveModule('comprendre')}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-border bg-card text-xs font-bold hover:border-primary/30"
        >
          <BookOpen size={14} /> {t('ville.path.ctaComprendre')}
        </button>
        <button
          type="button"
          onClick={() => setActiveModule('diagnostic')}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-border bg-card text-xs font-bold hover:border-primary/30"
        >
          <Stethoscope size={14} /> {t('ville.path.ctaDiagnostic')}
        </button>
        <button
          type="button"
          onClick={() => setActiveModule('labo')}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-border bg-card text-xs font-bold hover:border-primary/30"
        >
          <FlaskConical size={14} /> {t('ville.path.ctaLabo')}
        </button>
        <button
          type="button"
          onClick={() => setActiveModule('prevention')}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90"
        >
          <ShieldCheck size={14} /> {t('ville.path.ctaPrevention')}
        </button>
      </div>
    </div>
  )
}
