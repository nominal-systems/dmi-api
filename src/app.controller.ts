import { Controller, Get } from '@nestjs/common'
import { API_VERSION } from './common/constants/api.constant'

@Controller()
export class AppController {
  @Get('/status')
  getStatus (): any {
    return { status: 'ok', version: API_VERSION, time: new Date() }
  }
}
