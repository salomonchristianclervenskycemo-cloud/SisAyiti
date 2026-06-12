'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '@/lib/lang-context'
import { cn } from '@/lib/utils'
import { Building2, Home, Trees, Landmark } from 'lucide-react'

const TYPES = [
  { id: 'ngo', icon: Building2, titleKey: 'diag.types.ngo.title', descKey: 'diag.types.ngo.desc', risk: 'low' as const },
  { id: 'pau', icon: Home, titleKey: 'diag.types.pau.title', descKey: 'diag.types.pau.desc', risk: 'high' as const },
  { id: 'rural', icon: Trees, titleKey: 'diag.types.rural.title', descKey: 'diag.types.rural.desc', risk: 'medium' as const },
  { id: 'old', icon: Landmark, titleKey: 'diag.types.old.title', descKey: 'diag.types.old.desc', risk: 'high' as const },
]

export function HaitiBuildingTypes() {
  const { t } = useLang()
  const [active, setActive] = useState(TYPES[1].id)
  const current = TYPES.find((x) => x.id === active) ?? TYPES[0]
  const Icon = current.icon

  return (
    <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-4 md:p-5 space-y-4">
      <h3 className="font-bold text-foreground text-sm">{t('diag.types.title')}</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {TYPES.map((type) => {
          const TIcon = type.icon
          return (
            <button
              key={type.id}
              type="button"
              onClick={() => setActive(type.id)}
              className={cn(
                'flex flex-col items-center gap-2 p-3 rounded-xl border text-center transition-all',
                active === type.id ? 'border-primary/50 bg-primary/10' : 'border-border/50 bg-card hover:border-primary/25'
              )}
            >
              <TIcon size={20} className={type.risk === 'high' ? 'text-red-500' : type.risk === 'medium' ? 'text-amber-500' : 'text-emerald-500'} />
              <span className="text-[10px] sm:text-xs font-bold leading-tight">{t(type.titleKey)}</span>
            </button>
          )
        })}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          className="flex gap-3 p-4 rounded-xl bg-card border border-border/50"
        >
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <Icon size={20} className="text-primary" />
          </div>
          <div>
            <h4 className="font-bold text-sm">{t(current.titleKey)}</h4>
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{t(current.descKey)}</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
