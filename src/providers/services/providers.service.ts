import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common'
import providersList from '../constants/provider-list.constant'
import { ProviderService } from '../../common/typings/provider-services.interface'
import { Provider } from '../../common/typings/provider.interface'
import { Breeds } from '../../common/typings/breeds.interface'
import { Sexes } from '../../common/typings/sexes.interface'
import { Species } from '../../common/typings/species.interface'
import { ClientProxy } from '@nestjs/microservices'
import { IntegrationsService } from '../../integrations/integrations.service'
import ieMessageBuilder from '../../common/utils/ieMessageBuilder'
import { ReferenceDataStatus } from '../../common/typings/reference-data-status.interface'

@Injectable()
export class ProvidersService {
  private readonly logger = new Logger(ProvidersService.name)

  constructor (
    private readonly integrationsService: IntegrationsService,
    @Inject('ACTIVEMQ') private readonly client: ClientProxy
  ) {}

  async findAll (): Promise<Provider[]> {
    return providersList
  }

  async findOneById (providerId: string): Promise<Provider> {
    const provider = providersList.find(provider => provider.id === providerId)

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
      providerConfiguration: { providerConfigurationOptions },
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
        providerConfiguration: providerConfigurationOptions
      }
    })

    return await this.client.send(messagePattern, message).toPromise()
  }

  async getDataStatus (
    providerId: string,
    integrationId: string
  ): Promise<ReferenceDataStatus> {
    const {
      providerConfiguration: { providerConfigurationOptions },
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
        providerConfiguration: providerConfigurationOptions
      }
    })

    return await this.client.send(messagePattern, message).toPromise()
  }

  async getBreeds (providerId: string, integrationId: string): Promise<Breeds> {
    const {
      providerConfiguration: { providerConfigurationOptions },
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
        providerConfiguration: providerConfigurationOptions
      }
    })

    return await this.client.send(messagePattern, message).toPromise()
  }

  async getSexes (
    providerId: string,
    integrationId: string
  ): Promise<Sexes> {
    const {
      providerConfiguration: { providerConfigurationOptions },
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
        providerConfiguration: providerConfigurationOptions
      }
    })

    return await this.client.send(messagePattern, message).toPromise()
  }

  async getSpecies (
    providerId: string,
    integrationId: string
  ): Promise<Species> {
    const {
      providerConfiguration: { providerConfigurationOptions },
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
        providerConfiguration: providerConfigurationOptions
      }
    })

    return await this.client.send(messagePattern, message).toPromise()
  }
}
