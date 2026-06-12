'use client'

import { useMemo } from 'react'
import { format } from 'date-fns'
import { Radio, ArrowRight } from 'lucide-react'
import { useLang } from '@/lib/lang-context'
import { useApp } from '@/lib/app-context'
import { useSurveillanceDashboard } from '@/hooks/use-surveillance-dashboard'
import { surveillanceEventsToUI } from '@/lib/surveillance/bridge-to-ui'
import { enrichSeismicEvents } from '@/lib/seismic-event-enrich'
import { recordHomeModuleVisited } from '@/lib/offline-education'
import { GlassCard } from '@/components/surveillance/glass-card'
import { HomeSection } from './home-section'

export function HomeLivePreview() {
  const { t } = useLang()
  const { setActiveModule } = useApp()
  const surveillance = useSurveillanceDashboard({ syncToSeismicStore: false, days: 7 })

  const events = useMemo(
    () => enrichSeismicEvents(surveillanceEventsToUI(surveillance.events)).slice(0, 6),
    [surveillance.events]
  )

  const latest = events[0] ?? null

  return (
    <HomeSection title={t('home.landing.live.title')}>
      <GlassCard className="overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-border/50 bg-emerald-500/10">
          <span className="flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            {t('home.landing.live.badge')}
          </span>
          <Radio size={16} className="text-emerald-500/60" />
        </div>

        <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border/50">
          <div className="p-5 md:p-6">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">
              {t('home.landing.live.lastEvent')}
            </p>
            {latest ? (
              <dl className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-muted-foreground text-xs">{t('home.landing.live.magnitude')}</dt>
                  <dd className="text-2xl font-black text-orange-500 tabular-nums">M {latest.magnitude.toFixed(1)}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground text-xs">{t('home.landing.live.depth')}</dt>
                  <dd className="font-bold text-foreground tabular-nums">{latest.depth} km</dd>
                </div>
                <div className="col-span-2">
                  <dt className="text-muted-foreground text-xs">{t('home.landing.live.distance')}</dt>
                  <dd className="font-semibold text-foreground">{latest.region ?? latest.district ?? '—'}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground text-xs">{t('home.landing.live.time')}</dt>
                  <dd className="font-semibold text-foreground tabular-nums">
                    {format(new Date(latest.eventTime), 'dd MMM HH:mm')}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground text-xs">{t('home.landing.live.source')}</dt>
                  <dd className="font-semibold text-foreground uppercase text-xs">
                    {(surveillance.meta?.sources ?? ['USGS']).join(' · ')}
                  </dd>
                </div>
              </dl>
            ) : (
              <p className="text-sm text-muted-foreground">{t('home.landing.live.empty')}</p>
            )}
          </div>

          <div className="p-5 md:p-6">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
              {t('home.landing.live.recent')}
            </p>
            <ul className="space-y-2 max-h-[200px] overflow-y-auto">
              {events.map((ev) => (
                <li
                  key={ev.id}
                  className="flex items-center justify-between gap-2 text-xs py-1.5 border-b border-border/30 last:border-0"
                >
                  <span className="font-bold text-orange-500 tabular-nums shrink-0">M{ev.magnitude.toFixed(1)}</span>
                  <span className="text-muted-foreground truncate flex-1">{ev.region ?? '—'}</span>
                  <span className="text-muted-foreground/70 tabular-nums shrink-0">
                    {format(new Date(ev.eventTime), 'HH:mm')}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="px-5 py-4 border-t border-border/50">
          <button
            type="button"
            onClick={() => {
              recordHomeModuleVisited('actualite')
              setActiveModule('actualite')
            }}
            className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary/80 transition-colors"
          >
            {t('home.landing.live.cta')}
            <ArrowRight size={14} />
          </button>
        </div>
      </GlassCard>
    </HomeSection>
  )
}
