import { Controller } from '@nestjs/common'
import { ReportsService } from './reports.service'

@Controller('reports')
export class ReportsController {
  constructor (private readonly reportsService: ReportsService) {
  }

  // TODO(gb): implement find by ID
}
