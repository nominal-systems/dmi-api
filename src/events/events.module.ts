import { Module } from '@nestjs/common'
import { EventsService } from './events.service'
import { EventsController } from './events.controller'
import { Event, EventSchema } from './entities/event.entity'
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose'
import { OrganizationsModule } from '../organizations/organizations.module'
import { OrdersModule } from '../orders/orders.module'
import { Connection } from 'mongoose'
import * as AutoIncrementFactory from 'mongoose-sequence'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Event.name,
        useFactory: (connection: Connection) => {
          const schema = EventSchema
          const AutoIncrement = AutoIncrementFactory(connection)

          schema.plugin(AutoIncrement, { inc_field: 'seq' })

          return schema
        },
        inject: [getConnectionToken()]
      }
    ]),
    ConfigModule,
    OrganizationsModule,
    OrdersModule
  ],
  controllers: [EventsController],
  providers: [EventsService],
  exports: [EventsService]
})
export class EventsModule {}
