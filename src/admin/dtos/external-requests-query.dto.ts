import { PaginationDto } from '../../common/dtos/pagination.dto'
import { IntersectionType } from '@nestjs/mapped-types'
import { DateRangeDto } from './date-range.dto'
import { Transform } from 'class-transformer'
import { IsOptional, IsString } from 'class-validator'

export class ExternalRequestsQueryDto extends IntersectionType(DateRangeDto, PaginationDto) {
  @Transform(({ value }) => value.split(','))
  providers?: string[]

  @Transform(({ value }) => value.split(','))
  method?: string[]

  @Transform(({ value }) => value.split(','))
  status?: string[]

  @Transform(({ value }) => value.split(','))
  integrationId?: string[]

  @Transform(({ value }) => value.split(','))
  practiceId?: string[]

  // An order the request concerns: an exact match on accessionIds. Blank means no filter.
  @IsOptional()
  @IsString()
  @Transform(({ value }) => {
    if (typeof value !== 'string') {
      return value
    }
    const trimmed = value.trim()
    return trimmed === '' ? undefined : trimmed
  })
  accessionId?: string
}
