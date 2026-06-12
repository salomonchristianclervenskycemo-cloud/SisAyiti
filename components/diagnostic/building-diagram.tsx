'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

type Props = {
  structure?: string
  shaking?: boolean
}

export function BuildingDiagram({ structure, shaking = false }: Props) {
  const isReinforced = structure === 'concrete_reinforced'
  const isUnreinforced = structure === 'concrete_unreinforced' || !structure
  const isLight = structure === 'wood_brick' || structure === 'adobe'

  const wallFill = isReinforced
    ? 'text-emerald-500/30'
    : isUnreinforced
      ? 'text-amber-500/25'
      : 'text-orange-500/20'
  const wallStroke = isReinforced ? 'text-emerald-600' : isUnreinforced ? 'text-amber-600' : 'text-orange-600'

  return (
    <motion.div
      animate={shaking ? { x: [0, -4, 4, -3, 3, 0] } : { x: 0 }}
      transition={{ duration: 0.5, repeat: shaking ? Infinity : 0, repeatDelay: 0.2 }}
      className="rounded-xl border border-border/50 bg-secondary/20 p-4 flex items-end justify-center min-h-[140px]"
    >
      <svg viewBox="0 0 120 100" className="w-full max-w-[200px] h-auto" aria-hidden>
        <rect x="10" y="88" width="100" height="4" className="fill-border" />
        <rect x="35" y="88" width="50" height="6" className={cn('fill-current', isReinforced ? 'text-emerald-600/50' : 'text-amber-600/40')} />
        <rect x="40" y="50" width="40" height="38" rx="2" className={cn('fill-current stroke-current', wallFill, wallStroke)} strokeWidth="1.5" />
        {isUnreinforced && (
          <>
            <rect x="48" y="58" width="24" height="12" className="fill-amber-700/30" />
            <line x1="42" y1="55" x2="78" y2="72" className="stroke-red-500/60" strokeWidth="1" strokeDasharray="3 2" />
          </>
        )}
        {isReinforced && (
          <>
            <line x1="60" y1="50" x2="60" y2="88" className="stroke-emerald-600/70" strokeWidth="2" />
            <line x1="40" y1="70" x2="80" y2="70" className="stroke-emerald-600/50" strokeWidth="1.5" />
          </>
        )}
        {isLight && (
          <polygon points="40,50 60,35 80,50" className="fill-orange-500/40 stroke-orange-600" strokeWidth="1" />
        )}
        <rect x="52" y="62" width="8" height="10" className="fill-sky-500/40" />
        <rect x="66" y="62" width="8" height="10" className="fill-sky-500/40" />
        {shaking && (
          <motion.text x="85" y="45" fontSize="8" fill="#ef4444" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 0.4, repeat: Infinity }}>
            !
          </motion.text>
        )}
      </svg>
    </motion.div>
  )
}
