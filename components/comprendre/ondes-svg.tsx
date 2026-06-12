'use client'

import { useLang } from '@/lib/lang-context'

export function OndesSVG() {
  const { t } = useLang()
  const uid = 'ondes'

  return (
    <svg viewBox="0 0 440 220" className="w-full max-w-lg h-auto drop-shadow-md" aria-label={t('comp.svg.ondes')}>
      <defs>
        <linearGradient id={`${uid}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#1e3a5f" stopOpacity="0.05" />
        </linearGradient>
      </defs>

      <rect width="440" height="220" fill={`url(#${uid}-sky)`} rx="12" />

      {/* Coupe terre */}
      <rect x="0" y="130" width="440" height="90" fill="#78350f" opacity="0.25" />
      <line x1="0" y1="130" x2="440" y2="130" stroke="#4ade80" strokeWidth="2.5" />
      <text x="12" y="125" fill="#4ade80" fontSize="10" fontWeight="700">
        {t('comp.hypo.surface')}
      </text>

      {/* Hypocentre */}
      <circle cx="220" cy="168" r="10" fill="#ef4444" stroke="#fff" strokeWidth="2">
        <animate attributeName="r" values="8;14;8" dur="2s" repeatCount="indefinite" />
      </circle>
      <line x1="220" y1="130" x2="220" y2="168" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="4 3" />

      {/* Ondes P — compression (rapides, petites) */}
      <g>
        <text x="20" y="28" fill="#0ea5e9" fontSize="11" fontWeight="800">
          {t('comp.ondesP.title')}
        </text>
        {[0, 1, 2, 3].map((i) => (
          <circle
            key={`p-${i}`}
            cx="220"
            cy="168"
            r="12"
            fill="none"
            stroke="#0ea5e9"
            strokeWidth="2"
            opacity="0.7"
          >
            <animate attributeName="r" values="12;90;12" dur="2.5s" begin={`${i * 0.6}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.8;0;0.8" dur="2.5s" begin={`${i * 0.6}s`} repeatCount="indefinite" />
          </circle>
        ))}
        <path
          d="M 60 100 Q 80 88 100 100 Q 120 112 140 100"
          stroke="#0ea5e9"
          strokeWidth="2"
          fill="none"
          opacity="0.6"
        >
          <animateTransform attributeName="transform" type="translate" values="0,0;20,0;0,0" dur="0.8s" repeatCount="indefinite" />
        </path>
      </g>

      {/* Ondes S — cisaillement */}
      <g>
        <text x="20" y="52" fill="#a855f7" fontSize="11" fontWeight="800">
          {t('comp.ondesS.title')}
        </text>
        <path
          d="M 40 155 Q 70 135 100 155 Q 130 175 160 155 Q 190 135 220 155"
          stroke="#a855f7"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        >
          <animateTransform attributeName="transform" type="translate" values="0,0;30,0;0,0" dur="1.4s" repeatCount="indefinite" />
        </path>
      </g>

      {/* Ondes de surface — Love / Rayleigh */}
      <g>
        <text x="20" y="76" fill="#22c55e" fontSize="11" fontWeight="800">
          {t('comp.ondesLove.title')} / {t('comp.ondesRayleigh.title')}
        </text>
        <path
          d="M 30 118 Q 90 95 150 118 Q 210 141 270 118 Q 330 95 390 118"
          stroke="#22c55e"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          opacity="0.85"
        >
          <animateTransform attributeName="transform" type="translate" values="0,0;25,0;0,0" dur="2s" repeatCount="indefinite" />
        </path>
        {/* Bâtiment secoué */}
        <g transform="translate(320, 88)">
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0; -4; 4; -3; 3; 0"
            dur="1.2s"
            repeatCount="indefinite"
            additive="sum"
          />
          <rect x="0" y="20" width="28" height="22" fill="#3b82f6" opacity="0.8" rx="1" />
          <polygon points="14,6 30,20 -2,20" fill="#1d4ed8" />
        </g>
      </g>

      {/* Légende vitesses */}
      <g fontSize="9" fill="currentColor" className="text-muted-foreground">
        <text x="300" y="200">P ~ 6 km/s</text>
        <text x="300" y="212">S ~ 3,4 km/s</text>
      </g>
    </svg>
  )
}
