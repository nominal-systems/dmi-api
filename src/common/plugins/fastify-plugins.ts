import { INestApplication, Logger } from '@nestjs/common'
import { FastifyInstance } from 'fastify'
import fastifyCookie from '@fastify/cookie'
import fastifySession from '@fastify/session'
import fastifyPassport from '@fastify/passport'
import { ConfigService } from '@nestjs/config'
import { getConnectionToken } from '@nestjs/mongoose'
import { Connection } from 'mongoose'
import { MongoClient } from 'mongodb'
// connect-mongo compiles to `module.exports = MongoStore` (export =); with
// allowSyntheticDefaultImports and no esModuleInterop, a default import would
// type-check but be undefined at runtime — import-require is the correct form.
import MongoStore = require('connect-mongo')
import { AppConfig } from '../../config/config.interface'

const SESSION_MAX_AGE_MS = 30 * 60 * 1000 // 30 minutes
const SESSIONS_COLLECTION = 'sessions'

export async function registerFastifyPlugins (app: INestApplication): Promise<void> {
  const fastify = app.getHttpAdapter().getInstance() as FastifyInstance
  const configService = app.get<ConfigService<AppConfig>>(ConfigService)
  const mongooseConnection = app.get<Connection>(getConnectionToken())

  await fastify.register(fastifyCookie)
  await fastify.register(fastifySession, {
    secret: configService.get<string>('secretKey') as string,
    // Sessions must live outside pod memory so any replica can serve any
    // request. Reuses the app's existing Mongo connection: mongoose 6 exposes a
    // driver-v4 MongoClient while connect-mongo is typed against driver v5/v6,
    // but the collection API surface the store uses is identical, hence the cast.
    store: MongoStore.create({
      client: mongooseConnection.getClient() as unknown as MongoClient,
      collectionName: SESSIONS_COLLECTION,
      ttl: SESSION_MAX_AGE_MS / 1000,
      // CosmosDB only honors TTL indexes on the system `_ts` field and rejects
      // the `expires` TTL index connect-mongo would create — which would leave
      // the store's collection promise rejected and crash the pod (unhandled
      // rejection). Expired docs are cleaned up via the `_ts` index created
      // below; stale sessions are rejected on read regardless (the store
      // filters on `expires`, and @fastify/session checks the cookie expiry).
      autoRemove: 'disabled'
    }) as any,
    // Without this, every cookie-less request (all PIMS API traffic) would
    // persist a brand-new empty session to Mongo. Login flows modify the
    // session, so they are still saved; rolling (default true) keeps re-saving
    // active sessions, giving the sliding 30-minute expiry.
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: SESSION_MAX_AGE_MS
    }
  })

  // Sliding session cleanup on CosmosDB: `_ts` is Cosmos' last-modified
  // timestamp, updated on every session re-save, so docs expire 30 minutes
  // after the last activity — matching the cookie maxAge. On plain MongoDB
  // (local/dev) `_ts` does not exist, so this index is an inert no-op and
  // sessions simply accumulate until they are rejected on read; do not
  // "fix" this by indexing `expires`, Cosmos rejects TTL on that field.
  // Best-effort: correctness never depends on this index, so a failure here
  // must not take the pod down.
  try {
    await mongooseConnection.db
      .collection(SESSIONS_COLLECTION)
      .createIndex({ _ts: 1 }, { expireAfterSeconds: SESSION_MAX_AGE_MS / 1000 })
  } catch (error) {
    new Logger('SessionStore').warn(
      `Could not create TTL index on '${SESSIONS_COLLECTION}': ${(error as Error).message}. ` +
        'Expired session documents will not be cleaned up automatically.'
    )
  }

  await fastify.register(fastifyPassport.initialize())

  // Register a preHandler hook to polyfill Express-style methods on Fastify’s reply and request,
  // ensure headers and .end() calls work, add a session.set helper, and populate req.user from passport
  fastify.addHook('preHandler', async (req, reply) => {
      const res = reply as any

      if (typeof res.setHeader !== 'function') {
        res.setHeader = reply.header.bind(reply)
      }

      if (typeof res.end !== 'function') {
        res.end = function(data?: any) {
          return reply.send(data)
        }
      }

      if (req.session && typeof req.session.set !== 'function') {
        (req.session as any).set = function(key: string, value: any) {
          this[key] = value
        }
      }

      if (req.session?.passport?.user?.profile?.username) {
        req.user = req.session.passport.user
      } else if (req.session?.passport?.profile?.username) {
        req.user = req.session.passport
      }
    }
  )

  fastifyPassport.registerUserSerializer(async (user: any) => {
    return user
  })

  fastifyPassport.registerUserDeserializer(async (user: any) => {
    return user
  })
}
