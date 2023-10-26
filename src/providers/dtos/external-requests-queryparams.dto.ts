import { PaginationDto } from '../../common/dtos/pagination.dto'
import { IsOptional, IsString } from 'class-validator'

export class ExternalRequestsQueryparams extends PaginationDto {
  @IsOptional()
  @IsString()
  provider: string
}
