import { EventType } from '../../events/constants/event-type.enum'
import { DeliveryOptions } from '../../events/interfaces/delivery-options.interface'

// The admin waits on the response: at most 20 s per subscription, under a 60 s proxy timeout
export const REPUBLISH_DELIVERY_OPTIONS: DeliveryOptions = {
  retryOptions: { maxRetries: 1, retryDelayInMs: 1000, timeoutInMs: 10000 },
  timeoutInMs: 20000
}

export type ReportEventType = EventType.REPORT_CREATED | EventType.REPORT_UPDATED

export interface RepublishReportOptions {
  sourceEventId?: string
  requestedBy: string
}
