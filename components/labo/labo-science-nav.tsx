'use client'

import { useState } from 'react'
import { useLang } from '@/lib/lang-context'
import { cn } from '@/lib/utils'
import { ScienceCallout } from '@/components/comprendre/science-callout'
import { Activity, MapPin, Layers, Building2 } from 'lucide-react'

type LaboTopic = 'magnitude' | 'distance' | 'soil' | 'building'

const TOPICS: { id: LaboTopic; icon: typeof Activity; labelKey: string; color: string }[] = [
  { id: 'magnitude', icon: Activity, labelKey: 'labo.topic.magnitude', color: '#ef4444' },
  { id: 'distance', icon: MapPin, labelKey: 'labo.topic.distance', color: '#3b82f6' },
  { id: 'soil', icon: Layers, labelKey: 'labo.topic.soil', color: '#f59e0b' },
  { id: 'building', icon: Building2, labelKey: 'labo.topic.building', color: '#22c55e' },
]

export function LaboScienceNav() {
  const { t } = useLang()
  const [topic, setTopic] = useState<LaboTopic>('magnitude')

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
                active
                  ? 'border-primary/50 bg-primary/10'
                  : 'border-border/50 bg-card hover:border-primary/25'
              )}
            >
              <Icon size={18} style={{ color: item.color }} className="mb-1" />
              <span className="text-xs font-black block">{t(item.labelKey)}</span>
            </button>
          )
        })}
      </div>
      <ScienceCallout
        whatKey={`labo.science.${topic}.what`}
        whyKey={`labo.science.${topic}.why`}
        haitiKey={`labo.science.${topic}.haiti`}
        limitsKey={`labo.science.${topic}.limits`}
        impactKey={`labo.science.${topic}.impact`}
      />
    </div>
  )
}
