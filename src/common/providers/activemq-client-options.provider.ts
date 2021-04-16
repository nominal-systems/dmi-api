import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import {
  ClientProvider,
  ClientsModuleOptionsFactory,
  Transport
} from '@nestjs/microservices'

@Injectable()
export class ActiveMQClientOptions implements ClientsModuleOptionsFactory {
  constructor (private readonly configService: ConfigService) {}

  async createClientOptions (): Promise<ClientProvider> {
    return {
      transport: Transport.MQTT,
      options: {
        ...this.configService.get('activeMQ')
      }
    }
  }
}
