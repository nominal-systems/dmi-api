/* eslint-disable @typescript-eslint/no-floating-promises */
import {
  ClassSerializerInterceptor,
  ValidationPipe
} from '@nestjs/common'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'
import { ConfigService } from '@nestjs/config'
import { NestFactory, Reflector } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import {
  FastifyAdapter,
  NestFastifyApplication
} from '@nestjs/platform-fastify'
import { AppModule } from './app.module'
import { AppConfig } from './config/config.interface'

async function bootstrap (): Promise<void> {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  )
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER))

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

  const PORT = configService.get<number>('port', 3000)

  await app.startAllMicroservices()
  await app.listen(PORT, '0.0.0.0')
}
bootstrap()
