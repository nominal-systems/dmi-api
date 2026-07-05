import { INestApplication } from '@nestjs/common'
import { FastifyInstance } from 'fastify'
import fastifyCookie from '@fastify/cookie'
import fastifySession from '@fastify/session'
import fastifyPassport from '@fastify/passport'
import { ConfigService } from '@nestjs/config'
import { getConnectionToken } from '@nestjs/mongoose'
import { Connection } from 'mongoose'
import { MongoClient } from 'mongodb'
import MongoStore from 'connect-mongo'
import { AppConfig } from '../../config/config.interface'

const SESSION_MAX_AGE_MS = 30 * 60 * 1000 // 30 minutes

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
      clientPromise: Promise.resolve(mongooseConnection.getClient() as unknown as MongoClient),
      collectionName: 'sessions',
      ttl: SESSION_MAX_AGE_MS / 1000
    }) as any,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: SESSION_MAX_AGE_MS
    }
  })

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
