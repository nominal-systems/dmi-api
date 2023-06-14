import { Module } from '@nestjs/common'
import { ClientsModule } from '@nestjs/microservices'
import activeMQClientProvider from '../common/providers/activemq-client.provider'
import { ResultsController } from './results.controller'

@Module({
  imports: [
    ClientsModule.registerAsync([
      activeMQClientProvider
    ])
  ],
  controllers: [
    ResultsController
  ]
})
export class ResultsModule {}
