import { BadRequestException, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common'
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
import { PAGINATION_PAGE_LIMIT } from '../../common/constants/pagination.constant'
import { isNullOrEmpty } from '../../common/utils/shared.utils'

@Injectable()
export class ProvidersService {
  private readonly logger = new Logger(ProvidersService.name)

  constructor (
    @InjectRepository(Provider)
    private readonly providerRepository: Repository<Provider>,
    private readonly integrationsService: IntegrationsService,
    @InjectModel(ProviderExternalRequests.name) private readonly providerExternalRequestsModel: Model<ProviderExternalRequestDocument>,
    @Inject('ACTIVEMQ') private readonly client: ClientProxy,
    @InjectRepository(ProviderOption) private readonly providerOptionRepository: Repository<ProviderOption>
  ) {
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
    const provider = await this.providerRepository.findOne(providerId, { relations: ['options', 'labRequisitionParameters'] })
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
    const { body, url, method, provider, status, payload, headers } = data

    const rawData: ProviderExternalRequests = {
      createdAt: new Date(),
      provider,
      status,
      method,
      url,
      headers: nestKeys(headers),
      body: nestKeys(body) // Nest keys to ensure MongoDB safety
    }

    if (payload !== undefined) {
      rawData.payload = payload
    }

    await this.providerExternalRequestsModel.create(rawData)
  }

  async findExternalRequests (
    query: FilterQuery<ProviderExternalRequestDocument>,
    paginationDto: PaginationDto
  ): Promise<ProviderExternalRequests[]> {
    const limit = paginationDto.limit !== undefined ? paginationDto.limit : PAGINATION_PAGE_LIMIT
    const skip = (paginationDto.page - 1) * limit

    return await this.providerExternalRequestsModel.find(query, { __v: 0, body: 0, payload: 0 }, {
      limit: limit,
      skip: skip,
      sort: { createdAt: -1 },
      lean: true
    })
  }

  async findExternalRequestById (
    id: string
  ): Promise<ProviderExternalRequestDocument> {
    const doc = await this.providerExternalRequestsModel.findById(id, { __v: 0 }, { lean: true }).exec()
    if (doc === null) {
      throw new NotFoundException(`The external request ${id} doesn't exist`)
    } else {
      return doc
    }
  }

  async countExternalRequests (
    options: FilterQuery<ProviderExternalRequestDocument>
  ): Promise<number> {
    return await this.providerExternalRequestsModel.countDocuments(options)
  }

  async update (
    provider: UpdateProviderDto
  ): Promise<void> {
    await this.providerRepository.save(provider)
  }
}
