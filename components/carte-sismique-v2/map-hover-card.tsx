'use client'

import { useEffect, useState } from 'react'
import type maplibregl from 'maplibre-gl'
import { useLang } from '@/lib/lang-context'
import { buildEarthquakePopupData } from '@/lib/map-popup-data'
import type { MapHoverEvent } from '@/lib/map-hover-types'

type Props = {
  map: maplibregl.Map | null
  event: MapHoverEvent | null
}

export function MapHoverCard({ map, event }: Props) {
  const { lang } = useLang()
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null)

  useEffect(() => {
    if (!map || !event) {
      setPos(null)
      return
    }

    const update = () => {
      const p = map.project(event.lngLat)
      setPos({ x: p.x, y: p.y })
    }

    update()
    map.on('move', update)
    map.on('zoom', update)
    return () => {
      map.off('move', update)
      map.off('zoom', update)
    }
  }, [map, event])

  if (!event || !pos) return null

  const data = buildEarthquakePopupData({ ...event, lang })
  const t = data.labels

  return (
    <div
      className="absolute z-[1001] pointer-events-none max-w-[300px] -translate-x-1/2 -translate-y-full"
      style={{ left: pos.x, top: pos.y - 14 }}
      role="tooltip"
    >
      <div className="rounded-xl bg-black/80 backdrop-blur-xl border border-white/15 shadow-2xl p-3 text-xs text-gray-200">
        {data.historical && (
          <div className="mb-2 text-[10px] font-bold uppercase tracking-wide text-amber-300">
            {t.historical}
          </div>
        )}
        <div className="text-2xl font-black leading-none mb-1" style={{ color: data.color }}>
          {data.magnitude.toFixed(1)}
        </div>
        <div className="font-semibold text-white mb-2">{data.region}</div>
        <div className="space-y-1">
          <Row label={t.depth}>
            <strong style={{ color: data.color }}>{data.depthKm.toFixed(1)} km</strong>
          </Row>
          <Row label={t.date}>
            <strong>{data.timeStr}</strong>
          </Row>
          <Row label={t.coords}>
            <strong className="font-mono text-[10px]">{data.coords}</strong>
          </Row>
          <Row label={t.distance}>
            <strong>{data.distKm.toFixed(1)} km</strong>
          </Row>
          <Row label={t.source}>
            <strong>{data.source}</strong>
          </Row>
        </div>
        <p className={`mt-2 text-[10px] ${data.inZone ? 'text-emerald-400' : 'text-amber-300'}`}>
          {data.inZone ? t.inZone : t.outZone}
        </p>
        <p className="mt-1 text-[10px] text-gray-400">{t.hint}</p>
      </div>
    </div>
  )
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex justify-between gap-3">
      <span className="text-gray-400">{label}</span>
      {children}
    </div>
  )
}
