import { IsNotEmpty } from 'class-validator'

export class CreateIntegrationDto {
  @IsNotEmpty()
  practiceSlug: string

  @IsNotEmpty()
  providerConfigurationId: string

  @IsNotEmpty()
  integrationOptions: any
}
