'use client'

import { motion } from 'framer-motion'
import { useLang } from '@/lib/lang-context'
import { cn } from '@/lib/utils'

type Props = {
  playing: boolean
  highlight: 'rock' | 'soft' | 'both'
}

function BuildingColumn({
  type,
  playing,
  active,
}: {
  type: 'rock' | 'soft'
  playing: boolean
  active: boolean
}) {
  const { t } = useLang()
  const amp = type === 'rock' ? 3 : 11
  const duration = type === 'rock' ? 0.55 : 0.28

  return (
    <div className={cn('flex flex-col items-center gap-2 transition-opacity', active ? 'opacity-100' : 'opacity-45')}>
      <svg viewBox="0 0 100 130" className="w-full max-w-[140px] h-32">
        <defs>
          <linearGradient id={`soil${type}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={type === 'rock' ? '#78716c' : '#d97706'} />
            <stop offset="100%" stopColor={type === 'rock' ? '#44403c' : '#92400e'} />
          </linearGradient>
        </defs>
        {/* Couches de sol */}
        <rect x="10" y="88" width="80" height="38" fill={`url(#soil${type})`} rx="2" />
        {type === 'soft' && (
          <>
            <ellipse cx="35" cy="100" rx="8" ry="3" fill="#38bdf8" opacity="0.5">
              {playing && active && (
                <animate attributeName="rx" values="6;12;6" dur="0.5s" repeatCount="indefinite" />
              )}
            </ellipse>
            <ellipse cx="65" cy="108" rx="10" ry="3" fill="#38bdf8" opacity="0.5">
              {playing && active && (
                <animate attributeName="rx" values="8;14;8" dur="0.45s" repeatCount="indefinite" />
              )}
            </ellipse>
          </>
        )}
        {/* Bâtiment */}
        <motion.g
          style={{ transformOrigin: '50px 65px' }}
          animate={
            playing && active
              ? { x: [-amp, amp, -amp * 0.7, amp * 0.7, 0], rotate: [-2, 2, -1.5, 1.5, 0] }
              : { x: 0, rotate: 0 }
          }
          transition={{ duration, repeat: playing && active ? Infinity : 0, ease: 'easeInOut' }}
        >
          <rect x="32" y="42" width="36" height="46" fill="currentColor" className="text-primary/80" rx="2" />
          <polygon points="50,22 72,42 28,42" fill="currentColor" className="text-primary" />
          <rect x="40" y="55" width="8" height="10" fill="currentColor" className="text-background/50" />
          <rect x="54" y="55" width="8" height="10" fill="currentColor" className="text-background/50" />
          <rect x="40" y="70" width="8" height="10" fill="currentColor" className="text-background/50" />
          <rect x="54" y="70" width="8" height="10" fill="currentColor" className="text-background/50" />
        </motion.g>
        {/* Onde sismique */}
        {playing && active && (
          <motion.path
            d="M 5 35 Q 25 25 45 35 Q 65 45 85 35 Q 95 30 100 35"
            fill="none"
            stroke={type === 'rock' ? '#22c55e' : '#f59e0b'}
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 0.6, repeat: Infinity }}
          />
        )}
      </svg>
      <span className="text-xs font-bold text-foreground">
        {type === 'rock' ? t('comp.soil.rock') : t('comp.soil.soft')}
      </span>
      <span className="text-[10px] text-muted-foreground text-center px-1">
        {type === 'rock' ? t('comp.soil.rockEx') : t('comp.soil.softEx')}
      </span>
      {type === 'soft' && playing && active && (
        <span className="text-[10px] font-bold text-amber-600 animate-pulse">{t('comp.soil.ampLabel')}</span>
      )}
    </div>
  )
}

export function SoilShakeDiagram({ playing, highlight }: Props) {
  return (
    <div className="grid grid-cols-2 gap-3 p-3 rounded-xl border border-border/50 bg-card/40">
      <BuildingColumn type="rock" playing={playing} active={highlight === 'rock' || highlight === 'both'} />
      <BuildingColumn type="soft" playing={playing} active={highlight === 'soft' || highlight === 'both'} />
    </div>
  )
}
