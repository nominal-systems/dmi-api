import { RetryOptions } from '@azure/event-hubs'

export interface DeliveryOptions {
  retryOptions?: RetryOptions
  // Caps each subscription's delivery, including opening the connection, which retryOptions.timeoutInMs does not bound
  timeoutInMs?: number
}
