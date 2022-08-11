import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Report } from './entities/report.entity'

@Injectable()
export class ReportsService {
  private readonly logger = new Logger(ReportsService.name)

  constructor (
    @InjectRepository(Report)
    private readonly reportsRepository: Repository<Report>
  ) {
  }
}
