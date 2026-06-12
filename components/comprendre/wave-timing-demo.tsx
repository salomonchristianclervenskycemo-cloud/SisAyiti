'use client'

import { useMemo, useState } from 'react'
import { useLang } from '@/lib/lang-context'
import { useApp } from '@/lib/app-context'
import { setCrisisMode } from '@/lib/crisis-journey'
import { Shield } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ScienceCallout } from '@/components/comprendre/science-callout'
import { WavePropagationDiagram } from '@/components/comprendre/wave-propagation-diagram'

/** Vitesses crustales moyennes (km/s) — modèle pédagogique */
const VP_KM_S = 6.0
const VS_KM_S = 3.4

type Phase = 'idle' | 'p' | 's' | 'done'

export function WaveTimingDemo() {
  const { t } = useLang()
  const { setActiveModule } = useApp()
  const [phase, setPhase] = useState<Phase>('idle')
  const [distance, setDistance] = useState(25)

  const { timeP, timeS, windowSec } = useMemo(() => {
    const tp = distance / VP_KM_S
    const ts = distance / VS_KM_S
    return {
      timeP: tp,
      timeS: ts,
      windowSec: Math.max(0, ts - tp),
    }
  }, [distance])

  const run = () => {
    setPhase('p')
    window.setTimeout(() => setPhase('s'), Math.min(timeP * 1000, 800))
    window.setTimeout(() => setPhase('done'), Math.min(timeS * 1000 + 400, 3500))
    window.setTimeout(() => setPhase('idle'), 5000)
  }

  return (
    <div className="rounded-2xl border border-sky-500/30 bg-sky-500/5 p-4 md:p-5 space-y-4">
      <h3 className="font-bold text-foreground">{t('comp.waves.title')}</h3>

      <ScienceCallout
        whatKey="comp.waves.what"
        whyKey="comp.waves.why"
        haitiKey="comp.waves.haiti"
        limitsKey="comp.waves.limits"
        impactKey="comp.waves.impact"
      />

      <label className="text-sm font-semibold text-foreground block">
        {t('comp.waves.distance')}: {distance} km
        <input
          type="range"
          min={10}
          max={80}
          step={5}
          value={distance}
          onChange={(e) => setDistance(parseInt(e.target.value, 10))}
          className="w-full mt-2 accent-primary"
        />
      </label>

      <div className="grid grid-cols-3 gap-2 text-center text-xs">
        <div className="p-2 rounded-lg bg-card border border-border">
          <div className="font-bold text-sky-600">{timeP.toFixed(1)} s</div>
          <div className="text-muted-foreground">{t('comp.waves.arrivalP')}</div>
        </div>
        <div className="p-2 rounded-lg bg-card border border-border">
          <div className="font-bold text-purple-600">{timeS.toFixed(1)} s</div>
          <div className="text-muted-foreground">{t('comp.waves.arrivalS')}</div>
        </div>
        <div className="p-2 rounded-lg bg-primary/10 border border-primary/30">
          <div className="font-bold text-primary">{windowSec.toFixed(1)} s</div>
          <div className="text-muted-foreground">{t('comp.waves.window')}</div>
        </div>
      </div>

      <WavePropagationDiagram phase={phase} distance={distance} timeP={timeP} timeS={timeS} />
      <p
        className={cn(
          'text-sm font-medium min-h-[3rem]',
          phase === 'p' && 'text-sky-600 dark:text-sky-400',
          (phase === 's' || phase === 'done') && 'text-purple-600 dark:text-purple-400 animate-pulse',
          phase === 'idle' && 'text-muted-foreground'
        )}
      >
        {phase === 'p'
          ? t('comp.waves.phaseP')
          : phase === 's' || phase === 'done'
            ? t('comp.waves.phaseS')
            : t('comp.waves.idleHint').replace('{sec}', windowSec.toFixed(0))}
      </p>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={run}
          className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90"
        >
          {t('comp.waves.play')}
        </button>
        <button
          type="button"
          onClick={() => {
            setCrisisMode(false)
            setActiveModule('prevention')
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-card text-sm font-bold hover:border-primary/40"
        >
          <Shield size={16} /> {t('comp.waves.cta')}
        </button>
      </div>
    </div>
  )
}
