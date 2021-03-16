import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, Repository } from 'typeorm'
import { FindOneOfTypeOptions } from '../common/typings/find-one-of-type-options.interface'
import { Organization } from '../organizations/entities/organization.entity'
import { OrganizationsService } from '../organizations/organizations.service'
import { CreateIntegrationDto } from './dtos/create-integration.dto'
import { Integration } from './entities/integration.entity'

@Injectable()
export class IntegrationsService {
  constructor (
    @InjectRepository(Integration)
    private integrationsRepository: Repository<Integration>,
    @Inject(OrganizationsService)
    private organizationsService: OrganizationsService,
  ) {}

  async findAll (options?: FindManyOptions<Integration>) {
    return await this.integrationsRepository.find(options)
  }

  async findOne (args: FindOneOfTypeOptions<Integration>) {
    return await this.integrationsRepository.findOne(
      args.id,
      args.options,
    )
  }

  async create (createIntegrationDto: CreateIntegrationDto) {
    try {
      const newIntegration = this.integrationsRepository.create(
        createIntegrationDto,
      )
      return await this.integrationsRepository.save(newIntegration)
    } catch (error) {
      if (error.code === 'ER_NO_REFERENCED_ROW_2') {
        throw new NotFoundException(
          'The practice or providerConfiguration was not found',
        )
      }

      throw error
    }
  }

  async delete (organization: Organization, integrationId: string) {
    const organizationsIntegrations = await this.organizationsService.getIntegrations(
      organization.id,
    )

    const integrationBelongsToOrganization = organizationsIntegrations.find(
      integration => integration && integration.id === integrationId,
    )

    if (!integrationBelongsToOrganization) {
      throw new ForbiddenException("You don't have access to this resource")
    }

    await this.integrationsRepository.delete(integrationId)
  }
}
