'use client'

import { MapPin } from 'lucide-react'
import { useLang } from '@/lib/lang-context'
import { HAITI_HISTORICAL_EVENTS } from '@/lib/haiti-historical-seismic'
import { prepareMapNavigationForEvent } from '@/lib/map-navigation'
import { riskColor } from '@/lib/seismic-types'

const HIGHLIGHTS: { eventId: string; lessonKey: string }[] = [
  { eventId: 'historical-2010-01-12', lessonKey: 'carte.historical.2010' },
  { eventId: 'historical-2021-08-14', lessonKey: 'carte.historical.2021' },
  { eventId: 'historical-1842-05-07', lessonKey: 'carte.historical.1842' },
]

type Props = {
  onLocated?: () => void
}

export function CarteHaitiEvents({ onLocated }: Props) {
  const { t } = useLang()

  const handleLocate = (eventId: string) => {
    const ev = HAITI_HISTORICAL_EVENTS.find((e) => e.id === eventId)
    if (!ev) return
    prepareMapNavigationForEvent(ev)
    onLocated?.()
  }

  return (
    <div className="space-y-2">
      <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
        <MapPin size={14} className="text-cyan-400" />
        {t('carte.historical.title')}
      </h4>
      {HIGHLIGHTS.map(({ eventId, lessonKey }) => {
        const ev = HAITI_HISTORICAL_EVENTS.find((e) => e.id === eventId)
        if (!ev) return null
        const color = riskColor(ev.risk)
        return (
          <div
            key={eventId}
            className="rounded-xl border border-white/10 bg-black/35 p-3 space-y-2"
            style={{ borderLeftWidth: 3, borderLeftColor: color }}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-xs font-bold text-white leading-tight">{ev.region}</p>
                <p className="text-[10px] text-gray-500 mt-0.5">
                  M{ev.magnitude} · {ev.depth} km
                </p>
              </div>
              <span className="text-xs font-black shrink-0" style={{ color }}>
                M{ev.magnitude}
              </span>
            </div>
            <p className="text-[11px] text-gray-400 leading-relaxed">{t(lessonKey)}</p>
            <button
              type="button"
              onClick={() => handleLocate(eventId)}
              className="w-full py-2 rounded-lg bg-cyan-600/25 border border-cyan-500/35 text-[10px] font-bold text-cyan-300 hover:bg-cyan-600/40 transition-colors"
            >
              {t('carte.historical.locate')}
            </button>
          </div>
        )
      })}
      <p className="text-[10px] text-amber-400/80 leading-relaxed border-l-2 border-amber-500/40 pl-2">
        {t('carte.faults.banner')}
      </p>
    </div>
  )
}
