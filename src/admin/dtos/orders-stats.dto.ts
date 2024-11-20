import { DateRangeDto } from './date-range.dto'
import { IntersectionType } from '@nestjs/mapped-types'
import { IsString } from 'class-validator'

export class OrdersStatsDto extends IntersectionType(DateRangeDto) {
  @IsString()
  groupBy: 'provider'
}
