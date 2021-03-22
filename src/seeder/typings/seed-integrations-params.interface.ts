import { Organization } from '../../organizations/entities/organization.entity'
import { Practice } from '../../practices/entities/practice.entity'
import { ProviderConfiguration } from '../../providers/entities/provider-configuration.entity'

export interface SeedIntegrationsParams {
  organizations: Organization[]
  practices: Practice[]
  providerConfigurations: ProviderConfiguration[]
}
