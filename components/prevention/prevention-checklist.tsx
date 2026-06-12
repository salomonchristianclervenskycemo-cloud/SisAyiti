'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

export type ChecklistItem = {
  id: number
  icon: string
  title: string
  description: string
}

type Props = {
  items: ChecklistItem[]
  checked: Set<number>
  onToggle: (id: number) => void
  highlight?: boolean
  large?: boolean
}

export function PreventionChecklist({ items, checked, onToggle, highlight, large }: Props) {
  return (
    <div className={cn('grid gap-3', large ? 'grid-cols-1' : 'md:grid-cols-2')}>
      <AnimatePresence mode="popLayout">
        {items.map((item) => {
          const isChecked = checked.has(item.id)
          return (
            <motion.button
              key={item.id}
              layout
              type="button"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => onToggle(item.id)}
              className={cn(
                'p-4 rounded-2xl border-2 transition-all text-left relative overflow-hidden group',
                large && 'p-5',
                highlight && !isChecked && 'border-orange-500/25 bg-orange-500/[0.03]',
                highlight && isChecked && 'border-orange-500/40 bg-orange-500/10',
                !highlight && isChecked && 'border-primary/50 bg-primary/5',
                !highlight && !isChecked && 'border-border/50 bg-card hover:border-primary/30'
              )}
            >
              <div className="flex gap-3 relative z-10">
                <div
                  className={cn(
                    'w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0 transition-transform',
                    large && 'w-12 h-12 text-2xl',
                    isChecked ? 'bg-primary/20 scale-105' : 'bg-secondary group-hover:scale-105'
                  )}
                >
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3
                    className={cn(
                      'font-bold flex items-center justify-between gap-2 mb-1',
                      large ? 'text-base' : 'text-sm',
                      isChecked ? 'text-primary' : 'text-foreground'
                    )}
                  >
                    <span>{item.title}</span>
                    <div
                      className={cn(
                        'w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0',
                        isChecked ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground/50'
                      )}
                    >
                      {isChecked && <CheckCircle size={11} />}
                    </div>
                  </h3>
                  <p className={cn('text-muted-foreground leading-relaxed', large ? 'text-sm' : 'text-xs')}>
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.button>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
