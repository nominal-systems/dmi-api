import { ConflictException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import keyGenerator from '../common/utils/keyGenerator'
import { User } from '../users/entity/user.entity'
import { UsersService } from '../users/users.service'
import { CreateOrganizationDto } from './dtos/create-organization.dto'
import { OrganizationKeys } from './dtos/organization-keys.dto'
import { OrganizationWithoutKeys } from './dtos/organization-without-keys.dto'
import { Organization } from './entities/organization.entity'

@Injectable()
export class OrganizationsService {
  constructor (
    @InjectRepository(Organization)
    private organizationsRepository: Repository<Organization>,
    private usersService: UsersService,
  ) {}

  async findOne (organization: Partial<Organization>) {
    const result = await this.organizationsRepository.findOne(null, {
      where: organization,
      relations: ['owner', 'members'],
    })

    return result
  }

  async findOneWithKey (apiKey: string): Promise<OrganizationWithoutKeys> {
    const organization = await this.organizationsRepository.findOne(null, {
      where: [{ prodKey: apiKey }, { testKey: apiKey }],
    })

    if (!organization) return null

    const { testKey, prodKey, ...rest } = organization

    return rest
  }

  async getOrganizationsKeys (
    organizationId: string,
  ): Promise<OrganizationKeys> {
    const result = await this.organizationsRepository.findOne(organizationId, {
      select: ['testKey', 'prodKey'],
    })

    return result
  }

  async create (createOrganizationDto: CreateOrganizationDto, owner: User) {
    const ownersOrganization = await this.organizationsRepository.findOne({
      where: { owner: { id: owner.id } },
      relations: ['owner'],
    })

    if (ownersOrganization) {
      throw new ConflictException('You already have an organization')
    }

    const newOrganization = await this.organizationsRepository.save({
      ...createOrganizationDto,
      ...this.generateKeys(),
      owner,
    })

    await this.usersService.updateOrganization(owner, newOrganization)

    const { testKey, prodKey, ...rest } = newOrganization

    return rest
  }

  async regenerateKeys (organizationId: string): Promise<OrganizationKeys> {
    const { prodKey, testKey } = await this.organizationsRepository.save({
      id: organizationId,
      ...this.generateKeys(),
    })

    return { testKey, prodKey }
  }

  async getIntegrations (organizationId: string) {
    const organization = await this.organizationsRepository.findOne({
      where: {
        id: organizationId,
      },
      relations: [
        'providerConfigurations',
        'providerConfigurations.integrations',
      ],
    })

    return organization.providerConfigurations
      .map(providerConfiguration => providerConfiguration.integrations)
      .reduce((prev, curr) => prev.concat(curr), [])
  }

  generateKeys () {
    return { testKey: keyGenerator(), prodKey: keyGenerator() }
  }
}