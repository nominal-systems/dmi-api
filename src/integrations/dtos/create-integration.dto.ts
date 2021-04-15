import { IsNotEmpty } from 'class-validator'

export class CreateIntegrationDto {
  @IsNotEmpty()
  practiceId: string

  @IsNotEmpty()
  providerConfigurationId: string

  @IsNotEmpty()
  integrationOptions: any
}
