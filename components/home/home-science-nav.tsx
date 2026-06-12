'use client'

import { useState } from 'react'
import { BookOpen, FlaskConical, ShieldCheck, LayoutGrid } from 'lucide-react'
import { useLang } from '@/lib/lang-context'
import { cn } from '@/lib/utils'
import { ScienceCallout } from '@/components/comprendre/science-callout'

type HomeTopic = 'konprann' | 'simile' | 'prepare' | 'platform'

const TOPICS: { id: HomeTopic; icon: typeof BookOpen; labelKey: string; color: string }[] = [
  { id: 'konprann', icon: BookOpen, labelKey: 'home.topic.konprann', color: '#ef4444' },
  { id: 'simile', icon: FlaskConical, labelKey: 'home.topic.simile', color: '#06b6d4' },
  { id: 'prepare', icon: ShieldCheck, labelKey: 'home.topic.prepare', color: '#22c55e' },
  { id: 'platform', icon: LayoutGrid, labelKey: 'home.topic.platform', color: '#6366f1' },
]

export function HomeScienceNav() {
  const { t } = useLang()
  const [topic, setTopic] = useState<HomeTopic>('konprann')

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
        whatKey={`home.science.${topic}.what`}
        whyKey={`home.science.${topic}.why`}
        haitiKey={`home.science.${topic}.haiti`}
        limitsKey={`home.science.${topic}.limits`}
        impactKey={`home.science.${topic}.impact`}
      />
    </div>
  )
}
