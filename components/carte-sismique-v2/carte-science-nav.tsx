'use client'

import { useState } from 'react'
import { useLang } from '@/lib/lang-context'
import { cn } from '@/lib/utils'
import { Activity, ArrowDown, GitBranch, Radio } from 'lucide-react'

type CarteTopic = 'magnitude' | 'depth' | 'faults' | 'realtime'

const TOPICS: { id: CarteTopic; icon: typeof Activity; labelKey: string; color: string }[] = [
  { id: 'magnitude', icon: Activity, labelKey: 'carte.topic.magnitude', color: '#ef4444' },
  { id: 'depth', icon: ArrowDown, labelKey: 'carte.topic.depth', color: '#3b82f6' },
  { id: 'faults', icon: GitBranch, labelKey: 'carte.topic.faults', color: '#f59e0b' },
  { id: 'realtime', icon: Radio, labelKey: 'carte.topic.realtime', color: '#22c55e' },
]

const ROWS: { labelKey: string; textKey: (t: CarteTopic) => string }[] = [
  { labelKey: 'comp.science.what', textKey: (t) => `carte.science.${t}.what` },
  { labelKey: 'comp.science.why', textKey: (t) => `carte.science.${t}.why` },
  { labelKey: 'comp.science.haiti', textKey: (t) => `carte.science.${t}.haiti` },
  { labelKey: 'comp.science.limits', textKey: (t) => `carte.science.${t}.limits` },
  { labelKey: 'comp.science.impact', textKey: (t) => `carte.science.${t}.impact` },
]

export function CarteScienceNav() {
  const { t } = useLang()
  const [topic, setTopic] = useState<CarteTopic>('magnitude')

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-1.5">
        {TOPICS.map((item) => {
          const Icon = item.icon
          const active = topic === item.id
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setTopic(item.id)}
              className={cn(
                'rounded-lg border p-2 text-left transition-all',
                active
                  ? 'border-cyan-500/50 bg-cyan-500/15'
                  : 'border-white/10 bg-black/30 hover:border-cyan-500/25'
              )}
            >
              <Icon size={14} style={{ color: item.color }} className="mb-0.5" />
              <span className="text-[10px] font-black text-gray-200 block">{t(item.labelKey)}</span>
            </button>
          )
        })}
      </div>
      <div className="rounded-xl border border-cyan-500/20 bg-black/40 p-3 space-y-2.5 text-xs">
        {ROWS.map(({ labelKey, textKey }) => (
          <div key={labelKey}>
            <span className="font-bold text-cyan-400/90 text-[10px] uppercase tracking-wide">{t(labelKey)}</span>
            <p className="text-gray-300 leading-relaxed mt-0.5">{t(textKey(topic))}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
