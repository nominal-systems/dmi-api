import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, Repository } from 'typeorm'
import { Organization } from '../../organizations/entities/organization.entity'
import { ProvidersService } from './providers.service'
import { ProviderConfiguration } from '../entities/provider-configuration.entity'
import * as createValidator from 'is-my-json-valid'
import { ConfigService } from '@nestjs/config'
import { encrypt } from '../../common/utils/crypto.utils'
import { FindOneOfTypeOptions } from '../../common/typings/find-one-of-type-options.interface'
import { Integration } from '../../integrations/entities/integration.entity'
import { IntegrationsService } from '../../integrations/integrations.service'

@Injectable()
export class ProviderConfigurationsService {
  private readonly secretKey: string
  private readonly logger = new Logger('ProviderConfigurationsService')

  constructor (
    @InjectRepository(ProviderConfiguration)
    private readonly providerConfigurationRepository: Repository<ProviderConfiguration>,
    @InjectRepository(Integration)
    private readonly integrationsRepository: Repository<Integration>,
    private readonly providersService: ProvidersService,
    private readonly integrationsService: IntegrationsService,
    private readonly configService: ConfigService
  ) {
    this.secretKey = this.configService.get('secretKey') ?? ''
  }

  async findAll (
    options?: FindManyOptions<ProviderConfiguration>
  ): Promise<ProviderConfiguration[]> {
    return await this.providerConfigurationRepository.find(options)
  }

  async findOne (
    args: FindOneOfTypeOptions<ProviderConfiguration>
  ): Promise<ProviderConfiguration> {
    const providerConfig = await this.providerConfigurationRepository.findOne(
      args.id,
      args.options
    )

    if (providerConfig == null) {
      throw new NotFoundException('The provider configuration was not found')
    }

    return providerConfig
  }

  async create (
    organization: Organization,
    providerId: string,
    providerConfigurationOptions: any
  ): Promise<any> {
    await this.validateProviderConfiguration(providerId, providerConfigurationOptions)

    const newProviderConfiguration = this.providerConfigurationRepository.create(
      {
        providerId: providerId,
        configurationOptions: encrypt(
          providerConfigurationOptions.configuration,
          this.secretKey
        ),
        organization
      }
    )
    this.logger.log(`Created Provider Configuration -> Provider: '${providerId}'`)

    return await this.providerConfigurationRepository.save(
      newProviderConfiguration
    )
  }

  async update (
    organization: Organization,
    providerId: string,
    configId: string,
    providerConfigurationOptions: any): Promise<any> {
    const providerConfig = await this.findOne({ id: configId, options: { relations: ['organization'] } })
    if (providerConfig == null) {
      throw new NotFoundException('The provider configuration doesn\'t exist')
    }
    await this.validateProviderConfiguration(providerId, providerConfigurationOptions)
    providerConfig.configurationOptions = encrypt(providerConfigurationOptions.configuration, this.secretKey)
    await this.providerConfigurationRepository.update(
      { id: configId },
      {
        providerId,
        configurationOptions: providerConfig.configurationOptions,
        organization
      }
    )
    this.logger.log(`Updated Provider Configuration -> Provider: '${providerId}'`)

    const integrations = await this.integrationsRepository.find({
      where: { providerConfigurationId: configId },
      relations: ['providerConfiguration', 'practice']
    })

    for (const integration of integrations) {
      await this.integrationsService.updateJobs(integration.id, integration.providerConfiguration, integration.integrationOptions)
    }
  }

  async delete (
    args: FindOneOfTypeOptions<ProviderConfiguration>
  ): Promise<void> {
    const providerConfig = await this.findOne(args)

    if (providerConfig == null) {
      throw new NotFoundException('The provider configuration doesn\'t exist')
    }

    await this.providerConfigurationRepository.softDelete(providerConfig.id)
    this.logger.log(`Delete ProviderConfiguration: ${providerConfig.id}`)

    // Delete linked integrations
    if (providerConfig.integrations.length > 0) {
      const integrationIds = providerConfig.integrations.map((i) => i.id)
      await this.integrationsRepository.softDelete(integrationIds)
      this.logger.log(`Deleted Integrations: ${integrationIds.join(',')}`)
    }
  }

  private async validateProviderConfiguration (
    providerId: string,
    providerConfigurationOptions: any
  ): Promise<void> {
    const provider = await this.providersService.findOneById(providerId)

    if (provider == null) {
      throw new BadRequestException('The provider doesn\'t exist')
    }

    const validatorOptions = {
      required: true,
      type: 'object',
      properties: {}
    }

    for (const option of provider.configurationOptions) {
      validatorOptions.properties[option.name] = {
        type: option.type,
        required: option.required
      }
    }

    const providerValidator = createValidator(validatorOptions as any)
    if (!providerValidator(providerConfigurationOptions.configuration)) {
      throw new BadRequestException('The provider configuration is invalid')
    }
  }
}
