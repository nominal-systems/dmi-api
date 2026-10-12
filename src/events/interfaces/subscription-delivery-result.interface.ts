export type SubscriptionDeliveryResult = { subscriptionId: string } & (
  | { status: 'sent' }
  | { status: 'too_large', jsonSizeInBytes: number, maxSizeInBytes: number }
  | { status: 'error', error: Error }
)
