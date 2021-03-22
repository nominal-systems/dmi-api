import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, FindManyOptions } from 'typeorm'
import { Organization } from '../../organizations/entities/organization.entity'
import { ProvidersService } from './providers.service'
import { ProviderConfiguration } from '../entities/provider-configuration.entity'
import * as createValidator from 'is-my-json-valid'
import { ModuleRef } from '@nestjs/core'

@Injectable()
export class ProviderConfigurationsService implements OnModuleInit {
  private providersService: ProvidersService

  constructor (
    @InjectRepository(ProviderConfiguration)
    private readonly providerConfigurationRepository: Repository<
      ProviderConfiguration
    >,
    private readonly moduleRef: ModuleRef
  ) {}

  onModuleInit (): void {
    this.providersService = this.moduleRef.get(ProvidersService, {
      strict: false
    })
  }

  async findAll (
    options?: FindManyOptions<ProviderConfiguration>
  ): Promise<ProviderConfiguration[]> {
    return await this.providerConfigurationRepository.find(options)
  }

  async create (
    organization: Organization,
    providerId: string,
    providerConfiguration: any
  ): Promise<ProviderConfiguration> {
    const provider = await this.providersService.findOneById(providerId)

    if (provider == null) {
      throw new BadRequestException("The provider doesn't exist")
    }

    const validatorOptions = {
      required: true,
      type: 'object',
      properties: {}
    }

    for (const option of provider.providerConfigurationOptions) {
      validatorOptions.properties[option.name] = {
        type: option.type,
        required: option.required
      }
    }

    const providerValidator = createValidator(validatorOptions as any)

    if (!providerValidator(providerConfiguration)) {
      throw new BadRequestException('There is an issue with the request body')
    }

    const newProviderConfiguration = this.providerConfigurationRepository.create(
      {
        diagnosticProviderId: providerId,
        providerConfigurationOptions: providerConfiguration,
        organization
      }
    )

    return await this.providerConfigurationRepository.save(
      newProviderConfiguration
    )
  }
}
