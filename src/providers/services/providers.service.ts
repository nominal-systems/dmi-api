import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common'
import providersList from '../constants/provider-list.constant'
import { ProviderService } from '../../common/typings/provider-services.interface'
import { Provider } from '../../common/typings/provider.interface'
import { Breeds } from '../../common/typings/breeds.interface'
import { Genders } from '../../common/typings/gender.interface'
import { Species } from '../../common/typings/species.interface'
import { ClientProxy } from '@nestjs/microservices'
import { IntegrationsService } from '../../integrations/integrations.service'
import ieMessageBuilder from '../../common/utils/ieMessageBuilder'
import { ReferenceDataStatus } from '../../common/typings/reference-data-status.interface'
import { decryptProviderConfigAndIntegrationOpts } from '../../common/utils/crypto.utils'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class ProvidersService {
  private readonly logger = new Logger(ProvidersService.name)
  private readonly secretKey: string

  constructor (
    private readonly configService: ConfigService,
    @Inject(IntegrationsService)
    private readonly integrationsService: IntegrationsService,
    @Inject('INTEGRATION_ENGINE') private readonly client: ClientProxy
  ) {
    this.secretKey = this.configService.get('secretKey') ?? ''
  }

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

    const decrypted = decryptProviderConfigAndIntegrationOpts({
      integrationOptions,
      providerConfigurationOptions,
      secretKey: this.secretKey
    })

    const { message, messagePattern } = ieMessageBuilder(providerId, {
      resource: 'services',
      operation: 'list',
      data: {
        providerConfiguration: decrypted.providerConfigurationOptions,
        integrationOptions: decrypted.integrationOptions
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

    const decrypted = decryptProviderConfigAndIntegrationOpts({
      integrationOptions,
      providerConfigurationOptions,
      secretKey: this.secretKey
    })

    const { message, messagePattern } = ieMessageBuilder(providerId, {
      resource: 'refs',
      operation: 'version',
      data: {
        providerConfiguration: decrypted.providerConfigurationOptions,
        integrationOptions: decrypted.integrationOptions
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

    const decrypted = decryptProviderConfigAndIntegrationOpts({
      integrationOptions,
      providerConfigurationOptions,
      secretKey: this.secretKey
    })

    const { message, messagePattern } = ieMessageBuilder(providerId, {
      resource: 'breeds',
      operation: 'list',
      data: {
        providerConfiguration: decrypted.providerConfigurationOptions,
        integrationOptions: decrypted.integrationOptions
      }
    })

    return await this.client.send(messagePattern, message).toPromise()
  }

  async getGenders (
    providerId: string,
    integrationId: string
  ): Promise<Genders> {
    const {
      providerConfiguration: { providerConfigurationOptions },
      integrationOptions
    } = await this.integrationsService.findOne({
      id: integrationId,
      options: {
        relations: ['providerConfiguration']
      }
    })

    const decrypted = decryptProviderConfigAndIntegrationOpts({
      integrationOptions,
      providerConfigurationOptions,
      secretKey: this.secretKey
    })

    const { message, messagePattern } = ieMessageBuilder(providerId, {
      resource: 'genders',
      operation: 'list',
      data: {
        providerConfiguration: decrypted.providerConfigurationOptions,
        integrationOptions: decrypted.integrationOptions
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

    const decrypted = decryptProviderConfigAndIntegrationOpts({
      integrationOptions,
      providerConfigurationOptions,
      secretKey: this.secretKey
    })

    const { message, messagePattern } = ieMessageBuilder(providerId, {
      resource: 'species',
      operation: 'list',
      data: {
        providerConfiguration: decrypted.providerConfigurationOptions,
        integrationOptions: decrypted.integrationOptions
      }
    })

    return await this.client.send(messagePattern, message).toPromise()
  }
}
