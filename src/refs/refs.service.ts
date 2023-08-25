import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common'
import { ProvidersService } from '../providers/services/providers.service'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Refs } from './entities/refs.entity'
import { ProviderRefs } from './entities/providerRefs.entity'
import { CreateRefsDTO } from './dtos/create-refs.dto'
import { RefsMap } from './entities/refsMap.entity'

@Injectable()
export class RefsService {
  private readonly logger = new Logger(RefsService.name)

  constructor (
    private readonly providersService: ProvidersService,
    @InjectRepository(ProviderRefs)
    private readonly providerRefsRepository: Repository<ProviderRefs>,
    @InjectRepository(Refs)
    private readonly refsRepository: Repository<Refs>,
    @InjectRepository(RefsMap)
    private readonly refsMapRepository: Repository<RefsMap>
  ) {
  }

  async syncProviderRefs (providerId: string, mapList: any, type: 'species' | 'breed' | 'sex'): Promise<void> {
    const provider = await this.providersService.findOneById(providerId)
    if (provider.hashes === null || provider.hashes[type] !== mapList.hash) {
      for (const item of mapList.items) {
        const existingItem = await this.providerRefsRepository.findOne({ where: { code: item.code, type: type } })

        if (existingItem === undefined) {
          const newItem = this.providerRefsRepository.create({
            code: item.code,
            name: item.name,
            type: type,
            provider: provider,
            species: item.species
          })

          await this.providerRefsRepository.save(newItem)
        }
      }
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

  async getSpecies (): Promise<Refs[]> {
    return await this.refsRepository.find({ where: { type: 'species' }, relations: ['refsMap', 'refsMap.providerRef'] })
  }

  async getBreeds (): Promise<Refs[]> {
    return await this.refsRepository.find({ where: { type: 'breed' }, relations: ['refsMap', 'refsMap.providerRef'] })
  }

  async getSexes (): Promise<Refs[]> {
    return await this.refsRepository.find({ where: { type: 'sex' }, relations: ['refsMap', 'refsMap.providerRef'] })
  }

  async createRefs (refDto: CreateRefsDTO): Promise<Refs> {
    const existingRef = await this.refsRepository.findOne({ where: { code: refDto.code } })

    if (existingRef !== undefined) {
      throw new ConflictException('Ref already exists')
    }
    const newRef = this.refsRepository.create({
      name: refDto.name,
      code: refDto.code,
      type: refDto.type,
      species: refDto.species !== null ? refDto.species : undefined
    })
    await this.refsRepository.save(newRef)

    for (const providerRefId of refDto.providerRefIds) {
      const providerRef = await this.providerRefsRepository.findOne(providerRefId)
      if (providerRef === undefined) {
        throw new NotFoundException('Provider ref not found')
      }
      const newRefsMap = this.refsMapRepository.create({
        ref: newRef,
        providerRef: providerRef
      })
      await this.refsMapRepository.save(newRefsMap)
    }

    return newRef
  }

  async updateRefs (id: string, updateRefDto: any): Promise<Refs> {
    const existingRef = await this.findOneById(id)
    if (existingRef === undefined) {
      throw new NotFoundException(`Ref with ID ${id} not found`)
    }

    if (updateRefDto.providerRefIds !== undefined && updateRefDto.providerRefIds.length > 0) {
      const providerRefs = await this.providerRefsRepository.findByIds(updateRefDto.providerRefIds)
      if (providerRefs.length !== updateRefDto.providerRefIds.length) {
        throw new NotFoundException('Provider refs not found')
      }

      await this.refsMapRepository.delete(existingRef.refsMap.map(refsMap => refsMap.id))
      existingRef.refsMap = existingRef.refsMap.filter(refsMap => updateRefDto.providerRefIds.includes(refsMap.providerRef.id))
      existingRef.refsMap = providerRefs.map(providerRef => {
        return this.refsMapRepository.create({
          ref: existingRef,
          providerRef: providerRef
        })
      })
      await this.refsMapRepository.save(existingRef.refsMap)
    } else {
      existingRef.refsMap = []
    }

    await this.refsRepository.merge(existingRef, updateRefDto)
    await this.refsRepository.save(existingRef)
    return await this.findOneById(id)
  }

  async deleteRefs (id: string): Promise<void> {
    const ref = await this.refsRepository.findOne(id, { relations: ['refsMap'] })

    if (ref === undefined) {
      throw new NotFoundException(`Ref with ID ${id} not found`)
    }
    await this.refsMapRepository.delete(ref.refsMap.map(refsMap => refsMap.id))
    await this.refsRepository.delete(id)
  }

  async findOneById (id: string): Promise<Refs> {
    const ref = await this.refsRepository.createQueryBuilder('ref')
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
    const refs = await this.providerRefsRepository.createQueryBuilder('providerRefs')
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
    }, { mappedRefs: [] as ProviderRefs[], unmappedRefs: [] as ProviderRefs[] })

    return { mappedRefs, unmappedRefs }
  }
}
