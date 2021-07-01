import { ExternalOrderStatusMap } from '../../orders/constants/external-order-status.map'
import { OrderStatus } from '../../orders/constants/order-status.enum'

export function externalOrderStatusMapper (
  externalOrderStatus: string
): string {
  return (
    ExternalOrderStatusMap[externalOrderStatus.toLowerCase()] ??
    OrderStatus[externalOrderStatus.toUpperCase()]
  )
}
