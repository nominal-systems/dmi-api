import { Type } from 'class-transformer'
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator'
import { Hashes } from '../interfaces/hash.interface'
import { ConfigurationOptionDto } from './configuration-option.dto'
import { IntegrationOptionDto } from './integration-option.dto'

export class UpdateProvider {
  @IsString()
  @IsNotEmpty()
  id: string

  @IsString()
  @IsNotEmpty()
  description: string

  @ValidateNested({ each: true })
  @Type(() => ConfigurationOptionDto)
  configurationOptions: ConfigurationOptionDto[]

  @ValidateNested({ each: true })
  @Type(() => IntegrationOptionDto)
  integrationOptions: IntegrationOptionDto[]

  @ValidateNested({ each: true })
  hashes: Hashes
}
