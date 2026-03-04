import { INestApplication, Logger } from '@nestjs/common'
import { FastifyInstance } from 'fastify'
import fastifyCookie from 'fastify-cookie'
import fastifySession from 'fastify-session'
import fastifyPassport from 'fastify-passport'
import { ConfigService } from '@nestjs/config'
import { AppConfig } from '../../config/config.interface'
import { createRedisSessionStore, SessionStoreLike } from './redis-session-store'

export async function registerFastifyPlugins (app: INestApplication): Promise<void> {
  const logger = new Logger('FastifyPlugins')
  const fastify = app.getHttpAdapter().getInstance() as FastifyInstance
  const configService = app.get<ConfigService<AppConfig>>(ConfigService)
  const redisConfig = configService.get<AppConfig['redis']>('redis')
  let sessionStore: SessionStoreLike | undefined

  await fastify.register(fastifyCookie)

  if (redisConfig?.host) {
    const { redisClient, store } = createRedisSessionStore(redisConfig)
    sessionStore = store

    redisClient.on('error', (error) => {
      logger.error(`Redis session store error: ${error.message}`)
    })

    fastify.addHook('onClose', async () => {
      try {
        await redisClient.quit()
      } catch (error) {
        logger.error(`Failed to close Redis session client: ${(error as Error).message}`)
      }
    })

    logger.log(
      `Using Redis-backed session store at ${redisConfig.host}:${redisConfig.port} (db=${redisConfig.db})`,
    )
  } else {
    logger.warn('REDIS_HOST not set. Falling back to in-memory session store')
  }

  await fastify.register(fastifySession, {
    secret: configService.get('secretKey'),
    store: sessionStore as any,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: (redisConfig?.sessionTtlSeconds ?? 1800) * 1000,
    },
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
      res.end = function (data?: any) {
        return reply.send(data)
      }
    }

    if (req.session && typeof req.session.set !== 'function') {
      req.session.set = function (key: string, value: any) {
        this[key] = value
      }
    }

    if (req.session && req.session.passport) {
      req.user = req.session.passport.user || req.session.passport
    }
  })

  fastifyPassport.registerUserSerializer(async (user: any) => {
    return user
  })

  fastifyPassport.registerUserDeserializer(async (user: any) => {
    return user
  })
}
