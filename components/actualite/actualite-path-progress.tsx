'use client'

import { useEffect, useState } from 'react'
import { BookOpen, Map, ShieldCheck } from 'lucide-react'
import { useLang } from '@/lib/lang-context'
import { useApp } from '@/lib/app-context'
import { loadActualiteProgress } from '@/lib/offline-education'

type Props = {
  onOpenMap?: () => void
}

export function ActualitePathProgress({ onOpenMap }: Props) {
  const { t } = useLang()
  const { setActiveModule } = useApp()
  const [progress, setProgress] = useState({ eventsInspected: [] as string[], filtersTried: [] as string[] })

  useEffect(() => {
    const refresh = () => setProgress(loadActualiteProgress())
    refresh()
    window.addEventListener('sisayiti-actualite-progress', refresh)
    return () => window.removeEventListener('sisayiti-actualite-progress', refresh)
  }, [])

  const progressText = t('act.path.progress')
    .replace('{events}', String(progress.eventsInspected.length))
    .replace('{filters}', String(progress.filtersTried.length))

  const hasProgress = progress.eventsInspected.length > 0 || progress.filtersTried.length > 0

  return (
    <div className="rounded-2xl border border-primary/25 bg-primary/5 p-4 space-y-3">
      <div>
        <h3 className="font-bold text-foreground text-sm">{t('act.path.title')}</h3>
        <p className="text-xs text-muted-foreground mt-1">{t('act.path.hint')}</p>
        {hasProgress && (
          <p className="text-xs text-primary font-semibold mt-1">{progressText}</p>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => (onOpenMap ? onOpenMap() : setActiveModule('carte'))}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-border bg-card text-xs font-bold hover:border-primary/30"
        >
          <Map size={14} /> {t('act.path.ctaCarte')}
        </button>
        <button
          type="button"
          onClick={() => setActiveModule('comprendre')}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-border bg-card text-xs font-bold hover:border-primary/30"
        >
          <BookOpen size={14} /> {t('act.path.ctaComprendre')}
        </button>
        <button
          type="button"
          onClick={() => setActiveModule('prevention')}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90"
        >
          <ShieldCheck size={14} /> {t('act.path.ctaPrevention')}
        </button>
      </div>
    </div>
  )
}
