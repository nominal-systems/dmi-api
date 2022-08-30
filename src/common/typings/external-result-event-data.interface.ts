import { ProviderResult } from '@nominal-systems/dmi-engine-common'

export interface ExternalResultEventData {
  integrationId: string
  results: ProviderResult[]
}
