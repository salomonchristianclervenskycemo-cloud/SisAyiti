'use client'

import { useState } from 'react'
import { useLang } from '@/lib/lang-context'
import { cn } from '@/lib/utils'
import { ScienceCallout } from '@/components/comprendre/science-callout'
import { Layers, MapPinned, Hammer, Zap } from 'lucide-react'

type VilleTopic = 'soil' | 'zoning' | 'materials' | 'campaign'

const TOPICS: { id: VilleTopic; icon: typeof Layers; labelKey: string; color: string }[] = [
  { id: 'soil', icon: Layers, labelKey: 'ville.topic.soil', color: '#f59e0b' },
  { id: 'zoning', icon: MapPinned, labelKey: 'ville.topic.zoning', color: '#3b82f6' },
  { id: 'materials', icon: Hammer, labelKey: 'ville.topic.materials', color: '#22c55e' },
  { id: 'campaign', icon: Zap, labelKey: 'ville.topic.campaign', color: '#ef4444' },
]

export function VilleScienceNav() {
  const { t } = useLang()
  const [topic, setTopic] = useState<VilleTopic>('soil')

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {TOPICS.map((item) => {
          const Icon = item.icon
          const active = topic === item.id
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setTopic(item.id)}
              className={cn(
                'rounded-xl border-2 p-3 text-left transition-all',
                active ? 'border-primary/50 bg-primary/10' : 'border-border/50 bg-card hover:border-primary/25'
              )}
            >
              <Icon size={18} style={{ color: item.color }} className="mb-1" />
              <span className="text-xs font-black block">{t(item.labelKey)}</span>
            </button>
          )
        })}
      </div>
      <ScienceCallout
        whatKey={`ville.science.${topic}.what`}
        whyKey={`ville.science.${topic}.why`}
        haitiKey={`ville.science.${topic}.haiti`}
        limitsKey={`ville.science.${topic}.limits`}
        impactKey={`ville.science.${topic}.impact`}
      />
    </div>
  )
}
