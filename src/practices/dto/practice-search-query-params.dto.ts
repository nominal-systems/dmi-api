import { IsOptional, IsString } from 'class-validator'
import { Transform } from 'class-transformer'

export class PracticesQueryDto {
  @IsOptional()
  @IsString()
  integration_id?: string

  @IsOptional()
  @Transform(({ value }) => value.split(','))
  ids?: string[]

  @IsOptional()
  search?: string
}
