import { Event } from '../entities/event.entity'
import { SubscriptionDeliveryResult } from './subscription-delivery-result.interface'

export interface PublishedEvent {
  event: Event
  deliveries: SubscriptionDeliveryResult[]
}
