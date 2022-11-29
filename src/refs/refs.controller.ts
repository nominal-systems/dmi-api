import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common'
import SEXES from './constants/sex-list.constant'
import SPECIES from './constants/species-list.constant'
import BREEDS from './constants/breed-list.constant'
import { hash } from '../common/utils/crypto.utils'
import { ApiGuard } from '../common/guards/api.guard'
import { ReferenceDataList } from './interfaces/reference-data-list.interface'
import { ReferenceDataQueryParams } from '../providers/dtos/reference-data-queryparams.dto'
import { ProvidersService } from '../providers/services/providers.service'

@Controller('refs')
@UseGuards(ApiGuard)
export class RefsController {
  constructor (
    private readonly providersService: ProvidersService
  ) {
  }

  @Get('sexes')
  async getSexes (): Promise<ReferenceDataList> {
    const items = SEXES
    return {
      items: items,
      hash: hash(items)
    }
  }

  @Get('sexes/:providerId')
  async getProviderSexes (
    @Param('providerId') providerId: string,
    @Query() { integrationId }: ReferenceDataQueryParams
  ): Promise<ReferenceDataList> {
    const response = await this.providersService.getSexes(providerId, integrationId)
    return {
      items: response.items,
      hash: response.hash
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

  @Get('species/:providerId')
  async getProviderSpecies (
    @Param('providerId') providerId: string,
    @Query() { integrationId }: ReferenceDataQueryParams
  ): Promise<ReferenceDataList> {
    const response = await this.providersService.getSpecies(providerId, integrationId)
    return {
      items: response.items,
      hash: response.hash
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

  @Get('breeds/:providerId')
  async getProviderBreeds (
    @Param('providerId') providerId: string,
    @Query() { integrationId }: ReferenceDataQueryParams
  ): Promise<ReferenceDataList> {
    const response = await this.providersService.getBreeds(providerId, integrationId)
    return {
      items: response.items,
      hash: response.hash
    }
  }
}
