import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { FindOneOfTypeOptions } from '../../common/typings/find-one-of-type-options.interface'
import keyGenerator from '../../common/utils/keyGenerator'
import { Integration } from '../../integrations/entities/integration.entity'
import { User } from '../../users/entity/user.entity'
import { UsersService } from '../../users/users.service'
import { CreateOrganizationDto } from '../dtos/create-organization.dto'
import { OrganizationKeys } from '../dtos/organization-keys.dto'
import { Organization } from '../entities/organization.entity'

@Injectable()
export class OrganizationsService {
  private readonly logger = new Logger(OrganizationsService.name)

  constructor (
    @InjectRepository(Organization)
    private readonly organizationsRepository: Repository<Organization>,
    private readonly usersService: UsersService
  ) {
  }

  async findOne (
    args: FindOneOfTypeOptions<Organization>
  ): Promise<Organization> {
    const organization = await this.organizationsRepository.findOne(
      args.id,
      args.options
    )

    if (organization == null) {
      throw new NotFoundException("The organization doesn't exist")
    }

    return organization
  }

  async findAll (): Promise<Organization[]> {
    return await this.organizationsRepository.find()
  }

  async getOrganizationsKeys (
    organizationId: string
  ): Promise<OrganizationKeys> {
    const result = await this.organizationsRepository.findOne(organizationId, {
      select: ['testKey', 'prodKey']
    })

    if (result == null) {
      throw new NotFoundException('The organization was not found')
    }

    return result
  }

  async create (
    createOrganizationDto: CreateOrganizationDto,
    owner: User
  ): Promise<Organization> {
    const ownersOrganization = await this.organizationsRepository.findOne({
      where: { owner: { id: owner.id } },
      relations: ['owner']
    })

    if (ownersOrganization != null) {
      throw new ConflictException('You already have an organization')
    }

    const newOrganization = this.organizationsRepository.create({
      ...createOrganizationDto,
      ...this.generateKeys(),
      owner
    })

    await this.organizationsRepository.save(newOrganization)
    this.logger.log(`Created Organization: '${newOrganization.name}' [${newOrganization.id}] -> Owner: '${owner.email}'`)

    await this.usersService.updateOrganization(owner, newOrganization)

    return newOrganization
  }

  async regenerateKeys (organizationId: string): Promise<OrganizationKeys> {
    const { prodKey, testKey } = await this.organizationsRepository.save({
      id: organizationId,
      ...this.generateKeys()
    })

    return { testKey, prodKey }
  }

  async getIntegrations (
    organizationId: string
  ): Promise<Integration[] | undefined> {
    const organization = await this.organizationsRepository.findOne({
      where: {
        id: organizationId
      },
      relations: [
        'providerConfigurations',
        'providerConfigurations.integrations'
      ]
    })

    return organization?.providerConfigurations
      .map(providerConfiguration => providerConfiguration.integrations)
      .reduce((prev, curr) => prev.concat(curr), [])
  }

  generateKeys (): OrganizationKeys {
    return { testKey: keyGenerator(), prodKey: keyGenerator() }
  }
}
