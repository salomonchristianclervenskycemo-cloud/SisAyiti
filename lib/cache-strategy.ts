/** Redis TTL tiers for seismic data */
export const CACHE_TTL = {
  realtime: 30,
  events: 5 * 60,
  stats: 60 * 60,
  history: 24 * 60 * 60,
  layers: 24 * 60 * 60,
} as const

export function eventsCacheKey(limit: number, minMag: number, days: number) {
  return `seismic:events:${limit}:${minMag}:${days}`
}

export function statsCacheKey(days: number) {
  return `seismic:stats:${days}`
}
