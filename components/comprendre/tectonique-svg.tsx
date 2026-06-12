'use client'

import { useLang } from '@/lib/lang-context'

export function TectoniqueSVG() {
  const { t } = useLang()

  return (
    <svg viewBox="0 0 420 200" className="w-full max-w-lg h-auto drop-shadow-md" aria-label={t('comp.svg.tectonique')}>
      <defs>
        <linearGradient id="plateNA2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1e40af" />
        </linearGradient>
        <linearGradient id="plateCA2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <pattern id="stressHatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="8" stroke="#fbbf24" strokeWidth="1" opacity="0.4" />
        </pattern>
        <filter id="glowTecto2">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect width="420" height="200" fill="currentColor" className="text-secondary/20" rx="10" />

      {/* Plaque nord */}
      <g>
        <rect x="8" y="40" width="175" height="120" rx="10" fill="url(#plateNA2)" opacity="0.92">
          <animateTransform attributeName="transform" type="translate" values="0,0;-10,0;0,0" dur="5s" repeatCount="indefinite" />
        </rect>
        <text x="95" y="105" textAnchor="middle" fill="white" fontSize="11" fontWeight="800">
          {t('comp.svg.plateNorth')}
        </text>
        <polygon points="160,70 175,80 160,90" fill="#fbbf24" opacity="0.9">
          <animateTransform attributeName="transform" type="translate" values="0,0;-6,0;0,0" dur="5s" repeatCount="indefinite" />
        </polygon>
      </g>

      {/* Zone Gonâve / Haïti */}
      <rect x="178" y="40" width="44" height="120" fill="url(#stressHatch)" opacity="0.5" />
      <line x1="200" y1="28" x2="200" y2="172" stroke="#ef4444" strokeWidth="3" strokeDasharray="7 5" filter="url(#glowTecto2)">
        <animate attributeName="stroke-dashoffset" values="0;-24" dur="1.2s" repeatCount="indefinite" />
      </line>
      <circle cx="200" cy="100" r="16" fill="#fbbf24" stroke="#fff" strokeWidth="2" filter="url(#glowTecto2)">
        <animate attributeName="r" values="14;18;14" dur="2.5s" repeatCount="indefinite" />
      </circle>
      <text x="200" y="82" textAnchor="middle" fill="#1e293b" fontSize="10" fontWeight="900">
        Ayiti
      </text>
      <text x="200" y="104" textAnchor="middle" fill="#92400e" fontSize="8" fontWeight="700">
        Gonâve
      </text>

      {/* Plaque caraïbe */}
      <g>
        <rect x="222" y="40" width="190" height="120" rx="10" fill="url(#plateCA2)" opacity="0.92">
          <animateTransform attributeName="transform" type="translate" values="0,0;10,0;0,0" dur="5s" repeatCount="indefinite" />
        </rect>
        <text x="317" y="105" textAnchor="middle" fill="white" fontSize="11" fontWeight="800">
          {t('comp.svg.plateCarib')}
        </text>
        <polygon points="250,70 235,80 250,90" fill="#fbbf24" opacity="0.9">
          <animateTransform attributeName="transform" type="translate" values="0,0;6,0;0,0" dur="5s" repeatCount="indefinite" />
        </polygon>
      </g>

      {/* Stress */}
      <text x="210" y="188" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="700">
        {t('comp.svg.stress')}
      </text>
    </svg>
  )
}
