import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { ConfigService } from '@nestjs/config'
import { Logger } from '@nestjs/common'
import { NestFastifyApplication } from '@nestjs/platform-fastify'
import { AppConfig } from '../../config/config.interface'

export async function registerMicroservices (app: NestFastifyApplication): Promise<void> {
  const configService = app.get<ConfigService<AppConfig>>(ConfigService)

  const mqttOptions: MicroserviceOptions = {
    transport: Transport.MQTT,
    options: {
      ...configService.get('activeMQ')
    }
  }

  app.connectMicroservice(mqttOptions)
  Logger.log('MQTT microservice connected')
}
