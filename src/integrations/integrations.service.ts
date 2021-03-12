import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOneOptions, Repository } from 'typeorm'
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

  async findAll () {
    return await this.integrationsRepository.find()
  }

  async findOne (id: string, options?: FindOneOptions<Integration>) {
    return await this.integrationsRepository.findOne(
      options ? null : id,
      options,
    )
  }

  async create (createIntegrationDto: CreateIntegrationDto) {
    try {
      return await this.integrationsRepository.save(createIntegrationDto)
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

    const integrationBelongsToOrganization = !organizationsIntegrations.find(
      integration => integration && integration.id === integrationId,
    )

    if (!integrationBelongsToOrganization) {
      throw new ForbiddenException("You don't have access to this resource")
    }

    await this.integrationsRepository.delete(integrationId)
  }
}
