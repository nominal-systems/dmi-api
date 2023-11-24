import { IsNotEmpty, IsNumber, Min } from 'class-validator'
import { PaginationDto } from '../../common/dtos/pagination.dto'

export class GetEventsQueryParams extends PaginationDto {
  @IsNotEmpty({ message: 'The "start_seq" query parameter is required' })
  @IsNumber(
    {},
    {
      message: 'The "start_seq" query parameter must be a number'
    }
  )
  @Min(0, {
    message:
      'The "start_seq" query parameter must be greater than or equal to 0'
  })
  start_seq: number
}
