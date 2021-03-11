import { ForbiddenException, Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
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

  async create (createIntegrationDto: CreateIntegrationDto) {
    return await this.integrationsRepository.save(createIntegrationDto)
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
