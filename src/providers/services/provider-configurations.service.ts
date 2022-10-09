import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, FindManyOptions } from 'typeorm'
import { Organization } from '../../organizations/entities/organization.entity'
import { ProvidersService } from './providers.service'
import { ProviderConfiguration } from '../entities/provider-configuration.entity'
import * as createValidator from 'is-my-json-valid'
import { ConfigService } from '@nestjs/config'
import { encrypt } from '../../common/utils/crypto.utils'
import { FindOneOfTypeOptions } from '../../common/typings/find-one-of-type-options.interface'

@Injectable()
export class ProviderConfigurationsService {
  private readonly secretKey: string
  private readonly logger = new Logger('ProviderConfigurationsService')

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
    const provider = await this.providersService.findOneById(providerId)

    if (provider == null) {
      throw new BadRequestException("The provider doesn't exist")
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
      throw new BadRequestException('There is an issue with the request body')
    }

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

  async delete (
    args: FindOneOfTypeOptions<ProviderConfiguration>
  ): Promise<void> {
    const providerConfig = await this.findOne(args)

    if (providerConfig == null) {
      throw new NotFoundException("The provider configuration doesn't exist")
    }

    await this.providerConfigurationRepository.delete(providerConfig.id)
  }
}
