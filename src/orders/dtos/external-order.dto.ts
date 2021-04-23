import { Order } from '../entities/order.entity'

export type ExternalOrder = Omit<Order, 'integration' | 'id'>
