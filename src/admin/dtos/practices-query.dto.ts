import { IntersectionType } from '@nestjs/mapped-types'
import { PaginationDto } from '../../common/dtos/pagination.dto'
import { PracticesQueryDto } from '../../practices/dto/practice-search-query-params.dto'

export class AdminPracticesQueryDto extends IntersectionType(
  PracticesQueryDto,
  PaginationDto,
) {}
