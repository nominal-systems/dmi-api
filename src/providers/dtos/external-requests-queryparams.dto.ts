import { PaginationDto } from '../../common/dtos/pagination.dto'
import { IsOptional, IsString } from 'class-validator'

export class ExternalRequestsSearch extends PaginationDto {
  @IsOptional()
  @IsString()
  provider: string

  @IsOptional()
  status: string
}
