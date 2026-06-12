'use client'

import { useState } from 'react'
import { useLang } from '@/lib/lang-context'
import { cn } from '@/lib/utils'

const EVENTS = [
  { year: '1751', key: 'comp.chrono.1751', mw: null },
  { year: '1842', key: 'comp.chrono.1842', mw: null },
  { year: '2010', key: 'comp.chrono.2010', mw: '7.0' },
  { year: '2021', key: 'comp.chrono.2021', mw: '7.2' },
] as const

export function HaitiTimeline() {
  const { t } = useLang()
  const [active, setActive] = useState(2)

  const ev = EVENTS[active]

  return (
    <div className="rounded-2xl border border-border/50 bg-card/60 p-4 md:p-5 space-y-4">
      <p className="text-xs text-muted-foreground">{t('comp.timeline.hint')}</p>
      <div className="flex flex-wrap gap-2">
        {EVENTS.map((e, i) => (
          <button
            key={e.year}
            type="button"
            onClick={() => setActive(i)}
            className={cn(
              'px-4 py-2 rounded-xl text-sm font-bold border transition-all',
              active === i
                ? 'bg-primary text-primary-foreground border-primary shadow-md'
                : 'bg-secondary/50 border-border text-muted-foreground hover:text-foreground'
            )}
          >
            {e.year}
            {e.mw && (
              <span className="ml-1.5 text-[10px] opacity-80">
                Mw {e.mw}
              </span>
            )}
          </button>
        ))}
      </div>
      <div className="border-l-4 border-primary pl-4 py-2 text-sm text-muted-foreground leading-relaxed">
        <div className="font-black text-foreground text-lg mb-1">{ev.year}</div>
        <p>{t(ev.key)}</p>
      </div>
    </div>
  )
}
