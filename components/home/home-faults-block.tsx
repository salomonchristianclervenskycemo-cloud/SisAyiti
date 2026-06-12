'use client'

import dynamic from 'next/dynamic'
import { useMemo } from 'react'
import { useLang } from '@/lib/lang-context'
import { useSurveillanceDashboard } from '@/hooks/use-surveillance-dashboard'
import { surveillanceEventsToUI } from '@/lib/surveillance/bridge-to-ui'
import { enrichSeismicEvents } from '@/lib/seismic-event-enrich'
import { GlassCard } from '@/components/surveillance/glass-card'
import { HomeSection } from './home-section'

const HomeHaitiMapLibre = dynamic(
  () => import('./home-haiti-map-libre').then((m) => m.HomeHaitiMapLibre),
  { ssr: false, loading: () => <div className="min-h-[320px] rounded-xl bg-muted/30 animate-pulse" /> }
)

export function HomeFaultsBlock() {
  const { t } = useLang()
  const surveillance = useSurveillanceDashboard({ syncToSeismicStore: false, days: 30 })

  const mapEvents = useMemo(
    () => enrichSeismicEvents(surveillanceEventsToUI(surveillance.events)).slice(0, 60),
    [surveillance.events]
  )

  const faults = [
    { nameKey: 'home.landing.fault.epgf', descKey: 'home.landing.fault.epgf.desc', bar: 'bg-gradient-to-r from-orange-500 to-red-500' },
    { nameKey: 'home.landing.fault.sept', descKey: 'home.landing.fault.sept.desc', bar: 'bg-blue-500' },
  ]

  return (
    <HomeSection
      alternate
      title={t('home.landing.faults.title')}
      subtitle={t('home.landing.faults.subtitle')}
    >
      <div className="grid lg:grid-cols-2 gap-6 items-start">
        <GlassCard className="p-2">
          <HomeHaitiMapLibre
            events={mapEvents}
            minHeight={320}
            interactive
            showLegend
            satellite
          />
        </GlassCard>
        <div className="space-y-4">
          {faults.map((f) => (
            <div key={f.nameKey} className="rounded-xl border border-border/60 bg-card/60 p-5">
              <div className="flex items-center gap-3 mb-2">
                <span className={`w-8 h-1.5 rounded-full ${f.bar}`} />
                <h3 className="font-bold text-foreground text-sm">{t(f.nameKey)}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{t(f.descKey)}</p>
            </div>
          ))}
          <p className="text-xs text-muted-foreground leading-relaxed border-l-2 border-primary/30 pl-3">
            {t('carte.faults.banner')}
          </p>
        </div>
      </div>
    </HomeSection>
  )
}
