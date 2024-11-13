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

  return statusChange || patientChange || clientChange || veterinarianChange || testsChange
}

function isNonEmptyObject (obj): boolean {
  return obj !== null && obj !== undefined && Object.keys(obj).length > 0
}
