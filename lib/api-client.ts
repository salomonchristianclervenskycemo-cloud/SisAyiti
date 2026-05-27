/**
 * Typed HTTP client for SisAyiti REST APIs.
 * Web uses relative URLs; mobile can pass `baseUrl` + bearer token.
 */

import { API_ROUTES, type SeismicEventsResponse, type SeismicStatsResponse } from "@/shared/api-contract"

export type ApiClientOptions = {
  baseUrl?: string
  fetchImpl?: typeof fetch
  bearerToken?: string | null
}

let globalBearerToken: string | null = null

export function setApiBearerToken(token: string | null) {
  globalBearerToken = token
}

async function request<T>(
  path: string,
  options: ApiClientOptions & RequestInit = {}
): Promise<T> {
  const { baseUrl = "", fetchImpl = fetch, bearerToken, ...init } = options
  const token = bearerToken ?? globalBearerToken
  const headers = new Headers(init.headers)
  if (token) headers.set("Authorization", `Bearer ${token}`)
  const res = await fetchImpl(`${baseUrl}${path}`, { ...init, headers })
  if (!res.ok) {
    throw new Error(`API ${path} failed: HTTP ${res.status}`)
  }
  return res.json() as Promise<T>
}

export type GameScoreInput = {
  playerName?: string
  finalBudget: number
  buildingsConstructed: number
  resilientBuildings: number
  selectedSoil?: string
  difficulty?: string
  lang?: string
}

export function createApiClient(options: ApiClientOptions = {}) {
  const { baseUrl = "" } = options

  const withBase = (path: string, init?: RequestInit) =>
    request(`${baseUrl}${path}`, { ...options, ...init })

  return {
    setBearerToken(token: string | null) {
      globalBearerToken = token
    },

    async mobileLogin(email: string, password: string) {
      const res = await withBase("/api/auth/mobile/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }) as { success: boolean; token?: string; user?: unknown; error?: string }
      if (res.success && res.token) {
        globalBearerToken = res.token
      }
      return res
    },

    getSeismicEvents(params: { days?: number; minMagnitude?: number; limit?: number; global?: boolean }) {
      const q = new URLSearchParams()
      if (params.days != null) q.set("days", String(params.days))
      if (params.minMagnitude != null) q.set("minMagnitude", String(params.minMagnitude))
      if (params.limit != null) q.set("limit", String(params.limit))
      if (params.global) q.set("global", "true")
      return withBase(`${API_ROUTES.seismicEvents}?${q}`) as Promise<SeismicEventsResponse>
    },

    getSeismicStats(days = 7) {
      return withBase(`${API_ROUTES.seismicStats}?days=${days}`) as Promise<SeismicStatsResponse>
    },

    getSeismicLayers() {
      return withBase(API_ROUTES.seismicLayers) as Promise<{ layers: unknown }>
    },

    getHealth() {
      return withBase(API_ROUTES.health) as Promise<{ status: string }>
    },

    postScore(input: GameScoreInput) {
      return withBase(API_ROUTES.scores, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      })
    },
  }
}

/** Default singleton for web app (same-origin). */
export const api = createApiClient()
