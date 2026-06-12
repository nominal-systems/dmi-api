import { DateRangeDto } from './date-range.dto'
import { Transform } from 'class-transformer'

export class ExternalRequestsStatsDto extends DateRangeDto {
  @Transform(({ value }) => value.split(','))
  integrationId?: string[]

  @Transform(({ value }) => value.split(','))
  practiceId?: string[]
}
