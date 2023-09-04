import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common'
import { hash } from '../common/utils/crypto.utils'
import { ApiGuard } from '../common/guards/api.guard'
import { ReferenceDataList } from './interfaces/reference-data-list.interface'
import { ReferenceDataQueryParams } from '../providers/dtos/reference-data-queryparams.dto'
import { ProvidersService } from '../providers/services/providers.service'
import { RefsService } from './refs.service'
import { Ref } from './entities/ref.entity'
import { CreateRefsDTO } from './dtos/create-refs.dto'
import { UpdateRefsDTO } from './dtos/update-refs.dto'
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard'

@Controller('refs')
@UseGuards(ApiGuard)
export class RefController {
  constructor (
    private readonly providersService: ProvidersService,
    private readonly refsService: RefsService
  ) {
  }

  @Get('sexes')
  @UseGuards(ApiGuard)
  async getSexes (): Promise<ReferenceDataList> {
    const items = await this.refsService.getSexes()
    return {
      items: items,
      hash: hash(items)
    }
  }

  @Get('sexes/:providerId')
  @UseGuards(ApiGuard)
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
  @UseGuards(ApiGuard)
  async getSpecies (): Promise<ReferenceDataList> {
    const items = await this.refsService.getSpecies()
    return {
      items: items,
      hash: hash(items)
    }
  }

  @Get('species/:providerId')
  @UseGuards(ApiGuard)
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
  @UseGuards(ApiGuard)
  async getBreeds (): Promise<ReferenceDataList> {
    const items = await this.refsService.getBreeds()
    return {
      items: items,
      hash: hash(items)
    }
  }

  @Get('breeds/:providerId')
  @UseGuards(ApiGuard)
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

  @Post('create')
  @UseGuards(JwtAuthGuard)
  async createRef (
    @Body() createDto: CreateRefsDTO
  ): Promise<Ref> {
    return await this.refsService.createRefs(createDto)
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateRef (
    @Param('id') id: string,
    @Body() updateDto: UpdateRefsDTO
  ): Promise<Ref> {
    return await this.refsService.updateRefs(id, updateDto)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteRef (
    @Param('id') id: string
  ): Promise<void> {
    return await this.refsService.deleteRefs(id)
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getRef (
    @Param('id') id: string
  ): Promise<Ref> {
    return await this.refsService.findOneById(id)
  }

  @Get('/mapped')
  @UseGuards(JwtAuthGuard)
  async getMappedRefs (): Promise<Ref[]> {
    return await this.refsService.findProvidersMappedRefs()
  }
}
