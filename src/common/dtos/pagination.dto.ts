import { IsOptional, IsPositive } from 'class-validator'

export class PaginationDto {
  @IsOptional()
  @IsPositive()
  limit: number

  @IsPositive()
  page: number
}
