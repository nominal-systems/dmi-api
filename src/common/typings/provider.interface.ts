export interface ConfigurationOption {
  type: string
  name: string
  description: string
  required: boolean
}

export interface Provider {
  id: string
  description: string
  configurationUri: string
  configurationOptions: ConfigurationOption[]
  integrationOptions: ConfigurationOption[]
}
