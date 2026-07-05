import { BadRequestException, Inject, Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { IntegrationsService } from '../../integrations/integrations.service'
import ieMessageBuilder from '../../common/utils/ieMessageBuilder'
import { ReferenceDataStatus } from '../../common/typings/reference-data-status.interface'
import {
  Breed,
  Device,
  Operation,
  ReferenceDataResponse,
  Resource,
  Service,
  Sex,
  Species
} from '@nominal-systems/dmi-engine-common'
import {
  ProviderExternalRequestDocument,
  ProviderExternalRequests
} from '../entities/provider-external-requests.entity'
import {
  buildExternalRequestPartitionKey,
  EXTERNAL_REQUESTS_V3_COLLECTION,
  EXTERNAL_REQUESTS_V3_SHARD_KEY,
  ProviderExternalRequestsV3,
  ProviderExternalRequestV3Document
} from '../entities/provider-external-requests-v3.entity'
import { FilterQuery, Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { ProviderRawDataDto } from '../dtos/provider-raw-data.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Provider } from '../entities/provider.entity'
import { FindManyOptions, Repository } from 'typeorm'
import { UpdateProviderDto } from '../dtos/update-provider.dto'
import { ProviderOption } from '../entities/provider-option.entity'
import { ProviderOptionDto } from '../dtos/provider-option.dto'
import { nestKeys } from '../../common/utils/nest-keys'
import { PaginationDto } from '../../common/dtos/pagination.dto'
import { isNullOrEmpty, stringifyId } from '../../common/utils/shared.utils'

// Matches the TTL on external_requests_v2 (ttl_ts_30d). Cosmos evaluates it
// against the internal `_ts` (last-modified) timestamp.
const EXTERNAL_REQUESTS_TTL_SECONDS = Number(process.env.EXTERNAL_REQUESTS_TTL_SECONDS ?? 2592000)

@Injectable()
export class ProvidersService implements OnModuleInit {
  private readonly logger = new Logger(ProvidersService.name)
  private readonly practiceIdCache = new Map<string, string>()

  constructor (
    @InjectRepository(Provider)
    private readonly providerRepository: Repository<Provider>,
    private readonly integrationsService: IntegrationsService,
    @InjectModel(ProviderExternalRequests.name) private readonly providerExternalRequestsModel: Model<ProviderExternalRequestDocument>,
    @InjectModel(ProviderExternalRequestsV3.name) private readonly providerExternalRequestsV3Model: Model<ProviderExternalRequestV3Document>,
    @Inject('ACTIVEMQ') private readonly client: ClientProxy,
    @InjectRepository(ProviderOption) private readonly providerOptionRepository: Repository<ProviderOption>
  ) {
  }

  async onModuleInit (): Promise<void> {
    await this.ensureExternalRequestsV3Collection()
  }

  // Cosmos creates unsharded collections implicitly on first write; an
  // unsharded external_requests_v3 would put every document in a single
  // 30 GB-capped partition, silently reintroducing the 1014 storms. Creating
  // it here with an explicit shard key makes that impossible. Idempotent, and
  // a no-op (with a warning) on non-Cosmos MongoDB.
  private async ensureExternalRequestsV3Collection (): Promise<void> {
    const db = this.providerExternalRequestsV3Model.db.db
    try {
      await db.command({
        customAction: 'CreateCollection',
        collection: EXTERNAL_REQUESTS_V3_COLLECTION,
        shardKey: EXTERNAL_REQUESTS_V3_SHARD_KEY
      })
      this.logger.log(`Created sharded collection ${EXTERNAL_REQUESTS_V3_COLLECTION} (shard key: ${EXTERNAL_REQUESTS_V3_SHARD_KEY})`)
    } catch (error) {
      const message: string = error?.message ?? String(error)
      if (message.includes('already exists')) {
        // expected on every boot after the first
      } else {
        this.logger.warn(`Could not ensure sharded collection ${EXTERNAL_REQUESTS_V3_COLLECTION} (non-Cosmos MongoDB?): ${message}`)
      }
    }
    try {
      await db.collection(EXTERNAL_REQUESTS_V3_COLLECTION).createIndex(
        { _ts: 1 },
        { expireAfterSeconds: EXTERNAL_REQUESTS_TTL_SECONDS, name: 'ttl_ts_30d' }
      )
    } catch (error) {
      this.logger.warn(`Could not ensure TTL index on ${EXTERNAL_REQUESTS_V3_COLLECTION}: ${error?.message ?? String(error)}`)
    }
  }

  async findAll (
    options?: FindManyOptions<Provider>
  ): Promise<Provider[]> {
    const providers = await this.providerRepository.find(options)
    for (const provider of providers) {
      provider.integrationOptions = provider.options.filter((option) => option.providerOptionType === 'integration')
      provider.configurationOptions = provider.options.filter((option) => option.providerOptionType === 'configuration')
    }

    return providers
  }

  async findOneById (
    providerId: string
  ): Promise<Provider> {
    const provider = await this.providerRepository.findOne({
      where: { id: providerId },
      relations: ['options', 'labRequisitionParameters']
    })
    if (provider == null) {
      throw new NotFoundException('The provider doesn\'t exist')
    }
    provider.integrationOptions = provider.options.filter((option) => option.providerOptionType === 'integration')
    provider.configurationOptions = provider.options.filter((option) => option.providerOptionType === 'configuration')
    return provider
  }

  async getProviderServices (
    providerId: string,
    integrationId: string
  ): Promise<Service[]> {
    const {
      providerConfiguration: { configurationOptions },
      integrationOptions
    } = await this.integrationsService.findOne({
      id: integrationId,
      options: {
        relations: ['providerConfiguration']
      }
    })

    const { labRequisitionParameters } = await this.findOneById(providerId)

    const { message, messagePattern } = ieMessageBuilder(providerId, {
      resource: Resource.Services,
      operation: Operation.List,
      data: {
        integrationId,
        integrationOptions,
        providerConfiguration: configurationOptions,
        payload: labRequisitionParameters
      }
    })

    return await this.client.send(messagePattern, message).toPromise()
  }

  async getProviderServiceByCode (
    providerId: string,
    integrationId: string,
    code: string
  ): Promise<Service[]> {
    const {
      providerConfiguration: { configurationOptions },
      integrationOptions
    } = await this.integrationsService.findOne({
      id: integrationId,
      options: {
        relations: ['providerConfiguration']
      }
    })

    const { labRequisitionParameters } = await this.findOneById(providerId)

    const { message, messagePattern } = ieMessageBuilder(providerId, {
      resource: Resource.Services,
      operation: Operation.Get,
      data: {
        integrationId,
        integrationOptions,
        providerConfiguration: configurationOptions,
        payload: { labRequisitionParameters, code }
      }
    })
    return await this.client.send(messagePattern, message).toPromise()
  }

  async getDevices (
    providerId: string,
    integrationId: string
  ): Promise<Device[]> {
    const {
      providerConfiguration: { configurationOptions },
      integrationOptions
    } = await this.integrationsService.findOne({
      id: integrationId,
      options: {
        relations: ['providerConfiguration']
      }
    })

    const { message, messagePattern } = ieMessageBuilder(providerId, {
      resource: Resource.Devices,
      operation: Operation.List,
      data: {
        integrationId,
        integrationOptions,
        providerConfiguration: configurationOptions
      }
    })

    try {
      return await this.client.send(messagePattern, message).toPromise()
    } catch (error) {
      this.logger.error(error)
      throw new NotFoundException(error)
    }
  }

  async getDataStatus (
    providerId: string,
    integrationId: string
  ): Promise<ReferenceDataStatus> {
    const {
      providerConfiguration: { configurationOptions },
      integrationOptions
    } = await this.integrationsService.findOne({
      id: integrationId,
      options: {
        relations: ['providerConfiguration']
      }
    })

    const { message, messagePattern } = ieMessageBuilder(providerId, {
      resource: 'refs',
      operation: 'version',
      data: {
        integrationId,
        integrationOptions,
        providerConfiguration: configurationOptions
      }
    })

    return await this.client.send(messagePattern, message).toPromise()
  }

  async getBreeds (
    providerId: string,
    integrationId: string
  ): Promise<ReferenceDataResponse<Breed>> {
    const {
      providerConfiguration: { configurationOptions },
      integrationOptions
    } = await this.integrationsService.findOne({
      id: integrationId,
      options: {
        relations: ['providerConfiguration']
      }
    })

    const { message, messagePattern } = ieMessageBuilder(providerId, {
      resource: 'breeds',
      operation: 'list',
      data: {
        integrationId,
        integrationOptions,
        providerConfiguration: configurationOptions
      }
    })

    return await this.client.send(messagePattern, message).toPromise()
  }

  async getSexes (
    providerId: string,
    integrationId: string
  ): Promise<ReferenceDataResponse<Sex>> {
    const {
      providerConfiguration: { configurationOptions },
      integrationOptions
    } = await this.integrationsService.findOne({
      id: integrationId,
      options: {
        relations: ['providerConfiguration']
      }
    })

    const { message, messagePattern } = ieMessageBuilder(providerId, {
      resource: 'sexes',
      operation: 'list',
      data: {
        integrationId,
        integrationOptions,
        providerConfiguration: configurationOptions
      }
    })

    return await this.client.send(messagePattern, message).toPromise()
  }

  async getSpecies (
    providerId: string,
    integrationId: string
  ): Promise<ReferenceDataResponse<Species>> {
    const {
      providerConfiguration: { configurationOptions },
      integrationOptions
    } = await this.integrationsService.findOne({
      id: integrationId,
      options: {
        relations: ['providerConfiguration']
      }
    })

    const { message, messagePattern } = ieMessageBuilder(providerId, {
      resource: 'species',
      operation: 'list',
      data: {
        integrationId,
        integrationOptions,
        providerConfiguration: configurationOptions
      }
    })

    return await this.client.send(messagePattern, message).toPromise()
  }

  async checkLabRequisitionParameters (
    providerId: string,
    labRequisitionInfo: any
  ): Promise<void> {
    const provider: Provider = await this.findOneById(providerId)
    const { labRequisitionParameters } = provider
    const missingParameters: string[] = []
    const invalidParameters: string[] = []
    const unknownParameters: string[] = []
    for (const parameter of labRequisitionParameters) {
      if (parameter.required && labRequisitionInfo[parameter.name] === undefined) {
        missingParameters.push(parameter.name)
      }
      if (parameter.required && isNullOrEmpty(labRequisitionInfo[parameter.name])) {
        invalidParameters.push(parameter.name)
      }
    }
    for (const key in labRequisitionInfo) {
      if (!labRequisitionParameters.some(parameter => parameter.name === key)) {
        unknownParameters.push(key)
      }
    }
    if (missingParameters.length > 0 || unknownParameters.length > 0 || invalidParameters.length > 0) {
      let errorMessage = ''
      if (missingParameters.length > 0) {
        errorMessage += `The following lab requisition parameters are missing: ${missingParameters.join(', ')}.`
      }
      if (invalidParameters.length > 0) {
        errorMessage += `The following lab requisition parameters are required and can't be null or empty: ${invalidParameters.join(', ')}.`
      }
      if (unknownParameters.length > 0) {
        errorMessage += `The following unknown lab requisition parameters were found: ${unknownParameters.join(', ')}.`
      }
      throw new BadRequestException(errorMessage)
    }
  }

  async createProviderOptions (
    providerId: string,
    providerOptions: ProviderOptionDto[]
  ): Promise<void> {
    const provider = await this.findOneById(providerId)
    if (provider === undefined) {
      throw new BadRequestException(`The provider ${providerId} doesn't exist`)
    }
    for (const providerOption of providerOptions) {
      const existingOption = provider.options.find((option) => option.name === providerOption.name)
      if (existingOption !== undefined) {
        throw new BadRequestException(`The option ${existingOption.name} already exists`)
      }
      const option = this.providerOptionRepository.create({
        ...providerOption,
        provider
      })
      await this.providerOptionRepository.save(option)
    }
  }

  async deleteProviderOption (
    providerId: string,
    providerOptionId: string
  ): Promise<void> {
    const provider = await this.findOneById(providerId)
    if (provider === undefined) {
      throw new BadRequestException(`The provider ${providerId} doesn't exist`)
    }
    const providerOption = provider.options.find((option) => option.id === Number(providerOptionId))
    if (providerOption === undefined) {
      throw new BadRequestException(`The option ${providerOptionId} doesn't exist`)
    }
    await this.providerOptionRepository.delete(providerOptionId)
  }

  async saveProviderRawData (
    data: ProviderRawDataDto
  ): Promise<void> {
    const { body, url, method, provider, status, payload, headers, integrationId } = data

    let accessionIds
    if (data.accessionIds !== undefined) {
      accessionIds = [...new Set(data.accessionIds)]
    }

    const createdAt = new Date()
    const rawData: ProviderExternalRequestsV3 = {
      createdAt,
      provider,
      accessionIds,
      status,
      method,
      url,
      headers: nestKeys(headers),
      body: nestKeys(body), // Nest keys to ensure MongoDB safety
      partitionKey: buildExternalRequestPartitionKey(provider, undefined, createdAt)
    }

    if (integrationId !== undefined) {
      rawData.integrationId = integrationId
      const practiceId = await this.resolvePracticeId(integrationId)
      if (practiceId !== undefined) {
        rawData.practiceId = practiceId
      }
      rawData.partitionKey = buildExternalRequestPartitionKey(provider, practiceId ?? integrationId, createdAt)
    }

    if (payload !== undefined) {
      rawData.payload = payload
    }

    this.providerExternalRequestsV3Model.create(rawData, (error) => {
      if (error != null && error.name === 'MongoError') {
        this.logger.error(error.message)
        this.logger.warn(`Could not save external request (${method} ${url}) to the database, saving without the body`)

        // TODO(gb): implement a better fallback strategy than just removing the body
        delete rawData.body
        this.providerExternalRequestsV3Model.create(rawData, (error) => {
          if (error != null && error.name === 'MongoError') {
            this.logger.error(error.message)
            this.logger.warn('Could not save external request (without the body) to database')
          }
        })
      }
    })
  }

  // The integration → practice relationship is immutable, so resolved pairs
  // are cached for the lifetime of the process.
  private async resolvePracticeId (integrationId: string): Promise<string | undefined> {
    const cached = this.practiceIdCache.get(integrationId)
    if (cached !== undefined) {
      return cached
    }

    try {
      const integration = await this.integrationsService.findOne({
        id: integrationId,
        options: { withDeleted: true }
      })
      this.practiceIdCache.set(integrationId, integration.practiceId)
      return integration.practiceId
    } catch (error) {
      this.logger.warn(`Could not resolve practice for integration ${integrationId}`)
      return undefined
    }
  }

  // external_requests_v2 is being drained by its 30-day TTL after the move to
  // the practice-level-sharded external_requests_v3; reads merge both
  // collections until v2 is empty and the v2 model can be removed.
  async findAllExternalRequests (
    query: FilterQuery<ProviderExternalRequestDocument>
  ): Promise<ProviderExternalRequests[]> {
    const [v3Docs, v2Docs] = await Promise.all([
      this.providerExternalRequestsV3Model.find(query, { __v: 0 }, { lean: true }),
      this.providerExternalRequestsModel.find(query, { __v: 0 }, { lean: true })
    ])
    return [...v3Docs, ...v2Docs].map(stringifyId)
  }

  async findExternalRequests (
    query: FilterQuery<ProviderExternalRequestDocument>,
    paginationDto: PaginationDto
  ): Promise<ProviderExternalRequests[]> {
    const { page, limit } = paginationDto
    // Each collection is over-fetched up to the requested page's end, then the
    // merged result is re-sorted and sliced, so pagination stays globally
    // correct while both collections hold data.
    const fetchUpToPageEnd = async (model: Model<any>): Promise<any[]> =>
      await model.find(query, { __v: 0, body: 0, payload: 0 }, {
        limit: page * limit,
        sort: { createdAt: -1 },
        lean: true
      })
    const [v3Docs, v2Docs] = await Promise.all([
      fetchUpToPageEnd(this.providerExternalRequestsV3Model),
      fetchUpToPageEnd(this.providerExternalRequestsModel)
    ])
    const merged = [...v3Docs, ...v2Docs].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    const skip = (page - 1) * limit
    return merged.slice(skip, skip + limit).map(stringifyId)
  }

  async findExternalRequestById (
    id: string
  ): Promise<ProviderExternalRequestDocument> {
    const doc = await this.providerExternalRequestsV3Model.findById(id, { __v: 0 }, { lean: true }).exec() ??
      await this.providerExternalRequestsModel.findById(id, { __v: 0 }, { lean: true }).exec()
    if (doc === null) {
      throw new NotFoundException(`The external request ${id} doesn't exist`)
    } else {
      return stringifyId(doc)
    }
  }

  async countExternalRequests (
    options: FilterQuery<ProviderExternalRequestDocument>
  ): Promise<number> {
    const [v3Count, v2Count] = await Promise.all([
      this.providerExternalRequestsV3Model.countDocuments(options),
      this.providerExternalRequestsModel.countDocuments(options)
    ])
    return v3Count + v2Count
  }

  async update (
    provider: UpdateProviderDto
  ): Promise<void> {
    await this.providerRepository.save(provider)
  }

  async externalRequestsStats (
    query: FilterQuery<ProviderExternalRequestDocument>
  ): Promise<any> {
    const pipeline = [
      {
        $match: query
      },
      {
        $group: {
          _id: {
            provider: '$provider',
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
            day: { $dayOfMonth: '$createdAt' },
            hour: { $hour: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          provider: '$_id.provider',
          month: '$_id.month',
          year: '$_id.year',
          day: '$_id.day',
          hour: '$_id.hour',
          count: 1
        }
      }
    ]
    const [v3Stats, v2Stats] = await Promise.all([
      this.providerExternalRequestsV3Model.aggregate(pipeline),
      this.providerExternalRequestsModel.aggregate(pipeline)
    ])
    const byBucket = new Map<string, any>()
    for (const row of [...v3Stats, ...v2Stats]) {
      const key = `${String(row.provider)}:${String(row.year)}-${String(row.month)}-${String(row.day)}T${String(row.hour)}`
      const existing = byBucket.get(key)
      if (existing === undefined) {
        byBucket.set(key, { ...row })
      } else {
        existing.count += row.count
      }
    }
    return Array.from(byBucket.values())
  }
}
