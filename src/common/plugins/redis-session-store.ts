import Redis from 'ioredis'
import { RedisConfig } from '../../config/config.interface'

type GetSetCallback = (err?: Error | null, session?: Record<string, any>) => void
type DestroyCallback = (err?: Error | null) => void

interface SessionLike {
  cookie?: {
    maxAge?: number
    expires?: string | Date | null
  }
  [key: string]: any
}

export interface SessionStoreLike {
  set: (sessionId: string, session: SessionLike, callback: GetSetCallback) => void
  get: (sessionId: string, callback: GetSetCallback) => void
  destroy: (sessionId: string, callback: DestroyCallback) => void
  touch: (sessionId: string, session: SessionLike, callback: DestroyCallback) => void
}

const resolveTtlSeconds = (session: SessionLike, fallbackTtlSeconds: number): number => {
  const cookie = session.cookie

  if (cookie?.maxAge != null && Number.isFinite(cookie.maxAge)) {
    return Math.max(1, Math.floor(cookie.maxAge / 1000))
  }

  if (cookie?.expires != null) {
    const expiresAt = new Date(cookie.expires).getTime()
    if (!Number.isNaN(expiresAt)) {
      return Math.max(1, Math.floor((expiresAt - Date.now()) / 1000))
    }
  }

  return Math.max(1, fallbackTtlSeconds)
}

export function createRedisSessionStore (
  config: RedisConfig,
): { redisClient: Redis; store: SessionStoreLike } {
  const redisClient = new Redis({
    host: config.host,
    port: config.port,
    password: config.password || undefined,
    db: config.db,
    lazyConnect: true,
    maxRetriesPerRequest: null,
    enableReadyCheck: true,
  })

  const store: SessionStoreLike = {
    set: (sessionId, session, callback) => {
      const key = `${config.keyPrefix}${sessionId}`
      const ttlSeconds = resolveTtlSeconds(session, config.sessionTtlSeconds)
      const safeCallback = callback ?? (() => undefined)

      redisClient
        .set(key, JSON.stringify(session), 'EX', ttlSeconds)
        .then(() => safeCallback(null))
        .catch((err: Error) => safeCallback(err))
    },

    get: (sessionId, callback) => {
      const key = `${config.keyPrefix}${sessionId}`
      const safeCallback = callback ?? (() => undefined)

      redisClient
        .get(key)
        .then((serialized) => {
          if (serialized == null) {
            safeCallback(null)
            return
          }

          try {
            const session = JSON.parse(serialized) as Record<string, any>
            safeCallback(null, session)
          } catch (err) {
            safeCallback(err as Error)
          }
        })
        .catch((err: Error) => safeCallback(err))
    },

    destroy: (sessionId, callback) => {
      const key = `${config.keyPrefix}${sessionId}`
      const safeCallback = callback ?? (() => undefined)

      redisClient
        .del(key)
        .then(() => safeCallback(null))
        .catch((err: Error) => safeCallback(err))
    },

    touch: (sessionId, session, callback) => {
      const key = `${config.keyPrefix}${sessionId}`
      const ttlSeconds = resolveTtlSeconds(session, config.sessionTtlSeconds)
      const safeCallback = callback ?? (() => undefined)

      redisClient
        .expire(key, ttlSeconds)
        .then(() => safeCallback(null))
        .catch((err: Error) => safeCallback(err))
    },
  }

  return { redisClient, store }
}
