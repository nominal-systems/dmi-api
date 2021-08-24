import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import {
  ClientProvider,
  ClientsModuleOptionsFactory
} from '@nestjs/microservices'
import { TimeoutClientMqtt } from '../classes/timeout-mqtt-client'

@Injectable()
export class ActiveMQClientOptions implements ClientsModuleOptionsFactory {
  constructor (private readonly configService: ConfigService) {}

  async createClientOptions (): Promise<ClientProvider> {
    return {
      customClass: TimeoutClientMqtt,
      options: {
        ...this.configService.get('activeMQ')
      }
    }
  }
}
