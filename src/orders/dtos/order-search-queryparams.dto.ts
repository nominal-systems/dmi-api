import { IsDateString, IsOptional, IsString } from 'class-validator'

export class OrderSearchQueryParams {
  @IsString()
  @IsOptional()
  status: string

  @IsString()
  @IsOptional()
  provider_id: string

  @IsDateString()
  @IsOptional()
  date_start: string

  @IsDateString()
  @IsOptional()
  date_end: string
}
