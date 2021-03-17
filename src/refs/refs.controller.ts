import { Controller, Get } from '@nestjs/common'
import { RefsService } from './refs.service'

@Controller('refs')
export class RefsController {
  constructor (private readonly refsService: RefsService) {}

  @Get()
  async getDataStatus () {
    return await this.refsService.getDataStatus()
  }

  @Get('breeds')
  async getBreeds () {
    return await this.refsService.getBreeds()
  }

  @Get('genders')
  async getGenders () {
    return await this.refsService.getGenders()
  }

  @Get('species')
  async getSpecies () {
    return await this.refsService.getSpecies()
  }
}
