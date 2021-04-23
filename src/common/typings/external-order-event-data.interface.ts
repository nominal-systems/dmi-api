import { ExternalOrder } from '../../orders/dtos/external-order.dto'

export interface ExternalOrdersEventData {
  integrationId: string
  orders: ExternalOrder[]
}
