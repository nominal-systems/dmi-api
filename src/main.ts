/* eslint-disable @typescript-eslint/no-floating-promises */
import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory, Reflector } from '@nestjs/core'
import {
  FastifyAdapter,
  NestFastifyApplication
} from '@nestjs/platform-fastify'
import { AppModule } from './app.module'
import { API_VERSION } from './common/constants/api.constant'
import { AppConfig } from './config/config.interface'

async function bootstrap (): Promise<void> {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  )
  app.setGlobalPrefix(`/api/${API_VERSION}`)
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true }
    })
  )
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))

  const configService = app.get<ConfigService<AppConfig>>(ConfigService)
  const PORT = configService.get<number>('port', 3000)

  await app.listen(PORT, '0.0.0.0')

  Logger.log(`App listening on port ${PORT}`, 'NestApplication')
}
bootstrap()
