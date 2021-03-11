export interface ProviderOption {
  type: string
  name: string
  description: string
  required: boolean
}

export interface Provider {
  id: string
  description: string
  providerConfigurationUri: string
  providerConfigurationOptions: ProviderOption[]
  integrationOptions: ProviderOption[]
}
