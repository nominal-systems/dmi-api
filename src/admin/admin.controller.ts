import {
  BadRequestException,
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseBoolPipe,
  Patch,
  Post,
  Put,
  Query,
  Res,
  UnauthorizedException,
  UseGuards
} from '@nestjs/common'
import { Response } from 'express'
import { ProviderConfiguration } from '../providers/entities/provider-configuration.entity'
import { ProviderConfigurationsService } from '../providers/services/provider-configurations.service'
import { Integration } from '../integrations/entities/integration.entity'
import { IntegrationsService } from '../integrations/integrations.service'
import { EventSubscriptionService } from '../events/services/event-subscription.service'
import { EventSubscription } from '../events/entities/event-subscription.entity'
import { OrganizationsService } from '../organizations/services/organizations.service'
import { Organization } from '../organizations/entities/organization.entity'
import { IntegrationStatus } from '../integrations/constants/integration-status.enum'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, In, Repository } from 'typeorm'
import { CreateIntegrationDto } from '../integrations/dtos/create-integration.dto'
import { ReferenceDataQueryParams } from '../providers/dtos/reference-data-queryparams.dto'
import { RefsService } from '../refs/refs.service'
import { ProviderOptionDto } from '../providers/dtos/provider-option.dto'
import { ProvidersService } from '../providers/services/providers.service'
import { AdminUserCredentialsDto } from '../users/dtos/admin-user-credentials.dto'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { AdminGuard } from '../common/guards/admin.guard'
import { EventsService } from '../events/services/events.service'
import { Event } from '../events/entities/event.entity'
import { Ref } from '../refs/entities/ref.entity'
import { Provider } from '../providers/entities/provider.entity'
import { ProviderRef } from '../refs/entities/providerRef.entity'
import { ProviderRefService } from '../refs/providerRef.service'
import {
  ProviderExternalRequestDocument,
  ProviderExternalRequests
} from '../providers/entities/provider-external-requests.entity'
import { ExternalRequestsSearch } from '../providers/dtos/external-requests-queryparams.dto'
import { FilterQuery } from 'mongoose'
import { PaginationResult } from '../common/classes/pagination-result'
import { PaginationDto } from '../common/dtos/pagination.dto'
import { PAGINATION_PAGE_LIMIT } from '../common/constants/pagination.constant'
import { ProviderDefaultBreed } from '../refs/entities/providerDefaultBreed.entity'
import { getStatusRanges } from './admin-utils'

