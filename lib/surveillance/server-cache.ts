import { getCache, setCache } from '@/lib/redis'
import type { SeismicAggregationResult } from './types'

const PREFIX = 'surveillance:v1'
/** Cache serveur frais (réponses rapides, sources lentes) */
export const SURVEILLANCE_SERVER_FRESH_TTL_SEC = 300
/** Secours si agrégation échoue */
export const SURVEILLANCE_SERVER_STALE_TTL_SEC = 3600

const memory = new Map<string, { saved_at: number; result: SeismicAggregationResult }>()

export function surveillanceServerCacheKey(
  days: number,
  minMagnitude: number,
  includeGlobal: boolean
): string {
  return `${PREFIX}:${days}:${minMagnitude}:${includeGlobal ? 1 : 0}`
}

export async function readSurveillanceServerCache(
  key: string,
  maxAgeMs: number
): Promise<SeismicAggregationResult | null> {
  const mem = memory.get(key)
  if (mem && Date.now() - mem.saved_at <= maxAgeMs) {
    return mem.result
  }

  const redisPayload = await getCache<{ saved_at: number; result: SeismicAggregationResult }>(key)
  if (redisPayload?.result?.events) {
    const age = Date.now() - redisPayload.saved_at
    if (age <= maxAgeMs) {
      memory.set(key, redisPayload)
      return redisPayload.result
    }
  }
  return null
}

export async function writeSurveillanceServerCache(
  key: string,
  result: SeismicAggregationResult,
  ttlSec: number
): Promise<void> {
  const payload = { saved_at: Date.now(), result }
  memory.set(key, payload)
  await setCache(key, payload, ttlSec)
}
