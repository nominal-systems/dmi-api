import { TestResult } from '@nominal-systems/dmi-engine-common'
import { Order } from '../../orders/entities/order.entity'
import { Report } from '../../reports/entities/report.entity'

export interface OrderCreatedEventPayload {
  orderId: string
  order: Order
}

export interface OrderUpdatedEventPayload {
  orderId: string
  status: string
  order: Order
}

export interface OrderResultsEventPayload {
  orderId: string
  order: Order
  results: TestResult[]
}

export interface ReportCreatedEventPayload {
  orderId: string
  reportId: string
  report: Report
}

export interface ReportUpdatedEventPayload {
  orderId: string
  reportId: string
  report: Report
}

export type EventData =
  | OrderCreatedEventPayload
  | OrderUpdatedEventPayload
  | OrderResultsEventPayload
  | ReportCreatedEventPayload
  | ReportUpdatedEventPayload
