import { IsOptional } from 'class-validator'
import { Transform } from 'class-transformer'
import { IntersectionType } from '@nestjs/mapped-types'
import { DateRangeDto } from './date-range.dto'
import { PaginationDto } from '../../common/dtos/pagination.dto'

export class EventsQueryDto extends IntersectionType(DateRangeDto, PaginationDto) {
  @IsOptional()
  @Transform(({ value }) => value.split(','))
  providers?: string[]

  @IsOptional()
  @Transform(({ value }) => value.split(','))
  integrations?: string[]

  @IsOptional()
  @Transform(({ value }) => value.split(','))
  types?: string[]
}
