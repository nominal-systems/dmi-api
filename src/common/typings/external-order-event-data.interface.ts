import { Order } from '../../orders/entities/order.entity'

export interface ExternalOrdersEventData {
  integrationId: string
  data: Order[]
}
