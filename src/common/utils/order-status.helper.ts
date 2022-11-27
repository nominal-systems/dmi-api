import { ExternalOrderStatusMap } from '../../orders/constants/external-order-status.map'
import { OrderStatus } from '@nominal-systems/dmi-engine-common'

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
    case OrderStatus.PARTIAL:
    case OrderStatus.COMPLETED:
      return externalStatus !== existingStatus && [OrderStatus.SUBMITTED, OrderStatus.PARTIAL].includes(existingStatus)
    case OrderStatus.CANCELLED:
      return true
    default:
      return false
  }
}
