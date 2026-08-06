import { loadEnv } from './config/load-env'
import { ClassSerializerInterceptor, Logger, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory, Reflector } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { AppModule } from './app.module'
import { AppConfig } from './config/config.interface'
import { registerFastifyPlugins } from './common/plugins/fastify-plugins'
import { registerPassportStrategies } from './common/plugins/register-passport-strategies'
import { registerStaticAssets } from './common/plugins/static-assets'
import { registerSwagger } from './common/plugins/swagger'
import { registerMicroservices } from './common/plugins/microservices'

const loaded = loadEnv()
Logger.log(`Loaded environment configuration from ${loaded.join(', ')}`)

// A response written twice surfaces as ERR_HTTP_HEADERS_SENT thrown from inside fastify's
// async `onSend` chain, where no request-scoped try/catch can reach it. Losing the whole
// replica to one malformed request is worse than dropping that request, so log and carry
// on for that specific error; everything else keeps the previous fail-fast behaviour.
function isSurvivable (err: unknown): boolean {
  return (err as NodeJS.ErrnoException | undefined)?.code === 'ERR_HTTP_HEADERS_SENT'
}

function handleFatal (kind: string, err: unknown): void {
  if (isSurvivable(err)) {
    Logger.error(`Survivable ${kind}: ${(err as Error).message}`, (err as Error).stack)
    return
  }
  Logger.error(`Fatal ${kind}:`, err instanceof Error ? err.stack : String(err))
  process.exit(1)
}

process.on('uncaughtException', (err) => handleFatal('uncaughtException', err))
process.on('unhandledRejection', (reason) => handleFatal('unhandledRejection', reason))

/* eslint-disable @typescript-eslint/no-floating-promises */

async function bootstrap (): Promise<void> {
  // Create the application
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ trustProxy: true })
  )

  // Configure the application
  const configService = app.get<ConfigService<AppConfig>>(ConfigService)
  await registerFastifyPlugins(app)
  await registerPassportStrategies(app)
  await registerStaticAssets(app)
  await registerSwagger(app)
  await registerMicroservices(app)
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true }
    })
  )
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
  app.enableCors()

  // Start the application
  const PORT = configService.get<number>('port', 3000)
  await app.startAllMicroservices()
  await app.listen(PORT, '0.0.0.0')
}

bootstrap().catch((err) => {
  console.error('Failed to start application:', err)
  process.exit(1)
})
