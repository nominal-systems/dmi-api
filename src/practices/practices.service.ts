import {
  ConflictException,
  Injectable, Logger,
  NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, Repository } from 'typeorm'
import { FindOneOfTypeOptions } from '../common/typings/find-one-of-type-options.interface'
import { Organization } from '../organizations/entities/organization.entity'
import { CreatePracticeDto } from './dto/create-practice.dto'
import { Practice } from './entities/practice.entity'

@Injectable()
export class PracticesService {
  private readonly logger = new Logger(PracticesService.name)

  constructor (
    @InjectRepository(Practice)
    private readonly practicesRepository: Repository<Practice>
  ) {}

  async findAll (options?: FindManyOptions<Practice>): Promise<Practice[]> {
    return await this.practicesRepository.find(options)
  }

  async findOne (args: FindOneOfTypeOptions<Practice>): Promise<Practice> {
    const practice = await this.practicesRepository.findOne(
      args.id,
      args.options
    )

    if (practice == null) {
      throw new NotFoundException('The practice was not found')
    }

    return practice
  }

  async create (
    organization: Organization,
    practiceDto: CreatePracticeDto
  ): Promise<Practice> {
    const existingPractice = await this.practicesRepository.findOne({
      where: { name: practiceDto.name, organization }
    })

    if (existingPractice != null) {
      throw new ConflictException(
        `A practice with the name "${practiceDto.name}" already exists within the organization`
      )
    }

    const newPractice = this.practicesRepository.create({
      ...practiceDto,
      organization
    })

    await this.practicesRepository.save(newPractice)
    this.logger.log(`Created Practice: '${newPractice.name}' [${newPractice.id}] -> Organization: '${organization.name}'`)

    return newPractice
  }

  async delete (organization: Organization, practiceId: string): Promise<void> {
    const practice = await this.practicesRepository.findOne({
      where: {
        id: practiceId,
        organization
      }
    })

    if (practice == null) {
      throw new NotFoundException("The practice doesn't exist")
    }

    await this.practicesRepository.delete(practice.id)
  }
}
