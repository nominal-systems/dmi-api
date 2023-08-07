import { BadRequestException, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ClientProxy } from '@nestjs/microservices'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, Repository, SelectQueryBuilder } from 'typeorm'
import { FindOneOfTypeOptions } from '../common/typings/find-one-of-type-options.interface'
import { encrypt } from '../common/utils/crypto.utils'
import ieMessageBuilder from '../common/utils/ieMessageBuilder'
import { Organization } from '../organizations/entities/organization.entity'
import { CreateIntegrationDto } from './dtos/create-integration.dto'
import { Integration } from './entities/integration.entity'
import { ProviderConfiguration } from '../providers/entities/provider-configuration.entity'
import providersList from '../providers/constants/provider-list.constant'
import * as createValidator from 'is-my-json-valid'
import { Operation, Resource } from '@nominal-systems/dmi-engine-common'
import { IntegrationStatus } from './constants/integration-status.enum'

@Injectable()
export class IntegrationsService {
  private readonly logger = new Logger(IntegrationsService.name)
  private readonly secretKey: string

  constructor (
    private readonly configService: ConfigService,
    @InjectRepository(Integration)
    private readonly integrationsRepository: Repository<Integration>,
    @InjectRepository(ProviderConfiguration)
    private readonly providerConfigurationRepository: Repository<ProviderConfiguration>,
    @Inject('ACTIVEMQ') private readonly client: ClientProxy
  ) {
    this.secretKey = this.configService.get('secretKey') ?? ''
  }

  async findAll (
    options?: FindManyOptions<Integration>
  ): Promise<Integration[]> {
    return await this.integrationsRepository.find(options)
  }

  async findOne (
    args: FindOneOfTypeOptions<Integration>
  ): Promise<Integration> {
    const integration = await this.integrationsRepository.findOne(
      args.id,
      args.options
    )

    if (integration == null) {
      throw new NotFoundException('The integration was not found')
    }

    return integration
  }

  async findById (integrationId: string): Promise<Integration> {
    return await this.findOne({
      id: integrationId,
      options: {
        relations: ['practice', 'practice.identifier', 'providerConfiguration']
      }
    })
  }

  async create (
    createIntegrationDto: CreateIntegrationDto
  ): Promise<Integration> {
    try {
      await this.validateIntegrationOptions(createIntegrationDto)

      createIntegrationDto.integrationOptions = encrypt(
        createIntegrationDto.integrationOptions,
        this.secretKey
      )

      const newIntegration = this.integrationsRepository.create({
        ...createIntegrationDto
      })

      const integration = await this.integrationsRepository.save(newIntegration)
      this.logger.log(`Created Integration: [${integration.id}]`)

      const {
        id: integrationId,
        providerConfiguration,
        integrationOptions
      } = await this.findOne({
        id: newIntegration.id,
        options: { relations: ['providerConfiguration', 'practice'] }
      })

      await this.doStart(integrationId, providerConfiguration, integrationOptions)

      newIntegration.integrationOptions = integrationOptions

      return newIntegration
    } catch (error) {
      if (error.code === 'ER_NO_REFERENCED_ROW_2') {
        throw new NotFoundException(
          'The practice or providerConfiguration was not found'
        )
      }

      throw error
    }
  }

  async update (
    integrationId: string,
    updateIntegration: Pick<CreateIntegrationDto, 'integrationOptions'>): Promise<any> {
      const integration = await this.findOne({
        id: integrationId,
        options: { relations: ['providerConfiguration', 'practice'] }
      })

      if (integration == null) {
        throw new NotFoundException("The integration doesn't exist")
      }
      await this.validateIntegrationOptions({
        practiceId: integration.practiceId,
        integrationOptions: updateIntegration,
        providerConfigurationId: integration.providerConfigurationId
      })

      updateIntegration.integrationOptions = encrypt(
        updateIntegration.integrationOptions,
        this.secretKey
      )

      await this.integrationsRepository.update(
          { id: integrationId },
          { ...updateIntegration }
          )

      this.logger.log(`Updated Integration: [${integration.id}]`)

      await this.updateJob(integrationId, integration.providerConfiguration, updateIntegration)

      return integration
  }

