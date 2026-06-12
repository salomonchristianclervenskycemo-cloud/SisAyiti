/**
 * Modèle strict — Tableau de Surveillance Sismique (SisAyiti).
 * Contrat partagé UI, hooks, API et agrégateur.
 */

export type SeismicDataSource = 'USGS' | 'EMSC' | 'local'

export type ValidationStatus = 'automatique' | 'provisoire' | 'révisé' | 'confirmé'

export type SourceFetchState = 'ok' | 'error' | 'timeout' | 'skipped'

/** Séisme normalisé après agrégation multi-sources */
export interface SurveillanceSeismicEvent {
  /** Identifiant stable (préfixe source ou fusion `merged-…`) */
  id: string
  event_id: string
  datetime_utc: string
  datetime_local: string
  latitude: number
  longitude: number
  depth_km: number
  magnitude: number
  magnitude_type: string | null
  source: SeismicDataSource
  validation_status: ValidationStatus
  last_updated: string
  official_link: string | null
  region: string | null
  tsunami: boolean
  felt: boolean
  /** Priorité affichage — événement dans la BBOX Haïti / Hispaniola */
  is_haiti_region: boolean
  /** Sources fusionnées lors de la déduplication */
  merged_sources: SeismicDataSource[]
  usgs_id: string | null
  emsc_id: string | null
}

export interface SourceFetchReport {
  source: SeismicDataSource
  state: SourceFetchState
  count: number
  latency_ms: number
  error_message: string | null
}

export interface SeismicAggregationMeta {
  fetched_at_utc: string
  global_count: number
  haiti_count: number
  deduplicated_count: number
  sources: SourceFetchReport[]
  /** Au moins une source principale a répondu */
  is_live: boolean
  /** Toutes les sources ont échoué */
  is_degraded: boolean
}

export interface SeismicAggregationResult {
  events: SurveillanceSeismicEvent[]
  haiti_events: SurveillanceSeismicEvent[]
  global_events: SurveillanceSeismicEvent[]
  meta: SeismicAggregationMeta
}

export interface AggregationOptions {
  days?: number
  min_magnitude?: number
  /** Inclure flux global (USGS summary) en plus de la BBOX Haïti */
  include_global?: boolean
  /** Timeout par source (ms) */
  source_timeout_ms?: number
}
