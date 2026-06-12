'use client'

import { BookOpen, FlaskConical, ShieldCheck, ArrowUpRight } from 'lucide-react'
import { useLang } from '@/lib/lang-context'
import { useApp } from '@/lib/app-context'
import { cn } from '@/lib/utils'
import { recordHomeModuleVisited, recordHomePathStep } from '@/lib/offline-education'

const PILLARS = [
  {
    step: 'konprann' as const,
    icon: BookOpen,
    titleKey: 'home.pillar.konprann.title',
    descKey: 'home.pillar.konprann.desc',
    module: 'comprendre' as const,
    accent: 'from-red-500/15 to-red-500/5 border-red-500/25 hover:border-red-500/45',
    iconBg: 'bg-red-500/15 text-red-600 dark:text-red-400',
  },
  {
    step: 'simile' as const,
    icon: FlaskConical,
    titleKey: 'home.pillar.simile.title',
    descKey: 'home.pillar.simile.desc',
    module: 'labo' as const,
    accent: 'from-cyan-500/15 to-cyan-500/5 border-cyan-500/25 hover:border-cyan-500/45',
    iconBg: 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-400',
  },
  {
    step: 'prepare' as const,
    icon: ShieldCheck,
    titleKey: 'home.pillar.prepare.title',
    descKey: 'home.pillar.prepare.desc',
    module: 'prevention' as const,
    accent: 'from-emerald-500/15 to-emerald-500/5 border-emerald-500/25 hover:border-emerald-500/45',
    iconBg: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400',
  },
]

export function HomePillars() {
  const { t } = useLang()
  const { setActiveModule } = useApp()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
      {PILLARS.map((p) => {
        const Icon = p.icon
        return (
          <button
            key={p.step}
            type="button"
            onClick={() => {
              recordHomePathStep(p.step)
              recordHomeModuleVisited(p.module)
              setActiveModule(p.module)
            }}
            className={cn(
              'group relative overflow-hidden rounded-2xl border bg-gradient-to-br p-5 text-left transition-all',
              'hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5',
              p.accent
            )}
          >
            <div className={cn('inline-flex p-2.5 rounded-xl mb-3', p.iconBg)}>
              <Icon size={22} strokeWidth={2.25} />
            </div>
            <h3 className="font-bold text-foreground text-base">{t(p.titleKey)}</h3>
            <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{t(p.descKey)}</p>
            <ArrowUpRight
              size={16}
              className="absolute top-4 right-4 text-muted-foreground/40 group-hover:text-primary transition-colors"
            />
          </button>
        )
      })}
    </div>
  )
}
