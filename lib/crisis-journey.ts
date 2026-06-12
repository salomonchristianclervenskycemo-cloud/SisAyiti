import { isHaitiTaggedEvent, isInHaitiMapRegion } from '@/lib/seismic-haiti-filter'
import type { SeismicEventUI } from '@/lib/seismic-types'

export const CRISIS_MIN_MAGNITUDE = 4
export const CRISIS_WINDOW_MS = 48 * 60 * 60 * 1000

const DISMISSED_KEY = 'sisayiti_crisis_dismissed'
const MODE_KEY = 'sisayiti_crisis_mode'
const EVENT_KEY = 'sisayiti_crisis_event_id'

function readDismissed(): string[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(DISMISSED_KEY)
    return raw ? (JSON.parse(raw) as string[]) : []
  } catch {
    return []
  }
}

export function dismissCrisisEvent(eventId: string) {
  if (typeof window === 'undefined') return
  const list = readDismissed()
  if (!list.includes(eventId)) {
    list.push(eventId)
    localStorage.setItem(DISMISSED_KEY, JSON.stringify(list.slice(-20)))
  }
}

export function isCrisisRelevantEvent(e: SeismicEventUI): boolean {
  if (e.magnitude < CRISIS_MIN_MAGNITUDE) return false
  const t = new Date(e.eventTime).getTime()
  if (Number.isNaN(t) || Date.now() - t > CRISIS_WINDOW_MS) return false
  return isInHaitiMapRegion(e.latitude, e.longitude) || isHaitiTaggedEvent(e)
}

export function pickActiveCrisisEvent(events: SeismicEventUI[]): SeismicEventUI | null {
  const dismissed = new Set(readDismissed())
  const candidates = events
    .filter(isCrisisRelevantEvent)
    .filter((e) => !dismissed.has(e.id))
    .sort((a, b) => b.magnitude - a.magnitude || +new Date(b.eventTime) - +new Date(a.eventTime))
  return candidates[0] ?? null
}

export function setCrisisMode(active: boolean, eventId?: string) {
  if (typeof window === 'undefined') return
  if (active && eventId) {
    sessionStorage.setItem(MODE_KEY, '1')
    sessionStorage.setItem(EVENT_KEY, eventId)
  } else {
    sessionStorage.removeItem(MODE_KEY)
    sessionStorage.removeItem(EVENT_KEY)
  }
}

export function isCrisisMode(): boolean {
  if (typeof window === 'undefined') return false
  return sessionStorage.getItem(MODE_KEY) === '1'
}

export function getCrisisModeEventId(): string | null {
  if (typeof window === 'undefined') return null
  return sessionStorage.getItem(EVENT_KEY)
}
