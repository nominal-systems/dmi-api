import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Organization } from '../organizations/entities/organization.entity'
import { CreatePracticeDto } from './dto/create-practice.dto'
import { Practice } from './entities/practice.entity'

@Injectable()
export class PracticesService {
  constructor (
    @InjectRepository(Practice)
    private practicesRepository: Repository<Practice>,
  ) {}

  async findAllForOrganization (organization: Organization) {
    return await this.practicesRepository.find({
      where: {
        organizationId: organization.id,
      },
      relations: ['integrations']
    })
  }

  async create (organization: Organization, practiceDto: CreatePracticeDto) {
    return await this.practicesRepository.save({
      ...practiceDto,
      organization,
    })
  }

  async delete (organization: Organization, practiceId: string) {
    const practice = await this.practicesRepository.findOne({
      where: {
        id: practiceId,
      },
    })

    if (!practice) {
      throw new NotFoundException("The practice doesn't exist")
    }

    if (practice.organizationId !== organization.id) {
      throw new ForbiddenException("You don't have permissions to do that")
    }

    await this.practicesRepository.delete(practiceId)
  }
}
