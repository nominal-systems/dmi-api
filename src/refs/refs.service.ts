import { Injectable } from '@nestjs/common'
import { ReferenceDataStatus } from '../common/typings/reference-data-status.interface'

@Injectable()
export class RefsService {
  async getDataStatus (): Promise<ReferenceDataStatus> {
    return {
      genders:
        '3C9D81688CB8DCA51997239264F7073706A3B827649B1F0390FA2F771D5ACA38',
      species:
        '3C9D81688CB8DCA51997239264F7073706A3B827649B1F0390FA2F771D5ACA38',
      breeds: '3C9D81688CB8DCA51997239264F7073706A3B827649B1F0390FA2F771D5ACA38'
    }
  }
}
