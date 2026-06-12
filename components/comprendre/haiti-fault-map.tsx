'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLang } from '@/lib/lang-context'
import { cn } from '@/lib/utils'
import {
  HAITI_COAST_PATHS,
  HAITI_FAULT_ARROWS,
  HAITI_FAULT_EPGF_PATH,
  HAITI_FAULT_GRADIENT_BOX,
  HAITI_FAULT_SEPT_PATH,
  HAITI_MAP_CITIES,
  HAITI_VIEWBOX,
  type HaitiFaultArrow,
} from '@/lib/haiti-outline'

type FaultId = 'epgf' | 'sept'

const FAULT_STYLE: Record<
  FaultId,
  { core: string; glow: string; dim: string; corridor: string }
> = {
  epgf: {
    core: '#f87171',
    glow: '#ef4444',
    dim: '#fca5a5',
    corridor: 'rgba(239,68,68,0.14)',
  },
  sept: {
    core: '#60a5fa',
    glow: '#3b82f6',
    dim: '#93c5fd',
    corridor: 'rgba(59,130,246,0.14)',
  },
}

function StrikeArrow({ arrow, color }: { arrow: HaitiFaultArrow; color: string }) {
  return (
    <g transform={`translate(${arrow.x} ${arrow.y}) rotate(${arrow.angle})`}>
      <polygon points="-7,-4 5,0 -7,4" fill={color} opacity={0.95} />
      <line x1="-11" y1="0" x2="7" y2="0" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity={0.45} />
    </g>
  )
}

