import { IsOptional, IsString } from 'class-validator'

export class PracticeSearchQueryParams {
  @IsOptional()
  @IsString()
  integration_id?: string
}
