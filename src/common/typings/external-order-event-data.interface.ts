import { Order as ExternalOrder } from '@nominal-systems/dmi-engine-common'

export interface ExternalOrdersEventData {
  integrationId: string
  orders: ExternalOrder[]
}
