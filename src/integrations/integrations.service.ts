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
import * as createValidator from 'is-my-json-valid'
import { Operation, Resource } from '@nominal-systems/dmi-engine-common'
import { IntegrationStatus } from './constants/integration-status.enum'
import { Provider } from '../providers/entities/provider.entity'

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
    @InjectRepository(Provider)
    private readonly providerRepository: Repository<Provider>,
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
    integrationUpdate: Pick<CreateIntegrationDto, 'integrationOptions'>): Promise<any> {
    const integration = await this.findOne({
      id: integrationId,
      options: { relations: ['providerConfiguration', 'practice'] }
    })

    if (integration == null) {
      throw new NotFoundException('The integration doesn\'t exist')
    }

    const newIntegrationOptions = integrationUpdate.integrationOptions
    const updatedIntegration = {
      practiceId: integration.practiceId,
      integrationOptions: newIntegrationOptions,
      providerConfigurationId: integration.providerConfigurationId
    }
    await this.validateIntegrationOptions(updatedIntegration)

    integrationUpdate.integrationOptions = encrypt(
      integrationUpdate.integrationOptions,
      this.secretKey
    )

    await this.integrationsRepository.update(
      { id: integrationId },
      { ...integrationUpdate }
    )

    this.logger.log(`Updated Integration: [${integration.id}]`)
    await this.updateJobs(integrationId, integration.providerConfiguration, newIntegrationOptions)

    return await this.findOne({ id: integrationId })
  }

  async restart (integration: Integration): Promise<void> {
    await this.doStop(integration)

    if (integration.status === IntegrationStatus.RUNNING) {
        await this.doStart(
            integration.id,
            integration.providerConfiguration,
            integration.integrationOptions
        )
    }
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

  async ensureStatusAll (): Promise<void> {
    const integrations = await this.findAll({
      withDeleted: false,
      relations: ['providerConfiguration']
    })

    const integrationStatusCounts = integrations.reduce((counts, integration) => {
      counts[integration.status]++
      return counts
    }, { RUNNING: 0, STOPPED: 0 })

    this.logger.log(`Found: ${integrationStatusCounts.RUNNING} integrations RUNNING, ${integrationStatusCounts.STOPPED} integrations STOPPED`)

    for (const integration of integrations) {
      await this.restart(integration)
    }
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

  async updateJobs (
    integrationId: string,
    providerConfiguration: any,
    integrationOptions: any
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
    const provider = await this.providerRepository.findOne(<string>providerConfiguration?.providerId)

    if (provider == null) {
      throw new BadRequestException('The provider doesn\'t exist')
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
