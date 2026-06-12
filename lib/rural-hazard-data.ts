import type { HazardTypeKey } from '@/lib/hazard-i18n'

/** Zones de référence (likifaksyon / côtes) pour le module multirisques */
export type RuralHazardZone = {
  id: string
  name: string
  riskLevel: 'critical' | 'high' | 'medium'
  lat: number
  lon: number
  zoom: number
  hazardKeys: HazardTypeKey[]
}

export const HAITI_RURAL_MAP_CENTER: [number, number] = [-72.35, 18.97]
export const HAITI_RURAL_MAP_ZOOM = 7.2

export const RURAL_HAZARD_ZONES: RuralHazardZone[] = [
  {
    id: 'pap',
    name: 'Port-au-Prince',
    riskLevel: 'critical',
    lat: 18.5392,
    lon: -72.335,
    zoom: 10.5,
    hazardKeys: ['liquefaction', 'earthquake'],
  },
  {
    id: 'legann',
    name: 'Léogâne',
    riskLevel: 'high',
    lat: 18.51,
    lon: -72.63,
    zoom: 10.5,
    hazardKeys: ['liquefaction', 'earthquake'],
  },
  {
    id: 'arcahaie',
    name: 'Arcahaie',
    riskLevel: 'high',
    lat: 18.8,
    lon: -72.4,
    zoom: 10,
    hazardKeys: ['flood', 'hurricane'],
  },
  {
    id: 'jacmel',
    name: 'Jacmel',
    riskLevel: 'medium',
    lat: 18.2343,
    lon: -72.5354,
    zoom: 10,
    hazardKeys: ['landslide', 'hurricane'],
  },
  {
    id: 'cap',
    name: 'Cap-Haïtien',
    riskLevel: 'high',
    lat: 19.7596,
    lon: -72.2042,
    zoom: 10,
    hazardKeys: ['earthquake', 'tsunami'],
  },
]

export function getRuralZoneById(id: string): RuralHazardZone | undefined {
  return RURAL_HAZARD_ZONES.find((z) => z.id === id)
}
