'use client'

import dynamic from 'next/dynamic'
import { useMemo } from 'react'
import { ArrowRight, Check, Map, BookOpen } from 'lucide-react'
import { useLang } from '@/lib/lang-context'
import { useApp } from '@/lib/app-context'
import { useSurveillanceDashboard } from '@/hooks/use-surveillance-dashboard'
import { surveillanceEventsToUI } from '@/lib/surveillance/bridge-to-ui'
import { enrichSeismicEvents } from '@/lib/seismic-event-enrich'
import { recordHomeModuleVisited, recordHomePathStep } from '@/lib/offline-education'
import { GlassCard } from '@/components/surveillance/glass-card'
import { SisAyitiLogo } from '@/components/home/sisayiti-logo'

const HomeHaitiMapLibre = dynamic(
  () => import('./home-haiti-map-libre').then((m) => m.HomeHaitiMapLibre),
  { ssr: false, loading: () => <div className="min-h-[300px] lg:min-h-[380px] rounded-xl bg-muted/30 animate-pulse" /> }
)

export function HomeHero() {
  const { t } = useLang()
  const { setActiveModule } = useApp()
  const surveillance = useSurveillanceDashboard({ syncToSeismicStore: false, days: 14 })

  const mapEvents = useMemo(
    () => enrichSeismicEvents(surveillanceEventsToUI(surveillance.events)).slice(0, 40),
    [surveillance.events]
  )

  const trust = [
    t('home.landing.hero.trust1'),
    t('home.landing.hero.trust2'),
    t('home.landing.hero.trust3'),
  ]

  return (
    <section className="relative overflow-hidden bg-background px-4 sm:px-6 lg:px-8 pt-8 pb-14 md:pt-12 md:pb-16 border-b border-border/40">
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 0% 0%, color-mix(in oklch, var(--primary) 12%, transparent), transparent 70%)',
        }}
        aria-hidden
      />
      <div className="relative max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div className="space-y-5">
          <SisAyitiLogo variant="hero" className="mb-1" />
          <h1 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-black text-foreground leading-[1.1] tracking-tight text-balance">
            {t('home.landing.hero.title')}
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
            {t('home.landing.hero.subtitle')}
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => {
                recordHomePathStep('konprann')
                recordHomeModuleVisited('comprendre')
                setActiveModule('comprendre')
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 shadow-md shadow-primary/20 transition-colors"
            >
              <BookOpen size={16} />
              {t('home.landing.hero.ctaLearn')}
              <ArrowRight size={16} />
            </button>
            <button
              type="button"
              onClick={() => {
                recordHomeModuleVisited('carte')
                setActiveModule('carte')
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border bg-card text-sm font-bold hover:border-primary/40 transition-colors"
            >
              <Map size={16} />
              {t('home.landing.hero.ctaMap')}
            </button>
          </div>
          <ul className="space-y-2 pt-1">
            {trust.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check size={14} className="text-emerald-500 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <GlassCard className="p-2 shadow-lg shadow-primary/5" glowColor="#2e8bc0">
          <HomeHaitiMapLibre
            events={mapEvents}
            minHeight={360}
            interactive={false}
            satellite
            showLegend
          />
          <p className="text-[10px] text-muted-foreground text-center mt-2 px-2">
            Imagerie Esri · Failles EPGF & Septentrionale · USGS/EMSC
          </p>
        </GlassCard>
      </div>
    </section>
  )
}
