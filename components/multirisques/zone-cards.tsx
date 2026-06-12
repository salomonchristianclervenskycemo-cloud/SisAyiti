'use client'

import { AlertTriangle } from 'lucide-react'
import { useLang } from '@/lib/lang-context'
import { RURAL_HAZARD_ZONES } from '@/lib/rural-hazard-data'
import { formatHazardTags } from '@/lib/hazard-i18n'
import { cn } from '@/lib/utils'

type ZoneCardsProps = {
  selectedId: string | null
  onSelect: (id: string) => void
}

export function ZoneCards({ selectedId, onSelect }: ZoneCardsProps) {
  const { t } = useLang()

  return (
    <div className="grid sm:grid-cols-2 gap-3">
      {RURAL_HAZARD_ZONES.map((z) => (
        <button
          key={z.id}
          type="button"
          onClick={() => onSelect(z.id)}
          className={cn(
            'p-3 rounded-xl border text-sm text-left transition-all duration-300',
            'hover:border-primary/40 hover:shadow-md',
            selectedId === z.id && 'ring-2 ring-primary border-primary/50 shadow-md',
            z.riskLevel === 'critical'
              ? 'border-red-500/30 bg-red-500/5'
              : z.riskLevel === 'high'
                ? 'border-orange-500/30 bg-orange-500/5'
                : 'border-yellow-500/30 bg-yellow-500/5'
          )}
        >
          <div className="flex items-center gap-2 font-bold text-foreground">
            <AlertTriangle size={16} />
            {z.name}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {formatHazardTags(z.hazardKeys ?? [], t)}
          </p>
        </button>
      ))}
    </div>
  )
}
