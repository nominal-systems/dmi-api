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
