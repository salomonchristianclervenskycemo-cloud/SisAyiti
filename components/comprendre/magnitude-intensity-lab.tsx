'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useLang } from '@/lib/lang-context'
import { calcPGA, pgaToIntensity } from '@/lib/seismic-engine'
import { ScienceCallout } from '@/components/comprendre/science-callout'
import { cn } from '@/lib/utils'

const SOIL_OPTIONS = [
  { id: 'rock', factor: 1, labelKey: 'comp.magLab.soilRock' },
  { id: 'medium', factor: 1.5, labelKey: 'comp.magLab.soilMedium' },
  { id: 'soft', factor: 2.5, labelKey: 'comp.magLab.soilSoft' },
] as const

const EMS_COLORS: Record<number, string> = {
  1: '#22c55e',
  2: '#86efac',
  4: '#fde047',
  5: '#fbbf24',
  6: '#fb923c',
  7: '#f87171',
  8: '#ef4444',
  9: '#dc2626',
  10: '#991b1b',
  11: '#7f1d1d',
  12: '#450a0a',
}

export function MagnitudeIntensityLab() {
  const { t } = useLang()
  const [magnitude, setMagnitude] = useState(7.0)
  const [distance, setDistance] = useState(25)
  const [soilId, setSoilId] = useState<(typeof SOIL_OPTIONS)[number]['id']>('soft')

  const soilFactor = SOIL_OPTIONS.find((s) => s.id === soilId)?.factor ?? 1.5

  const { pga, ems } = useMemo(() => {
    const p = calcPGA(magnitude, distance, soilFactor)
    return { pga: p, ems: pgaToIntensity(p) }
  }, [magnitude, distance, soilFactor])

  const emsColor = EMS_COLORS[ems] ?? '#ef4444'

  return (
    <div className="space-y-5">
      <ScienceCallout
        whatKey="comp.magLab.what"
        whyKey="comp.magLab.why"
        haitiKey="comp.magLab.haiti"
        limitsKey="comp.magLab.limits"
        impactKey="comp.magLab.impact"
      />

      <div className="grid gap-4 p-4 rounded-xl border border-border/50 bg-secondary/20">
        <label className="text-sm font-semibold text-foreground">
          {t('comp.magLab.mw')}: <span className="text-primary">Mw {magnitude.toFixed(1)}</span>
          <input
            type="range"
            min={4}
            max={8}
            step={0.1}
            value={magnitude}
            onChange={(e) => setMagnitude(parseFloat(e.target.value))}
            className="w-full mt-2 accent-primary"
          />
        </label>
        <label className="text-sm font-semibold text-foreground">
          {t('comp.magLab.distance')}: <span className="text-primary">{distance} km</span>
          <input
            type="range"
            min={5}
            max={120}
            step={5}
            value={distance}
            onChange={(e) => setDistance(parseInt(e.target.value, 10))}
            className="w-full mt-2 accent-primary"
          />
        </label>
        <div>
          <span className="text-sm font-semibold text-foreground">{t('comp.magLab.soil')}</span>
          <div className="flex flex-wrap gap-2 mt-2">
            {SOIL_OPTIONS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSoilId(s.id)}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-bold border transition-all',
                  soilId === s.id
                    ? 'bg-primary/15 border-primary text-primary'
                    : 'border-border text-muted-foreground'
                )}
              >
                {t(s.labelKey)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div className="p-4 rounded-xl bg-card border border-border text-center">
          <div className="text-xs text-muted-foreground">{t('comp.magLab.mw')}</div>
          <div className="text-2xl font-black text-primary">Mw {magnitude.toFixed(1)}</div>
          <div className="text-[10px] text-muted-foreground mt-1">{t('comp.magLab.mwHint')}</div>
        </div>
        <div className="p-4 rounded-xl bg-card border border-border text-center">
          <div className="text-xs text-muted-foreground">PGA</div>
          <div className="text-2xl font-black text-foreground">{(pga * 100).toFixed(1)}% g</div>
          <div className="text-[10px] text-muted-foreground mt-1">{t('comp.magLab.pgaHint')}</div>
        </div>
        <div className="p-4 rounded-xl bg-card border border-border text-center col-span-2 sm:col-span-1">
          <div className="text-xs text-muted-foreground">EMS-98</div>
          <div className="text-2xl font-black" style={{ color: emsColor }}>
            {ems} / XII
          </div>
          <div className="text-[10px] text-muted-foreground mt-1">{t('comp.magLab.emsHint')}</div>
        </div>
      </div>

      {/* Échelle EMS visuelle */}
      <div className="rounded-xl border border-border/50 p-4 bg-card/50">
        <p className="text-xs font-bold text-foreground mb-3">{t('comp.magLab.emsScale')}</p>
        <div className="flex h-4 rounded-full overflow-hidden">
          {[
            { max: 4, color: '#22c55e' },
            { max: 6, color: '#fde047' },
            { max: 8, color: '#fb923c' },
            { max: 10, color: '#ef4444' },
            { max: 12, color: '#7f1d1d' },
          ].map((band) => (
            <div
              key={band.max}
              className="flex-1 transition-opacity duration-300"
              style={{
                backgroundColor: band.color,
                opacity: ems <= band.max ? (ems >= band.max - 2 ? 1 : 0.35) : 0.15,
              }}
            />
          ))}
        </div>
        <div className="flex justify-between text-[9px] text-muted-foreground mt-1">
          <span>I–IV</span>
          <span>V–VI</span>
          <span>VII–VIII</span>
          <span>IX–X</span>
          <span>XI–XII</span>
        </div>
        <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-primary"
            animate={{ width: `${(ems / 12) * 100}%` }}
            transition={{ type: 'spring', stiffness: 120 }}
          />
        </div>
      </div>

      <p className="text-xs text-muted-foreground italic border border-dashed border-border rounded-lg p-3">
        {t('comp.magLab.disclaimer')}
      </p>
    </div>
  )
}
