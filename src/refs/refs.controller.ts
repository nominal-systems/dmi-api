import { Controller, Get } from '@nestjs/common'
import { ReferenceDataStatus } from '../common/typings/reference-data-status.interface'
import { RefsService } from './refs.service'

@Controller('refs')
export class RefsController {
  constructor (private readonly refsService: RefsService) {}

  @Get()
  async getDataStatus (): Promise<ReferenceDataStatus> {
    return await this.refsService.getDataStatus()
  }
}
