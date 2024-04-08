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
      return true
    default:
      return false
  }
}

export function updateOrder (
  order: DeepPartial<Order>,
  externalOrder: ExternalOrder
): boolean {
  // Status
  const statusChange = (order.status != null) && isValidStatusChange(externalOrder.status, OrderStatus[order.status])
  if (statusChange) {
    order.status = externalOrder.status
  }

  // Patient
  const patientChange = !isNonEmptyObject(order.patient) && isNonEmptyObject(externalOrder.patient)
  if (patientChange) {
    order.patient = { ...externalOrder.patient }
  }

  // Client
  const clientChange = !isNonEmptyObject(order.client) && isNonEmptyObject(externalOrder.client)
  if (clientChange) {
    order.client = { ...externalOrder.client }
  }

  // Veterinarian
  const veterinarianChange = !isNonEmptyObject(order.veterinarian) && isNonEmptyObject(externalOrder.veterinarian)
  if (veterinarianChange) {
    order.veterinarian = { ...externalOrder.veterinarian }
  }

  // Tests
  const testsChange = ((order.tests?.length) != null) && ((externalOrder.tests?.length) != null) && order.tests.length < externalOrder.tests.length
  if (testsChange) {
    order.tests = externalOrder.tests
  }

  return statusChange || patientChange || clientChange || veterinarianChange || testsChange
}

function isNonEmptyObject (obj): boolean {
  return obj !== null && obj !== undefined && Object.keys(obj).length > 0
}
