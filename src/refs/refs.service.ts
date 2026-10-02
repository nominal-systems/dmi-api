import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common'
import { ProvidersService } from '../providers/services/providers.service'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import { Ref } from './entities/ref.entity'
import { ProviderRef } from './entities/providerRef.entity'
import { CreateRefsDTO } from './dtos/create-refs.dto'
import { Provider } from '../providers/entities/provider.entity'
import { CreateOrderDtoPatient } from '../orders/dtos/create-order.dto'
import { ProviderDefaultBreed } from './entities/providerDefaultBreed.entity'
import { ProviderSpeciesMappingDefaultBreed } from './entities/providerSpeciesMappingDefaultBreed.entity'
import { Patient } from '../orders/entities/patient.entity'
import { Breed, ReferenceDataResponse, Sex, Species } from '@nominal-systems/dmi-engine-common'

@Injectable()
export class RefsService {
  private readonly logger = new Logger(RefsService.name)

  constructor (
    private readonly providersService: ProvidersService,
    @InjectRepository(ProviderRef) private readonly providerRefRepository: Repository<ProviderRef>,
    @InjectRepository(Ref) private readonly refRepository: Repository<Ref>,
    @InjectRepository(ProviderDefaultBreed) private readonly providerDefaultBreedRepository: Repository<ProviderDefaultBreed>,
    @InjectRepository(ProviderSpeciesMappingDefaultBreed) private readonly providerSpeciesMappingDefaultBreedRepository: Repository<ProviderSpeciesMappingDefaultBreed>,
  ) {
  }

  async syncProviderRefs (provider: Provider, mapList: ReferenceDataResponse<Sex | Breed | Species>, type: 'species' | 'breed' | 'sex'): Promise<void> {
    this.logger.log(`Found ${type} in ${provider.id}: ${mapList.items.length}`)
    if (type === 'breed') {
      this.assertOneSpeciesPerBreed(provider, mapList.items)
    }
    if (provider.hashes === null || provider.hashes[type] !== mapList.hash) {
      let newRefsCount = 0
      let updatedRefsCount = 0
      let skippedRefsCount = 0
      for (const item of mapList.items) {
        const existingItem = await this.providerRefRepository.findOne({
          where: {
            code: item.code,
            type: type,
            provider: provider,
          },
        })

        if (existingItem === null) {
          const newItem = this.providerRefRepository.create({
            code: item.code,
            name: item.name,
            type: type,
            provider: provider,
            species: 'species' in item ? item.species : undefined,
          })
          await this.providerRefRepository.save(newItem)
          newRefsCount++
        } else {
          if (existingItem.name !== item.name || ('species' in item && existingItem.species !== item.species)) {
            existingItem.name = item.name
            existingItem.species = 'species' in item ? item.species : undefined
            await this.providerRefRepository.save(existingItem)
            updatedRefsCount++
          }
          skippedRefsCount++
        }
      }
      this.logger.log(`Created ${type} refs: ${newRefsCount}`)
      this.logger.log(`Updated ${type} refs: ${updatedRefsCount}`)
      this.logger.log(`Skipped ${type} refs: ${skippedRefsCount}`)

      provider.hashes = { ...provider.hashes, [type]: mapList.hash }
      await this.providersService.update(provider)
    } else {
      this.logger.log(`No ${type} to sync for ${provider.id}`)
    }
  }

