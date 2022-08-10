import { TestResult } from '@nominal-systems/dmi-engine-common'
import { Order } from '../../orders/entities/order.entity'

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

export interface ReporterCreatedEventPayload {
  orderId: string
  reportId: string
  // TODO(gb): add report: Report
}

export interface ReporterUpdatedEventPayload {
  orderId: string
  reportId: string
  // TODO(gb): add report: Report
}

export type EventData =
  | OrderCreatedEventPayload
  | OrderUpdatedEventPayload
  | OrderResultsEventPayload
  | ReporterCreatedEventPayload
