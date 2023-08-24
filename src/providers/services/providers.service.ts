import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common'
import { ProviderService } from '../../common/typings/provider-services.interface'
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
  Sex,
  Species
} from '@nominal-systems/dmi-engine-common'
import { ProviderExternalRequestDocument, ProviderExternalRequests } from '../entities/provider-external-requests.entity'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { ProviderRawDataDto } from '../dtos/provider-raw-data.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Providers } from '../entities/providers.entity'
import { FindManyOptions, Repository } from 'typeorm'

@Injectable()
export class ProvidersService {
  private readonly logger = new Logger(ProvidersService.name)

  constructor (
    @InjectRepository(Providers)
    private readonly providersRepository: Repository<Providers>,
    private readonly integrationsService: IntegrationsService,
    @InjectModel(ProviderExternalRequests.name)
    private readonly providerExternalRequestsModel: Model<ProviderExternalRequestDocument>,
    @Inject('ACTIVEMQ') private readonly client: ClientProxy
  ) {
  }

  async findAll (options?: FindManyOptions<Providers>): Promise<Providers[]> {
    return await this.providersRepository.find(options)
  }

  async findOneById (providerId: string): Promise<Providers> {
    const provider = await this.providersRepository.findOne(providerId)

    if (provider == null) {
      throw new NotFoundException("The provider doesn't exist")
    }

    return provider
  }

  async getProviderServices (
    providerId: string,
    integrationId: string
  ): Promise<ProviderService[]> {
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
      resource: 'services',
      operation: 'list',
      data: {
        integrationOptions,
        providerConfiguration: configurationOptions
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

    return await this.client.send(messagePattern, message).toPromise()
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

  async saveProviderRawData (data: ProviderRawDataDto): Promise<void> {
    const { body, url, method, provider, status, payload } = data

    const rawData: ProviderExternalRequests = {
      createdAt: new Date(),
      provider,
      status,
      method,
      url,
      body
    }

    if (payload !== undefined) {
      rawData.payload = payload
    }

    await this.providerExternalRequestsModel.create(rawData)
  }

  async update (provider: any): Promise<void> {
    await this.providersRepository.update(
      { id: provider.id },
      { ...provider }
    )
  }
}
