import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common'
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

@Injectable()
export class IntegrationsService {
  private readonly logger = new Logger(IntegrationsService.name)
  private readonly secretKey: string

  constructor (
    private readonly configService: ConfigService,
    @InjectRepository(Integration)
    private readonly integrationsRepository: Repository<Integration>,
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

      const { message, messagePattern } = ieMessageBuilder(
        providerConfiguration.providerId,
        {
          resource: 'integration',
          operation: 'create',
          data: {
            integrationOptions: integrationOptions,
            providerConfiguration:
              providerConfiguration.configurationOptions,
            payload: {
              integrationId
            }
          }
        }
      )

      this.client.emit(messagePattern, message)

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

  async delete (
    organization: Organization,
    integrationId: string
  ): Promise<void> {
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

    const { message, messagePattern } = ieMessageBuilder(
      integration.providerConfiguration.providerId,
      {
        resource: 'integration',
        operation: 'remove',
        data: {
          payload: {
            integrationId
          }
        }
      }
    )

    this.client.emit(messagePattern, message)

    await this.integrationsRepository.delete(integrationId)
  }
}
