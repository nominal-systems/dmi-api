import { PaginationDto } from '../../common/dtos/pagination.dto'
import { IsOptional, IsString } from 'class-validator'

export class IntegrationsSearch extends PaginationDto {
  @IsOptional()
  @IsString()
  organizations: string

  @IsOptional()
  @IsString()
  providers: string

  @IsOptional()
  @IsString()
  statuses: string
}