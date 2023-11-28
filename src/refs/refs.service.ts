import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common'
import { ProvidersService } from '../providers/services/providers.service'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Ref } from './entities/ref.entity'
import { ProviderRef } from './entities/providerRef.entity'
import { CreateRefsDTO } from './dtos/create-refs.dto'
import { Provider } from '../providers/entities/provider.entity'
import { CreateOrderDtoPatient } from '../orders/dtos/create-order.dto'
import { PaginationDto } from '../common/dtos/pagination.dto'
import { PAGINATION_PAGE_LIMIT } from '../common/constants/pagination.constant'
import { ProviderDefaultBreed } from './entities/providerDefaultBreed.entity'

@Injectable()
export class RefsService {
  private readonly logger = new Logger(RefsService.name)

  constructor (
    private readonly providersService: ProvidersService,
    @InjectRepository(ProviderRef) private readonly providerRefRepository: Repository<ProviderRef>,
    @InjectRepository(Ref) private readonly refRepository: Repository<Ref>,
    @InjectRepository(ProviderDefaultBreed) private readonly providerDefaultBreedRepository: Repository<ProviderDefaultBreed>
  ) {
  }

  async syncProviderRefs (provider: Provider, mapList: any, type: 'species' | 'breed' | 'sex'): Promise<void> {
    this.logger.log(`Found ${type} in ${provider.id}: ${<string>mapList.items.length}`)
    if (provider.hashes === null || provider.hashes[type] !== mapList.hash) {
      let newRefsCount = 0
      let existingRefsCount = 0
      for (const item of mapList.items) {
        const existingItem = await this.providerRefRepository.findOne({
          where: {
            code: item.code,
            type: type,
            provider: provider
          }
        })

        if (existingItem === undefined) {
          const newItem = this.providerRefRepository.create({
            code: item.code,
            name: item.name,
            type: type,
            provider: provider,
            species: item.species
          })

          await this.providerRefRepository.save(newItem)
          newRefsCount++
        } else {
          existingRefsCount++
        }
      }
      this.logger.log(`New ${type} refs created: ${newRefsCount}`)
      this.logger.log(`Existing ${type} refs: ${existingRefsCount}`)

      provider.hashes = { ...provider.hashes, [type]: mapList.hash }
      await this.providersService.update(provider)
    } else {
      this.logger.log(`No ${type} to sync for ${provider.id}`)
    }
  }

  async syncSpecies (
    provider: Provider,
    integrationId: string
  ): Promise<void> {
    const species = await this.providersService.getSpecies(provider.id, integrationId)
    await this.syncProviderRefs(provider, species, 'species')
  }

  async syncBreeds (
    provider: Provider,
    integrationId: string
  ): Promise<void> {
    const breeds = await this.providersService.getBreeds(provider.id, integrationId)
    await this.syncProviderRefs(provider, breeds, 'breed')
  }

  async syncSexes (
    provider: Provider,
    integrationId: string
  ): Promise<void> {
    const sexes = await this.providersService.getSexes(provider.id, integrationId)
    await this.syncProviderRefs(provider, sexes, 'sex')
  }

  async getSpecies (
    select: Array<(keyof Ref)> = ['code', 'name'],
    relations: string[] = []
  ): Promise<Ref[]> {
    return await this.refRepository.find({ where: { type: 'species' }, select, relations })
  }

  async getBreeds (
    select: Array<(keyof Ref)> = ['code', 'name', 'species'],
    relations: string[] = []
  ): Promise<Ref[]> {
    return await this.refRepository.find({ where: { type: 'breed' }, select, relations })
  }

  async getSexes (
    select: Array<(keyof Ref)> = ['code', 'name'],
    relations: string[] = []
  ): Promise<Ref[]> {
    return await this.refRepository.find({ where: { type: 'sex' }, select, relations })
  }

  async getRefs (
    type: 'sexes' | 'species' | 'breeds',
    paginationDto: PaginationDto
  ): Promise<Ref[]> {
    const take = paginationDto.limit !== undefined ? paginationDto.limit : PAGINATION_PAGE_LIMIT
    const skip = (paginationDto.page - 1) * take

    return await this.refRepository.find({ where: { type: type }, select: ['id', 'name', 'code', 'type', 'providerRef'], relations: ['providerRef', 'providerRef.provider'], skip, take })
  }

  async countRefs (
    type: 'sexes' | 'species' | 'breeds'
  ): Promise<number> {
    return await this.refRepository.count({ where: { type: type } })
  }

  async createRefs (refDto: CreateRefsDTO): Promise<Ref> {
    const existingRef = await this.refRepository.findOne({ where: { code: refDto.code } })

    if (existingRef !== undefined) {
      throw new ConflictException('Ref already exists')
    }
    const newRef = this.refRepository.create({
      name: refDto.name,
      code: refDto.code,
      type: refDto.type,
      species: refDto.species !== null ? refDto.species : undefined
    })
    await this.refRepository.save(newRef)

    for (const providerRefId of refDto.providerRefIds) {
      const providerRef = await this.providerRefRepository.findOne(providerRefId)
      if (providerRef === undefined) {
        throw new NotFoundException('Provider ref not found')
      }
      providerRef.ref = newRef
      await this.providerRefRepository.save(providerRef)
    }

    return newRef
  }

