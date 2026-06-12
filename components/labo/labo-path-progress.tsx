'use client'

import { useEffect, useState } from 'react'
import { useLang } from '@/lib/lang-context'
import { useApp } from '@/lib/app-context'
import { loadLaboProgress } from '@/lib/offline-education'
import { BookOpen, Stethoscope, ShieldCheck } from 'lucide-react'

export function LaboPathProgress() {
  const { t } = useLang()
  const { setActiveModule } = useApp()
  const [progress, setProgress] = useState({ simulations: 0, scenarios: [] as string[] })

  useEffect(() => {
    const refresh = () => setProgress(loadLaboProgress())
    refresh()
    window.addEventListener('sisayiti-labo-progress', refresh)
    return () => window.removeEventListener('sisayiti-labo-progress', refresh)
  }, [])

  const progressText = t('labo.path.progress')
    .replace('{sims}', String(progress.simulations))
    .replace('{scenarios}', String(progress.scenarios.length))

  return (
    <div className="rounded-2xl border border-cyan-500/25 bg-cyan-500/5 p-4 space-y-3">
      <div>
        <h3 className="font-bold text-foreground text-sm">{t('labo.path.title')}</h3>
        <p className="text-xs text-muted-foreground mt-1">{t('labo.path.hint')}</p>
        {progress.simulations > 0 && (
          <p className="text-xs text-primary font-semibold mt-1">{progressText}</p>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveModule('comprendre')}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-border bg-card text-xs font-bold hover:border-primary/30"
        >
          <BookOpen size={14} /> {t('labo.path.ctaComprendre')}
        </button>
        <button
          type="button"
          onClick={() => setActiveModule('diagnostic')}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-border bg-card text-xs font-bold hover:border-primary/30"
        >
          <Stethoscope size={14} /> {t('labo.path.ctaDiagnostic')}
        </button>
        <button
          type="button"
          onClick={() => setActiveModule('prevention')}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90"
        >
          <ShieldCheck size={14} /> {t('labo.path.ctaPrevention')}
        </button>
      </div>
    </div>
  )
}
