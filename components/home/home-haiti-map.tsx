'use client'

import { useId } from 'react'
import { useLang } from '@/lib/lang-context'
import { cn } from '@/lib/utils'
import {
  HAITI_COAST_PATHS,
  HAITI_FAULT_EPGF_PATH,
  HAITI_FAULT_SEPT_PATH,
  HAITI_MAP_CITIES,
  HAITI_VIEWBOX,
  projectHaitiLonLat,
} from '@/lib/haiti-outline'
import { HOME_MAP_QUAKES } from '@/lib/home-landing-data'

type Props = {
  className?: string
  showLegend?: boolean
  pulseQuakes?: boolean
}

export function HomeHaitiMap({ className, showLegend = false, pulseQuakes = true }: Props) {
  const { t } = useLang()
  const uid = useId().replace(/:/g, '')
  const { width, height } = HAITI_VIEWBOX

  return (
    <div className={cn('relative', className)}>
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-sky-500/10 via-transparent to-red-500/5 pointer-events-none" />
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto drop-shadow-[0_0_40px_rgba(14,165,233,0.15)]"
        role="img"
        aria-label="Carte d'Haïti"
      >
        <defs>
          <linearGradient id={`ocean-${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#041428" />
            <stop offset="100%" stopColor="#020817" />
          </linearGradient>
          <linearGradient id={`land-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0c4a6e" />
            <stop offset="100%" stopColor="#082f49" />
          </linearGradient>
          <linearGradient id={`epgf-${uid}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="50%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
          <filter id={`glow-${uid}`}>
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect width={width} height={height} fill={`url(#ocean-${uid})`} rx="8" />

        {HAITI_COAST_PATHS.map((d, i) => (
          <path
            key={i}
            d={d}
            fill={`url(#land-${uid})`}
            stroke="#38bdf8"
            strokeWidth={i === 0 ? 1.2 : 0.8}
            strokeOpacity="0.4"
          />
        ))}

        <path
          d={HAITI_FAULT_SEPT_PATH}
          fill="none"
          stroke="#a855f7"
          strokeWidth="3"
          strokeDasharray="8 6"
          strokeLinecap="round"
          opacity="0.85"
        />
        <path
          d={HAITI_FAULT_EPGF_PATH}
          fill="none"
          stroke={`url(#epgf-${uid})`}
          strokeWidth="5"
          strokeLinecap="round"
          filter={`url(#glow-${uid})`}
          opacity="0.95"
        >
          <animate attributeName="stroke-width" values="5;6;5" dur="2s" repeatCount="indefinite" />
        </path>

        {pulseQuakes &&
          HOME_MAP_QUAKES.map((q, i) => {
            const [cx, cy] = projectHaitiLonLat(q.lon, q.lat)
            const r = 4 + q.mag * 0.8
            return (
              <g key={i}>
                <circle cx={cx} cy={cy} r={r * 2.5} fill="#0ea5e9" opacity="0.15">
                  <animate attributeName="r" values={`${r};${r * 3};${r}`} dur={`${2 + i * 0.4}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.2;0;0.2" dur={`${2 + i * 0.4}s`} repeatCount="indefinite" />
                </circle>
                <circle cx={cx} cy={cy} r={r} fill="#38bdf8" opacity="0.9" />
              </g>
            )
          })}

        {HAITI_MAP_CITIES.map((city) => (
          <g key={city.key}>
            <circle cx={city.x} cy={city.y} r="4" fill="#22c55e" stroke="#020817" strokeWidth="1.5" />
            <text
              x={city.x + (city.labelDx ?? 6)}
              y={city.y + (city.labelDy ?? 4)}
              fill="#e0f2fe"
              fontSize="11"
              fontWeight="600"
            >
              {t(city.key).split('—')[0].trim().split('–')[0].trim()}
            </text>
          </g>
        ))}
      </svg>

      {showLegend && (
        <div className="flex flex-wrap gap-4 mt-4 text-xs font-semibold">
          <span className="flex items-center gap-2 text-orange-400">
            <span className="w-6 h-1 rounded-full bg-gradient-to-r from-orange-500 to-red-500" />
            {t('home.landing.fault.legend.epgf')}
          </span>
          <span className="flex items-center gap-2 text-purple-400">
            <span className="w-6 h-0.5 border-t-2 border-dashed border-purple-400" />
            {t('home.landing.fault.legend.sept')}
          </span>
          <span className="flex items-center gap-2 text-sky-400">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
            {t('home.landing.live.recent')}
          </span>
        </div>
      )}
    </div>
  )
}