function FaultTrace({
  id,
  path,
  active,
  isOn,
  onSelect,
}: {
  id: FaultId
  path: string
  active: FaultId
  isOn: boolean
  onSelect: () => void
}) {
  const style = FAULT_STYLE[id]

  return (
    <g className="cursor-pointer" onClick={onSelect}>
      <path d={path} fill="none" stroke="transparent" strokeWidth={18} />

      {isOn && (
        <motion.path
          d={path}
          fill="none"
          stroke={style.corridor}
          strokeWidth={12}
          strokeLinecap="round"
          initial={{ opacity: 0, pathLength: 0.85 }}
          animate={{ opacity: 1, pathLength: 1 }}
          transition={{ duration: 0.5 }}
        />
      )}

      <path
        d={path}
        fill="none"
        stroke={style.glow}
        strokeWidth={isOn ? 7 : 3.5}
        strokeLinecap="round"
        opacity={isOn ? 0.22 : 0.08}
        filter="url(#faultBloom)"
      />

      <motion.path
        d={path}
        fill="none"
        stroke={`url(#faultGrad-${id})`}
        strokeWidth={isOn ? 3.2 : 1.8}
        strokeLinecap="round"
        strokeDasharray={isOn ? '14 10' : '5 7'}
        animate={
          isOn
            ? { strokeDashoffset: [0, -48], strokeOpacity: [0.85, 1, 0.85] }
            : { strokeOpacity: active === id ? 0.55 : 0.32 }
        }
        transition={
          isOn
            ? { strokeDashoffset: { duration: 2.4, repeat: Infinity, ease: 'linear' }, strokeOpacity: { duration: 1.6, repeat: Infinity } }
            : { duration: 0.3 }
        }
      />

      {isOn && (
        <motion.path
          d={path}
          fill="none"
          stroke="#fff"
          strokeWidth={0.9}
          strokeLinecap="round"
          strokeOpacity={0.55}
          animate={{ strokeOpacity: [0.35, 0.7, 0.35] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        />
      )}
    </g>
  )
}

function CityPin({
  x,
  y,
  label,
  labelDx = 8,
  labelDy = 3,
  active,
}: {
  x: number
  y: number
  label: string
  labelDx?: number
  labelDy?: number
  active: boolean
}) {
  return (
    <g>
      {active && (
        <motion.circle
          cx={x}
          cy={y}
          r={14}
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          className="text-primary"
          animate={{ r: [10, 18], opacity: [0.7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        />
      )}
      <circle cx={x} cy={y} r={active ? 11 : 8} fill="url(#cityPulse)" className="text-primary" opacity={active ? 1 : 0.65} />
      <circle cx={x} cy={y} r={3.5} fill="currentColor" className="text-foreground" />
      <circle cx={x} cy={y} r={5.5} fill="none" stroke="currentColor" strokeWidth={1} className="text-background" opacity={0.9} />
      <text
        x={x + labelDx}
        y={y + labelDy}
        fill="currentColor"
        fontSize="8.5"
        fontWeight="700"
        className="text-foreground"
        style={{ paintOrder: 'stroke', stroke: 'var(--background)', strokeWidth: 3 }}
      >
        {label}
      </text>
    </g>
  )
}

export function HaitiFaultMap() {
  const { t } = useLang()
  const [active, setActive] = useState<FaultId>('epgf')
  const { width, height } = HAITI_VIEWBOX

  return (
    <div className="space-y-4">
      <div className="relative rounded-2xl border border-border/50 bg-gradient-to-br from-emerald-500/5 via-background to-blue-500/5 px-3 py-6 sm:px-5 sm:py-7 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(#38bdf8 1px, transparent 1px), linear-gradient(90deg, #38bdf8 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-sky-400/10 blur-3xl rounded-full pointer-events-none" />

        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full max-w-[400px] sm:max-w-[520px] md:max-w-[620px] mx-auto h-auto relative z-10 drop-shadow-[0_12px_28px_rgba(14,116,144,0.18)]"
          aria-label={t('comp.faultMap.aria')}
        >
          <defs>
            <radialGradient id="oceanGrad" cx="42%" cy="28%" r="72%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.18" />
              <stop offset="55%" stopColor="#0ea5e9" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#0369a1" stopOpacity="0.06" />
            </radialGradient>
            <linearGradient id="landGrad" x1="0" y1="0" x2="0.2" y2="1">
              <stop offset="0%" stopColor="#4ade80" stopOpacity="0.55" />
              <stop offset="55%" stopColor="#22c55e" stopOpacity="0.38" />
              <stop offset="100%" stopColor="#15803d" stopOpacity="0.28" />
            </linearGradient>
            <linearGradient id="islandGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#34d399" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0.22" />
            </linearGradient>
            <filter id="landShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#0c4a6e" floodOpacity="0.28" />
            </filter>
            <filter id="faultBloom" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="2.8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <radialGradient id="cityPulse">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </radialGradient>
            <pattern id="oceanShimmer" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(24)">
              <line x1="0" y1="0" x2="0" y2="8" stroke="#7dd3fc" strokeWidth="0.5" opacity="0.08" />
            </pattern>
            {(['epgf', 'sept'] as const).map((faultId) => {
              const box = HAITI_FAULT_GRADIENT_BOX[faultId]
              const colors = FAULT_STYLE[faultId]
              const lit = active === faultId
              return (
                <linearGradient
                  key={faultId}
                  id={`faultGrad-${faultId}`}
                  gradientUnits="userSpaceOnUse"
                  x1={box.x1}
                  y1={box.y1}
                  x2={box.x2}
                  y2={box.y2}
                >
                  <stop offset="0%" stopColor={colors.dim} stopOpacity={lit ? 1 : 0.7} />
                  <stop offset="45%" stopColor={colors.core} />
                  <stop offset="100%" stopColor={colors.glow} stopOpacity={lit ? 1 : 0.75} />
                </linearGradient>
              )
            })}
          </defs>

          <rect width={width} height={height} fill="url(#oceanGrad)" rx="14" />
          <rect width={width} height={height} fill="url(#oceanShimmer)" rx="14" opacity="0.6" />

          <g filter="url(#landShadow)">
            <path d={HAITI_COAST_PATHS[0]} fill="url(#landGrad)" stroke="#16a34a" strokeWidth="2.2" strokeLinejoin="round" />
            {HAITI_COAST_PATHS.slice(1).map((d, i) => (
              <path
                key={i}
                d={d}
                fill="url(#islandGrad)"
                stroke="#10b981"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
            ))}
          </g>

          <path
            d={HAITI_COAST_PATHS[0]}
            fill="none"
            stroke="#86efac"
            strokeWidth="0.8"
            strokeLinejoin="round"
            opacity="0.45"
          />

          <FaultTrace id="sept" path={HAITI_FAULT_SEPT_PATH} active={active} isOn={active === 'sept'} onSelect={() => setActive('sept')} />
          <FaultTrace id="epgf" path={HAITI_FAULT_EPGF_PATH} active={active} isOn={active === 'epgf'} onSelect={() => setActive('epgf')} />

          {active === 'epgf' && (
            <g>
              <StrikeArrow arrow={HAITI_FAULT_ARROWS.epgf.start} color={FAULT_STYLE.epgf.core} />
              <StrikeArrow arrow={HAITI_FAULT_ARROWS.epgf.end} color={FAULT_STYLE.epgf.core} />
            </g>
          )}
          {active === 'sept' && (
            <g>
              <StrikeArrow arrow={HAITI_FAULT_ARROWS.sept.start} color={FAULT_STYLE.sept.core} />
              <StrikeArrow arrow={HAITI_FAULT_ARROWS.sept.end} color={FAULT_STYLE.sept.core} />
            </g>
          )}

          {HAITI_MAP_CITIES.map((c) => (
            <g
              key={c.key}
              className="cursor-pointer"
              onClick={() => setActive(c.fault)}
              opacity={active === c.fault ? 1 : 0.5}
            >
              <CityPin
                x={c.x}
                y={c.y}
                label={t(c.key)}
                labelDx={c.labelDx}
                labelDy={c.labelDy}
                active={active === c.fault}
              />
            </g>
          ))}

          <g transform={`translate(${width - 28} 24)`} opacity="0.55">
            <circle r="10" fill="currentColor" className="text-muted-foreground/20" />
            <polygon points="0,-6 2,2 -2,2" fill="currentColor" className="text-foreground/70" />
            <text y="18" textAnchor="middle" fontSize="7" fontWeight="700" fill="currentColor" className="text-muted-foreground">
              N
            </text>
          </g>

          <g transform="translate(10 12)">
            <rect width="54" height="34" rx="8" fill="currentColor" className="text-background/80" stroke="currentColor" strokeOpacity="0.08" />
            <line x1="10" y1="11" x2="44" y2="11" stroke={FAULT_STYLE.epgf.glow} strokeWidth="2.5" strokeLinecap="round" />
            <text x="10" y="9" fontSize="6.5" fontWeight="800" fill={FAULT_STYLE.epgf.glow}>
              EPGF
            </text>
            <line x1="10" y1="25" x2="44" y2="25" stroke={FAULT_STYLE.sept.glow} strokeWidth="2.5" strokeLinecap="round" />
            <text x="10" y="23" fontSize="6.5" fontWeight="800" fill={FAULT_STYLE.sept.glow}>
              Sept.
            </text>
          </g>
        </svg>
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        {(['epgf', 'sept'] as const).map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => setActive(id)}
            className={cn(
              'px-4 py-2 rounded-xl text-xs font-bold border transition-all',
              active === id
                ? id === 'epgf'
                  ? 'bg-red-500/15 border-red-500/40 text-red-700 dark:text-red-300 shadow-[0_0_24px_rgba(239,68,68,0.2)]'
                  : 'bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300 shadow-[0_0_24px_rgba(59,130,246,0.2)]'
                : 'border-border text-muted-foreground hover:border-primary/30'
            )}
          >
            {id === 'epgf' ? t('comp.tecto.failleEnriquillo') : t('comp.tecto.failleSeptentrionale')}
          </button>
        ))}
      </div>

      <motion.p
        key={active}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-sm text-muted-foreground leading-relaxed border-l-4 border-primary pl-4"
      >
        {active === 'epgf' ? t('comp.tecto.failleEnDesc') : t('comp.tecto.failleSepDesc')}
      </motion.p>
    </div>
  )
}
