/** Alignement store Zustand ↔ requêtes API par module (évite conflit Actualités ↔ Carte) */

export const SEISMIC_STORE_FRESH_MS = 5 * 60 * 1000

export type SeismicDataScope = 'surveillance' | 'carte'

export type SeismicDataHydration = {
  scope: SeismicDataScope
  days: number
  minMagnitude: number
  /** Carte : false = fetch Haïti / Hispaniola uniquement */
  includeGlobal: boolean
  syncedAt: string
  source: string | null
}

export function isStoreHydrationFresh(
  hydration: SeismicDataHydration | null,
  days: number,
  minMagnitude: number,
  scope: SeismicDataScope,
  includeGlobal: boolean,
  maxAgeMs = SEISMIC_STORE_FRESH_MS
): boolean {
  if (!hydration) return false
  if (hydration.scope !== scope) return false
  if (hydration.includeGlobal !== includeGlobal) return false
  if (hydration.days !== days || hydration.minMagnitude !== minMagnitude) return false
  const age = Date.now() - new Date(hydration.syncedAt).getTime()
  return age >= 0 && age < maxAgeMs
}
