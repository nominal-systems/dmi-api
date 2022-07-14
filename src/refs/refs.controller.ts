import { Controller, Get, UseGuards } from '@nestjs/common'
import SEXES from './constants/sex-list.constant'
import SPECIES from './constants/species-list.constant'
import BREEDS from './constants/breed-list.constant'
import { hash } from '../common/utils/crypto.utils'
import { ApiGuard } from '../common/guards/api.guard'
import { ReferenceDataList } from './interfaces/reference-data-list.interface'

@Controller('refs')
@UseGuards(ApiGuard)
export class RefsController {
  @Get('sexes')
  async getSexes (): Promise<ReferenceDataList> {
    const items = SEXES
    return {
      items: items,
      hash: hash(items)
    }
  }

  @Get('species')
  async getSpecies (): Promise<ReferenceDataList> {
    const items = SPECIES
    return {
      items: items,
      hash: hash(items)
    }
  }

  @Get('breeds')
  async getBreeds (): Promise<ReferenceDataList> {
    const items = BREEDS
    return {
      items: items,
      hash: hash(items)
    }
  }
}
