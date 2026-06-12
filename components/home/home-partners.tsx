'use client'

import { useLang } from '@/lib/lang-context'
import { HOME_PARTNERS } from '@/lib/home-landing-data'
import { HomeSection } from './home-section'

export function HomePartners() {
  const { t } = useLang()

  return (
    <HomeSection title={t('home.landing.partners.title')}>
      <div className="flex flex-wrap justify-center gap-3 md:gap-4">
        {HOME_PARTNERS.map((org) => (
          <div
            key={org}
            className="flex items-center justify-center min-w-[100px] px-5 py-3 rounded-xl border border-sky-500/15 bg-[#041428]/40 backdrop-blur-sm"
          >
            <span className="text-sm font-black tracking-wider text-sky-200/70">{org}</span>
          </div>
        ))}
      </div>
    </HomeSection>
  )
}
