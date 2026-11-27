import { IsOptional, IsPositive, Max } from 'class-validator'
import { Transform } from 'class-transformer'
import { IntersectionType } from '@nestjs/mapped-types'
import { DateRangeDto } from './date-range.dto'
import { PaginationDto } from '../../common/dtos/pagination.dto'
import { PAGINATION_PAGE_LIMIT } from '../../common/constants/pagination.constant'

export const MAX_EVENTS_PAGE_LIMIT = 100

export class EventsQueryDto extends IntersectionType(DateRangeDto, PaginationDto) {
  @IsOptional()
  @IsPositive()
  @Max(MAX_EVENTS_PAGE_LIMIT)
  @Transform(({ value }) => parseInt(value, 10))
  limit: number = PAGINATION_PAGE_LIMIT

  @IsOptional()
  @Transform(({ value }) => value.split(','))
  providers?: string[]

  @IsOptional()
  @Transform(({ value }) => value.split(','))
  integrations?: string[]

  @IsOptional()
  @Transform(({ value }) => value.split(','))
  types?: string[]

  @IsOptional()
  search?: string
}
