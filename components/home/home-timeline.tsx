'use client'

import { useLang } from '@/lib/lang-context'
import { HOME_TIMELINE } from '@/lib/home-landing-data'
import { HomeSection } from './home-section'

export function HomeTimeline() {
  const { t } = useLang()

  return (
    <HomeSection alternate title={t('home.landing.timeline.title')}>
      <div className="relative max-w-2xl mx-auto">
        <div className="absolute left-[19px] top-2 bottom-2 w-px bg-border" aria-hidden />
        <ul className="space-y-6">
          {HOME_TIMELINE.map((ev) => (
            <li key={ev.year} className="relative pl-12">
              <span className="absolute left-0 top-1 flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary/40 bg-card text-xs font-black text-primary">
                {ev.year.slice(2)}
              </span>
              <div className="rounded-xl border border-border/60 bg-card/50 p-4 hover:border-primary/30 transition-colors">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="text-lg font-black text-foreground">{ev.year}</span>
                  <span className="text-sm font-bold text-orange-500">{t(ev.magKey)}</span>
                  <span className="text-sm text-muted-foreground">— {t(ev.locKey)}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{t(ev.sumKey)}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </HomeSection>
  )
}
