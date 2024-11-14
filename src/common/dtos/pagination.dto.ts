import { IsOptional, IsPositive } from 'class-validator'
import { PAGINATION_PAGE_LIMIT } from '../constants/pagination.constant'
import { Transform } from 'class-transformer'

export class PaginationDto {
  @IsOptional()
  @IsPositive()
  @Transform(({ value }) => parseInt(value, 10))
  limit: number = PAGINATION_PAGE_LIMIT

  @IsOptional()
  @IsPositive()
  @Transform(({ value }) => parseInt(value, 10))
  page = 1
}
