import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ProviderRef } from './entities/providerRef.entity'
import { FindManyOptions, Repository } from 'typeorm'
import { ProviderDefaultBreed } from './entities/providerDefaultBreed.entity'

@Injectable()
export class ProviderRefService {
  constructor (
    @InjectRepository(ProviderRef) private readonly providerRefRepository: Repository<ProviderRef>,
    @InjectRepository(ProviderDefaultBreed) private readonly providerDefaultBreedRepository: Repository<ProviderDefaultBreed>
  ) {
  }

  async findOneById (
    id: string
  ): Promise<ProviderRef> {
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

  async findDefaultBreeds (
    providerId: string,
    speciesCodes: string[]
  ): Promise<ProviderRef[]> {
    const defaultBreeds = await this.providerDefaultBreedRepository.createQueryBuilder('providerDefaultBreed')
      .where('providerDefaultBreed.provider = :providerId', { providerId })
      .andWhere('providerDefaultBreed.species IN (:...speciesCodes)', { speciesCodes })
      .getMany()
    const defaultBreedsCodes = defaultBreeds.map(({ defaultBreed }) => defaultBreed)

    if (defaultBreedsCodes.length > 0) {
      return await this.providerRefRepository.createQueryBuilder('providerRef')
        .where('providerRef.provider = :providerId', { providerId })
        .andWhere('providerRef.code IN (:...defaultBreedsCodes)', { defaultBreedsCodes })
        .getMany()
    } else {
      return []
    }
  }
}
