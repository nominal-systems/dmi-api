export type SubscriptionDeliveryResult =
  | { subscriptionId: string, status: 'sent' }
  | { subscriptionId: string, status: 'too_large', sizeInBytes: number, maxSizeInBytes: number }
  | { subscriptionId: string, status: 'error', error: Error }
