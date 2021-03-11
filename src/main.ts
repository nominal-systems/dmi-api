import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'
import { AppModule } from './app.module'
import { API_VERSION } from './common/constants/api.constant'

async function bootstrap () {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  )
  app.setGlobalPrefix(`/api/${API_VERSION}`)

  const configService = app.get(ConfigService)
  const PORT = configService.get('PORT')

  await app.listen(PORT, '0.0.0.0')

  Logger.log(`App listening on port ${PORT}`)
}
bootstrap()
