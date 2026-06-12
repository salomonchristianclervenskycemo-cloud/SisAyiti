'use client'

import { useLang } from '@/lib/lang-context'

const LAYERS = [
  { y: 8, h: 42, color: '#4ade80', key: 'comp.structure.croute', depth: '0–30 km' },
  { y: 50, h: 55, color: '#f97316', key: 'comp.structure.manteau', depth: '30–2890 km' },
  { y: 105, h: 38, color: '#facc15', key: 'comp.structure.noyauExterne', depth: '2890–5150 km' },
  { y: 143, h: 32, color: '#ef4444', key: 'comp.structure.noyauInterne', depth: '5150+ km' },
] as const

export function EarthLayersSVG() {
  const { t } = useLang()

  return (
    <svg viewBox="0 0 360 200" className="w-full max-w-md mx-auto h-auto" aria-label={t('comp.structure.title')}>
      <defs>
        <clipPath id="earthClip">
          <circle cx="110" cy="100" r="88" />
        </clipPath>
      </defs>
      <circle cx="110" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="2" className="text-border" />
      <g clipPath="url(#earthClip)">
        {LAYERS.map((layer, i) => (
          <g key={layer.key}>
            <rect x="22" y={layer.y} width="176" height={layer.h} fill={layer.color} opacity={0.55 - i * 0.05}>
              <animate attributeName="opacity" values={`${0.5 - i * 0.05};${0.7 - i * 0.05};${0.5 - i * 0.05}`} dur={`${3 + i}s`} repeatCount="indefinite" />
            </rect>
          </g>
        ))}
        {/* Onde S bloquée au noyau */}
        <path d="M 22 120 Q 60 100 100 120" stroke="#a855f7" strokeWidth="2" fill="none" opacity="0.7">
          <animateTransform attributeName="transform" type="translate" values="0,0;15,0;0,0" dur="1.2s" repeatCount="indefinite" />
        </path>
        <line x1="22" y1="105" x2="100" y2="105" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 3" />
        <text x="55" y="100" fill="#fff" fontSize="8" fontWeight="700" opacity="0.9">
          S ✕
        </text>
      </g>

      {/* Légende */}
      <g transform="translate(200, 20)">
        {LAYERS.map((layer, i) => (
          <g key={layer.key} transform={`translate(0, ${i * 42})`}>
            <rect width="14" height="14" fill={layer.color} rx="2" opacity="0.8" />
            <text x="20" y="11" fill="currentColor" fontSize="9" fontWeight="700" className="text-foreground">
              {t(layer.key).split(':')[0].slice(0, 22)}
            </text>
            <text x="20" y="22" fill="currentColor" fontSize="8" className="text-muted-foreground">
              {layer.depth}
            </text>
          </g>
        ))}
      </g>
    </svg>
  )
}
