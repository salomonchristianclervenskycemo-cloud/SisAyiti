'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useLang } from '@/lib/lang-context'

export function HypocenterExplorer() {
  const { t } = useLang()
  const [depth, setDepth] = useState(13)

  const hypoY = useMemo(() => 50 + (depth / 60) * 130, [depth])

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground leading-relaxed">{t('comp.hypo.intro')}</p>
      <div className="rounded-xl border border-border/50 bg-gradient-to-b from-sky-500/5 to-amber-500/5 p-3">
        <svg viewBox="0 0 400 240" className="w-full max-w-md mx-auto h-auto" aria-label={t('comp.svg.hypocentre')}>
          <defs>
            <linearGradient id="crustGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4ade80" stopOpacity="0.3" />
              <stop offset="40%" stopColor="#92400e" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#1e3a5f" stopOpacity="0.5" />
            </linearGradient>
            <radialGradient id="epicGlow">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
            </radialGradient>
          </defs>

          <rect x="0" y="50" width="400" height="190" fill="url(#crustGrad)" />
          <line x1="0" y1="50" x2="400" y2="50" stroke="#4ade80" strokeWidth="3" />
          <text x="12" y="44" fill="#4ade80" fontSize="11" fontWeight="700">
            {t('comp.hypo.surface')}
          </text>

          {/* Profondeurs */}
          {[20, 40, 60].map((d) => (
            <g key={d}>
              <line x1="0" y1={50 + (d / 60) * 130} x2="400" y2={50 + (d / 60) * 130} stroke="#60a5fa" strokeWidth="0.5" strokeDasharray="5 4" opacity="0.35" />
              <text x="365" y={54 + (d / 60) * 130} fill="#60a5fa" fontSize="9" opacity="0.7">
                {d} km
              </text>
            </g>
          ))}

          {/* Ondes depuis hypocentre */}
          {[0, 1, 2].map((i) => (
            <circle key={i} cx="200" cy={hypoY} r="8" fill="none" stroke="#ef4444" strokeWidth="1.5" opacity="0.6">
              <animate attributeName="r" values="8;70;8" dur="2.8s" begin={`${i * 0.9}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.7;0;0.7" dur="2.8s" begin={`${i * 0.9}s`} repeatCount="indefinite" />
            </circle>
          ))}

          <motion.circle
            cx="200"
            cy={hypoY}
            r="10"
            fill="#ef4444"
            stroke="#fff"
            strokeWidth="2"
            animate={{ r: [9, 13, 9] }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          <line x1="200" y1="50" x2="200" y2={hypoY} stroke="#fbbf24" strokeWidth="2" strokeDasharray="6 4" />
          <ellipse cx="200" cy="50" rx="90" ry="12" fill="url(#epicGlow)" />

          <polygon points="192,38 208,38 200,22" fill="#fbbf24" />
          <text x="215" y="32" fill="#fbbf24" fontSize="11" fontWeight="700">
            {t('comp.hypo.epicenter')}
          </text>
          <text x="215" y={hypoY + 4} fill="#ef4444" fontSize="11" fontWeight="700">
            {t('comp.hypo.hypocenter')} — {depth} km
          </text>

          {/* Bâtiments surface */}
          <g transform="translate(80, 18)">
            <rect x="0" y="10" width="18" height="22" fill="#3b82f6" opacity="0.7" rx="1" />
            <polygon points="9,0 20,10 -2,10" fill="#1d4ed8" />
          </g>
          <g transform="translate(280, 14)">
            <rect x="0" y="14" width="22" height="26" fill="#3b82f6" opacity="0.7" rx="1" />
            <polygon points="11,0 26,14 -4,14" fill="#1d4ed8" />
          </g>
        </svg>
      </div>

      <label className="text-sm font-semibold text-foreground block">
        {t('comp.hypo.depth')}: {depth} km
        <input
          type="range"
          min={5}
          max={60}
          value={depth}
          onChange={(e) => setDepth(parseInt(e.target.value, 10))}
          className="w-full mt-2 accent-primary"
        />
      </label>
      <p className="text-xs text-muted-foreground leading-relaxed bg-amber-500/5 border border-amber-500/20 rounded-lg p-3">
        {depth < 20 ? t('comp.hypo.shallow') : t('comp.hypo.deep')}
      </p>
    </div>
  )
}
