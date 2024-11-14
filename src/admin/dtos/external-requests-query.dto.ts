import { PaginationDto } from '../../common/dtos/pagination.dto'
import { IntersectionType } from '@nestjs/mapped-types'
import { DateRangeDto } from './date-range.dto'
import { Transform } from 'class-transformer'

export class ExternalRequestsQueryDto extends IntersectionType(DateRangeDto, PaginationDto) {
  @Transform(({ value }) => value.split(','))
  providers?: string[]

  @Transform(({ value }) => value.split(','))
  method?: string[]

  @Transform(({ value }) => value.split(','))
  status?: string[]
}
