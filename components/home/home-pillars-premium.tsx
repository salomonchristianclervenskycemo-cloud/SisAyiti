'use client'

import { BookOpen, FlaskConical, ShieldCheck, ArrowRight } from 'lucide-react'
import { useLang } from '@/lib/lang-context'
import { useApp } from '@/lib/app-context'
import { cn } from '@/lib/utils'
import { recordHomeModuleVisited, recordHomePathStep } from '@/lib/offline-education'
import { GlassCard } from '@/components/surveillance/glass-card'
import { HomeSection } from './home-section'

const PILLARS = [
  {
    step: 'konprann' as const,
    icon: BookOpen,
    titleKey: 'home.landing.pillar.comprendre.title',
    descKey: 'home.landing.pillar.comprendre.desc',
    module: 'comprendre' as const,
    glow: '#ef4444',
  },
  {
    step: 'simile' as const,
    icon: FlaskConical,
    titleKey: 'home.landing.pillar.simuler.title',
    descKey: 'home.landing.pillar.simuler.desc',
    module: 'labo' as const,
    glow: '#2e8bc0',
  },
  {
    step: 'prepare' as const,
    icon: ShieldCheck,
    titleKey: 'home.landing.pillar.preparer.title',
    descKey: 'home.landing.pillar.preparer.desc',
    module: 'prevention' as const,
    glow: '#22c55e',
  },
]

export function HomePillarsPremium() {
  const { t } = useLang()
  const { setActiveModule } = useApp()

  return (
    <HomeSection alternate>
      <div className="grid md:grid-cols-3 gap-4">
        {PILLARS.map((p) => {
          const Icon = p.icon
          return (
            <GlassCard key={p.step} glowColor={p.glow} className="h-full">
              <button
                type="button"
                onClick={() => {
                  recordHomePathStep(p.step)
                  recordHomeModuleVisited(p.module)
                  setActiveModule(p.module)
                }}
                className={cn(
                  'group w-full p-6 text-left transition-all hover:-translate-y-0.5'
                )}
              >
                <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary mb-4">
                  <Icon size={22} />
                </div>
                <h3 className="text-base font-black text-foreground tracking-wide">{t(p.titleKey)}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{t(p.descKey)}</p>
                <ArrowRight
                  size={16}
                  className="mt-4 text-muted-foreground/40 group-hover:text-primary transition-colors"
                />
              </button>
            </GlassCard>
          )
        })}
      </div>
    </HomeSection>
  )
}
