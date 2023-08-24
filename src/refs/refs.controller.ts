import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common'
import { hash } from '../common/utils/crypto.utils'
import { ApiGuard } from '../common/guards/api.guard'
import { ReferenceDataList } from './interfaces/reference-data-list.interface'
import { ReferenceDataQueryParams } from '../providers/dtos/reference-data-queryparams.dto'
import { ProvidersService } from '../providers/services/providers.service'
import { RefsService } from './refs.service'
import { Refs } from './entities/refs.entity'
import { CreateRefsDTO } from './dtos/create-refs.dto'
import { UpdateRefsDTO } from './dtos/update-refs.dto'

@Controller('refs')
@UseGuards(ApiGuard)
export class RefsController {
  constructor (
    private readonly providersService: ProvidersService,
    private readonly refsService: RefsService
  ) {
  }

  @Get('sexes')
  async getSexes (): Promise<ReferenceDataList> {
    const items = await this.refsService.getSexes()
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
    const items = await this.refsService.getSpecies()
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
    const items = await this.refsService.getBreeds()
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

  @Post('sync/:providerId')
  async sync (
    @Param('providerId') providerId: string,
    @Query() { integrationId }: ReferenceDataQueryParams
  ): Promise<void> {
    await this.refsService.syncSpecies(providerId, integrationId)
    await this.refsService.syncBreeds(providerId, integrationId)
    await this.refsService.syncSexes(providerId, integrationId)
  }

  @Post('create')
  async createRef (
    @Body() createDto: CreateRefsDTO
  ): Promise<Refs> {
    return await this.refsService.createRefs(createDto)
  }

  @Put(':id')
  async updateRef (
    @Param('id') id: string,
    @Body() updateDto: UpdateRefsDTO
  ): Promise<Refs> {
    return await this.refsService.updateRefs(id, updateDto)
  }

  @Delete(':id')
  async deleteRef (
    @Param('id') id: string
  ): Promise<void> {
    return await this.refsService.deleteRefs(id)
  }

  @Get(':id')
  async getRef (
    @Param('id') id: string
  ): Promise<Refs> {
    return await this.refsService.findOneById(id)
  }

  @Get('/mapped')
  async getMappedRefs (): Promise<Refs[]> {
    return await this.refsService.findProvidersMappedRefs()
  }
}