@Controller('admin')
export class AdminController {
  constructor (
    private readonly organizationsService: OrganizationsService,
    private readonly providerConfigurationsService: ProviderConfigurationsService,
    private readonly eventsService: EventsService,
    private readonly eventSubscriptionsService: EventSubscriptionService,
    private readonly integrationsService: IntegrationsService,
    @InjectRepository(Integration) private readonly integrationsRepository: Repository<Integration>,
    private readonly refsService: RefsService,
    private readonly providersService: ProvidersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly providerRefService: ProviderRefService
  ) {
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async authenticate (
    @Body() credentials: AdminUserCredentialsDto
  ): Promise<{ token: string }> {
    const adminCredentials = this.configService.get('admin')
    if (credentials.username === adminCredentials.username && credentials.password === adminCredentials.password) {
      const token = await this.jwtService.signAsync({}, { subject: 'admin' })
      return { token }
    }

    throw new UnauthorizedException('Username or password is incorrect')
  }

  @Get('organizations')
  @UseGuards(AdminGuard)
  async getOrganizations (): Promise<Organization[]> {
    return await this.organizationsService.findAll()
  }

  @Get('providerConfigurations')
  @UseGuards(AdminGuard)
  async getProviderConfigurations (): Promise<ProviderConfiguration[]> {
    return await this.providerConfigurationsService.findAll()
  }

  @Get('providerConfigurations/:id')
  @UseGuards(AdminGuard)
  async getProviderConfiguration (
    @Param('id') providerConfigurationId: string
  ): Promise<ProviderConfiguration> {
    return await this.providerConfigurationsService.findOne({
      id: providerConfigurationId,
      options: {
        relations: ['integrations']
      }
    })
  }

  @Put('providerConfigurations/:id')
  @UseGuards(AdminGuard)
  async updateProviderConfigurations (
    @Param('id') providerConfigurationId: string,
    @Body() updatedProviderConfiguration: any
  ): Promise<ProviderConfiguration> {
    const providerConfiguration = await this.providerConfigurationsService.findOne({
      id: providerConfigurationId,
      options: { relations: ['organization'] }
    })

    if (providerConfiguration == null) {
      throw new Error('Integration not found')
    }

    await this.providerConfigurationsService.update(
      providerConfiguration.organization,
      providerConfiguration.providerId,
      providerConfigurationId,
      updatedProviderConfiguration
    )

    return await this.providerConfigurationsService.findOne({ id: providerConfigurationId })
  }

  @Get('event-subscriptions')
  @UseGuards(AdminGuard)
  async getEventSubscriptions (): Promise<EventSubscription[]> {
    return await this.eventSubscriptionsService.findAll()
  }

  @Get('events')
  @UseGuards(AdminGuard)
  async getEvents (
    @Query() paginationDto: PaginationDto
  ): Promise<PaginationResult<Event>> {
    const query = {}
    const limit = paginationDto.limit !== undefined ? paginationDto.limit : PAGINATION_PAGE_LIMIT
    const skip = (paginationDto.page - 1) * limit
    const options = { sort: { seq: -1 }, skip, limit, lean: true }
    const total = await this.eventsService.count(query)
    const data = await this.eventsService.findAll(query, options)

    return {
      total,
      page: paginationDto.page,
      limit: Math.min(limit, total),
      data
    }
  }

  @Get('integrations')
  @UseGuards(AdminGuard)
  async getIntegrations (
    @Query('providerId') providerId?: string
  ): Promise<Integration[]> {
    let where = {}
    if (providerId !== undefined) {
      where = {
        providerConfiguration: {
          providerId: providerId
        }
      }
    }
    const options: FindManyOptions<Integration> = {
      relations: ['practice', 'practice.organization', 'providerConfiguration'],
      order: {
        status: 'ASC'
      },
      where
    }

    return await this.integrationsService.findAll(options)
  }

  @Get('integrations/:id')
  @UseGuards(AdminGuard)
  async getIntegration (
    @Param('id') integrationId: string
  ): Promise<Integration> {
    return await this.integrationsService.findOne({
      id: integrationId,
      options: {
        relations: ['practice', 'providerConfiguration']
      }
    })
  }

  @Delete('integrations/:id')
  @UseGuards(AdminGuard)
  async deleteIntegration (
    @Param('id') integrationId: string
  ): Promise<void> {
    const integration = await this.integrationsService.findOne({
      id: integrationId,
      options: {
        relations: ['practice', 'providerConfiguration']
      }
    })

    if (integration == null) {
      throw new Error('Integration not found')
    }

    await this.integrationsService.doDelete(integration)
  }

  @Patch('integrations/:id')
  @UseGuards(AdminGuard)
  async updateIntegration (
    @Param('id') integrationId: string,
    @Body() updateIntegration: Pick<CreateIntegrationDto, 'integrationOptions'>
  ): Promise<Integration> {
    const integration = await this.integrationsService.findOne({
      id: integrationId,
      options: {
        relations: ['practice', 'providerConfiguration']
      }
    })

    if (integration == null) {
      throw new Error('Integration not found')
    }

    await this.integrationsService.update(integrationId, updateIntegration)

    return await this.integrationsService.findById(integrationId)
  }

  @Post('integrations/:id/stop')
  @UseGuards(AdminGuard)
  async stopIntegration (
    @Res() res: Response,
    @Param('id') integrationId: string,
    @Query('force', new DefaultValuePipe(false), ParseBoolPipe) force: boolean
  ): Promise<void> {
    const queryBuilder = this.integrationsRepository.createQueryBuilder('integration')
      .leftJoinAndSelect('integration.practice', 'practice')
      .leftJoinAndSelect('integration.providerConfiguration', 'providerConfiguration')
      .where('integration.id = :id', { id: integrationId })

    if (force) {
      queryBuilder.withDeleted()
    }

    const integration = await queryBuilder.getOne()

    if (integration === undefined) {
      throw new NotFoundException('Integration not found')
    }

    if (integration.status === IntegrationStatus.STOPPED) {
      res.status(201).send('Integration is already stopped')
    } else {
      const response = await this.integrationsService.doStop(integration)
      if (response?.message === undefined) {
        res.status(201).send('Integration stopped')
      } else {
        res.status(400).send(response.message)
      }
    }
  }

  @Post('integrations/:id/start')
  @UseGuards(AdminGuard)
  async startIntegration (
    @Res() res: Response,
    @Param('id') integrationId: string
  ): Promise<void> {
    const integration = await this.integrationsService.findOne({
      id: integrationId,
      options: {
        relations: ['practice', 'providerConfiguration']
      }
    })

    if (integration.status === IntegrationStatus.RUNNING) {
      res.status(201).send('Integration is already running')
    } else {
      const response = await this.integrationsService.doStart(integrationId, integration.providerConfiguration, integration.integrationOptions)
      if (response?.message === undefined) {
        res.status(201).send('Integration started')
      } else {
        res.status(400).send(response.message)
      }
    }
  }

  @Post('integrations/:id/restart')
  @UseGuards(AdminGuard)
  async restartIntegration (
    @Res() res: Response,
    @Param('id') integrationId: string
  ): Promise<void> {
    const integration = await this.integrationsService.findOne({
      id: integrationId,
      options: {
        relations: ['practice', 'providerConfiguration']
      }
    })
    const response = await this.integrationsService.restart(integration)
    if (response?.message === undefined) {
      res.status(201).send('Integration restarted')
    } else {
      res.status(400).send(response.message)
    }
  }

  @Get('refs/:type')
  @UseGuards(AdminGuard)
  async getRefs (
    @Param('type') type: 'sexes' | 'species' | 'breeds',
    @Query() params: PaginationDto
  ): Promise<PaginationResult<Ref>> {
    const { page, limit } = params
    const data = await this.refsService.getRefs(type, { page, limit })

    return {
      total: await this.refsService.countRefs(type),
      page,
      limit,
      data
    }
  }

  @Post('refs/sync/:providerId')
  @UseGuards(AdminGuard)
  async sync (
    @Param('providerId') providerId: string,
    @Query() { integrationId }: ReferenceDataQueryParams
  ): Promise<void> {
    const provider = await this.providersService.findOneById(providerId)

    if (provider === undefined) {
      throw new BadRequestException(`The provider ${providerId} doesn't exist`)
    }
    try {
      await this.refsService.syncSpecies(provider, integrationId)
      await this.refsService.syncBreeds(provider, integrationId)
      await this.refsService.syncSexes(provider, integrationId)
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  @Post('refs/sync/:providerId/:type')
  @UseGuards(AdminGuard)
  async syncType (
    @Param('providerId') providerId: string,
    @Param('type') type: string,
    @Query() { integrationId }: ReferenceDataQueryParams
  ): Promise<any> {
    const provider = await this.providersService.findOneById(providerId)

    if (provider === undefined) {
      throw new BadRequestException(`The provider ${providerId} doesn't exist`)
    }
    try {
      switch (type) {
        case 'species':
          await this.refsService.syncSpecies(provider, integrationId)
          break
        case 'breeds':
          await this.refsService.syncBreeds(provider, integrationId)
          break
        case 'sexes':
          await this.refsService.syncSexes(provider, integrationId)
          break
        default:
          throw new BadRequestException('Invalid type')
      }
    } catch (error) {
      throw new BadRequestException(error.message)
    }

    return { status: 'OK' }
  }

  @Get('providers')
  @UseGuards(AdminGuard)
  async getProviders (): Promise<Provider[]> {
    return await this.providersService.findAll({
      relations: ['options']
    })
  }

  @Get('providers/:providerId')
  @UseGuards(AdminGuard)
  async getProvider (
    @Param('providerId') providerId: string
  ): Promise<Provider> {
    return await this.providersService.findOneById(providerId)
  }

  @Get('providers/:providerId/refs/:type')
  async getProviderRefs (
    @Param('providerId') providerId: string,
    @Param('type') type: string,
    @Query() params: PaginationDto
  ): Promise<PaginationResult<ProviderRef>> {
    const take = params.limit !== undefined ? params.limit : PAGINATION_PAGE_LIMIT
    const skip = (params.page - 1) * take
    const where = {
      type: type,
      provider: {
        id: providerId
      }
    }
    const relations = ['provider', 'ref']

    const data = await this.providerRefService.findAll({
      where,
      relations,
      skip,
      take
    })
    const total = await this.providerRefService.count({ where: where })
    return {
      total,
      page: params.page,
      limit: params.limit,
      data
    }
  }

  @Get('providers/:providerId/defaultBreed')
  @UseGuards(AdminGuard)
  async getDefaultBreeds (
    @Param('providerId') providerId: string,
    @Query('speciesCodes') speciesCodes: string
  ): Promise<ProviderDefaultBreed[]> {
    const codes = speciesCodes.split(',')
    return await this.refsService.findAllDefaultBreeds({
      where: {
        provider: providerId,
        species: In(codes)
      }
    })
  }

  @Put('providers/:providerId/defaultBreed')
  @UseGuards(AdminGuard)
  async setDefaultBreed (
    @Param('providerId') providerId: string,
    @Query('species') species: string,
    @Query('breed') breed: string
  ): Promise<any> {
    const provider = await this.providersService.findOneById(providerId)

    if (provider === undefined) {
      throw new BadRequestException(`The provider ${providerId} doesn't exist`)
    }
    try {
      await this.refsService.setDefaultBreed(providerId, species, breed)
    } catch (error) {
      throw new BadRequestException(error.message)
    }

    return { status: 'OK' }
  }

  @Post('providers/:providerId/options/create')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AdminGuard)
  async createProviderOptions (
    @Param('providerId') providerId: string,
    @Body() providerOptions: ProviderOptionDto[]
  ): Promise<void> {
    return await this.providersService.createProviderOptions(
      providerId,
      providerOptions
    )
  }

  @Delete('/providers/:providerId/options/:providerOptionId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AdminGuard)
  async deleteProviderOption (
    @Param('providerId') providerId: string,
    @Param('providerOptionId') providerOptionId: string
  ): Promise<void> {
    return await this.providersService.deleteProviderOption(
      providerId,
      providerOptionId
    )
  }

  @Get('/external-requests')
  @UseGuards(AdminGuard)
  async getExternalRequests (
    @Query() params: ExternalRequestsSearch
  ): Promise<PaginationResult<ProviderExternalRequests>> {

    const options: FilterQuery<ProviderExternalRequestDocument> = {}
    if (params.provider !== undefined) {
      options.provider = params.provider
    }
    if (params.status !== undefined) {
      const allowedStatuses = getStatusRanges(params.status.split(','))
      options.status = { $or: [] }
      console.log(`allowedStatuses= ${JSON.stringify(allowedStatuses, null, 2)}`) // TODO(gb): remove trace
    }

    const { page, limit } = params
    const data = await this.providersService.findExternalRequests(options, { page, limit })
    return {
      total: await this.providersService.countExternalRequests(options),
      page,
      limit,
      data
    }
  }

  @Get('/external-requests/:id')
  @UseGuards(AdminGuard)
  async getExternalRequest (
    @Param('id') id: string
  ): Promise<ProviderExternalRequests> {
    return await this.providersService.findExternalRequestById(id)
  }
}
