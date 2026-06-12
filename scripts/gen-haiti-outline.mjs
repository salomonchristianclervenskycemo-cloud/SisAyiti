import https from 'https'
import fs from 'fs'

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return get(res.headers.location).then(resolve).catch(reject)
      }
      let d = ''
      res.on('data', (c) => (d += c))
      res.on('end', () => resolve(d))
    }).on('error', reject)
  })
}

function simplifyRing(ring, target = 140) {
  if (ring.length <= target) return ring
  const step = Math.max(1, Math.floor(ring.length / target))
  const out = ring.filter((_, i) => i % step === 0)
  const last = ring[ring.length - 1]
  const tail = out[out.length - 1]
  if (tail[0] !== last[0] || tail[1] !== last[1]) out.push(last)
  return out
}

function ringToPath(ring, proj) {
  return (
    ring
      .map((c, i) => {
        const [x, y] = proj(c)
        return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`
      })
      .join(' ') + ' Z'
  )
}

function smoothCubicPath(pts) {
  if (pts.length < 2) return ''
  if (pts.length === 2) {
    return `M ${pts[0][0]} ${pts[0][1]} L ${pts[1][0]} ${pts[1][1]}`
  }
  let d = `M ${pts[0][0]} ${pts[0][1]}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[Math.min(pts.length - 1, i + 2)]
    const cp1x = p1[0] + (p2[0] - p0[0]) / 6
    const cp1y = p1[1] + (p2[1] - p0[1]) / 6
    const cp2x = p2[0] - (p3[0] - p1[0]) / 6
    const cp2y = p2[1] - (p3[1] - p1[1]) / 6
    d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)} ${cp2x.toFixed(1)} ${cp2y.toFixed(1)} ${p2[0]} ${p2[1]}`
  }
  return d
}

function pathAngle(pts, index) {
  const i = Math.min(Math.max(index, 1), pts.length - 2)
  const dx = pts[i + 1][0] - pts[i - 1][0]
  const dy = pts[i + 1][1] - pts[i - 1][1]
  return (Math.atan2(dy, dx) * 180) / Math.PI
}

function bboxOfPts(pts) {
  const xs = pts.map((p) => p[0])
  const ys = pts.map((p) => p[1])
  return {
    x1: Math.min(...xs),
    y1: Math.min(...ys),
    x2: Math.max(...xs),
    y2: Math.max(...ys),
  }
}

const body = await get(
  'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_admin_0_countries.geojson'
)
const gj = JSON.parse(body)
const hti = gj.features.find((f) => f.properties?.ISO_A2 === 'HT')
const geom = hti.geometry
const rings = geom.type === 'Polygon' ? [geom.coordinates[0]] : geom.coordinates.map((p) => p[0])

let minLon = 999,
  maxLon = -999,
  minLat = 999,
  maxLat = -999
for (const ring of rings) {
  for (const [lon, lat] of ring) {
    if (lon < minLon) minLon = lon
    if (lon > maxLon) maxLon = lon
    if (lat < minLat) minLat = lat
    if (lat > maxLat) maxLat = lat
  }
}

const W = 500,
  H = 500,
  pad = 52
const proj = ([lon, lat]) => {
  const x = pad + ((lon - minLon) / (maxLon - minLon)) * (W - 2 * pad)
  const y = pad + ((maxLat - lat) / (maxLat - minLat)) * (H - 2 * pad)
  return [Math.round(x * 10) / 10, Math.round(y * 10) / 10]
}

const paths = rings.map((r, i) => ringToPath(i === 0 ? simplifyRing(r, 150) : r, proj))
const mainPath = paths[0]
const islandPaths = paths.slice(1)

const cities = [
  { id: 'pap', lon: -72.335, lat: 18.539, key: 'comp.faultMap.pap', fault: 'epgf', labelDx: 8, labelDy: 3 },
  { id: 'leogane', lon: -72.633, lat: 18.511, key: 'comp.faultMap.leogane', fault: 'epgf', labelDx: -52, labelDy: -6 },
  { id: 'cap', lon: -72.201, lat: 19.758, key: 'comp.faultMap.cap', fault: 'sept', labelDx: 8, labelDy: 3 },
]
const citySvg = cities.map((c) => {
  const [x, y] = proj([c.lon, c.lat])
  return { ...c, x, y }
})

const septLonLat = [
  [-73.75, 19.88],
  [-73.05, 19.86],
  [-72.55, 19.8],
  [-72.2, 19.76],
  [-71.85, 19.62],
  [-71.68, 19.52],
]
const epgfLonLat = [
  [-74.2, 18.18],
  [-73.55, 18.28],
  [-73.0, 18.38],
  [-72.63, 18.51],
  [-72.35, 18.54],
  [-72.05, 18.52],
  [-71.72, 18.4],
  [-71.65, 18.32],
]

const septPts = septLonLat.map(proj)
const epgfPts = epgfLonLat.map(proj)
const septPath = smoothCubicPath(septPts)
const epgfPath = smoothCubicPath(epgfPts)
const septBox = bboxOfPts(septPts)
const epgfBox = bboxOfPts(epgfPts)

const leo = citySvg.find((c) => c.id === 'leogane')
const pap = citySvg.find((c) => c.id === 'pap')
const cap = citySvg.find((c) => c.id === 'cap')

const epgfStartIdx = 2
const epgfEndIdx = 5
const septStartIdx = 2
const septEndIdx = 4

const content = `/**
 * Contour géographique d'Haïti (Natural Earth 10m simplifié, ISO HT).
 * Projection équirectangulaire normalisée pour SVG — partagée module Comprendre & accueil.
 */
export const HAITI_VIEWBOX = { width: ${W}, height: ${H} } as const

export const HAITI_BBOX = {
  minLon: ${minLon},
  maxLon: ${maxLon},
  minLat: ${minLat},
  maxLat: ${maxLat},
} as const

/** Île principale + îles satellite (Gonâve, Tortue, …) */
export const HAITI_COAST_PATHS = [
  '${mainPath}',
${islandPaths.map((p) => `  '${p}'`).join(',\n')}
] as const

export const HAITI_MAIN_PATH = HAITI_COAST_PATHS[0]

export type HaitiMapCity = {
  x: number
  y: number
  key: string
  fault: 'epgf' | 'sept'
  labelDx?: number
  labelDy?: number
}

export const HAITI_MAP_CITIES: HaitiMapCity[] = [
${citySvg.map((c) => `  { x: ${c.x}, y: ${c.y}, key: '${c.key}', fault: '${c.fault}', labelDx: ${c.labelDx}, labelDy: ${c.labelDy} },`).join('\n')}
]

export const HAITI_FAULT_SEPT_PATH = '${septPath}'

export const HAITI_FAULT_EPGF_PATH = '${epgfPath}'

export const HAITI_FAULT_GRADIENT_BOX = {
  sept: { x1: ${septBox.x1.toFixed(1)}, y1: ${septBox.y1.toFixed(1)}, x2: ${septBox.x2.toFixed(1)}, y2: ${septBox.y2.toFixed(1)} },
  epgf: { x1: ${epgfBox.x1.toFixed(1)}, y1: ${epgfBox.y1.toFixed(1)}, x2: ${epgfBox.x2.toFixed(1)}, y2: ${epgfBox.y2.toFixed(1)} },
} as const

export type HaitiFaultArrow = { x: number; y: number; angle: number }

export const HAITI_FAULT_ARROWS = {
  epgf: {
    start: { x: ${leo.x.toFixed(1)}, y: ${leo.y.toFixed(1)}, angle: ${pathAngle(epgfPts, epgfStartIdx).toFixed(1)} },
    end: { x: ${pap.x.toFixed(1)}, y: ${pap.y.toFixed(1)}, angle: ${pathAngle(epgfPts, epgfEndIdx).toFixed(1)} },
  },
  sept: {
    start: { x: ${(cap.x - 18).toFixed(1)}, y: ${(cap.y + 2).toFixed(1)}, angle: ${pathAngle(septPts, septStartIdx).toFixed(1)} },
    end: { x: ${(cap.x + 38).toFixed(1)}, y: ${(cap.y + 4).toFixed(1)}, angle: ${pathAngle(septPts, septEndIdx).toFixed(1)} },
  },
} as const

export function projectHaitiLonLat(lon: number, lat: number): [number, number] {
  const { minLon, maxLon, minLat, maxLat } = HAITI_BBOX
  const { width: W, height: H } = HAITI_VIEWBOX
  const pad = ${pad}
  const x = pad + ((lon - minLon) / (maxLon - minLon)) * (W - 2 * pad)
  const y = pad + ((maxLat - lat) / (maxLat - minLat)) * (H - 2 * pad)
  return [Math.round(x * 10) / 10, Math.round(y * 10) / 10]
}

export function getHaitiHeroPath(): string {
  return HAITI_COAST_PATHS.join(' ')
}
`

fs.writeFileSync('lib/haiti-outline.ts', content)
console.log('written lib/haiti-outline.ts')
