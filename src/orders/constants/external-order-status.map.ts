import { OrderStatus } from '@nominal-systems/dmi-engine-common'

// Keys are external order statuses (lowercase). They will match the provider's status when lowercased.
// e.g. IDEXX's "COMPLETED" will be "completed" here. Values are the keys' mapping to DMI order status.
export const ExternalOrderStatusMap = {
  accepted: OrderStatus.ACCEPTED,
  created: OrderStatus.WAITING_FOR_INPUT,
  completed: OrderStatus.COMPLETED,
  submitted: OrderStatus.SUBMITTED,
  cancelled: OrderStatus.CANCELLED,
  'waiting-for-sample': OrderStatus.SUBMITTED,
  'waiting-for-input': OrderStatus.WAITING_FOR_INPUT,
  'partial-results': OrderStatus.PARTIAL,
  'partially-completed': OrderStatus.PARTIAL
}
