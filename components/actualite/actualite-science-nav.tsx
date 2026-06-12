'use client'

import { useState } from 'react'
import { Database, Bell, MapPinned, WifiOff } from 'lucide-react'
import { useLang } from '@/lib/lang-context'
import { cn } from '@/lib/utils'
import { ScienceCallout } from '@/components/comprendre/science-callout'

type ActTopic = 'sources' | 'alerts' | 'haiti' | 'offline'

const TOPICS: { id: ActTopic; icon: typeof Database; labelKey: string; color: string }[] = [
  { id: 'sources', icon: Database, labelKey: 'act.topic.sources', color: '#3b82f6' },
  { id: 'alerts', icon: Bell, labelKey: 'act.topic.alerts', color: '#ef4444' },
  { id: 'haiti', icon: MapPinned, labelKey: 'act.topic.haiti', color: '#f59e0b' },
  { id: 'offline', icon: WifiOff, labelKey: 'act.topic.offline', color: '#22c55e' },
]

export function ActualiteScienceNav() {
  const { t } = useLang()
  const [topic, setTopic] = useState<ActTopic>('sources')

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
        whatKey={`act.science.${topic}.what`}
        whyKey={`act.science.${topic}.why`}
        haitiKey={`act.science.${topic}.haiti`}
        limitsKey={`act.science.${topic}.limits`}
        impactKey={`act.science.${topic}.impact`}
      />
    </div>
  )
}
