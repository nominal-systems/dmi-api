import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory, Reflector } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { AppModule } from './app.module'
import { AppConfig } from './config/config.interface'
import { IntegrationsService } from './integrations/integrations.service'
import { registerFastifyPlugins } from './common/plugins/fastify-plugins'
import { registerPassportStrategies } from './common/plugins/register-passport-strategies'
import { registerStaticAssets } from './common/plugins/static-assets'
import { registerSwagger } from './common/plugins/swagger'
import { registerMicroservices } from './common/plugins/microservices'

async function bootstrap (): Promise<void> {
  // Create the application
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
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

  // Ensure integration status
  const integrationsService = app.get(IntegrationsService)
  if (process.env.VERIFY_INTEGRATION_STATUS === 'true') {
    await integrationsService.ensureStatusAll()
  }

  // Start the application
  const PORT = configService.get<number>('port', 3000)
  await app.startAllMicroservices()
  await app.listen(PORT, '0.0.0.0')
}

bootstrap().catch((err) => {
  console.error('Failed to start application:', err)
  process.exit(1)
})
