import { PaginationDto } from '../../common/dtos/pagination.dto'
import { IsOptional, IsString } from 'class-validator'

export class EventsSearch extends PaginationDto {
  @IsOptional()
  @IsString()
  integrations: string

  @IsOptional()
  @IsString()
  types: string

  // TODO(gb): use DateRangeDto instead
  @IsOptional()
  date: string
}
