import { Module } from '@nestjs/common'
import { EventsService } from './events.service'
import { EventsController } from './events.controller'
import { Event, EventSchema } from './entities/event.entity'
import { MongooseModule } from '@nestjs/mongoose'
import { OrganizationsModule } from '../organizations/organizations.module'
import { OrdersModule } from '../orders/orders.module'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
    OrganizationsModule,
    OrdersModule
  ],
  controllers: [EventsController],
  providers: [EventsService]
})
export class EventsModule {}
