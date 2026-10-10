import { EventType } from '../../events/constants/event-type.enum'

export type ReportEventType = EventType.REPORT_CREATED | EventType.REPORT_UPDATED

export interface RepublishReportOptions {
  sourceEventId?: string
  requestedBy: string
}