  // A patient is sent with its provider breed's own species (see mapPatientRefs), which only holds
  // if every breed code belongs to one species. A breed list that files a code under several species
  // is refused as a whole, rather than letting the sync keep whichever item happened to come last.
  // Repeats with the same species are not a conflict, and an item without a species is not counted.
  private assertOneSpeciesPerBreed (provider: Provider, items: Array<Sex | Breed | Species>): void {
    const speciesByCode = new Map<string, Set<string>>()
    for (const item of items) {
      const species = 'species' in item ? item.species : undefined
      if (species === undefined || species === null || species === '') {
        continue
      }
      const seen = speciesByCode.get(item.code) ?? new Set<string>()
      seen.add(String(species))
      speciesByCode.set(item.code, seen)
    }

    const conflicts = [...speciesByCode]
      .filter(([, species]) => species.size > 1)
      .map(([code, species]) => `${code} (species ${[...species].join(', ')})`)
    if (conflicts.length > 0) {
      const message = `Refusing breed sync for ${provider.id}: breed codes listed under more than one species: ${conflicts.join('; ')}`
      this.logger.error(message)
      throw new Error(message)
    }
  }

  async syncSpecies (
    provider: Provider,
    integrationId: string,
  ): Promise<void> {
    const species = await this.providersService.getSpecies(provider.id, integrationId)
    await this.syncProviderRefs(provider, species, 'species')
  }

  async syncBreeds (
    provider: Provider,
    integrationId: string,
  ): Promise<void> {
    const breeds = await this.providersService.getBreeds(provider.id, integrationId)
    await this.syncProviderRefs(provider, breeds, 'breed')
  }

  async syncSexes (
    provider: Provider,
    integrationId: string,
  ): Promise<void> {
    const sexes = await this.providersService.getSexes(provider.id, integrationId)
    await this.syncProviderRefs(provider, sexes, 'sex')
  }

  async getSpecies (
    select: Array<(keyof Ref)> = ['code', 'name'],
    relations: string[] = [],
  ): Promise<Ref[]> {
    return await this.refRepository.find({ where: { type: 'species' }, select, relations })
  }

  async getBreeds (
    select: Array<(keyof Ref)> = ['code', 'name', 'species'],
    relations: string[] = [],
  ): Promise<Ref[]> {
    return await this.refRepository.find({ where: { type: 'breed' }, select, relations })
  }

  async getSexes (
    select: Array<(keyof Ref)> = ['code', 'name'],
    relations: string[] = [],
  ): Promise<Ref[]> {
    return await this.refRepository.find({ where: { type: 'sex' }, select, relations })
  }

  async createRefs (refDto: CreateRefsDTO): Promise<Ref> {
    const existingRef = await this.refRepository.findOne({ where: { code: refDto.code } })

    if (existingRef !== null) {
      throw new ConflictException('Ref already exists')
    }
    const newRef = this.refRepository.create({
      name: refDto.name,
      code: refDto.code,
      type: refDto.type,
      species: refDto.species !== null ? refDto.species : undefined,
    })
    await this.refRepository.save(newRef)

    if (refDto.providerRefIds?.length > 0) {
      const providerRefs = await this.providerRefRepository.findBy({ id: In(refDto.providerRefIds) })
      if (providerRefs.length !== refDto.providerRefIds.length) {
        throw new NotFoundException('One or more provider refs not found')
      }
      newRef.providerRef = providerRefs
      await this.refRepository.save(newRef)
    }

    return await this.findOneById(String(newRef.id))
  }

  async updateRefs (id: string, updateRefDto: any): Promise<Ref> {
    const existingRef = await this.findOneById(id)
    if (existingRef === undefined) {
      throw new NotFoundException(`Ref with ID ${id} not found`)
    }
    if (updateRefDto.providerRefIds !== undefined && updateRefDto.providerRefIds.length > 0) {
      existingRef.providerRef = await this.providerRefRepository.findBy({ id: In(updateRefDto.providerRefIds) })
    }
    await this.refRepository.merge(existingRef, updateRefDto)
    await this.refRepository.save(existingRef)
    return await this.findOneById(id)
  }

