'use client'

import { useState } from 'react'
import { useLang } from '@/lib/lang-context'
import { HAITI_HISTORICAL_EVENTS } from '@/lib/comprendre-events'
import { cn } from '@/lib/utils'
import { Waves } from 'lucide-react'

type Tab = 'context' | 'damages' | 'lesson' | 'limits'

export function HaitiHistoryPanel() {
  const { t } = useLang()
  const [activeIdx, setActiveIdx] = useState(4)
  const [tab, setTab] = useState<Tab>('context')
  const ev = HAITI_HISTORICAL_EVENTS[activeIdx]

  const tabs: { id: Tab; labelKey: string }[] = [
    { id: 'context', labelKey: 'comp.history.tabContext' },
    { id: 'damages', labelKey: 'comp.history.tabDamages' },
    { id: 'lesson', labelKey: 'comp.history.tabLesson' },
    { id: 'limits', labelKey: 'comp.history.tabLimits' },
  ]

  const contentKey =
    tab === 'context'
      ? ev.contextKey
      : tab === 'damages'
        ? ev.damagesKey
        : tab === 'lesson'
          ? ev.lessonKey
          : ev.limitsKey

  return (
    <div className="rounded-2xl border border-border/50 bg-card/60 p-4 md:p-5 space-y-4">
      <p className="text-xs text-muted-foreground">{t('comp.history.hint')}</p>
      <div className="flex flex-wrap gap-2">
        {HAITI_HISTORICAL_EVENTS.map((e, i) => (
          <button
            key={e.id}
            type="button"
            onClick={() => {
              setActiveIdx(i)
              setTab('context')
            }}
            className={cn(
              'px-3 py-2 rounded-xl text-sm font-bold border transition-all',
              activeIdx === i
                ? 'bg-primary text-primary-foreground border-primary shadow-md'
                : 'bg-secondary/50 border-border text-muted-foreground hover:text-foreground'
            )}
          >
            {e.year}
            {e.mw && <span className="ml-1 text-[10px] opacity-80">Mw {e.mw}</span>}
            {e.tsunami && <Waves size={12} className="inline ml-1 opacity-80" />}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-1 border-b border-border/50 pb-2">
        {tabs.map((tb) => (
          <button
            key={tb.id}
            type="button"
            onClick={() => setTab(tb.id)}
            className={cn(
              'px-3 py-1.5 rounded-lg text-xs font-bold transition-colors',
              tab === tb.id ? 'bg-primary/15 text-primary' : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {t(tb.labelKey)}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-black text-xl text-foreground">{ev.year}</span>
          {ev.mw && (
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
              Mw {ev.mw}
            </span>
          )}
          <span className="text-xs text-muted-foreground">{t(ev.faultKey)}</span>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed border-l-4 border-primary pl-4">
          {t(contentKey)}
        </p>
      </div>
    </div>
  )
}
