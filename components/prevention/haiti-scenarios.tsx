'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '@/lib/lang-context'
import { cn } from '@/lib/utils'
import { Building2, GraduationCap, Store, Waves } from 'lucide-react'

const SCENARIOS = [
  { id: 'pap', icon: Building2, titleKey: 'prev.scenarios.pap.title', actionKey: 'prev.scenarios.pap.action', color: 'text-blue-600 dark:text-blue-400' },
  { id: 'school', icon: GraduationCap, titleKey: 'prev.scenarios.school.title', actionKey: 'prev.scenarios.school.action', color: 'text-amber-600 dark:text-amber-400' },
  { id: 'market', icon: Store, titleKey: 'prev.scenarios.market.title', actionKey: 'prev.scenarios.market.action', color: 'text-orange-600 dark:text-orange-400' },
  { id: 'coast', icon: Waves, titleKey: 'prev.scenarios.coast.title', actionKey: 'prev.scenarios.coast.action', color: 'text-cyan-600 dark:text-cyan-400' },
] as const

export function HaitiScenarios() {
  const { t } = useLang()
  const [active, setActive] = useState<(typeof SCENARIOS)[number]['id']>('pap')
  const current = SCENARIOS.find((s) => s.id === active) ?? SCENARIOS[0]
  const Icon = current.icon

  return (
    <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 md:p-5 space-y-4">
      <h3 className="font-bold text-foreground text-sm">{t('prev.scenarios.title')}</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {SCENARIOS.map((s) => {
          const SIcon = s.icon
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setActive(s.id)}
              className={cn(
                'flex flex-col items-center gap-2 p-3 rounded-xl border text-center transition-all',
                active === s.id
                  ? 'border-primary/50 bg-primary/10 shadow-sm'
                  : 'border-border/50 bg-card hover:border-primary/25'
              )}
            >
              <SIcon size={22} className={s.color} />
              <span className="text-[10px] sm:text-xs font-bold text-foreground leading-tight">{t(s.titleKey)}</span>
            </button>
          )
        })}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          className="flex gap-3 p-4 rounded-xl bg-card border border-border/50"
        >
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <Icon size={20} className={current.color} />
          </div>
          <div>
            <h4 className="font-bold text-sm text-foreground">{t(current.titleKey)}</h4>
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{t(current.actionKey)}</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
