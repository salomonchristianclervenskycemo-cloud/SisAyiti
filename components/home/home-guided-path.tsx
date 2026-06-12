'use client'

import { useEffect, useState } from 'react'
import {
  BookOpen, FlaskConical, Radio, ShieldCheck, CheckCircle2, ChevronRight,
} from 'lucide-react'
import { useLang } from '@/lib/lang-context'
import { useApp, type ModuleId } from '@/lib/app-context'
import { cn } from '@/lib/utils'
import {
  getHomePathCompletion,
  getInferredHomeSteps,
  recordHomeModuleVisited,
  recordHomePathStep,
  type HomePathStep,
} from '@/lib/offline-education'

type StepDef = {
  id: HomePathStep
  icon: typeof BookOpen
  titleKey: string
  shortKey: string
  descKey: string
  color: string
  ring: string
  modules: ModuleId[]
}

const STEPS: StepDef[] = [
  {
    id: 'konprann',
    icon: BookOpen,
    titleKey: 'home.step.konprann.title',
    shortKey: 'home.topic.konprann',
    descKey: 'home.step.konprann.desc',
    color: 'text-red-500',
    ring: 'ring-red-500/30 hover:ring-red-500/50',
    modules: ['comprendre'],
  },
  {
    id: 'simile',
    icon: FlaskConical,
    titleKey: 'home.step.simile.title',
    shortKey: 'home.topic.simile',
    descKey: 'home.step.simile.desc',
    color: 'text-cyan-500',
    ring: 'ring-cyan-500/30 hover:ring-cyan-500/50',
    modules: ['labo', 'ville'],
  },
  {
    id: 'surveiller',
    icon: Radio,
    titleKey: 'home.step.surveiller.title',
    shortKey: 'home.step.surveiller.short',
    descKey: 'home.step.surveiller.desc',
    color: 'text-indigo-500',
    ring: 'ring-indigo-500/30 hover:ring-indigo-500/50',
    modules: ['carte', 'actualite'],
  },
  {
    id: 'prepare',
    icon: ShieldCheck,
    titleKey: 'home.step.prepare.title',
    shortKey: 'home.topic.prepare',
    descKey: 'home.step.prepare.desc',
    color: 'text-green-500',
    ring: 'ring-green-500/30 hover:ring-green-500/50',
    modules: ['prevention', 'diagnostic'],
  },
]

type Props = {
  variant?: 'compact' | 'full'
}

export function HomeGuidedPath({ variant = 'compact' }: Props) {
  const { t } = useLang()
  const { setActiveModule } = useApp()
  const [completed, setCompleted] = useState<Set<HomePathStep>>(new Set())
  const [stats, setStats] = useState({ steps: 0, modules: 0 })

  useEffect(() => {
    const refresh = () => {
      setCompleted(getInferredHomeSteps())
      setStats(getHomePathCompletion())
    }
    refresh()
    const events = [
      'sisayiti-home-progress',
      'sisayiti-comprendre-progress',
      'sisayiti-labo-progress',
      'sisayiti-ville-progress',
      'sisayiti-carte-progress',
      'sisayiti-actualite-progress',
      'sisayiti-prev-progress',
    ] as const
    events.forEach((e) => window.addEventListener(e, refresh))
    return () => events.forEach((e) => window.removeEventListener(e, refresh))
  }, [])

  const progressText = t('home.path.progress')
    .replace('{steps}', String(stats.steps))
    .replace('{modules}', String(stats.modules))

  const openStep = (step: StepDef) => {
    recordHomePathStep(step.id)
    const target = step.modules[0]
    recordHomeModuleVisited(target)
    setActiveModule(target)
  }

  if (variant === 'compact') {
    return (
      <div className="space-y-2.5">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
            {t('home.path.title')}
          </p>
          {(stats.steps > 0 || stats.modules > 0) && (
            <p className="text-[10px] text-primary font-semibold tabular-nums">{progressText}</p>
          )}
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-thin">
          {STEPS.map((step, i) => {
            const Icon = step.icon
            const done = completed.has(step.id)
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => openStep(step)}
                className={cn(
                  'shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl border bg-card/80',
                  'ring-1 transition-all hover:bg-card',
                  step.ring,
                  done && 'border-green-500/30'
                )}
              >
                <span className={cn('p-1.5 rounded-lg bg-background/80', step.color)}>
                  <Icon size={14} />
                </span>
                <span className="text-left min-w-0">
                  <span className="block text-[10px] text-muted-foreground font-bold">{i + 1}</span>
                  <span className="block text-xs font-bold text-foreground whitespace-nowrap">
                    {t(step.shortKey)}
                  </span>
                </span>
                {done ? (
                  <CheckCircle2 size={14} className="text-green-500 shrink-0" />
                ) : (
                  <ChevronRight size={14} className="text-muted-foreground shrink-0" />
                )}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-primary/25 bg-primary/5 p-4 md:p-5 space-y-4">
      <div>
        <h3 className="font-bold text-foreground text-sm md:text-base">{t('home.path.title')}</h3>
        <p className="text-xs text-muted-foreground mt-1">{t('home.path.hint')}</p>
        {(stats.steps > 0 || stats.modules > 0) && (
          <p className="text-xs text-primary font-semibold mt-1.5">{progressText}</p>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {STEPS.map((step) => {
          const Icon = step.icon
          const done = completed.has(step.id)
          return (
            <button
              key={step.id}
              type="button"
              onClick={() => openStep(step)}
              className={cn(
                'group flex gap-3 p-4 rounded-xl border bg-card/80 text-left transition-all hover:shadow-md',
                done ? 'border-green-500/25' : 'border-border/60'
              )}
            >
              <div className={cn('p-2.5 rounded-xl bg-background/80 shrink-0', step.color)}>
                <Icon size={20} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-foreground">{t(step.titleKey)}</span>
                  {done && <CheckCircle2 size={14} className="text-green-500 shrink-0" />}
                </div>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{t(step.descKey)}</p>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
