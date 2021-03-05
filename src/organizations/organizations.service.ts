import { ConflictException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import keyGenerator from '../common/utils/keyGenerator'
import { UserDocument } from '../users/schemas/user.schema'
import { UsersService } from '../users/users.service'
import { CreateOrganizationDto } from './dtos/create-organization.dto'
import {
  Organization,
  OrganizationDocument,
} from './schemas/organization.schema'

@Injectable()
export class OrganizationsService {
  constructor (
    @InjectModel(Organization.name)
    private OrganizationModel: Model<OrganizationDocument>,
    private usersService: UsersService,
  ) { }

  async findOne (organization: any) {
    const result = await this.OrganizationModel.findOne(organization, {
      testKey: 0,
      prodKey: 0,
    })

    return result
  }

  async getOrganizationsKeys (organizationId: string) {
    const result = await this.OrganizationModel.findById(organizationId, {
      testKey: 1,
      prodKey: 1,
      _id: 0,
    })

    return result
  }

  async create (
    createOrganizationDto: CreateOrganizationDto,
    owner: UserDocument,
  ) {
    const ownersOrganization = await this.OrganizationModel.findOne({
      owner: owner._id,
    })

    if (ownersOrganization) {
      throw new ConflictException('You already have an organization')
    }

    const newOrganization = new this.OrganizationModel({
      ...createOrganizationDto,
      ...this.generateKeys(),
      owner: owner._id,
    })

    await this.usersService.updateOrganization(owner, newOrganization)

    return await newOrganization.save()
  }

  async regenerateKeys (organizationId: string) {
    const { testKey, prodKey } = await this.OrganizationModel.findOneAndUpdate(
      { _id: organizationId },
      this.generateKeys(),
      { new: true }
    )

    return { testKey, prodKey }
  }

  generateKeys () {
    return { testKey: keyGenerator(), prodKey: keyGenerator() }
  }
}
