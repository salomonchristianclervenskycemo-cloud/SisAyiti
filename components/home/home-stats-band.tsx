'use client'

import { GitBranch, Activity, Users, Building2 } from 'lucide-react'
import { useLang } from '@/lib/lang-context'
import { HOME_STATS } from '@/lib/home-landing-data'
import { GlassCard } from '@/components/surveillance/glass-card'
import { HomeSection } from './home-section'

const ICONS = {
  fault: GitBranch,
  quake: Activity,
  people: Users,
  building: Building2,
} as const

export function HomeStatsBand() {
  const { t } = useLang()

  return (
    <HomeSection title={t('home.landing.stats.title')}>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {HOME_STATS.map((stat) => {
          const Icon = ICONS[stat.icon]
          return (
            <GlassCard key={stat.titleKey} className="p-5 md:p-6 text-center">
              <Icon size={22} className="mx-auto text-primary mb-3" />
              <p className="text-3xl font-black text-foreground tabular-nums">{stat.value}</p>
              <p className="text-sm font-bold text-foreground mt-2">{t(stat.titleKey)}</p>
              <p className="text-xs text-muted-foreground mt-1">{t(stat.descKey)}</p>
            </GlassCard>
          )
        })}
      </div>
    </HomeSection>
  )
}