  async deleteRefs (id: string): Promise<void> {
    const ref = await this.refRepository.findOne({ where: { id: id as any }, relations: ['providerRef'] })
    if (ref === null) {
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

    if (ref === null) {
      throw new NotFoundException('Ref not found')
    }

    return ref
  }

  async findOneByCodeAndProvider (
    code: string,
    provider?: string,
    providerRef = false,
    type?: 'species' | 'breed' | 'sex',
  ): Promise<Ref | ProviderRef | undefined> {
    // Provider codes repeat across types (Antech's '43' is both a species and a breed),
    // so callers that know which kind of ref they want pass the type to keep them apart.
    const query = this.refRepository.createQueryBuilder('ref')
    if (type === undefined) {
      query
        .leftJoinAndSelect('ref.providerRef', 'providerRef', 'providerRef.provider = :provider', { provider })
        .leftJoinAndSelect('providerRef.provider', 'provider')
        .where('ref.code = :code OR providerRef.code = :code', { code })
    } else {
      query
        .leftJoinAndSelect('ref.providerRef', 'providerRef', 'providerRef.provider = :provider AND providerRef.type = :type', { provider, type })
        .leftJoinAndSelect('providerRef.provider', 'provider')
        .where('(ref.code = :code AND ref.type = :type) OR providerRef.code = :code', { code, type })
    }
    const result = await query.getOne()
    if (providerRef) {
      return result?.providerRef[0]
    } else {
      return result ?? undefined
    }
  }

  async findOneProviderRefByCodeAndProvider (code: string, provider?: string): Promise<ProviderRef | undefined> {
    return await this.providerRefRepository.createQueryBuilder('providerRef')
      .leftJoin('providerRef.provider', 'provider', 'provider.id = providerRef.provider')
      .select(['providerRef', 'provider.id'])
      .where('providerRef.code = :code AND providerRef.provider = :provider', {
        code,
        provider: provider,
      })
      .getOne() ?? undefined
  }

  async findProvidersMappedRefs (): Promise<any> {
    const refs = await this.providerRefRepository.createQueryBuilder('providerRefs')
      .leftJoinAndSelect('providerRefs.refs', 'ref')
      .leftJoin('providerRefs.provider', 'provider', 'provider.id = providerRefs.provider')
      .select(['providerRefs', 'ref', 'provider.id'])
      .getMany()

    const { mappedRefs, unmappedRefs } = refs.reduce((acc, obj) => {
      if (Array.isArray(obj.refs) && obj.refs.length > 0) {
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
      .where('providerDefaultBreed.species = :species AND provider.id = :providerId', {
        species,
        providerId,
      })
      .getOne() ?? undefined
  }

  async findMappingDefaultBreed (
    refSpecies: string,
    providerSpecies: string,
    providerId: string,
  ): Promise<ProviderSpeciesMappingDefaultBreed | undefined> {
    return await this.providerSpeciesMappingDefaultBreedRepository.createQueryBuilder('mapping')
      .leftJoin('mapping.provider', 'provider', 'provider.id = mapping.provider')
      .leftJoin('mapping.refSpecies', 'ref')
      .leftJoin('mapping.providerSpecies', 'pSpecies')
      .leftJoin('mapping.defaultBreed', 'breed')
      .select(['mapping', 'provider.id', 'breed.id', 'breed.code', 'breed.name'])
      .where('ref.code = :refSpecies AND pSpecies.code = :providerSpecies AND provider.id = :providerId', {
        refSpecies,
        providerSpecies,
        providerId,
      })
      .getOne() ?? undefined
  }

  async mapPatientRefs (providerId: string, patient: CreateOrderDtoPatient): Promise<void> {
    const attributesToMap: Array<'sex' | 'species' | 'breed'> = ['sex', 'species', 'breed']

    const mappedPatient: Partial<CreateOrderDtoPatient> = {}
    // Track which mapping was used for species to support per-mapping default breed precedence
    let originalRefSpeciesForMapping: string | undefined
    let mappedProviderSpeciesForMapping: string | undefined

    for (const attribute of attributesToMap) {
      if (patient[attribute] !== undefined && patient[attribute] !== null) {
        const result = await this.findOneByCodeAndProvider(patient[attribute], providerId, true, attribute)

        if (result !== undefined) {
          mappedPatient[attribute] = result.code
          if (attribute === 'species') {
            originalRefSpeciesForMapping = patient[attribute]
            mappedProviderSpeciesForMapping = result.code
          }
          // Breed is mapped last, so the breed can refine the species: a provider breed belongs to
          // one provider species, and providers refuse a breed sent under another one.
          if (attribute === 'breed') {
            const species = await this.speciesOfResolvedBreed(
              providerId,
              result as ProviderRef,
              patient[attribute],
              mappedPatient.species,
              originalRefSpeciesForMapping,
            )
            if (species !== undefined) {
              this.logger.log(`Sending species ${species} instead of ${String(mappedPatient.species)} to ${providerId}: it is the species of provider breed ${result.code}`)
              mappedPatient.species = species
            }
          }
        } else if (attribute === 'breed') {
          // Breed not mapped: try mapping-level default first, then provider-level default
          let mappedBreed: string | undefined
          if (originalRefSpeciesForMapping !== undefined && mappedProviderSpeciesForMapping !== undefined) {
            const mappingDefault = await this.findMappingDefaultBreed(
              originalRefSpeciesForMapping,
              mappedProviderSpeciesForMapping,
              providerId,
            )
            mappedBreed = (mappingDefault as any)?.defaultBreed?.code ?? (mappingDefault as any)?.defaultBreed ?? undefined
          }

          if (mappedBreed === undefined) {
            const defaultBreed = await this.findDefaultBreedBySpecies(mappedPatient.species as string, providerId)
            mappedBreed = defaultBreed?.defaultBreed
          }

          mappedPatient[attribute] = mappedBreed ?? (patient[attribute] as any)
        } else {
          mappedPatient[attribute] = patient[attribute]
        }
      } else if (attribute === 'breed') {
        // No breed provided: try mapping-level default first, then provider-level default
        let mappedBreed: string | undefined
        if (originalRefSpeciesForMapping !== undefined && mappedProviderSpeciesForMapping !== undefined) {
          const mappingDefault = await this.findMappingDefaultBreed(
            originalRefSpeciesForMapping,
            mappedProviderSpeciesForMapping,
            providerId,
          )
          mappedBreed = (mappingDefault as any)?.defaultBreed?.code ?? (mappingDefault as any)?.defaultBreed ?? undefined
        }

        if (mappedBreed === undefined) {
          const defaultBreed = await this.findDefaultBreedBySpecies(mappedPatient.species as string, providerId)
          mappedBreed = defaultBreed?.defaultBreed
        }

        mappedPatient[attribute] = mappedBreed ?? (patient[attribute] as any)
      }
    }

    Object.assign(patient, mappedPatient)
  }

  /* The species to send with a resolved provider breed, or undefined when the species already
   * chosen stands. dmi's `Avian` is one species where Antech has twelve, so the breed is what
   * knows which of them a bird is; sending the breed's own species is what makes the pair valid.
   * Three things keep the species as mapped:
   *  - the breed's dmi ref belongs to another dmi species than the one the patient resolved with
   *    (a dog with the breed Siamese): the order contradicts itself, and the species the practice
   *    chose stands — so a provider's refusal of the pair stays as loud as it is today;
   *  - the provider files the breed code under several species (heska's MIX, UNK and HAVAN are
   *    both canine and feline): the species sent stays when it is one of them, and a code that
   *    cannot name one species never moves it;
   *  - the breed row carries no species at all. */
  private async speciesOfResolvedBreed (
    providerId: string,
    breed: ProviderRef,
    breedInput: string,
    sentSpecies: string | undefined,
    resolvedSpeciesInput: string | undefined,
  ): Promise<string | undefined> {
    if (typeof breed.species !== 'string' || breed.species === '' || breed.species === sentSpecies) {
      return undefined
    }

    if (resolvedSpeciesInput !== undefined) {
      const breedRef = await this.findOneByCodeAndProvider(breedInput, providerId, false, 'breed')
      const dmiSpeciesOfBreed = breedRef?.species
      if (typeof dmiSpeciesOfBreed === 'string' && dmiSpeciesOfBreed !== '' && dmiSpeciesOfBreed !== resolvedSpeciesInput) {
        this.logger.warn(`Keeping species ${String(sentSpecies)} for ${providerId}: breed ${breedInput} belongs to dmi species ${dmiSpeciesOfBreed}, the patient came as ${resolvedSpeciesInput}`)
        return undefined
      }
    }

    const rows = await this.providerRefRepository.createQueryBuilder('providerRef')
      .leftJoin('providerRef.provider', 'provider', 'provider.id = providerRef.provider')
      .select(['providerRef.id', 'providerRef.species'])
      .where('providerRef.code = :code AND providerRef.type = :type AND provider.id = :providerId', {
        code: breed.code,
        type: 'breed',
        providerId,
      })
      .getMany()
    const candidates = new Set(rows.map((row) => row.species).filter((species): species is string => typeof species === 'string' && species !== ''))
    if (candidates.size === 0) {
      candidates.add(breed.species)
    }
    if (sentSpecies !== undefined && candidates.has(sentSpecies)) {
      return undefined
    }
    if (candidates.size > 1) {
      this.logger.warn(`Keeping species ${String(sentSpecies)} for ${providerId}: breed code ${breed.code} is filed under ${[...candidates].join(', ')}`)
      return undefined
    }
    return [...candidates][0]
  }

  async mapPatientReferences (order, providerPatient, providerId): Promise<Patient> {
    const { species, sex, weight, ...patient } = providerPatient
    let { breed } = providerPatient
    await this.mapPatientRefs(providerId, providerPatient)
    if (breed === undefined) {
      breed = providerPatient.breed
    }
    const [speciesRef, breedRef, sexRef] = await Promise.all([
      this.findOneByCodeAndProvider(species, providerId, false, 'species'),
      this.findOneByCodeAndProvider(breed, providerId, false, 'breed'),
      this.findOneByCodeAndProvider(sex, providerId, false, 'sex'),
    ])

    const mappedPatient = {
      ...order?.patient,
      ...patient,
      species: speciesRef?.code ?? species,
      breed: breedRef?.code ?? breed,
      sex: sexRef?.code ?? sex,
    }

    if (weight !== undefined) {
      mappedPatient.weightMeasurement = weight?.measurement
      mappedPatient.weightUnits = typeof weight?.units === 'string' ? weight.units.toLowerCase() : weight?.units
    }

    return mappedPatient
  }

  async setDefaultBreed (providerId: string, species: string, defaultBreed: string): Promise<ProviderDefaultBreed> {
    const existingDefaultBreed = await this.findDefaultBreedBySpecies(species, providerId)

    const speciesExists = await this.findOneProviderRefByCodeAndProvider(species, providerId)
    if (speciesExists === undefined) {
      throw new NotFoundException('Species not found')
    }
    const breedExists = await this.findOneProviderRefByCodeAndProvider(defaultBreed, providerId)
    if (breedExists === undefined) {
      throw new NotFoundException('Breed not found')
    }
    if (existingDefaultBreed !== undefined) {
      existingDefaultBreed.defaultBreed = defaultBreed
      await this.providerDefaultBreedRepository.save(existingDefaultBreed)
      return existingDefaultBreed
    } else {
      const newDefaultBreed = this.providerDefaultBreedRepository.create({
        species,
        defaultBreed,
        provider: { id: providerId },
      })
      await this.providerDefaultBreedRepository.save(newDefaultBreed)
      return newDefaultBreed
    }
  }

  async setMapping (refId: number, providerRefId: number): Promise<Ref> {
    const ref = await this.refRepository.findOne({ where: { id: refId }, relations: ['providerRef', 'providerRef.provider'] })
    if (ref === null) {
      throw new NotFoundException('Ref not found')
    }
    const providerRef = await this.providerRefRepository.findOne({ where: { id: providerRefId }, relations: ['provider'] })
    if (providerRef === null) {
      throw new NotFoundException('Provider ref not found')
    }

    const existingMappingIndex = ref.providerRef.findIndex((pr) => pr.provider.id === providerRef.provider.id)
    if (existingMappingIndex > 0) {
      ref.providerRef.splice(existingMappingIndex, 1)
    }
    ref.providerRef.push(providerRef)

    this.logger.log(`Updated mapping for ${ref.type} Ref/${ref.id} (${ref.name}) to ProviderRef/${providerRef.id} (${providerRef.name})`)
    return await this.refRepository.save(ref)
  }

  async unsetMapping (refId: number, providerId: string): Promise<Ref> {
    const ref = await this.refRepository.findOne({ where: { id: refId }, relations: ['providerRef', 'providerRef.provider'] })
    if (ref === null) {
      throw new NotFoundException('Ref not found')
    }

    const before = ref.providerRef.length
    ref.providerRef = ref.providerRef.filter((pr) => pr.provider?.id !== providerId)
    if (ref.providerRef.length === before) {
      // Nothing to unset; treat as success to keep idempotency
      return ref
    }

    this.logger.log(`Unset mapping for ${ref.type} Ref/${ref.id} (${ref.name}) for Provider/${providerId}`)
    return await this.refRepository.save(ref)
  }

  async setMappingDefaultBreed (
    providerId: string,
    refSpecies: string,
    providerSpecies: string,
    defaultBreed: string | null,
  ): Promise<ProviderSpeciesMappingDefaultBreed> {
    // Ensure provider species exists for provider
    const providerSpeciesExists = await this.findOneProviderRefByCodeAndProvider(providerSpecies, providerId)
    if (providerSpeciesExists === undefined) {
      throw new NotFoundException('Provider species not found')
    }
    // Ensure ref species exists
    const refSpeciesExists = await this.refRepository.findOne({ where: { code: refSpecies, type: 'species' } })
    if (refSpeciesExists === null) {
      throw new NotFoundException('Ref species not found')
    }
    // If defaultBreed provided, ensure it exists as a provider breed for this provider
    let breedExists: ProviderRef | undefined
    if (defaultBreed !== null) {
      breedExists = await this.findOneProviderRefByCodeAndProvider(defaultBreed, providerId)
      if (breedExists === undefined || breedExists.type !== 'breed') {
        throw new NotFoundException('Breed not found')
      }
    }

    let mapping = await this.providerSpeciesMappingDefaultBreedRepository.createQueryBuilder('mapping')
      .leftJoin('mapping.provider', 'provider', 'provider.id = mapping.provider')
      .leftJoin('mapping.refSpecies', 'ref')
      .leftJoin('mapping.providerSpecies', 'pSpecies')
      .where('ref.code = :refSpecies AND pSpecies.code = :providerSpecies AND provider.id = :providerId', {
        refSpecies,
        providerSpecies,
        providerId,
      })
      .getOne() ?? undefined

    if (mapping === undefined) {
      mapping = this.providerSpeciesMappingDefaultBreedRepository.create({
        refSpecies: { id: (refSpeciesExists as any).id },
        providerSpecies: { id: (providerSpeciesExists as any).id },
        defaultBreed: breedExists !== undefined ? ({ id: breedExists.id } as any) : null,
        provider: { id: providerId } as any,
      })
    } else {
      mapping.defaultBreed = breedExists !== undefined ? ({ id: breedExists.id } as any) : null
    }
    await this.providerSpeciesMappingDefaultBreedRepository.save(mapping)
    return mapping
  }
}
