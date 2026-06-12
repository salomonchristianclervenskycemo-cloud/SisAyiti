'use client'

import { useLang } from '@/lib/lang-context'
import { Info, MapPin, AlertTriangle, Target, BookOpen } from 'lucide-react'
import { cn } from '@/lib/utils'

type Props = {
  whatKey: string
  whyKey: string
  haitiKey: string
  limitsKey: string
  impactKey: string
}

export function ScienceCallout({ whatKey, whyKey, haitiKey, limitsKey, impactKey }: Props) {
  const { t } = useLang()

  const rows = [
    { icon: BookOpen, labelKey: 'comp.science.what', textKey: whatKey, color: 'text-primary' },
    { icon: Info, labelKey: 'comp.science.why', textKey: whyKey, color: 'text-sky-600 dark:text-sky-400' },
    { icon: MapPin, labelKey: 'comp.science.haiti', textKey: haitiKey, color: 'text-amber-600 dark:text-amber-400' },
    { icon: AlertTriangle, labelKey: 'comp.science.limits', textKey: limitsKey, color: 'text-orange-600 dark:text-orange-400' },
    { icon: Target, labelKey: 'comp.science.impact', textKey: impactKey, color: 'text-emerald-600 dark:text-emerald-400' },
  ]

  return (
    <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 space-y-3 text-sm">
      {rows.map(({ icon: Icon, labelKey, textKey, color }) => (
        <div key={labelKey} className="flex gap-3">
          <Icon size={16} className={cn(color, 'shrink-0 mt-0.5')} />
          <div>
            <span className="font-bold text-foreground text-xs uppercase tracking-wide">{t(labelKey)}</span>
            <p className="text-muted-foreground leading-relaxed mt-0.5">{t(textKey)}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