  async updateRefs (id: string, updateRefDto: any): Promise<Ref> {
    const existingRef = await this.findOneById(id)
    if (existingRef === undefined) {
      throw new NotFoundException(`Ref with ID ${id} not found`)
    }
    if (updateRefDto.providerRefIds !== undefined && updateRefDto.providerRefIds.length > 0) {
      existingRef.providerRef = await this.providerRefRepository.findByIds(updateRefDto.providerRefIds)
    }
    await this.refRepository.merge(existingRef, updateRefDto)
    await this.refRepository.save(existingRef)
    return await this.findOneById(id)
  }

  async deleteRefs (id: string): Promise<void> {
    const ref = await this.refRepository.findOne(id, { relations: ['providerRef'] })
    if (ref === undefined) {
      throw new NotFoundException(`Ref with ID ${id} not found`)
    }
    await this.refRepository.remove(ref)
  }

  async findOneById (id: string): Promise<Ref> {
    const ref = await this.refRepository.createQueryBuilder('ref')
      .leftJoin('ref.providerRef', 'providerRef')
      .leftJoin('providerRef.provider', 'provider', 'provider.id = providerRef.provider')
      .select(['ref', 'providerRef', 'provider.id'])
      .where('ref.id = :id', { id })
      .getOne()

    if (ref === undefined) {
      throw new NotFoundException('Ref not found')
    }

    return ref
  }

  async findOneByCodeAndProvider (code: string, provider?: string): Promise<ProviderRef | undefined> {
    return await this.providerRefRepository.createQueryBuilder('providerRef')
      .leftJoin('providerRef.ref', 'ref', 'ref.id = providerRef.ref')
      .leftJoin('providerRef.provider', 'provider', 'provider.id = providerRef.provider')
      .select(['ref', 'providerRef.code', 'provider.id'])
      .where('ref.code = :code AND providerRef.provider = :provider', { code, provider: provider })
      .getOne()
  }

  async findProvidersMappedRefs (): Promise<any> {
    const refs = await this.providerRefRepository.createQueryBuilder('providerRefs')
      .leftJoin('providerRefs.ref', 'ref', 'ref.id = providerRefs.ref')
      .leftJoin('providerRefs.provider', 'provider', 'provider.id = providerRefs.provider')
      .select(['providerRefs', 'ref', 'provider.id'])
      .getMany()

    const { mappedRefs, unmappedRefs } = refs.reduce((acc, obj) => {
      if (obj.ref !== null) {
        acc.mappedRefs.push(obj)
      } else {
        acc.unmappedRefs.push(obj)
      }
      return acc
    }, { mappedRefs: [] as ProviderRef[], unmappedRefs: [] as ProviderRef[] })

    return { mappedRefs, unmappedRefs }
  }

  async findDefaultBreedBySpecies (species: string, providerId: string): Promise<ProviderDefaultBreed | undefined> {
    return await this.providerDefaultBreedRepository.createQueryBuilder('providerDefaultBreed')
      .leftJoin('providerDefaultBreed.provider', 'provider', 'provider.id = providerDefaultBreed.provider')
      .select(['providerDefaultBreed', 'provider.id'])
      .where('providerDefaultBreed.species = :species AND provider.id = :providerId', { species, providerId })
      .getOne()
  }

  async mapPatientRefs (providerId: string, patient: CreateOrderDtoPatient): Promise<void> {
    const attributesToMap = ['sex', 'species', 'breed']

    const mappedPatient: Partial<CreateOrderDtoPatient> = {}

    for (const attribute of attributesToMap) {
      if (patient[attribute] !== undefined) {
        const result = await this.findOneByCodeAndProvider(patient[attribute], providerId)

        if (result !== undefined) {
          mappedPatient[attribute] = result.code
        } else {
          mappedPatient[attribute] = patient[attribute]
        }
      } else if (attribute === 'breed') {
        const defaultBreed = await this.findDefaultBreedBySpecies(mappedPatient.species as string, providerId)
        if (defaultBreed !== undefined) {
          mappedPatient[attribute] = defaultBreed.defaultBreed
        }
      }
    }

    Object.assign(patient, mappedPatient)
  }

  async setDefaultBreed (providerId: string, species: string, defaultBreed: string): Promise<ProviderDefaultBreed> {
    const existingDefaultBreed = await this.findDefaultBreedBySpecies(species, providerId)

    if (existingDefaultBreed !== undefined) {
      existingDefaultBreed.defaultBreed = defaultBreed
      await this.providerDefaultBreedRepository.save(existingDefaultBreed)
      return existingDefaultBreed
    } else {
      const newDefaultBreed = this.providerDefaultBreedRepository.create({
        species,
        defaultBreed,
        provider: { id: providerId }
      })
      await this.providerDefaultBreedRepository.save(newDefaultBreed)
      return newDefaultBreed
    }
  }
}
