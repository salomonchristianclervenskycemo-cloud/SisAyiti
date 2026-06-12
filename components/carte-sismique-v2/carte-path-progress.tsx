'use client'

import { useEffect, useState } from 'react'
import { useLang } from '@/lib/lang-context'
import { useApp } from '@/lib/app-context'
import { loadCarteProgress } from '@/lib/offline-education'
import { BookOpen, FlaskConical, ShieldCheck, Radio } from 'lucide-react'

export function CartePathProgress() {
  const { t } = useLang()
  const { setActiveModule } = useApp()
  const [progress, setProgress] = useState({ eventsExplored: [] as string[], guideOpened: false })

  useEffect(() => {
    const refresh = () => setProgress(loadCarteProgress())
    refresh()
    window.addEventListener('sisayiti-carte-progress', refresh)
    return () => window.removeEventListener('sisayiti-carte-progress', refresh)
  }, [])

  const guideLabel = progress.guideOpened ? t('carte.path.guideOpened') : t('carte.path.guideNotOpened')
  const progressText = t('carte.path.progress')
    .replace('{events}', String(progress.eventsExplored.length))
    .replace('{guide}', guideLabel)

  return (
    <div className="rounded-xl border border-cyan-500/25 bg-cyan-500/10 p-3 space-y-3">
      <div>
        <h3 className="font-bold text-white text-sm">{t('carte.path.title')}</h3>
        <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">{t('carte.path.hint')}</p>
        {(progress.eventsExplored.length > 0 || progress.guideOpened) && (
          <p className="text-[11px] text-cyan-400/90 font-semibold mt-1">{progressText}</p>
        )}
      </div>
      <div className="flex flex-wrap gap-1.5">
        <button
          type="button"
          onClick={() => setActiveModule('comprendre')}
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-white/10 bg-black/40 text-[10px] font-bold text-gray-200 hover:border-cyan-500/40"
        >
          <BookOpen size={12} /> {t('carte.path.ctaComprendre')}
        </button>
        <button
          type="button"
          onClick={() => setActiveModule('labo')}
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-white/10 bg-black/40 text-[10px] font-bold text-gray-200 hover:border-cyan-500/40"
        >
          <FlaskConical size={12} /> {t('carte.path.ctaLabo')}
        </button>
        <button
          type="button"
          onClick={() => setActiveModule('prevention')}
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-white/10 bg-black/40 text-[10px] font-bold text-gray-200 hover:border-cyan-500/40"
        >
          <ShieldCheck size={12} /> {t('carte.path.ctaPrevention')}
        </button>
        <button
          type="button"
          onClick={() => setActiveModule('actualite')}
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-cyan-600/80 text-white text-[10px] font-bold hover:bg-cyan-500/90"
        >
          <Radio size={12} /> {t('carte.path.ctaActualite')}
        </button>
      </div>
    </div>
  )
}
