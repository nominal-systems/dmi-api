import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ProviderRef } from './entities/providerRef.entity'
import { FindManyOptions, Repository } from 'typeorm'

@Injectable()
export class ProviderRefService {
  constructor (
    @InjectRepository(ProviderRef) private readonly providerRefRepository: Repository<ProviderRef>
  ) {
  }

  async findOneById (id: string): Promise<ProviderRef> {
    const providerRef = await this.providerRefRepository.findOne(id, {
      relations: ['provider']
    })

    if (providerRef === undefined) {
      throw new NotFoundException('ProviderRef not found')
    }

    return providerRef
  }

  async findAll (
    options?: FindManyOptions<ProviderRef>
  ): Promise<ProviderRef[]> {
    return await this.providerRefRepository.find(options)
  }

  async count (
    options?: FindManyOptions<ProviderRef>
  ): Promise<number> {
    return await this.providerRefRepository.count(options)
  }
}
