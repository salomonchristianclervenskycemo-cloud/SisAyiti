import { mergeWithHistoricalEvents } from '@/lib/seismic-events-merge'
import type { SeismicEventUI } from '@/lib/seismic-types'
import { surveillanceEventsToUI } from './bridge-to-ui'
import type { ResolvedSurveillanceFeed } from './feed-resolver'
import { surveillanceModeToDataSource } from './fetch-resolved-feed'

export type SeismicEventsApiPayload = {
  success: boolean
  count: number
  events: SeismicEventUI[]
  timestamp: string
  source: string
  mode: ResolvedSurveillanceFeed['mode']
  status_message_key: string
}

export function buildSeismicEventsApiPayload(
  resolved: ResolvedSurveillanceFeed,
  options: {
    limit: number
    server_cache: boolean
    timestamp?: string
  }
): SeismicEventsApiPayload {
  const ui = surveillanceEventsToUI(resolved.result.events)
  const merged = mergeWithHistoricalEvents(ui)
  const limited = merged.slice(0, Math.max(options.limit, 1))

  return {
    success: resolved.mode !== 'error' || limited.length > 0,
    count: limited.length,
    events: limited,
    timestamp: options.timestamp ?? new Date().toISOString(),
    source: surveillanceModeToDataSource(resolved.mode, options.server_cache),
    mode: resolved.mode,
    status_message_key: resolved.status_message_key,
  }
}
