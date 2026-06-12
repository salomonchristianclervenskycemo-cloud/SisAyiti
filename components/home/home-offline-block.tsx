'use client'

import { Smartphone, WifiOff, RefreshCw } from 'lucide-react'
import { useLang } from '@/lib/lang-context'
import { GlassCard } from '@/components/surveillance/glass-card'
import { HomeSection } from './home-section'

export function HomeOfflineBlock() {
  const { t } = useLang()

  return (
    <HomeSection title={t('home.landing.offline.title')}>
      <GlassCard className="p-6 md:p-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <p className="text-base text-muted-foreground leading-relaxed">{t('home.landing.offline.desc')}</p>
          <div className="flex items-center justify-center gap-8 py-4">
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <Smartphone size={32} className="text-primary" />
              <span className="text-[10px] font-bold uppercase">Mobile</span>
            </div>
            <WifiOff size={24} className="text-orange-500" />
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <RefreshCw size={32} className="text-emerald-500" />
              <span className="text-[10px] font-bold uppercase text-center max-w-[90px]">
                {t('home.landing.offline.sync')}
              </span>
            </div>
          </div>
        </div>
      </GlassCard>
    </HomeSection>
  )
}
