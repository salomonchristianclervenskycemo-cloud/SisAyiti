'use client'

import { useLang } from '@/lib/lang-context'
import { HOME_PARTNERS } from '@/lib/home-landing-data'
import { HomeSection } from './home-section'

export function HomeSources() {
  const { t } = useLang()

  return (
    <HomeSection title={t('home.landing.sources.title')}>
      <div className="flex flex-wrap justify-center gap-3">
        {HOME_PARTNERS.map((org) => (
          <div
            key={org}
            className="flex items-center justify-center min-w-[96px] px-4 py-2.5 rounded-xl border border-border/60 bg-card/50"
          >
            <span className="text-sm font-bold tracking-wide text-muted-foreground">{org}</span>
          </div>
        ))}
      </div>
    </HomeSection>
  )
}
