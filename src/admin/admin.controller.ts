import {
  BadRequestException,
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
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
import { Repository } from 'typeorm'
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
import { Event, EventDocument } from '../events/entities/event.entity'
import { Ref } from '../refs/entities/ref.entity'
import { Provider } from '../providers/entities/provider.entity'
import { ProviderRef } from '../refs/entities/providerRef.entity'
import { ProviderRefService } from '../refs/providerRef.service'
import {
  ProviderExternalRequestDocument,
  ProviderExternalRequests
} from '../providers/entities/provider-external-requests.entity'
import { FilterQuery } from 'mongoose'
import { PaginationResult } from '../common/classes/pagination-result'
import { PaginationDto } from '../common/dtos/pagination.dto'
import { PAGINATION_PAGE_LIMIT } from '../common/constants/pagination.constant'
import { getStatusRanges } from './admin-utils'
import { IntegrationsSearch } from '../providers/dtos/integrations-search.dto'
import { Practice } from '../practices/entities/practice.entity'
import { TransactionLogsDto } from '../common/dtos/transaction-logs.dto'
import { OrdersService } from '../orders/orders.service'
import { TransactionLog } from './interfaces/transaction-log.interface'
import { IntegrationTestResponse } from '@nominal-systems/dmi-engine-common'
import { ExternalRequestsQueryDto } from './dtos/external-requests-query.dto'
import { ExternalRequestsStatsDto } from './dtos/external-requests-stats.dto'
import { EventsQueryDto } from './dtos/events-query.dto'
import { EventsStatsDto } from './dtos/events-stats.dto'
import { PracticesQueryDto } from '../practices/dto/practice-search-query-params.dto'
import { OrdersStatsDto } from './dtos/orders-stats.dto'

@Controller('admin')
export class AdminController {
  private readonly logger = new Logger(AdminController.name)

  constructor (
    private readonly organizationsService: OrganizationsService,
    private readonly providerConfigurationsService: ProviderConfigurationsService,
    private readonly eventsService: EventsService,
    private readonly eventSubscriptionsService: EventSubscriptionService,
    private readonly integrationsService: IntegrationsService,
    @InjectRepository(Integration) private readonly integrationsRepository: Repository<Integration>,
    @InjectRepository(Ref) private readonly refsRepository: Repository<Ref>,
    @InjectRepository(ProviderRef) private readonly providerRefsRepository: Repository<ProviderRef>,
    private readonly refsService: RefsService,
    private readonly providersService: ProvidersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly providerRefService: ProviderRefService,
    @InjectRepository(Practice) private readonly practicesRepository: Repository<Practice>,
    private readonly ordersService: OrdersService
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
    @Query() query: EventsQueryDto
  ): Promise<PaginationResult<Event>> {
    const options: FilterQuery<EventDocument> = {}
    if (query.providers !== undefined) {
      options.providerId = { $in: query.providers }
    }
    if (query.integrations !== undefined) {
      options.integrationId = { $in: query.integrations }
    }
    if (query.types !== undefined) {
      options.type = { $in: query.types }
    }
    if (query.startDate !== undefined) {
      options.createdAt = { $gte: new Date(query.startDate) }
    }
    if (query.endDate !== undefined) {
      options.createdAt = { ...options.createdAt, $lte: new Date(query.endDate) }
    }
    const { page, limit } = query

    const data = await this.eventsService.find(options, { page, limit })

    return {
      total: await this.eventsService.count(options),
      page,
      limit,
      data
    }
  }

  @Get('events/stats')
  @UseGuards(AdminGuard)
  async getEventsStats (
    @Query() query: EventsStatsDto
  ): Promise<any> {
    const options: FilterQuery<EventDocument> = {}
    if (query.startDate !== undefined) {
      options.createdAt = { $gte: new Date(query.startDate) }
    }
    if (query.endDate !== undefined) {
      options.createdAt = { ...options.createdAt, $lte: new Date(query.endDate) }
    }

    if (query.types !== undefined) {
      options.type = { $in: query.types }
    }

    let groupBy: string[] = []
    if (query.groupBy !== undefined) {
      groupBy = query.groupBy.split(',')
    }

    return await this.eventsService.stats(options, groupBy)
  }

  @Get('events/:id')
  @UseGuards(AdminGuard)
  async getEvent (
    @Param('id') eventId: string
  ): Promise<Event> {
    return await this.eventsService.findById(eventId)
  }

  @Get('integrations')
  @UseGuards(AdminGuard)
  async getIntegrations (
    @Query() params: IntegrationsSearch
  ): Promise<PaginationResult<Integration>> {
    const take = params.limit !== undefined ? params.limit : PAGINATION_PAGE_LIMIT
    const skip = (params.page - 1) * take

    const queryBuilder = this.integrationsRepository.createQueryBuilder('integration')
      .leftJoinAndSelect('integration.practice', 'practice')
      .leftJoinAndSelect('integration.providerConfiguration', 'providerConfiguration')
      .leftJoinAndSelect('practice.organization', 'organization')
      .orderBy('integration.status', 'ASC')
      .skip(skip).take(take)

    if (params.providers !== undefined) {
      queryBuilder.andWhere('providerConfiguration.providerId IN (:...providers)', { providers: params.providers.split(',') })
    }

    if (params.organizations !== undefined) {
      queryBuilder.andWhere('organization.id IN (:...organizations)', { organizations: params.organizations.split(',') })
    }

    if (params.statuses !== undefined) {
      queryBuilder.andWhere('integration.status IN (:...status)', { status: params.statuses.split(',') })
    }

    const [data, total] = await queryBuilder.getManyAndCount()

    return {
      total,
      page: params.page,
      limit: params.limit,
      data
    }
  }

  @Get('integrations/:id')
  @UseGuards(AdminGuard)
  async getIntegration (
    @Param('id') integrationId: string
  ): Promise<Integration> {
    return await this.integrationsService.findOne({
      id: integrationId,
      options: {
        relations: ['practice', 'practice.organization', 'providerConfiguration']
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
      res.status(201).send({ ok: 'Integration is already stopped' })
    } else {
      const response = await this.integrationsService.doStop(integration)
      if (response?.message === undefined) {
        res.status(201).send({ ok: 'Integration stopped' })
      } else {
        res.status(500).send({ error: response.message })
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
      res.status(201).send({ ok: 'Integration is already running' })
    } else {
      const response = await this.integrationsService.doStart(integrationId, integration.providerConfiguration, integration.integrationOptions)
      if (response?.message === undefined) {
        res.status(201).send({ ok: 'Integration started' })
      } else {
        res.status(400).send({ error: response.message })
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
      res.status(201).send({ ok: 'Integration restarted' })
    } else {
      res.status(400).send({ error: response.message })
    }
  }

  @Post('integrations/:id/test')
  @UseGuards(AdminGuard)
  async testIntegration (
    @Res() res: Response,
    @Param('id') integrationId: string
  ): Promise<void> {
    const integration = await this.integrationsService.findOne({
      id: integrationId,
      options: {
        relations: ['practice', 'providerConfiguration']
      }
    })

    const response: IntegrationTestResponse = await this.integrationsService.test(integration)

    if (response.success) {
      res.status(200).send({ ok: 'Authentication successful' })
    } else {
      res.status(400).send({ error: response.message })
    }

    res.status(response?.success ? 200 : 400).send(response)
  }

  @Get('refs/:type')
  @UseGuards(AdminGuard)
  async getRefs (
    @Param('type') type: 'sexes' | 'species' | 'breeds',
    @Query() params: PaginationDto & { search: string }
  ): Promise<PaginationResult<Ref>> {
    const take = params.limit !== undefined ? params.limit : PAGINATION_PAGE_LIMIT
    const skip = (params.page - 1) * take

    const queryBuilder = this.refsRepository.createQueryBuilder('ref')
      .leftJoinAndSelect('ref.providerRef', 'providerRef')
      .leftJoinAndSelect('ref.speciesEntity', 'species')
      .leftJoinAndSelect('providerRef.provider', 'provider')
      .where('ref.type = :type', { type })
      .orderBy('ref.name', 'ASC')
      .skip(skip).take(take)

    if (params.search !== undefined) {
      queryBuilder.andWhere('ref.name LIKE :search', { search: `%${params.search}%` })
    }

    const [data, total] = await queryBuilder.getManyAndCount()

    // TODO(gb): 'page' and 'limit' are returning as strings, should be numbers
    return {
      total,
      page: params.page,
      limit: params.limit,
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

  @Post('refs/:id/mapping')
  @UseGuards(AdminGuard)
  async updateRefMapping (
    @Param('id') refId: string,
    @Body() mapping: { providerRefId: string }
  ): Promise<any> {
    // Find Ref
    const ref = await this.refsService.findOneById(refId)
    if (ref === undefined) {
      throw new BadRequestException(`The Ref ${refId} doesn't exist`)
    }

    // Find ProviderRef
    const providerRef = await this.providerRefService.findOneById(mapping.providerRefId)
    if (providerRef === undefined) {
      throw new BadRequestException(`The ProviderRef ${mapping.providerRefId} doesn't exist`)
    }

    // Update mapping
    try {
      await this.refsService.setMapping(ref.id, providerRef.id)
      return { ok: true }
    } catch (error) {
      throw new BadRequestException(error.message)
    }
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

  @Get('providers/:providerId/integrations')
  @UseGuards(AdminGuard)
  async getProviderIntegrations (
    @Param('providerId') providerId: string
  ): Promise<Integration[]> {
    const queryBuilder = this.integrationsRepository.createQueryBuilder('integration')
      .leftJoinAndSelect('integration.providerConfiguration', 'providerConfiguration')
      .where('providerConfiguration.providerId = :providerId', { providerId })
      .andWhere('integration.deletedAt IS NULL')
      .andWhere('integration.status = :status', { status: IntegrationStatus.RUNNING })
      .orderBy('integration.createdAt', 'ASC')

    return await queryBuilder.getMany()
  }

  @Get('providers/:providerId/refs/:type')
  async getProviderRefs (
    @Param('providerId') providerId: string,
    @Param('type') type: 'species' | 'breed' | 'sex',
    @Query() params: PaginationDto & { search: string }
  ): Promise<PaginationResult<ProviderRef>> {
    const take = params.limit !== undefined ? params.limit : PAGINATION_PAGE_LIMIT
    const skip = (params.page - 1) * take

    const queryBuilder = this.providerRefsRepository.createQueryBuilder('providerRef')
      .leftJoinAndSelect('providerRef.provider', 'provider')
      .where('providerRef.type = :type', { type })
      .orderBy('providerRef.name', 'ASC')
      .andWhere('provider.id = :providerId', { providerId })

    if (params.search !== undefined) {
      queryBuilder.andWhere('providerRef.name LIKE :search', { search: `%${params.search}%` })
    }

    queryBuilder.skip(skip).take(take)

    const [data, total] = await queryBuilder.getManyAndCount()

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
  ): Promise<ProviderRef[]> {
    const codes = speciesCodes.split(',')
    return await this.providerRefService.findDefaultBreeds(providerId, codes)
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
    @Query() query: ExternalRequestsQueryDto
  ): Promise<PaginationResult<ProviderExternalRequests>> {
    // Build query options
    const options: FilterQuery<ProviderExternalRequestDocument> = {}
    if (query.providers !== undefined) {
      options.provider = { $in: query.providers }
    }
    if (query.status !== undefined) {
      options.$or = getStatusRanges(query.status)
        .map(status => ({
            status: { $gte: status[0], $lte: status[1] }
          })
        )
    }
    if (query.method !== undefined) {
      options.method = { $in: query.method }
    }

    if (query.startDate !== undefined) {
      options.createdAt = { $gte: new Date(query.startDate) }
    }
    if (query.endDate !== undefined) {
      options.createdAt = { ...options.createdAt, $lte: new Date(query.endDate) }
    }

    const { page, limit } = query
    const data = await this.providersService.findExternalRequests(options, { page, limit })
    return {
      total: await this.providersService.countExternalRequests(options),
      page,
      limit,
      data
    }
  }

  @Get('/external-requests/stats')
  @UseGuards(AdminGuard)
  async getExternalRequestsStats (
    @Query() query: ExternalRequestsStatsDto
  ): Promise<any> {
    const options: FilterQuery<ProviderExternalRequestDocument> = {}
    if (query.startDate !== undefined) {
      options.createdAt = { $gte: new Date(query.startDate) }
    }
    if (query.endDate !== undefined) {
      options.createdAt = { ...options.createdAt, $lte: new Date(query.endDate) }
    }
    options.status = {
      $gte: 400,
      $lte: 599
    }

    return await this.providersService.externalRequestsStats(options)
  }

  @Get('/external-requests/:id')
  @UseGuards(AdminGuard)
  async getExternalRequest (
    @Param('id') id: string
  ): Promise<ProviderExternalRequests> {
    return await this.providersService.findExternalRequestById(id)
  }

  @Get('/practices')
  @UseGuards(AdminGuard)
  async getPractices (
    @Query() query: PracticesQueryDto & PaginationDto
  ): Promise<PaginationResult<Practice>> {
    const take = query.limit !== undefined ? query.limit : PAGINATION_PAGE_LIMIT
    const skip = (query.page - 1) * take

    const queryBuilder = this.practicesRepository.createQueryBuilder('practice')
      .leftJoinAndSelect('practice.organization', 'organization')
      .leftJoinAndSelect('practice.integrations', 'integrations')
      .leftJoinAndSelect('integrations.providerConfiguration', 'providerConfiguration')
      .where('practice.deletedAt IS NULL')
      .andWhere('integrations.deletedAt IS NULL')
      .andWhere('integrations.status = :status', { status: IntegrationStatus.RUNNING })

    if (query.ids !== undefined) {
      queryBuilder.andWhere('practice.id IN (:...ids)', { ids: query.ids })
    }

    queryBuilder
      .orderBy('practice.createdAt', 'DESC')
      .skip(skip).take(take)

    const [data, total] = await queryBuilder.getManyAndCount()

    return {
      total,
      page: query.page,
      limit: query.limit,
      data
    }
  }

  @Get('transaction-logs')
  @UseGuards(AdminGuard)
  async getTransactionLogs (
    @Query() query: TransactionLogsDto
  ): Promise<TransactionLog[]> {
    const logs: TransactionLog[] = []
    if (query.accessionId === undefined) {
      throw new BadRequestException('Missing accessionId')
    }

    // Find order
    const order = await this.ordersService.findOneByExternalId(query.accessionId)
    if (order === undefined) {
      throw new NotFoundException(`Order with accessionId ${query.accessionId} not found`)
    }
    logs.push({
      timestamp: order.createdAt,
      type: 'order',
      id: order.id,
      data: order
    })

    // Events
    const events: Event[] = await this.eventsService.findAll({
      accessionId: query.accessionId
    })
    events.forEach((event) => {
      logs.push({
        timestamp: event.createdAt,
        type: 'event',
        id: (event as EventDocument)._id,
        data: event
      })
    })

    const externalRequests: ProviderExternalRequests[] = await this.providersService.findAllExternalRequests({
      accessionIds: query.accessionId
    })
    externalRequests.forEach((externalRequest) => {
      logs.push({
        timestamp: externalRequest.createdAt,
        type: 'external-request',
        id: (externalRequest as ProviderExternalRequestDocument)._id,
        data: externalRequest
      })
    })

    return logs.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
  }

  @Get('orders/stats')
  @UseGuards(AdminGuard)
  async getOrdersStats (
    @Query() query: OrdersStatsDto
  ): Promise<any> {
    if (query.startDate === undefined || query.endDate === undefined) {
      throw new BadRequestException('Missing startDate or endDate')
    }

    const startDate = new Date(query.startDate)
    const endDate = new Date(query.endDate)

    switch (query.stat) {
      case 'countByProvider':
        return await this.ordersService.countByProvider(startDate, endDate)
      default:
        throw new BadRequestException(`Unknown stat '${String(query.stat)}'`)
    }
  }
}
