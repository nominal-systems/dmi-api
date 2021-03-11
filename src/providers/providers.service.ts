import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import providersList from './constants/provider-list.constant'
import { ProviderConfiguration } from './entities/provider-configuration.entity'
import * as createValidator from 'is-my-json-valid'

@Injectable()
export class ProvidersService {
  constructor (
    @InjectRepository(ProviderConfiguration)
    private providerConfigurationRepository: Repository<ProviderConfiguration>,
  ) {}

  async findAll () {
    return providersList
  }

  async findOneById (providerId: string) {
    return providersList.find(provider => provider.id === providerId)
  }

  async getProviderConfigurations (providerId: string) {
    return await this.providerConfigurationRepository.find({
      where: { diagnosticProviderId: providerId },
    })
  }

  async createProviderConfiguration (
    providerId: string,
    providerConfiguration: any,
  ) {
    const provider = await this.findOneById(providerId)

    if (!provider) {
      throw new BadRequestException("The provider doesn't exist")
    }

    const validatorOptions = {
      required: true,
      type: 'object',
      properties: {},
    }

    for (const option of provider.providerConfigurationOptions) {
      validatorOptions.properties[option.name] = {
        type: option.type,
        required: option.required,
      }
    }

    const providerValidator = createValidator(validatorOptions as any)

    if (!providerValidator(providerConfiguration)) {
      throw new BadRequestException('There is an issue with the request body')
    }

    return await this.providerConfigurationRepository.save({
      diagnosticProviderId: providerId,
      providerConfigurationOptions: providerConfiguration,
    })
  }
}
