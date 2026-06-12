'use client'

import { useEffect } from 'react'
import { X, ShieldCheck } from 'lucide-react'
import { useLang } from '@/lib/lang-context'
import { useApp } from '@/lib/app-context'
import { recordCarteGuideOpened } from '@/lib/offline-education'
import { CartePathProgress } from './carte-path-progress'
import { CarteScienceNav } from './carte-science-nav'
import { CarteHaitiEvents } from './carte-haiti-events'
import { CarteQuizPanel } from './carte-quiz-panel'

type Props = {
  open: boolean
  onClose: () => void
}

export function CarteGuidePanel({ open, onClose }: Props) {
  const { t } = useLang()
  const { setActiveModule } = useApp()

  useEffect(() => {
    if (open) recordCarteGuideOpened()
  }, [open])

  return (
    <div
      className={`absolute left-0 top-0 bottom-0 z-[1002] w-full max-w-[400px] bg-black/90 backdrop-blur-xl border-r border-cyan-500/30 shadow-2xl transform transition-transform duration-300 pointer-events-auto flex flex-col ${
        open ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-white/10 shrink-0">
        <div>
          <h2 className="text-sm font-black text-white">{t('carte.guide.title')}</h2>
          <p className="text-[10px] text-gray-500 mt-0.5 max-w-[280px] leading-relaxed">{t('carte.subtitleLong')}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-2 rounded-lg hover:bg-white/10 text-gray-400"
          aria-label={t('carte.guide.close')}
        >
          <X size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        <CartePathProgress />
        <CarteScienceNav />
        <CarteHaitiEvents onLocated={onClose} />
        <CarteQuizPanel />
        <button
          type="button"
          onClick={() => setActiveModule('prevention')}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-xs font-bold text-cyan-300 hover:bg-cyan-500/20 transition-colors"
        >
          <ShieldCheck size={16} /> {t('carte.cta.prevention')}
        </button>
      </div>
    </div>
  )
}
