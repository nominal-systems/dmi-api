import { TestResult } from '@nominal-systems/dmi-engine-common'
import { Order } from '../../orders/entities/order.entity'
import { Report } from '../../reports/entities/report.entity'
import { Practice } from '../../practices/entities/practice.entity'

export interface OrderCreatedEventPayload {
  practice?: Practice
  orderId: string
  order: Order
}

export interface OrderUpdatedEventPayload {
  practice?: Practice
  orderId: string
  status: string
  order: Order
}

export interface OrderResultsEventPayload {
  practice?: Practice
  orderId: string
  order: Order
  results: TestResult[]
}

export interface ReportCreatedEventPayload {
  practice?: Practice
  orderId: string
  reportId: string
  report: Report
}

export interface ReportUpdatedEventPayload {
  practice?: Practice
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
