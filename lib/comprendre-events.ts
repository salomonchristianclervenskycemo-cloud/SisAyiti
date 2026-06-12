/** Événements historiques haïtiens — données structurées pour le module Comprendre */
export type HaitiHistoricalEvent = {
  id: string
  year: string
  mw: string | null
  faultKey: string
  contextKey: string
  damagesKey: string
  lessonKey: string
  limitsKey: string
  tsunami?: boolean
  lat: number
  lon: number
}

export const HAITI_HISTORICAL_EVENTS: HaitiHistoricalEvent[] = [
  {
    id: '1751',
    year: '1751',
    mw: '~6.6',
    faultKey: 'comp.ev.1751.fault',
    contextKey: 'comp.ev.1751.context',
    damagesKey: 'comp.ev.1751.damages',
    lessonKey: 'comp.ev.1751.lesson',
    limitsKey: 'comp.ev.1751.limits',
    lat: 18.54,
    lon: -72.34,
  },
  {
    id: '1770',
    year: '1770',
    mw: '~7.5',
    faultKey: 'comp.ev.1770.fault',
    contextKey: 'comp.ev.1770.context',
    damagesKey: 'comp.ev.1770.damages',
    lessonKey: 'comp.ev.1770.lesson',
    limitsKey: 'comp.ev.1770.limits',
    lat: 18.54,
    lon: -72.34,
  },
  {
    id: '1842',
    year: '1842',
    mw: '~8.1',
    faultKey: 'comp.ev.1842.fault',
    contextKey: 'comp.ev.1842.context',
    damagesKey: 'comp.ev.1842.damages',
    lessonKey: 'comp.ev.1842.lesson',
    limitsKey: 'comp.ev.1842.limits',
    tsunami: true,
    lat: 19.76,
    lon: -72.2,
  },
  {
    id: '1860',
    year: '1860',
    mw: '~7.5',
    faultKey: 'comp.ev.1860.fault',
    contextKey: 'comp.ev.1860.context',
    damagesKey: 'comp.ev.1860.damages',
    lessonKey: 'comp.ev.1860.lesson',
    limitsKey: 'comp.ev.1860.limits',
    lat: 19.76,
    lon: -72.2,
  },
  {
    id: '2010',
    year: '2010',
    mw: '7.0',
    faultKey: 'comp.ev.2010.fault',
    contextKey: 'comp.ev.2010.context',
    damagesKey: 'comp.ev.2010.damages',
    lessonKey: 'comp.ev.2010.lesson',
    limitsKey: 'comp.ev.2010.limits',
    lat: 18.44,
    lon: -72.57,
  },
  {
    id: '2021',
    year: '2021',
    mw: '7.2',
    faultKey: 'comp.ev.2021.fault',
    contextKey: 'comp.ev.2021.context',
    damagesKey: 'comp.ev.2021.damages',
    lessonKey: 'comp.ev.2021.lesson',
    limitsKey: 'comp.ev.2021.limits',
    lat: 18.35,
    lon: -73.68,
  },
]
