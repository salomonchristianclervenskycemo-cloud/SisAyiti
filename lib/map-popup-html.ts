import { buildEarthquakePopupData } from './map-popup-data'
import type { Lang } from '@/shared/i18n'

/** @deprecated Prefer React MapHoverCard + buildEarthquakePopupData */
export function buildEarthquakePopupHtml(props: {
  magnitude: number
  depth: number
  region: string
  source: string
  eventTime: string
  latitude: number
  longitude: number
  historical?: boolean
  lang?: Lang
}): string {
  const data = buildEarthquakePopupData(props)
  const t = data.labels
  const inZoneClass = data.inZone ? '#34d399' : '#fbbf24'
  const histBadge = data.historical
    ? `<div class="seismic-popup-badge-hist">${escapeHtml(t.historical)}</div>`
    : ''

  return `
    <div class="seismic-popup">
      ${histBadge}
      <div class="seismic-popup-mag" style="color:${data.color}">${data.magnitude.toFixed(1)}</div>
      <div class="seismic-popup-place">${escapeHtml(data.region)}</div>
      <div class="seismic-popup-row"><span>${t.depth}</span><strong style="color:${data.color}">${data.depthKm.toFixed(1)} km</strong></div>
      <div class="seismic-popup-row"><span>${t.date}</span><strong>${escapeHtml(data.timeStr)}</strong></div>
      <div class="seismic-popup-row"><span>${t.coords}</span><strong class="mono">${data.coords}</strong></div>
      <div class="seismic-popup-row"><span>${t.distance}</span><strong>${data.distKm.toFixed(1)} km</strong></div>
      <div class="seismic-popup-row"><span>${t.source}</span><strong>${props.source}</strong></div>
      <div style="margin-top:6px;font-size:10px;color:${inZoneClass}">${data.inZone ? t.inZone : t.outZone}</div>
      <div class="seismic-popup-hint">${t.hint}</div>
    </div>
  `
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
