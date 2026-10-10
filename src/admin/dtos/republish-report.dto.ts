import { IsMongoId, IsOptional } from 'class-validator'

export class RepublishReportDto {
  @IsOptional()
  @IsMongoId()
  sourceEventId?: string
}
