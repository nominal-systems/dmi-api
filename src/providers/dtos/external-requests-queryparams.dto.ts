import { PaginationDto } from '../../common/dtos/pagination.dto'
import { IsOptional, IsString } from 'class-validator'

export class ExternalRequestsSearch extends PaginationDto {
  @IsOptional()
  @IsString()
  providers: string

  @IsOptional()
  status: string
}
