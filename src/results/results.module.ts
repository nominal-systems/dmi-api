import { Module } from '@nestjs/common'
import { ClientsModule } from '@nestjs/microservices'
import activeMQClientProvider from '../common/providers/activemq-client.provider'
import { ResultsController } from './results.controller'
import { ProvidersModule } from '../providers/providers.module'

@Module({
  imports: [
    ClientsModule.registerAsync([
      activeMQClientProvider
    ]),
    ProvidersModule
  ],
  controllers: [
    ResultsController
  ]
})
export class ResultsModule {}
