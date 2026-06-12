'use client'

import { useLang } from '@/lib/lang-context'
import { ScienceCallout } from '@/components/comprendre/science-callout'

export function AftershocksPanel() {
  const { t } = useLang()

  return (
    <div className="space-y-5">
      <ScienceCallout
        whatKey="comp.after.what"
        whyKey="comp.after.why"
        haitiKey="comp.after.haiti"
        limitsKey="comp.after.limits"
        impactKey="comp.after.impact"
      />

      {/* Timeline répliques 2010 */}
      <div className="rounded-xl border border-border/50 bg-card/40 p-4">
        <p className="text-xs font-bold text-foreground mb-4">{t('comp.after.timelineTitle')}</p>
        <svg viewBox="0 0 340 80" className="w-full h-20" aria-hidden>
          <line x1="20" y1="40" x2="320" y2="40" stroke="currentColor" strokeWidth="2" className="text-border" />
          {[
            { x: 40, label: '12 Jan', main: true },
            { x: 120, label: '20 Jan', main: false },
            { x: 200, label: 'J+30', main: false },
            { x: 280, label: 'J+60', main: false },
          ].map((pt, i) => (
            <g key={pt.label}>
              <circle cx={pt.x} cy="40" r={pt.main ? 10 : 6} fill={pt.main ? '#ef4444' : '#a855f7'} opacity="0.9">
                {!pt.main && (
                  <animate attributeName="r" values="5;8;5" dur={`${1.5 + i * 0.3}s`} repeatCount="indefinite" />
                )}
              </circle>
              <text x={pt.x} y="68" textAnchor="middle" fill="currentColor" fontSize="9" className="text-muted-foreground">
                {pt.label}
              </text>
              {pt.main && (
                <text x={pt.x} y="22" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="800">
                  Mw 7.0
                </text>
              )}
              {pt.label === '20 Jan' && (
                <text x={pt.x} y="22" textAnchor="middle" fill="#a855f7" fontSize="9" fontWeight="700">
                  M5.9
                </text>
              )}
            </g>
          ))}
        </svg>
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        {[
          { n: '40+', key: 'comp.after.stat1' },
          { n: 'M5.9', key: 'comp.after.stat2' },
          { n: 'Semaines', key: 'comp.after.stat3' },
        ].map((s) => (
          <div key={s.key} className="rounded-xl border border-border/50 bg-card/60 p-4 text-center">
            <div className="text-2xl font-black text-primary">{s.n}</div>
            <p className="text-xs text-muted-foreground mt-1">{t(s.key)}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-sky-500/25 bg-sky-500/5 p-4">
        <div className="flex gap-4 items-center">
          <svg viewBox="0 0 100 70" className="w-24 h-16 shrink-0" aria-hidden>
            <rect x="0" y="45" width="100" height="25" fill="#0ea5e9" opacity="0.3" />
            <path d="M 10 45 Q 30 20 50 45 Q 70 55 90 40" fill="none" stroke="#0ea5e9" strokeWidth="3">
              <animate attributeName="d" values="M 10 45 Q 30 25 50 45 Q 70 50 90 42;M 10 45 Q 30 15 50 45 Q 70 60 90 38;M 10 45 Q 30 25 50 45 Q 70 50 90 42" dur="2s" repeatCount="indefinite" />
            </path>
            <polygon points="50,8 65,28 35,28" fill="#64748b" />
            <text x="50" y="62" textAnchor="middle" fill="#0ea5e9" fontSize="8" fontWeight="700">
              TSUNAMI
            </text>
          </svg>
          <div>
            <h4 className="font-bold text-sm text-foreground mb-2">{t('comp.after.tsunamiTitle')}</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">{t('comp.after.tsunami')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
