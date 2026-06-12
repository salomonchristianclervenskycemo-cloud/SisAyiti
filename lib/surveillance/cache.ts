/**
 * Cache local — dernier flux valide pour mode hors-ligne (étape 2).
 */

import type { SeismicAggregationResult } from './types'

const CACHE_KEY = 'sisayiti-surveillance-dashboard'
/** TTL frais : affichage immédiat sans re-fetch */
export const SURVEILLANCE_CACHE_FRESH_MS = 5 * 60 * 1000
/** Au-delà : toujours lisible en mode offline (stale) */
export const SURVEILLANCE_CACHE_STALE_MAX_MS = 7 * 24 * 60 * 60 * 1000

export interface SurveillanceCacheParams {
  days: number
  min_magnitude: number
  include_global: boolean
}

export interface SurveillanceCachePayload {
  params_key: string
  saved_at: number
  result: SeismicAggregationResult
}

export function surveillanceParamsKey(p: SurveillanceCacheParams): string {
  return `${p.days}:${p.min_magnitude}:${p.include_global ? 1 : 0}`
}

function isBrowser(): boolean {
  return typeof window !== 'undefined'
}

export function readSurveillanceCache(
  params: SurveillanceCacheParams,
  options: { allowStale?: boolean } = {}
): SurveillanceCachePayload | null {
  if (!isBrowser()) return null
  const key = surveillanceParamsKey(params)
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as SurveillanceCachePayload
    if (parsed.params_key !== key) return null
    const age = Date.now() - parsed.saved_at
    if (!options.allowStale && age > SURVEILLANCE_CACHE_FRESH_MS) return null
    if (options.allowStale && age > SURVEILLANCE_CACHE_STALE_MAX_MS) return null
    if (!parsed.result?.events) return null
    return parsed
  } catch {
    return null
  }
}

export function readFreshSurveillanceCache(params: SurveillanceCacheParams) {
  return readSurveillanceCache(params, { allowStale: false })
}

export function readStaleSurveillanceCache(params: SurveillanceCacheParams) {
  return readSurveillanceCache(params, { allowStale: true })
}

export function writeSurveillanceCache(
  params: SurveillanceCacheParams,
  result: SeismicAggregationResult
): void {
  if (!isBrowser()) return
  try {
    const payload: SurveillanceCachePayload = {
      params_key: surveillanceParamsKey(params),
      saved_at: Date.now(),
      result,
    }
    localStorage.setItem(CACHE_KEY, JSON.stringify(payload))
  } catch {
    /* quota / navigation privée */
  }
}

export function clearSurveillanceCache(): void {
  if (!isBrowser()) return
  try {
    localStorage.removeItem(CACHE_KEY)
  } catch {
    /* ignore */
  }
}
