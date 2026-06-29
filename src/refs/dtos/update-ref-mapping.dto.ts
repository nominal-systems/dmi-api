import { Transform } from 'class-transformer'
import { IsOptional, IsString } from 'class-validator'

export class UpdateRefMappingDto {
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  providerRefId?: number | null

  @IsOptional()
  @IsString()
  providerId?: string
}
