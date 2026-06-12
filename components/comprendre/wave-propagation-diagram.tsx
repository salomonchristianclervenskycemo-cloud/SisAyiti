'use client'

import { motion } from 'framer-motion'
import { useLang } from '@/lib/lang-context'
import { cn } from '@/lib/utils'

type Phase = 'idle' | 'p' | 's' | 'done'

type Props = {
  phase: Phase
  distance: number
  timeP: number
  timeS: number
}

export function WavePropagationDiagram({ phase, distance, timeP, timeS }: Props) {
  const { t } = useLang()
  const epicenterX = 55
  const userX = 55 + (distance / 80) * 200

  return (
    <div className="rounded-xl border border-border/50 bg-gradient-to-b from-sky-500/5 to-purple-500/5 p-3 overflow-hidden">
      <svg viewBox="0 0 320 140" className="w-full h-auto" aria-hidden>
        <defs>
          <linearGradient id="compGround" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4ade80" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#92400e" stopOpacity="0.2" />
          </linearGradient>
          <radialGradient id="compEpicGlow">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Sol */}
        <rect x="0" y="95" width="320" height="45" fill="url(#compGround)" />
        <line x1="0" y1="95" x2="320" y2="95" stroke="#4ade80" strokeWidth="2" />

        {/* Épicentre */}
        <circle cx={epicenterX} cy="95" r="22" fill="url(#compEpicGlow)" opacity={phase !== 'idle' ? 0.9 : 0.4}>
          <animate attributeName="r" values="18;28;18" dur="2s" repeatCount="indefinite" />
        </circle>
        <path d={`M ${epicenterX} 95 L ${epicenterX - 8} 108 L ${epicenterX + 8} 108 Z`} fill="#ef4444" />
        <text x={epicenterX} y="128" textAnchor="middle" fill="currentColor" fontSize="9" className="text-muted-foreground">
          {t('comp.waves.diagram.epicenter')}
        </text>

        {/* Utilisateur / bâtiment */}
        <g transform={`translate(${userX - 12}, 72)`}>
          <g>
            {(phase === 's' || phase === 'done') && (
              <animateTransform
                attributeName="transform"
                type="rotate"
                values="0;-4;4;-3;3;0"
                dur="0.35s"
                repeatCount="indefinite"
              />
            )}
            {phase === 'p' && (
              <animateTransform
                attributeName="transform"
                type="translate"
                values="0,0;-1,0;1,0;0,0"
                dur="0.2s"
                repeatCount="indefinite"
              />
            )}
            <rect x="4" y="12" width="16" height="20" fill="currentColor" className="text-primary/70" rx="1" />
            <polygon points="12,4 22,12 2,12" fill="currentColor" className="text-primary" />
          </g>
        </g>
        <text x={userX} y="128" textAnchor="middle" fill="currentColor" fontSize="9" className="text-foreground font-semibold">
          {t('comp.waves.diagram.you')} ({distance} km)
        </text>

        {/* Onde P */}
        <motion.circle
          cx={epicenterX}
          cy="95"
          r="8"
          fill="none"
          stroke="#0ea5e9"
          strokeWidth="2.5"
          animate={
            phase === 'p' || phase === 's' || phase === 'done'
              ? { cx: [epicenterX, userX], opacity: [1, 0.3] }
              : { cx: epicenterX, opacity: 0 }
          }
          transition={{ duration: Math.max(timeP, 0.3), ease: 'easeOut' }}
        />
        <text x="100" y="28" fill="#0ea5e9" fontSize="10" fontWeight="700">
          P — {t('comp.waves.diagram.fast')}
        </text>

        {/* Onde S */}
        <motion.circle
          cx={epicenterX}
          cy="95"
          r="12"
          fill="none"
          stroke="#a855f7"
          strokeWidth="3"
          animate={
            phase === 's' || phase === 'done'
              ? { cx: [epicenterX, userX], opacity: [1, 0.2] }
              : { cx: epicenterX, opacity: 0 }
          }
          transition={{ duration: Math.max(timeS - timeP, 0.4), ease: 'easeOut', delay: phase === 's' || phase === 'done' ? timeP : 0 }}
        />
        <text x="200" y="28" fill="#a855f7" fontSize="10" fontWeight="700">
          S — {t('comp.waves.diagram.strong')}
        </text>

        {/* Distance */}
        <line x1={epicenterX} y1="108" x2={userX} y2="108" stroke="currentColor" strokeWidth="1" strokeDasharray="4 3" className="text-muted-foreground" />
      </svg>

      <div className="flex justify-center gap-4 mt-1 text-[10px] font-bold">
        <span className={cn('flex items-center gap-1', phase === 'p' && 'text-sky-600')}>
          <span className="w-2 h-2 rounded-full bg-sky-500" /> P
        </span>
        <span className={cn('flex items-center gap-1', (phase === 's' || phase === 'done') && 'text-purple-600')}>
          <span className="w-2 h-2 rounded-full bg-purple-500" /> S
        </span>
      </div>
    </div>
  )
}
