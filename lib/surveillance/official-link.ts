import { EMSC_EVENT_DETAILS_BASE, USGS_EVENT_PAGE_BASE } from './constants'
import type { SurveillanceSeismicEvent } from './types'
import type { SeismicEventUI } from '@/lib/seismic-types'

const LEGACY_EMSC_DETAILS = /seismicportal\.eu\/event\/details/i

function stripPrefixes(id: string): string {
  return id.replace(/^merged-/, '').replace(/^usgs-/, '').replace(/^emsc-/, '')
}

function looksLikeUsgsId(id: string): boolean {
  return /^(us|ci|ak|nc|nn|hv|mb|pr|se|uu|uw)\d/i.test(id)
}

function looksLikeEmscUnid(id: string): boolean {
  return /^\d{8}_\d+/.test(id)
}

function usgsIdFromEventId(id: string): string | null {
  const core = stripPrefixes(id)
  return looksLikeUsgsId(core) ? core : null
}

function emscIdFromEventId(id: string): string | null {
  const core = stripPrefixes(id)
  return looksLikeEmscUnid(core) ? core : null
}

function emscUrl(unid: string): string {
  return `${EMSC_EVENT_DETAILS_BASE}?unid=${encodeURIComponent(unid)}`
}

function usgsUrl(id: string): string {
  return `${USGS_EVENT_PAGE_BASE}/${id}`
}

/** Corrige les anciennes URLs EMSC (`/event/details?id=`) qui renvoient 404 */
export function normalizeOfficialLinkUrl(url: string | null | undefined): string | null {
  const u = url?.trim()
  if (!u) return null

  if (LEGACY_EMSC_DETAILS.test(u)) {
    try {
      const parsed = new URL(u)
      const id = parsed.searchParams.get('id') ?? parsed.searchParams.get('unid')
      if (id) return emscUrl(id)
    } catch {
      /* ignore */
    }
  }

  if (u.includes('eventdetails.html?unid=')) return u
  if (u.includes('earthquake.usgs.gov/earthquakes/eventpage/')) return u

  return u
}

function pickUsgsId(
  raw: SurveillanceSeismicEvent | null | undefined,
  ui?: SeismicEventUI | null
): string | null {
  const fromRaw = raw?.usgs_id?.trim()
  if (fromRaw && looksLikeUsgsId(fromRaw)) return fromRaw
  const fromUi = ui?.usgsId?.trim()
  if (fromUi && looksLikeUsgsId(fromUi)) return fromUi
  return usgsIdFromEventId(raw?.id ?? ui?.id ?? '')
}

function pickEmscId(
  raw: SurveillanceSeismicEvent | null | undefined,
  ui?: SeismicEventUI | null
): string | null {
  const fromRaw = raw?.emsc_id?.trim()
  if (fromRaw && looksLikeEmscUnid(fromRaw)) return fromRaw
  const fromUi = ui?.emscId?.trim()
  if (fromUi && looksLikeEmscUnid(fromUi)) return fromUi
  return emscIdFromEventId(raw?.id ?? ui?.id ?? '')
}

function prefersUsgsSource(
  raw: SurveillanceSeismicEvent | null | undefined,
  ui?: SeismicEventUI | null
): boolean {
  const merged = raw?.merged_sources ?? []
  if (merged.includes('USGS')) return true
  const src = (ui?.source ?? raw?.source ?? '').toUpperCase()
  if (src.includes('USGS')) return true
  if (pickUsgsId(raw, ui)) return true
  return false
}

/** URL fiche USGS ou portail EMSC — IDs fusionnés et anciens liens corrigés */
export function resolveOfficialLink(
  raw: SurveillanceSeismicEvent | null | undefined,
  ui?: SeismicEventUI | null
): string | null {
  const usgsId = pickUsgsId(raw, ui)
  const emscId = pickEmscId(raw, ui)
  const preferUsgs = prefersUsgsSource(raw, ui)

  if (preferUsgs && usgsId) return usgsUrl(usgsId)
  if (emscId) return emscUrl(emscId)
  if (usgsId) return usgsUrl(usgsId)

  const direct = normalizeOfficialLinkUrl(raw?.official_link)
  if (direct) return direct

  return null
}

export function officialLinkSourceLabel(url: string): 'USGS' | 'EMSC' | 'other' {
  if (url.includes('earthquake.usgs.gov')) return 'USGS'
  if (url.includes('seismicportal.eu')) return 'EMSC'
  return 'other'
}
