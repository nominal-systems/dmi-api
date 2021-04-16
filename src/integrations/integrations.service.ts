import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ClientProxy } from '@nestjs/microservices'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, Repository } from 'typeorm'
import { FindOneOfTypeOptions } from '../common/typings/find-one-of-type-options.interface'
import {
  decryptProviderConfigAndIntegrationOpts,
  encrypt
} from '../common/utils/crypto.utils'
import ieMessageBuilder from '../common/utils/ieMessageBuilder'
import { Organization } from '../organizations/entities/organization.entity'
import { OrganizationsService } from '../organizations/organizations.service'
import { CreateIntegrationDto } from './dtos/create-integration.dto'
import { Integration } from './entities/integration.entity'

@Injectable()
export class IntegrationsService {
  private readonly secretKey: string

  constructor (
    private readonly configService: ConfigService,
    @InjectRepository(Integration)
    private readonly integrationsRepository: Repository<Integration>,
    @Inject(OrganizationsService)
    private readonly organizationsService: OrganizationsService,
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

  async create (
    createIntegrationDto: CreateIntegrationDto
  ): Promise<Integration> {
    try {
      createIntegrationDto.integrationOptions = encrypt(
        createIntegrationDto.integrationOptions,
        this.secretKey
      )

      const newIntegration = this.integrationsRepository.create(
        createIntegrationDto
      )

      await this.integrationsRepository.save(newIntegration)

      const {
        id: integrationId,
        providerConfiguration,
        integrationOptions
      } = await this.findOne({
        id: newIntegration.id,
        options: { relations: ['providerConfiguration'] }
      })

      const decryptedOptions = decryptProviderConfigAndIntegrationOpts({
        integrationOptions,
        providerConfigurationOptions:
          providerConfiguration.providerConfigurationOptions,
        secretKey: this.secretKey
      })

      const { message, messagePattern } = ieMessageBuilder(
        providerConfiguration.diagnosticProviderId,
        {
          resource: 'integration',
          operation: 'create',
          data: {
            integrationOptions: decryptedOptions.integrationOptions,
            providerConfiguration: decryptedOptions.providerConfigurationOptions,
            payload: {
              integrationId
            }
          }
        }
      )

      this.client.emit(messagePattern, message)

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

  async delete (
    organization: Organization,
    integrationId: string
  ): Promise<void> {
    const organizationsIntegrations = await this.organizationsService.getIntegrations(
      organization.id
    )

    const integrationBelongsToOrganization = organizationsIntegrations?.find(
      integration => integration.id === integrationId
    )

    if (integrationBelongsToOrganization == null) {
      throw new ForbiddenException("You don't have access to this resource")
    }

    await this.integrationsRepository.delete(integrationId)
  }
}
