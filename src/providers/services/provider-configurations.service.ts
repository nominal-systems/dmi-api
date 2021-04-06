import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, FindManyOptions } from 'typeorm'
import { Organization } from '../../organizations/entities/organization.entity'
import { ProvidersService } from './providers.service'
import { ProviderConfiguration } from '../entities/provider-configuration.entity'
import * as createValidator from 'is-my-json-valid'
import { ConfigService } from '@nestjs/config'
import { encrypt } from '../../common/utils/crypto.utils'

@Injectable()
export class ProviderConfigurationsService {
  private readonly secretKey: string

  constructor (
    @InjectRepository(ProviderConfiguration)
    private readonly providerConfigurationRepository: Repository<
      ProviderConfiguration
    >,
    private readonly providersService: ProvidersService,
    private readonly configService: ConfigService
  ) {
    this.secretKey = this.configService.get('secretKey') ?? ''
  }

  async findAll (
    options?: FindManyOptions<ProviderConfiguration>
  ): Promise<ProviderConfiguration[]> {
    return await this.providerConfigurationRepository.find(options)
  }

  async create (
    organization: Organization,
    providerId: string,
    providerConfigurationOptions: any
  ): Promise<any> {
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

    if (!providerValidator(providerConfigurationOptions)) {
      throw new BadRequestException('There is an issue with the request body')
    }

    const newProviderConfiguration = this.providerConfigurationRepository.create(
      {
        diagnosticProviderId: providerId,
        providerConfigurationOptions: encrypt(
          providerConfigurationOptions,
          this.secretKey
        ),
        organization
      }
    )

    return await this.providerConfigurationRepository.save(
      newProviderConfiguration
    )
  }
}
