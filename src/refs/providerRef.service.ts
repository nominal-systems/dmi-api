import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ProviderRef } from './entities/providerRef.entity'
import { FindManyOptions, Repository } from 'typeorm'

@Injectable()
export class ProviderRefService {
  constructor (
    @InjectRepository(ProviderRef) private readonly providerRefRepository: Repository<ProviderRef>
  ) {
  }

  async findAll (
    options?: FindManyOptions<ProviderRef>
  ): Promise<ProviderRef[]> {
    return await this.providerRefRepository.find(options)
  }
}
