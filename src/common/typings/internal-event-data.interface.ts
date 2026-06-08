import { Order as ExternalOrder } from '@nominal-systems/dmi-engine-common'
import { ProviderResult } from '@nominal-systems/dmi-engine-common'

export interface InternalEventData {
  integrationId: string
  accessionIds?: string[]
}

export interface ExternalOrdersEventData extends InternalEventData {
  orders: ExternalOrder[]
}

export interface ExternalResultEventData extends InternalEventData {
  results: ProviderResult[]
}
