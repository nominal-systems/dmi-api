import { IsNumber, IsOptional } from 'class-validator'

export class ExternalRequestsQueryparams {
  @IsOptional()
  @IsNumber()
  page?: number
}
