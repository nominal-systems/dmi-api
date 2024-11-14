import { IntersectionType } from '@nestjs/mapped-types'
import { EventsQueryDto } from './events-query.dto'
import { GroupByDto } from '../../common/dtos/group-by.dto'
import { DateRangeDto } from './date-range.dto'

export class EventsStatsDto extends IntersectionType(EventsQueryDto, GroupByDto, DateRangeDto) {}
