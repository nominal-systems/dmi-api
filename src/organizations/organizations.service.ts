import { ConflictException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import keyGenerator from '../common/utils/keyGenerator'
import { User } from '../users/entity/user.entity'
import { UsersService } from '../users/users.service'
import { CreateOrganizationDto } from './dtos/create-organization.dto'
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
      relations: ['owner', 'members']
    })

    return result
  }

  async getOrganizationsKeys (organizationId: string) {
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

    return newOrganization
  }

  async regenerateKeys (organizationId: string) {
    const { prodKey, testKey } = await this.organizationsRepository.save({
      id: organizationId,
      ...this.generateKeys(),
    })

    return { testKey, prodKey }
  }

  generateKeys () {
    return { testKey: keyGenerator(), prodKey: keyGenerator() }
  }
}
