'use client'

import { useState } from 'react'
import { MapPin } from 'lucide-react'
import { useLang } from '@/lib/lang-context'
import { useApp } from '@/lib/app-context'
import { useSeismicStore } from '@/lib/seismic-store'
import { ZoneCards } from '@/components/multirisques/zone-cards'
import { RuralHazardMap } from '@/components/multirisques/rural-hazard-map'

export function RuralHazardPanel() {
  const { t } = useLang()
  const { setActiveModule } = useApp()
  const layers = useSeismicStore((s) => s.layers)
  const setLayers = useSeismicStore((s) => s.setLayers)
  const [selectedZoneId, setSelectedZoneId] = useState<string>('pap')

  const openFullMap = () => {
    setLayers({ ...layers, liquefaction: true, faults: true })
    setActiveModule('carte')
  }

  return (
    <div className="space-y-4 mb-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-foreground">{t('multi.geo.title')}</h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl">{t('multi.geo.subtitle')}</p>
        </div>
        <button
          type="button"
          onClick={openFullMap}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-bold shadow-md hover:bg-primary/90 shrink-0"
        >
          <MapPin size={14} /> {t('multi.geo.map')}
        </button>
      </div>

      <RuralHazardMap
        selectedZoneId={selectedZoneId}
        onSelectZone={setSelectedZoneId}
      />

      <ZoneCards selectedId={selectedZoneId} onSelect={setSelectedZoneId} />
    </div>
  )
}
