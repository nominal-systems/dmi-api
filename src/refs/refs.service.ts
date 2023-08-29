import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common'
import { ProvidersService } from '../providers/services/providers.service'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Ref } from './entities/ref.entity'
import { ProviderRef } from './entities/providerRef.entity'
import { CreateRefsDTO } from './dtos/create-refs.dto'
import { RefMap } from './entities/refMap.entity'

@Injectable()
export class RefsService {
  private readonly logger = new Logger(RefsService.name)

  constructor (
    private readonly providersService: ProvidersService,
    @InjectRepository(ProviderRef)
    private readonly providerRefRepository: Repository<ProviderRef>,
    @InjectRepository(Ref)
    private readonly refRepository: Repository<Ref>,
    @InjectRepository(RefMap)
    private readonly refMapRepository: Repository<RefMap>
  ) {
  }

  async syncProviderRefs (providerId: string, mapList: any, type: 'species' | 'breed' | 'sex'): Promise<void> {
    const provider = await this.providersService.findOneById(providerId)
    if (provider.hashes === null || provider.hashes[type] !== mapList.hash) {
      let newRefsCount = 0
      let existingRefsCount = 0
      let foundInProviderCount = 0
      for (const item of mapList.items) {
        const [existingItem, count] = await this.providerRefRepository.findAndCount({ where: { code: item.code, type: type } })

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
        if (count > 0) {
          foundInProviderCount++
        }
      }
      this.logger.log(`New ${type} refs created: ${newRefsCount}`)
      this.logger.log(`Existing ${type} refs: ${existingRefsCount}`)
      this.logger.log(`Found in provider ${type} refs: ${foundInProviderCount}`)

      provider.hashes = { ...provider.hashes, [type]: mapList.hash }
      await this.providersService.update(provider)
    }
  }

  async syncSpecies (
    providerId: string,
    integrationId: string
  ): Promise<void> {
    const species = await this.providersService.getSpecies(providerId, integrationId)
    await this.syncProviderRefs(providerId, species, 'species')
  }

  async syncBreeds (
    providerId: string,
    integrationId: string
  ): Promise<void> {
    const breeds = await this.providersService.getBreeds(providerId, integrationId)
    await this.syncProviderRefs(providerId, breeds, 'breed')
  }

  async syncSexes (
    providerId: string,
    integrationId: string
  ): Promise<void> {
    const sexes = await this.providersService.getSexes(providerId, integrationId)
    await this.syncProviderRefs(providerId, sexes, 'sex')
  }

  async getSpecies (): Promise<Ref[]> {
    return await this.refRepository.find({ where: { type: 'species' }, relations: ['refsMap', 'refsMap.providerRef'] })
  }

  async getBreeds (): Promise<Ref[]> {
    return await this.refRepository.find({ where: { type: 'breed' }, relations: ['refsMap', 'refsMap.providerRef'] })
  }

  async getSexes (): Promise<Ref[]> {
    return await this.refRepository.find({ where: { type: 'sex' }, relations: ['refsMap', 'refsMap.providerRef'] })
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
      const newRefsMap = this.refMapRepository.create({
        ref: newRef,
        providerRef: providerRef
      })
      await this.refMapRepository.save(newRefsMap)
    }

    return newRef
  }

  async updateRefs (id: string, updateRefDto: any): Promise<Ref> {
    const existingRef = await this.findOneById(id)
    if (existingRef === undefined) {
      throw new NotFoundException(`Ref with ID ${id} not found`)
    }

    if (updateRefDto.providerRefIds !== undefined && updateRefDto.providerRefIds.length > 0) {
      const providerRefs = await this.providerRefRepository.findByIds(updateRefDto.providerRefIds)
      if (providerRefs.length !== updateRefDto.providerRefIds.length) {
        throw new NotFoundException('Provider refs not found')
      }

      await this.refMapRepository.delete(existingRef.refsMap.map(refsMap => refsMap.id))
      existingRef.refsMap = existingRef.refsMap.filter(refsMap => updateRefDto.providerRefIds.includes(refsMap.providerRef.id))
      existingRef.refsMap = providerRefs.map(providerRef => {
        return this.refMapRepository.create({
          ref: existingRef,
          providerRef: providerRef
        })
      })
      await this.refMapRepository.save(existingRef.refsMap)
    } else {
      existingRef.refsMap = []
    }

    await this.refRepository.merge(existingRef, updateRefDto)
    await this.refRepository.save(existingRef)
    return await this.findOneById(id)
  }

  async deleteRefs (id: string): Promise<void> {
    const ref = await this.refRepository.findOne(id, { relations: ['refsMap'] })

    if (ref === undefined) {
      throw new NotFoundException(`Ref with ID ${id} not found`)
    }
    await this.refMapRepository.delete(ref.refsMap.map(refsMap => refsMap.id))
    await this.refRepository.delete(id)
  }

  async findOneById (id: string): Promise<Ref> {
    const ref = await this.refRepository.createQueryBuilder('ref')
      .leftJoin('ref.refsMap', 'refsMap')
      .leftJoin('refsMap.providerRef', 'providerRef')
      .leftJoin('providerRef.provider', 'provider', 'provider.id = providerRef.provider')
      .select(['ref', 'refsMap', 'providerRef', 'provider.id'])
      .where('ref.id = :id', { id })
      .getOne()

    if (ref === undefined) {
      throw new NotFoundException('Ref not found')
    }

    return ref
  }

  async findProvidersMappedRefs (): Promise<any> {
    const refs = await this.providerRefRepository.createQueryBuilder('providerRefs')
      .leftJoin('providerRefs.refsMap', 'refsMap')
      .leftJoin('refsMap.ref', 'ref')
      .leftJoin('providerRefs.provider', 'provider', 'provider.id = providerRefs.provider')
      .select(['providerRefs', 'ref', 'refsMap', 'provider.id'])
      .getMany()

    const { mappedRefs, unmappedRefs } = refs.reduce((acc, obj) => {
      if (obj.refsMap.length > 0) {
        acc.mappedRefs.push(obj)
      } else {
        acc.unmappedRefs.push(obj)
      }
      return acc
    }, { mappedRefs: [] as ProviderRef[], unmappedRefs: [] as ProviderRef[] })

    return { mappedRefs, unmappedRefs }
  }
}
