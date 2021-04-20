import {
  ConflictException,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, Repository } from 'typeorm'
import { DBErrorCodes } from '../common/constants/db-error-codes.enum'
import { Organization } from '../organizations/entities/organization.entity'
import { CreatePracticeDto } from './dto/create-practice.dto'
import { Practice } from './entities/practice.entity'

@Injectable()
export class PracticesService {
  constructor (
    @InjectRepository(Practice)
    private readonly practicesRepository: Repository<Practice>
  ) {}

  async findAll (options?: FindManyOptions<Practice>): Promise<Practice[]> {
    return await this.practicesRepository.find(options)
  }

  async create (
    organization: Organization,
    practiceDto: CreatePracticeDto
  ): Promise<Practice> {
    const newPractice = this.practicesRepository.create({
      ...practiceDto,
      organization
    })

    try {
      await this.practicesRepository.save(newPractice)
    } catch (error) {
      if (error.code === DBErrorCodes.DuplicateEntry) {
        throw new ConflictException(
          `A practice with the name "${newPractice.name}" already exists within the organization`
        )
      }

      throw error
    }

    return newPractice
  }

  async delete (organization: Organization, practiceId: string): Promise<void> {
    const practice = await this.practicesRepository.findOne({
      where: {
        slug: practiceId,
        organization
      }
    })

    if (practice == null) {
      throw new NotFoundException("The practice doesn't exist")
    }

    await this.practicesRepository.delete(practice)
  }
}
