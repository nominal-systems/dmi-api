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
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version } = require('../package.json')

async function bootstrap (): Promise<void> {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  )

  // Admin UI
  const staticFilesDirectory = join(__dirname, '..', 'public')
  const staticFilesPrefix = '/ui'
  app.useStaticAssets({
    root: staticFilesDirectory,
    prefix: staticFilesPrefix,
    prefixAvoidTrailingSlash: true
  })
  Logger.log(`Serving static files from ${staticFilesDirectory} at ${staticFilesPrefix}`)

  // CORS
  app.enableCors()

  const configService = app.get<ConfigService<AppConfig>>(ConfigService)

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

  // Documentation
  const docsConfig = configService.get<DocsConfig>('docs')
  if (docsConfig !== undefined) {
    const config = new DocumentBuilder()
      .setTitle(docsConfig.title)
      .setDescription(docsConfig.description)
      .setVersion(version)
      .build()

    const document = SwaggerModule.createDocument(app, config)
    // Change the URL for the OpenAPI JSON
    app.getHttpAdapter().get(docsConfig.openApiSpecUrl, (req, res) => {
      res.send(document)
    })

    SwaggerModule.setup('docs', app, document, {
      swaggerOptions: {
        url: docsConfig.openApiSpecUrl
      }
    })
  }

  if (process.env.VERIFY_INTEGRATION_STATUS === 'true') {
    const integrationsService = app.get(IntegrationsService)
    await integrationsService.ensureStatusAll()
  }

  // Start application
  const PORT = configService.get<number>('port', 3000)
  await app.startAllMicroservices()
  await app.listen(PORT, '0.0.0.0')
}

bootstrap()