  async delete (
    organization: Organization,
    integrationId: string
  ): Promise<void> {
    // Find the integration
    const integration = await this.findOne({
      options: {
        where: (qb: SelectQueryBuilder<Integration>) => {
          qb.where('integration.id = :integrationId', {
            integrationId
          }).andWhere(
            'providerConfiguration.organizationId = :organizationId',
            {
              organizationId: organization.id
            }
          )
        },
        join: {
          alias: 'integration',
          leftJoinAndSelect: {
            providerConfiguration: 'integration.providerConfiguration'
          }
        }
      }
    })

    if (integration.deletedAt != null) {
      this.logger.log(`Integration ${integration.id} is already deleted`)
      return
    }

    await this.doDelete(integration)
  }

  async doDelete (
    integration: Integration
  ): Promise<void> {
    // Soft-delete the integration
    await this.doStop(integration)
    await this.integrationsRepository.softDelete(integration.id)
    this.logger.log(`Deleted Integration: ${integration.id}`)
  }

  async doStop (
    integration: Integration
  ): Promise<void> {
    // Notify engine to remove jobs
    const { message, messagePattern } = ieMessageBuilder(
      integration.providerConfiguration.providerId,
      {
        resource: Resource.Integration,
        operation: Operation.Remove,
        data: {
          payload: {
            integrationId: integration.id
          }
        }
      }
    )

    this.client.emit(messagePattern, message)
    await this.integrationsRepository.update(integration.id, { status: IntegrationStatus.STOPPED })
    this.logger.log(`Stopped integration ${integration.id}`)
  }

  async doStart (
    integrationId: string,
    providerConfiguration,
    integrationOptions
  ): Promise<void> {
    // Notify engine to add jobs
    const { message, messagePattern } = ieMessageBuilder(
      providerConfiguration.providerId,
      {
        resource: Resource.Integration,
        operation: Operation.Create,
        data: {
          integrationOptions: integrationOptions,
          providerConfiguration: providerConfiguration.configurationOptions,
          payload: {
            integrationId
          }
        }
      }
    )
    await this.integrationsRepository.update(integrationId, { status: IntegrationStatus.RUNNING })
    this.client.emit(messagePattern, message)
    this.logger.log(`Started integration ${integrationId}`)
  }

  async updateJob (
    integrationId: string,
    providerConfiguration,
    integrationOptions
  ): Promise<void> {
    // Notify engine to update jobs
    const { message, messagePattern } = ieMessageBuilder(
      providerConfiguration.providerId,
      {
        resource: Resource.Integration,
        operation: Operation.Update,
        data: {
          integrationOptions: integrationOptions,
          providerConfiguration: providerConfiguration.configurationOptions,
          payload: {
            integrationId
          }
        }
      }
    )
    this.client.emit(messagePattern, message)
    this.logger.log(`Updated integration ${integrationId}`)
  }

  private async validateIntegrationOptions (
    createIntegrationDto: CreateIntegrationDto
  ): Promise<void> {
    const providerConfiguration = await this.providerConfigurationRepository.findOne({ id: createIntegrationDto.providerConfigurationId })
    // TODO(gb): actually use the ProviderService to do this
    const provider = providersList.find(provider => provider.id === providerConfiguration?.providerId)

    if (provider == null) {
      throw new BadRequestException("The provider doesn't exist")
    }

    const validatorOptions = {
      required: true,
      type: 'object',
      properties: {}
    }

    for (const option of provider.integrationOptions) {
      validatorOptions.properties[option.name] = {
        type: option.type,
        required: option.required
      }
    }

    const providerValidator = createValidator(validatorOptions as any)

    if (!providerValidator(createIntegrationDto.integrationOptions)) {
      throw new BadRequestException('Invalid integration options')
    }
  }
}
