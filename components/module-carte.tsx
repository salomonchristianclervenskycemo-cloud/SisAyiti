'use client'

import { SeismicMapView } from '@/components/carte-sismique-v2/seismic-map-view'
import { useLang } from '@/lib/lang-context'

/** Module carte — v2 MapLibre + données temps réel USGS/EMSC */
export function ModuleCarte() {
  const { lang } = useLang()
  return <SeismicMapView lang={lang} />
}
