import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, Repository } from 'typeorm'
import { Organization } from '../organizations/entities/organization.entity'
import { CreatePracticeDto } from './dto/create-practice.dto'
import { Practice } from './entities/practice.entity'

@Injectable()
export class PracticesService {
  constructor (
    @InjectRepository(Practice)
    private practicesRepository: Repository<Practice>,
  ) {}

  async findAll (options?: FindManyOptions<Practice>) {
    return await this.practicesRepository.find(options)
  }

  async create (organization: Organization, practiceDto: CreatePracticeDto) {
    const newPractice = this.practicesRepository.create({
      ...practiceDto,
      organization,
    })

    return await this.practicesRepository.save(newPractice)
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
