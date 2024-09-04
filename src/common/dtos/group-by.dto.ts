import { IsString } from 'class-validator'

export class GroupByDto {
  @IsString()
  groupBy: string
}
