import { Controller, Get } from '@nestjs/common'
import { Breeds } from '../common/typings/breeds.interface'
import { Genders } from '../common/typings/gender.interface'
import { ReferenceDataStatus } from '../common/typings/reference-data-status.interface'
import { Species } from '../common/typings/species.interface'
import { RefsService } from './refs.service'

@Controller('refs')
export class RefsController {
  constructor (private readonly refsService: RefsService) {}

  @Get()
  async getDataStatus (): Promise<ReferenceDataStatus> {
    return await this.refsService.getDataStatus()
  }

  @Get('breeds')
  async getBreeds (): Promise<Breeds> {
    return await this.refsService.getBreeds()
  }

  @Get('genders')
  async getGenders (): Promise<Genders> {
    return await this.refsService.getGenders()
  }

  @Get('species')
  async getSpecies (): Promise<Species> {
    return await this.refsService.getSpecies()
  }
}
