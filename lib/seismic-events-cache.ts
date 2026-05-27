import type { SeismicEventUI } from "@/lib/seismic-types"

const CACHE_KEY = "sisayiti-seismic-events"
const CACHE_TTL_MS = 5 * 60 * 1000

type CachedPayload = {
  events: SeismicEventUI[]
  timestamp: string
  source?: string | null
  paramsKey: string
  savedAt: number
}

function paramsKey(days: number, minMag: number): string {
  return `${days}:${minMag}`
}

export function readSeismicEventsCache(days: number, minMag: number): CachedPayload | null {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as CachedPayload
    if (parsed.paramsKey !== paramsKey(days, minMag)) return null
    if (Date.now() - parsed.savedAt > CACHE_TTL_MS) return null
    return parsed
  } catch {
    return null
  }
}

export function writeSeismicEventsCache(
  days: number,
  minMag: number,
  events: SeismicEventUI[],
  timestamp: string,
  source?: string | null
): void {
  if (typeof window === "undefined") return
  try {
    const payload: CachedPayload = {
      events,
      timestamp,
      source,
      paramsKey: paramsKey(days, minMag),
      savedAt: Date.now(),
    }
    localStorage.setItem(CACHE_KEY, JSON.stringify(payload))
  } catch {
    /* quota / private mode */
  }
}

export function readStaleSeismicEventsCache(days: number, minMag: number): CachedPayload | null {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as CachedPayload
    if (parsed.paramsKey !== paramsKey(days, minMag)) return null
    return parsed
  } catch {
    return null
  }
}
