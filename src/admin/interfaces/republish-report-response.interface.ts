export type DeliveryResponse = { subscriptionId: string } & (
  | { status: 'sent' }
  | { status: 'too_large', jsonSizeInBytes: number, maxSizeInBytes: number }
  | { status: 'error', message: string }
)

export interface RepublishReportResponse {
  eventId: string
  seq: number
  type: string
  createdAt: Date
  deliveries: DeliveryResponse[]
}
