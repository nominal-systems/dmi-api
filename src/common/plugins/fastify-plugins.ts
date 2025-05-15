import { INestApplication } from '@nestjs/common'
import { FastifyInstance } from 'fastify'
import fastifyCookie from 'fastify-cookie'
import fastifySession from 'fastify-session'
import fastifyPassport from 'fastify-passport'
import { ConfigService } from '@nestjs/config'
import { AppConfig } from '../../config/config.interface'

export async function registerFastifyPlugins (app: INestApplication): Promise<void> {
  const fastify = app.getHttpAdapter().getInstance() as FastifyInstance
  const configService = app.get<ConfigService<AppConfig>>(ConfigService)

  await fastify.register(fastifyCookie)
  await fastify.register(fastifySession, {
    secret: configService.get('secretKey'),
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 30 * 60 * 1000 // 30 minutes
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
        req.session.set = function(key: string, value: any) {
          this[key] = value
        }
      }

      if (req.session && req.session.passport) {
        req.user = req.session.passport.user || req.session.passport
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
