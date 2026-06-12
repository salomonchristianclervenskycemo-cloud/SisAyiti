/**
 * REST API contract — shared between web and React Native clients.
 * Base URL: same origin on web; configurable on mobile.
 */

import type { SeismicEventUI } from "@/lib/seismic-types"

export type ApiSuccess<T> = T & { success: true }

export type ApiError = {
  success: false
  error: string
  timestamp?: string
}

export type SeismicEventsResponse = ApiSuccess<{
  count: number
  events: SeismicEventUI[]
  timestamp: string
  source?: string
  /** Aligné sur le tableau de surveillance (USGS + EMSC) */
  mode?: string
  status_message_key?: string
}>

export type SeismicStatsResponse = ApiSuccess<{
  totalEvents: number
  highestMagnitude: number
  eventsLast24h: number
  avgMagnitude: number
  riskDistribution?: Record<string, number>
  timestamp: string
}>

export type SeismicStreamPayload = {
  type: "events" | "heartbeat" | "connected" | "error" | "closed"
  events?: Array<Parameters<typeof import("@/lib/seismic-types").dbEventToUI>[0] & { eventTime: string }>
  /** Flux surveillance — événements déjà au format UI */
  ui_events?: SeismicEventUI[]
  mode?: string
  count?: number
  message?: string
  timestamp?: string
}

export type ScorePayload = {
  moduleId: string
  score: number
  maxScore?: number
  metadata?: Record<string, unknown>
}

export type DiagnosticPayload = {
  answers: Record<string, string>
  vulnerabilityLevel: string
  score: number
}

export type LeaderboardEntry = {
  userId: string
  displayName?: string
  score: number
  moduleId: string
  createdAt: string
}

export type LeaderboardResponse = ApiSuccess<{
  entries: LeaderboardEntry[]
  timestamp: string
}>

export type SurveillanceDashboardResponse = ApiSuccess<{
  mode: string
  status_message_key: string
  from_cache: boolean
  count: number
  events: import("@/lib/surveillance/types").SurveillanceSeismicEvent[]
  haiti_events: import("@/lib/surveillance/types").SurveillanceSeismicEvent[]
  global_events: import("@/lib/surveillance/types").SurveillanceSeismicEvent[]
  ui_events: SeismicEventUI[]
  meta: import("@/lib/surveillance/types").SeismicAggregationMeta
  timestamp: string
  network_error?: string | null
}>

export const API_ROUTES = {
  seismicEvents: "/api/seismic/events",
  seismicSurveillance: "/api/seismic/surveillance",
  seismicHistory: "/api/seismic/history",
  seismicStats: "/api/seismic/stats",
  seismicAlerts: "/api/seismic/alerts",
  seismicLayers: "/api/seismic/layers",
  seismicStream: "/api/seismic/stream",
  scores: "/api/scores",
  leaderboard: "/api/scores/leaderboard",
  diagnostics: "/api/diagnostics",
  simulations: "/api/simulations",
  health: "/api/health",
} as const
