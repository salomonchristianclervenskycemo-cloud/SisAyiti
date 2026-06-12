'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useLang } from '@/lib/lang-context'
import { cn } from '@/lib/utils'

const VP_KM_S = 6.0
const VS_KM_S = 3.4
const DIST_KM = 25

type Phase = 'idle' | 'p' | 's' | 'done'
type GestureStep = 'bese' | 'pwoteje' | 'kenbe'

export function BpkGestureDemo({ compact = false }: { compact?: boolean }) {
  const { t } = useLang()
  const [phase, setPhase] = useState<Phase>('idle')
  const [activeStep, setActiveStep] = useState<GestureStep>('bese')

  const { windowSec } = useMemo(() => {
    const tp = DIST_KM / VP_KM_S
    const ts = DIST_KM / VS_KM_S
    return { windowSec: Math.max(0, ts - tp) }
  }, [])

  const run = () => {
    setPhase('p')
    setActiveStep('bese')
    window.setTimeout(() => {
      setPhase('s')
      setActiveStep('pwoteje')
    }, 700)
    window.setTimeout(() => setActiveStep('kenbe'), 1400)
    window.setTimeout(() => setPhase('done'), 3200)
    window.setTimeout(() => {
      setPhase('idle')
      setActiveStep('bese')
    }, 5200)
  }

  const steps: GestureStep[] = ['bese', 'pwoteje', 'kenbe']
  const phaseText =
    phase === 'p'
      ? t('prev.bpk.phase.p')
      : phase === 's'
        ? t('prev.bpk.phase.s')
        : phase === 'done'
          ? t('prev.bpk.phase.done')
          : t('prev.bpk.phase.wait')

  return (
    <div
      className={cn(
        'rounded-2xl border border-blue-500/25 bg-gradient-to-br from-blue-500/8 via-background to-emerald-500/5 overflow-hidden',
        compact ? 'p-4' : 'p-5 md:p-6'
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
        <div>
          <h3 className={cn('font-bold text-foreground', compact ? 'text-sm' : 'text-base')}>
            {t('prev.bpk.title')}
          </h3>
          {!compact && (
            <p className="text-xs text-muted-foreground mt-1 max-w-xl">{t('prev.bpk.subtitle')}</p>
          )}
        </div>
        <div className="text-xs font-bold text-primary px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 shrink-0">
          {t('prev.bpk.window').replace('{sec}', windowSec.toFixed(0))}
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        {steps.map((step) => (
          <div
            key={step}
            className={cn(
              'flex-1 text-center py-2 rounded-xl text-xs font-bold border transition-all',
              activeStep === step && phase !== 'idle'
                ? step === 'bese'
                  ? 'bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300'
                  : step === 'pwoteje'
                    ? 'bg-amber-500/15 border-amber-500/40 text-amber-700 dark:text-amber-300'
                    : 'bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300'
                : 'border-border/50 text-muted-foreground bg-card/50'
            )}
          >
            {t(`prev.bpk.step.${step}`)}
          </div>
        ))}
      </div>

      <motion.div
        animate={
          phase === 'p'
            ? { x: [0, -2, 2, -1, 1, 0] }
            : phase === 's' || phase === 'done'
              ? { x: [0, -6, 6, -4, 4, -3, 3, 0] }
              : { x: 0 }
        }
        transition={{ duration: phase === 's' ? 1.8 : 0.6, repeat: phase === 's' ? 2 : 0 }}
        className="relative rounded-xl border border-border/50 bg-card/80 p-4 min-h-[160px] flex items-end justify-center overflow-hidden"
      >
        <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-amber-500/10 to-transparent" />
        <svg viewBox="0 0 200 120" className="w-full max-w-[280px] h-auto" aria-hidden>
          <rect x="20" y="70" width="160" height="4" fill="currentColor" className="text-border" />
          <rect x="60" y="45" width="80" height="6" rx="2" fill="currentColor" className="text-amber-600/60" />
          <rect x="55" y="38" width="90" height="8" rx="2" fill="currentColor" className="text-amber-700/40" />
          <motion.g
            animate={{
              y: activeStep === 'bese' || phase !== 'idle' ? 18 : 0,
              scale: activeStep === 'kenbe' && phase !== 'idle' ? [1, 1.02, 1] : 1,
            }}
            transition={{ duration: 0.4 }}
          >
            <circle cx="100" cy="52" r="8" fill="currentColor" className="text-primary" />
            <rect x="92" y="58" width="16" height="22" rx="4" fill="currentColor" className="text-primary/80" />
            <motion.rect
              x="75"
              y="62"
              width="50"
              height="4"
              rx="2"
              fill="currentColor"
              className="text-primary/60"
              animate={{ opacity: activeStep === 'pwoteje' && phase !== 'idle' ? 1 : 0.3 }}
            />
          </motion.g>
          {(phase === 's' || phase === 'done') && (
            <>
              <motion.circle cx="40" cy="30" r="3" fill="#ef4444" animate={{ y: [30, 70], opacity: [1, 0] }} transition={{ duration: 1.2, repeat: Infinity }} />
              <motion.circle cx="150" cy="25" r="2" fill="#f97316" animate={{ y: [25, 68], opacity: [1, 0] }} transition={{ duration: 0.9, repeat: Infinity, delay: 0.3 }} />
            </>
          )}
        </svg>
      </motion.div>

      <p
        className={cn(
          'text-sm font-medium mt-3 min-h-[2.5rem]',
          phase === 'p' && 'text-sky-600 dark:text-sky-400',
          phase === 's' && 'text-amber-600 dark:text-amber-400 animate-pulse',
          phase === 'done' && 'text-emerald-600 dark:text-emerald-400',
          phase === 'idle' && 'text-muted-foreground'
        )}
      >
        {phaseText}
      </p>

      <div className="flex flex-wrap gap-2 mt-2">
        <button
          type="button"
          onClick={run}
          disabled={phase !== 'idle'}
          className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 disabled:opacity-50"
        >
          {t('prev.bpk.run')}
        </button>
        {phase !== 'idle' && (
          <button
            type="button"
            onClick={() => {
              setPhase('idle')
              setActiveStep('bese')
            }}
            className="px-4 py-2.5 rounded-xl border border-border text-sm font-bold hover:border-primary/30"
          >
            {t('prev.bpk.reset')}
          </button>
        )}
      </div>
    </div>
  )
}
