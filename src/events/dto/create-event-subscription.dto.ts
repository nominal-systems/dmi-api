import { IsNotEmpty, IsString } from 'class-validator'
import { EventType } from '../constants/event-type.enum'
import { EventSubscriptionTypes } from '../constants/event-subscription-types.enum'

export class CreateEventSubscriptionDto {
  @IsNotEmpty()
  @IsString()
  event_type: EventType

  @IsNotEmpty()
  @IsString()
  subscription_type: EventSubscriptionTypes

  @IsNotEmpty()
  subscription_options: any
}
