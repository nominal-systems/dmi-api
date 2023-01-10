import { forwardRef, Module } from '@nestjs/common'
import { EventsService } from './services/events.service'
import { EventsController } from './controllers/events.controller'
import { Event, EventSchema } from './entities/event.entity'
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose'
import { OrganizationsModule } from '../organizations/organizations.module'
import { OrdersModule } from '../orders/orders.module'
import { Connection } from 'mongoose'
import * as AutoIncrementFactory from 'mongoose-sequence'
import { ConfigModule } from '@nestjs/config'
import { EventSubscriptionsController } from './controllers/event-subscriptions.controller'
import { EventSubscriptionService } from './services/event-subscription.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { EventSubscription } from './entities/event-subscription.entity'
import { IntegrationsModule } from '../integrations/integrations.module'

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
    TypeOrmModule.forFeature([EventSubscription]),
    ConfigModule,
    OrganizationsModule,
    forwardRef(() => OrdersModule),
    IntegrationsModule
  ],
  controllers: [EventsController, EventSubscriptionsController],
  providers: [
    EventsService,
    EventSubscriptionService
  ],
  exports: [
    EventsService,
    EventSubscriptionService
  ]
})
export class EventsModule {}
