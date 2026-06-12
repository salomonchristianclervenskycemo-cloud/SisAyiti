'use client'

import { useEffect, useState } from 'react'
import { useLang } from '@/lib/lang-context'
import { useApp } from '@/lib/app-context'
import { PREVENTION_SECTION_KEYS, countAllPreventionItems } from '@/lib/translations/prevention'
import { loadPreventionProgress } from '@/lib/offline-education'
import { BookOpen, Stethoscope, ChevronRight } from 'lucide-react'

const TOTAL_ITEMS = countAllPreventionItems()

export function PreventionPathProgress() {
  const { t } = useLang()
  const { setActiveModule } = useApp()
  const [done, setDone] = useState(0)

  useEffect(() => {
    const refresh = () => {
      const progress = loadPreventionProgress()
      const ids = new Set<number>()
      for (const key of PREVENTION_SECTION_KEYS) {
        for (const id of progress[key] ?? []) ids.add(id)
      }
      setDone(ids.size)
    }
    refresh()
    window.addEventListener('sisayiti-prev-progress', refresh)
    return () => window.removeEventListener('sisayiti-prev-progress', refresh)
  }, [])

  const pct = Math.round((done / TOTAL_ITEMS) * 100)
  const readyDiagnostic = done >= Math.floor(TOTAL_ITEMS * 0.5)

  return (
    <div className="rounded-2xl border border-primary/25 bg-primary/5 p-4 flex flex-col sm:flex-row sm:items-center gap-4">
      <div className="flex-1">
        <h3 className="font-bold text-foreground text-sm">{t('prev.path.title')}</h3>
        <p className="text-xs text-muted-foreground mt-1">
          {t('prev.path.progress').replace('{done}', String(done)).replace('{total}', String(TOTAL_ITEMS))}
        </p>
        <div className="mt-2 h-2 rounded-full bg-muted overflow-hidden max-w-md">
          <div className="h-full bg-primary transition-all duration-500" style={{ width: `${pct}%` }} />
        </div>
      </div>
      <div className="flex flex-wrap gap-2 shrink-0">
        <button
          type="button"
          onClick={() => setActiveModule('comprendre')}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-border bg-card text-xs font-bold hover:border-primary/30"
        >
          <BookOpen size={14} /> {t('prev.path.ctaComprendre')}
        </button>
        {readyDiagnostic && (
          <button
            type="button"
            onClick={() => setActiveModule('diagnostic')}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90"
          >
            <Stethoscope size={14} /> {t('prev.path.ctaDiagnostic')} <ChevronRight size={14} />
          </button>
        )}
      </div>
    </div>
  )
}
