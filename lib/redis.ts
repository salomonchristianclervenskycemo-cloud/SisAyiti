import Redis from 'ioredis'

let redis: Redis | null = null

let redisErrorLogged = false

if (process.env.REDIS_URL) {
  try {
    redis = new Redis(process.env.REDIS_URL, {
      maxRetriesPerRequest: 1,
      lazyConnect: true,
      connectTimeout: 2000,
      retryStrategy(times) {
        if (times > 2) {
          if (!redisErrorLogged) {
            redisErrorLogged = true
            console.warn('[redis] Indisponible — cache désactivé (l’app continue sans Redis).')
          }
          return null
        }
        return Math.min(times * 100, 1000)
      },
    })

    redis.on('error', () => {
      if (!redisErrorLogged) {
        redisErrorLogged = true
        console.warn('[redis] Indisponible — cache désactivé (l’app continue sans Redis).')
      }
    })
  } catch (e) {
    console.error('Failed to initialize Redis client:', e)
  }
} else {
  console.log('REDIS_URL is not set. Cache features will be disabled.')
}

export async function getCache<T>(key: string): Promise<T | null> {
  if (!redis) return null
  try {
    const data = await redis.get(key)
    return data ? (JSON.parse(data) as T) : null
  } catch {
    return null
  }
}

export async function setCache(key: string, value: any, ttlSeconds = 3600): Promise<boolean> {
  if (!redis) return false
  try {
    const serialized = JSON.stringify(value)
    await redis.set(key, serialized, 'EX', ttlSeconds)
    return true
  } catch {
    return false
  }
}

export async function invalidateCache(key: string): Promise<boolean> {
  if (!redis) return false
  try {
    await redis.del(key)
    return true
  } catch {
    return false
  }
}

export { redis }
export default redis
