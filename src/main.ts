/* eslint-disable @typescript-eslint/no-floating-promises */
import { ClassSerializerInterceptor, Logger, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory, Reflector } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { AppModule } from './app.module'
import { AppConfig, DocsConfig } from './config/config.interface'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { IntegrationsService } from './integrations/integrations.service'
import { join } from 'path'
import fastifyPassport from 'fastify-passport'
import fastifyCookie from 'fastify-cookie'
import fastifySession from 'fastify-session'
// Remove: import fastifySecureSession from 'fastify-secure-session'
import { FastifyInstance } from 'fastify'

async function bootstrap (): Promise<void> {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  )
  const configService = app.get<ConfigService<AppConfig>>(ConfigService)

  // Get the underlying Fastify instance
  const fastifyInstance = app.getHttpAdapter().getInstance() as FastifyInstance

  // 1. Register fastify-cookie (dependency for fastify-session)
  await fastifyInstance.register(fastifyCookie)

  // 2. Register fastify-session plugin (mutable session)
  await fastifyInstance.register(fastifySession, {
    secret: 'a-very-long-secret-key-at-least-32-characters', // Replace with a secure secret from config/env
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 30 * 60 * 1000 // 30 minutes (in milliseconds)
      // You can add additional options: path, httpOnly, sameSite, etc.
    }
  })

  // 3. Initialize fastify-passport
  await fastifyInstance.register(fastifyPassport.initialize())
  // Note: fastifyPassport.session() is not available in v0.6.0 for fastify-session.
  // We will add our own session handling below.

  // 5. Add a global preHandler hook to rehydrate the user from the session
  fastifyInstance.addHook('preHandler', async (req, reply) => {
    if (req.session && typeof req.session.set !== 'function') {
      req.session.set = function(key: string, value: any) {
        this[key] = value
      }
    }
    if (req.session && req.session.passport && req.session.passport.user) {
      try {
        // Explicitly tell TypeScript that the promise will resolve to a value of type any.
        const deserializedUser = await new Promise<any>((resolve, reject) => {
          fastifyPassport.deserializeUser(
            req.session.passport.user,
            req,
            (err, user) => {
              if (err) return reject(err)
              resolve(user)
            }
          )
        })
        // Cast the deserialized user to any (or to your User type if you have one)
        req.user = deserializedUser
      } catch (err) {
        // Instead of null, assign undefined
        req.user = undefined
      }
    }
  })

  // 6. Get and register the Okta strategy
  const { OktaStrategy } = await import('./common/auth/okta.strategy')
  const oktaStrategy = app.get(OktaStrategy)
  fastifyPassport.use('oidc', oktaStrategy as any)

  // (The remainder of your main.ts remains unchanged)
  // Admin UI, CORS, microservices, global pipes, Swagger, etc.

  const staticFilesDirectory = join(__dirname, '..', 'public')
  const staticFilesPrefix = '/ui'
  app.useStaticAssets({
    root: staticFilesDirectory,
    prefix: staticFilesPrefix,
    prefixAvoidTrailingSlash: true
  })
  Logger.log(`Serving static files from ${staticFilesDirectory} at ${staticFilesPrefix}`)

  app.enableCors()

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.MQTT,
    options: {
      ...configService.get('activeMQ')
    }
  })
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true }
    })
  )
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))

  const docsConfig = configService.get<DocsConfig>('docs')
  if (docsConfig !== undefined) {
    const config = new DocumentBuilder()
      .setTitle(docsConfig.title)
      .setDescription(docsConfig.description)
      .setVersion(require('../package.json').version)
      .build()
    const document = SwaggerModule.createDocument(app, config)
    app.getHttpAdapter().get(docsConfig.openApiSpecUrl, (req, res) => {
      res.send(document)
    })
    SwaggerModule.setup('docs', app, document, {
      swaggerOptions: {
        url: docsConfig.openApiSpecUrl
      }
    })
  }

  const integrationsService = app.get(IntegrationsService)
  if (process.env.VERIFY_INTEGRATION_STATUS === 'true') {
    await integrationsService.ensureStatusAll()
  }

  const PORT = configService.get<number>('port', 3000)
  await app.startAllMicroservices()
  await app.listen(PORT, '0.0.0.0')
}

bootstrap().catch((err) => {
  console.error('Failed to start application:', err)
  process.exit(1)
})
