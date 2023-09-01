import { Type } from 'class-transformer'
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator'
import { Hashes } from '../interfaces/hash.interface'
import { ProviderOptionDto } from './provider-option.dto'

export class UpdateProviderDto {
  @IsString()
  @IsNotEmpty()
  id: string

  @IsString()
  @IsNotEmpty()
  description: string

  @ValidateNested({ each: true })
  @Type(() => ProviderOptionDto)
  options: ProviderOptionDto[]

  @ValidateNested({ each: true })
  hashes: Hashes
}
