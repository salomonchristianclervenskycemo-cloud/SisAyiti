import type { FeatureCollection, LineString } from 'geojson'
import {
  HAITI_BBOX,
  HAITI_FAULT_EPGF_PATH,
  HAITI_FAULT_SEPT_PATH,
  HAITI_VIEWBOX,
} from '@/lib/haiti-outline'

const { width: W, height: H } = HAITI_VIEWBOX
const PAD = 52

/** Couleurs alignées sur le module Comprendre */
export const FAULT_PALETTE = {
  epgf: {
    core: '#f87171',
    glow: '#ef4444',
    corridor: 'rgba(239,68,68,0.18)',
    label: '#fca5a5',
  },
  sept: {
    core: '#60a5fa',
    glow: '#3b82f6',
    corridor: 'rgba(59,130,246,0.16)',
    label: '#93c5fd',
  },
} as const

function svgToLonLat(x: number, y: number): [number, number] {
  const { minLon, maxLon, minLat, maxLat } = HAITI_BBOX
  const lon = minLon + ((x - PAD) / (W - 2 * PAD)) * (maxLon - minLon)
  const lat = maxLat - ((y - PAD) / (H - 2 * PAD)) * (maxLat - minLat)
  return [Math.round(lon * 10000) / 10000, Math.round(lat * 10000) / 10000]
}

function cubic(t: number, p0: number, p1: number, p2: number, p3: number): number {
  const u = 1 - t
  return u * u * u * p0 + 3 * u * u * t * p1 + 3 * u * t * t * p2 + t * t * t * p3
}

/** Échantillonne un path SVG (M + C) en coordonnées géographiques */
export function svgFaultPathToCoords(path: string, samplesPerCurve = 10): [number, number][] {
  const nums = path.match(/-?\d+\.?\d*/g)?.map(Number) ?? []
  if (nums.length < 2) return []

  const out: [number, number][] = []
  let i = 0
  let cx = nums[i++]
  let cy = nums[i++]
  out.push(svgToLonLat(cx, cy))

  while (i + 5 < nums.length) {
    const x1 = nums[i++]
    const y1 = nums[i++]
    const x2 = nums[i++]
    const y2 = nums[i++]
    const ex = nums[i++]
    const ey = nums[i++]

    for (let s = 1; s <= samplesPerCurve; s++) {
      const t = s / samplesPerCurve
      const x = cubic(t, cx, x1, x2, ex)
      const y = cubic(t, cy, y1, y2, ey)
      out.push(svgToLonLat(x, y))
    }
    cx = ex
    cy = ey
  }

  return out
}

export const FAULT_LINES_GEOJSON: FeatureCollection<LineString> = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        id: 'enriquillo',
        name: 'Faille Enriquillo-Plantain Garden',
        shortName: 'EPGF',
        color: FAULT_PALETTE.epgf.core,
      },
      geometry: {
        type: 'LineString',
        coordinates: svgFaultPathToCoords(HAITI_FAULT_EPGF_PATH, 12),
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'septentrionale',
        name: 'Faille Septentrionale',
        shortName: 'Septentrionale',
        color: FAULT_PALETTE.sept.core,
      },
      geometry: {
        type: 'LineString',
        coordinates: svgFaultPathToCoords(HAITI_FAULT_SEPT_PATH, 12),
      },
    },
  ],
}

/** IDs de toutes les couches failles (anciennes + nouvelles) */
export const FAULT_LAYER_IDS = [
  'fault-enriquillo-label',
  'fault-enriquillo-highlight',
  'fault-enriquillo-core',
  'fault-enriquillo-glow-mid',
  'fault-enriquillo-glow',
  'fault-enriquillo-corridor',
  'fault-septentrionale-label',
  'fault-septentrionale-highlight',
  'fault-septentrionale-core',
  'fault-septentrionale-glow-mid',
  'fault-septentrionale-glow',
  'fault-septentrionale-corridor',
  // legacy
  'fault-enriquillo',
  'fault-enriquillo-glow',
  'fault-septentrionale',
  'fault-septentrionale-glow',
] as const
