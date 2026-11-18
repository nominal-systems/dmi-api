import { ExternalOrderStatusMap } from '../../orders/constants/external-order-status.map'
import { Order as ExternalOrder, OrderStatus } from '@nominal-systems/dmi-engine-common'
import { Order } from '../../orders/entities/order.entity'
import { DeepPartial } from 'typeorm'

export function externalOrderStatusMapper (
  externalOrderStatus: string
): string {
  return (
    ExternalOrderStatusMap[externalOrderStatus.toLowerCase()] ??
    OrderStatus[externalOrderStatus.toUpperCase()]
  )
}

export function isValidStatusChange (
  externalStatus: OrderStatus,
  existingStatus: OrderStatus
): boolean {
  switch (externalStatus) {
    case OrderStatus.SUBMITTED:
      return externalStatus !== existingStatus && [OrderStatus.WAITING_FOR_INPUT, OrderStatus.ACCEPTED].includes(existingStatus)
    case OrderStatus.PARTIAL:
    case OrderStatus.COMPLETED:
      return externalStatus !== existingStatus && [OrderStatus.SUBMITTED, OrderStatus.PARTIAL, OrderStatus.ACCEPTED].includes(existingStatus)
    case OrderStatus.CANCELLED:
    case OrderStatus.ERROR:
      return true
    default:
      return false
  }
}

export function updateOrder (
  localOrder: DeepPartial<Order>,
  externalOrder: ExternalOrder
): boolean {
  const before = orderUpdateKey(localOrder)

  // Status
  const statusChange = (localOrder.status != null) && isValidStatusChange(externalOrder.status, OrderStatus[localOrder.status])
  if (statusChange) {
    localOrder.status = externalOrder.status
  }

  // Patient
  const patientChange = !isNonEmptyObject(localOrder.patient) && isNonEmptyObject(externalOrder.patient)
  if (patientChange) {
    localOrder.patient = { ...externalOrder.patient }
  }

  // Client
  const clientChange = !isNonEmptyObject(localOrder.client) && isNonEmptyObject(externalOrder.client)
  if (clientChange) {
    localOrder.client = { ...externalOrder.client }
  }

  // Veterinarian
  const veterinarianChange = !isNonEmptyObject(localOrder.veterinarian) && isNonEmptyObject(externalOrder.veterinarian)
  if (veterinarianChange) {
    localOrder.veterinarian = { ...externalOrder.veterinarian }
  }

  // Tests
  const testsChange = ((localOrder.tests?.length) != null) && ((externalOrder.tests?.length) != null) && localOrder.tests.length < externalOrder.tests.length
  if (testsChange) {
    localOrder.tests = externalOrder.tests
  }

  // Notes
  if (externalOrder.notes != null && externalOrder.notes !== localOrder.notes) {
    localOrder.notes = externalOrder.notes
  }

  // Whether the order now differs, not whether a guard above let a value through: CANCELLED
  // and ERROR are always a valid status change, so re-applying them is one, and a provider that
  // lists a test code twice keeps its list longer than the distinct tests stored (issue #409)
  return orderUpdateKey(localOrder) !== before
}

// What updateOrder and a result's status can change on an order, as it is stored: the tests are
// a many-to-many keyed by code, so they are a set of codes
export function orderUpdateKey (
  order: DeepPartial<Order>
): string {
  return JSON.stringify([
    order.status ?? null,
    order.notes ?? null,
    isNonEmptyObject(order.patient),
    isNonEmptyObject(order.client),
    isNonEmptyObject(order.veterinarian),
    [...new Set(order.tests?.map(test => test?.code))].sort()
  ])
}

function isNonEmptyObject (obj): boolean {
  return obj !== null && obj !== undefined && Object.keys(obj).length > 0
}
