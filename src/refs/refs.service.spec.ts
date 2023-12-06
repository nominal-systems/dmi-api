import { Test, TestingModule } from '@nestjs/testing'
import { RefsService } from './refs.service'
import { ProvidersService } from '../providers/services/providers.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Ref } from './entities/ref.entity'
import { ProviderRef } from './entities/providerRef.entity'
import { CreateRefsDTO } from './dtos/create-refs.dto'
import { CreateOrderDtoPatient } from '../orders/dtos/create-order.dto'
import { Patient } from '../orders/entities/patient.entity'
import { ProviderDefaultBreed } from './entities/providerDefaultBreed.entity'

describe('RefsService', () => {
  let refsService: RefsService
  let refsRepository: Repository<Ref>

  const mockRefsRepository = {
    find: jest.fn(entity => entity),
    findOne: jest.fn(entity => entity),
    create: jest.fn(entity => entity),
    save: jest.fn(entity => entity),
    merge: jest.fn(entity => entity)
  }

  const mockProviderRefsRepository = {
    findOne: jest.fn(entity => entity),
    create: jest.fn(entity => entity),
    save: jest.fn(entity => entity),
    delete: jest.fn(entity => entity),
    findByIds: jest.fn(entity => entity),
    createQueryBuilder: jest.fn(() => ({
      leftJoin: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      getOne: jest.fn().mockResolvedValue({})
    }))
  }

  const mockProvidersService = {
    findOneById: jest.fn(entity => entity),
    update: jest.fn(entity => entity)
    // mock your methods here
  }

  const mockProviderDefaultBreedRepository = {
    create: jest.fn(entity => entity),
    save: jest.fn(entity => entity),
    createQueryBuilder: jest.fn(() => ({
      leftJoin: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      getOne: jest.fn().mockResolvedValue({})
    }))
  }

  const findOneByCodeAndProviderMock = jest.fn()

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RefsService,
        {
          provide: ProvidersService,
          useValue: mockProvidersService
        },
        {
          provide: getRepositoryToken(Ref),
          useValue: mockRefsRepository
        },
        {
          provide: getRepositoryToken(ProviderRef),
          useValue: mockProviderRefsRepository
        },
        {
          provide: getRepositoryToken(ProviderDefaultBreed),
          useValue: mockProviderDefaultBreedRepository
        }
      ]
    }).compile()

    refsService = module.get<RefsService>(RefsService)
    refsRepository = module.get<Repository<Ref>>(getRepositoryToken(Ref))
    refsService.findOneByCodeAndProvider = findOneByCodeAndProviderMock
  })

  it('should be defined', () => {
    expect(refsService).toBeDefined()
  })

  describe('createRefs', () => {
    it('should create a new Refs entity', async () => {
      const createDto: CreateRefsDTO = {
        name: 'Male',
        code: 'MALE',
        type: 'sex',
        providerRefIds: [1, 2]
      }

      const mockNewRef = {
        name: 'Male',
        code: 'MALE',
        type: 'sex',
        species: undefined
      }

      mockRefsRepository.findOne.mockResolvedValue(undefined)
      mockProviderRefsRepository.findOne.mockResolvedValue({
        id: 1,
        code: 'DACHSHUND',
        name: 'Dachshund',
        species: 'CANINE',
        type: 'breed',
        provider: {
          id: 'idexx'
        }
      })
      const result = await refsService.createRefs(createDto)
      mockRefsRepository.create.mockResolvedValue(mockNewRef)
      mockRefsRepository.save.mockResolvedValue(mockNewRef)

      expect(result).toEqual(mockNewRef)
      expect(refsRepository.create).toHaveBeenCalledWith(mockNewRef)
      expect(refsRepository.save).toHaveBeenCalledWith(mockNewRef)
    })
  })

  describe('updateRefs', () => {
    it('should update Refs entity', async () => {
      const refId = 'some-id'
      const updateDto = {
        name: 'Salchicha',
        code: 'SALCHICHA',
        type: 'breed',
        providerRefIds: [430]
      }
      const existingRef = {
        id: 2,
        name: 'Salchicha',
        code: 'SALCHICHA',
        species: 'DOG',
        type: 'breed',
        refsMap: [
          {
            id: 24,
            providerRef: {
              id: 430,
              code: 'DACHSHUND',
              name: 'Dachshund',
              species: 'CANINE',
              type: 'breed',
              provider: {
                id: 'idexx'
              }
            }
          }
        ]
      }

      refsService.findOneById = jest.fn().mockResolvedValue(existingRef)
      refsRepository.merge = jest.fn()
      refsRepository.save = jest.fn().mockResolvedValue(existingRef)

      const result = await refsService.updateRefs(refId, updateDto)

      expect(result).toEqual(existingRef)
      expect(refsService.findOneById).toHaveBeenCalledWith(refId)
      // assert other expected method calls
    })
  })
  describe('mapPatientRefs', () => {
    describe('Antech', () => {
      const patient = {
        name: 'Medicalnotes_author_test',
        sex: 'UNKNOWN',
        species: '36c3cde0-bd6b-11eb-9610-302432eba3e9',
        breed: '1ddc42c3-d7ed-11ea-aa5e-302432eba3ec',
        birthdate: '2022-08-15'
      } as CreateOrderDtoPatient
      it('should map patient refs', async () => {
        findOneByCodeAndProviderMock.mockResolvedValueOnce({ code: 'U' })
        findOneByCodeAndProviderMock.mockResolvedValueOnce({ code: '41' })
        findOneByCodeAndProviderMock.mockResolvedValueOnce({ code: '163' })

        await refsService.mapPatientRefs('antech', patient)
        expect(patient).toEqual(expect.objectContaining({
          sex: 'U',
          species: '41',
          breed: '163'
        }))
      })
      it('should map existing patient refs only', async () => {
        const patient = {
          name: 'Medicalnotes_author_test',
          sex: 'UNKNOWN',
          species: '36c3cde0-bd6b-11eb-9610-302432eba3e9',
          birthdate: '2022-08-15'
        } as CreateOrderDtoPatient
        findOneByCodeAndProviderMock.mockResolvedValueOnce({ code: 'U' })
        findOneByCodeAndProviderMock.mockResolvedValueOnce({ code: '41' })
        await refsService.mapPatientRefs('antech', patient)
        expect(patient).toEqual(expect.objectContaining({
          sex: 'U',
          species: '41'
        }))
      })
    })
    describe('Idexx', () => {
      const patient = {
        name: 'Medicalnotes_author_test',
        sex: 'UNKNOWN',
        species: '36c3cde0-bd6b-11eb-9610-302432eba3e9',
        breed: '1ddc42c3-d7ed-11ea-aa5e-302432eba3ec',
        birthdate: '2022-08-15'
      } as CreateOrderDtoPatient
      it('should map patient refs', async () => {
        findOneByCodeAndProviderMock.mockResolvedValueOnce({ code: 'UNKNOWN' })
        findOneByCodeAndProviderMock.mockResolvedValueOnce({ code: 'CANINE' })
        findOneByCodeAndProviderMock.mockResolvedValueOnce({ code: 'SCHIPPERKE' })

        await refsService.mapPatientRefs('idexx', patient)
        expect(patient).toEqual(expect.objectContaining({
          sex: 'UNKNOWN',
          species: 'CANINE',
          breed: 'SCHIPPERKE'
        }))
      })
      it('should map existing patient refs only', async () => {
        const patient = {
          name: 'Medicalnotes_author_test',
          sex: 'UNKNOWN',
          species: '36c3cde0-bd6b-11eb-9610-302432eba3e9',
          birthdate: '2022-08-15'
        } as CreateOrderDtoPatient
        findOneByCodeAndProviderMock.mockResolvedValueOnce({ code: 'UNKNOWN' })
        findOneByCodeAndProviderMock.mockResolvedValueOnce({ code: 'CANINE' })
        await refsService.mapPatientRefs('idexx', patient)
        expect(patient).toEqual(expect.objectContaining({
          sex: 'UNKNOWN',
          species: 'CANINE'
        }))
      })
    })
    describe('Zoetis', () => {
      const patient = {
        name: 'Medicalnotes_author_test',
        sex: 'UNKNOWN',
        species: '36c3cde0-bd6b-11eb-9610-302432eba3e9',
        breed: '1ddc42c3-d7ed-11ea-aa5e-302432eba3ec',
        birthdate: '2022-08-15'
      } as CreateOrderDtoPatient
      it('should map patient refs', async () => {
        findOneByCodeAndProviderMock.mockResolvedValueOnce(undefined)
        findOneByCodeAndProviderMock.mockResolvedValueOnce({ code: 'DOG' })
        findOneByCodeAndProviderMock.mockResolvedValueOnce(undefined)

        await refsService.mapPatientRefs('zoetis', patient)
        expect(patient).toEqual(expect.objectContaining({
          sex: 'UNKNOWN',
          species: 'DOG',
          breed: '1ddc42c3-d7ed-11ea-aa5e-302432eba3ec'
        }))
      })
      it('should map existing patient refs only', async () => {
        const patient = {
          name: 'Medicalnotes_author_test',
          sex: 'UNKNOWN',
          species: '36c3cde0-bd6b-11eb-9610-302432eba3e9',
          birthdate: '2022-08-15'
        } as CreateOrderDtoPatient
        findOneByCodeAndProviderMock.mockResolvedValueOnce(undefined)
        findOneByCodeAndProviderMock.mockResolvedValueOnce({ code: 'DOG' })
        await refsService.mapPatientRefs('zoetis', patient)
        expect(patient).toEqual(expect.objectContaining({
          sex: 'UNKNOWN',
          species: 'DOG'
        }))
      })
    })
  })
  describe('mapPatientReferences', () => {
    describe('Antech', () => {
      it('should map patient coming as dmi refs', async () => {
        const createOrderDto = {
          patient: {
            name: 'Medicalnotes_author_test',
            sex: 'b81354c6-9dca-46d1-91cb-b41c03ee3184',
            species: '36c3cde0-bd6b-11eb-9610-302432eba3e9',
            breed: '1ddc42c3-d7ed-11ea-aa5e-302432eba3ec',
            birthdate: '2022-08-15'
          } as CreateOrderDtoPatient
        }
        const providerPatient = {
          sex: 'b81354c6-9dca-46d1-91cb-b41c03ee3184',
          species: '36c3cde0-bd6b-11eb-9610-302432eba3e9',
          breed: '1ddc42c3-d7ed-11ea-aa5e-302432eba3ec'
        } as Patient
        findOneByCodeAndProviderMock.mockResolvedValueOnce({ code: '36c3cde0-bd6b-11eb-9610-302432eba3e9' })
        findOneByCodeAndProviderMock.mockResolvedValueOnce({ code: '1ddc42c3-d7ed-11ea-aa5e-302432eba3ec' })
        findOneByCodeAndProviderMock.mockResolvedValueOnce({ code: 'b81354c6-9dca-46d1-91cb-b41c03ee3184' })
        findOneByCodeAndProviderMock.mockResolvedValueOnce({ code: 'U' })
        findOneByCodeAndProviderMock.mockResolvedValueOnce({ code: '41' })
        findOneByCodeAndProviderMock.mockResolvedValueOnce({ code: '163' })
        await refsService.mapPatientReferences(createOrderDto, providerPatient, 'antech')
        expect(createOrderDto.patient).toEqual(expect.objectContaining({
          name: 'Medicalnotes_author_test',
          birthdate: '2022-08-15',
          sex: 'b81354c6-9dca-46d1-91cb-b41c03ee3184',
          species: '36c3cde0-bd6b-11eb-9610-302432eba3e9',
          breed: '1ddc42c3-d7ed-11ea-aa5e-302432eba3ec'
        }))
        expect(providerPatient).toEqual(expect.objectContaining({
          sex: 'U',
          species: '41',
          breed: '163'
        }))
      })
      it('should map patient coming as provider refs', async () => {
        const createOrderDto = {
          patient: {
            name: 'Medicalnotes_author_test',
            sex: 'U',
            species: '41',
            breed: '163',
            birthdate: '2022-08-15'
          } as CreateOrderDtoPatient
        }
        const providerPatient = {
          sex: 'U',
          species: '41',
          breed: '163'
        } as Patient
        findOneByCodeAndProviderMock.mockResolvedValueOnce({ code: '36c3cde0-bd6b-11eb-9610-302432eba3e9' })
        findOneByCodeAndProviderMock.mockResolvedValueOnce({ code: '1ddc42c3-d7ed-11ea-aa5e-302432eba3ec' })
        findOneByCodeAndProviderMock.mockResolvedValueOnce({ code: 'b81354c6-9dca-46d1-91cb-b41c03ee3184' })
        findOneByCodeAndProviderMock.mockResolvedValueOnce({ code: 'U' })
        findOneByCodeAndProviderMock.mockResolvedValueOnce({ code: '41' })
        findOneByCodeAndProviderMock.mockResolvedValueOnce({ code: '163' })
        await refsService.mapPatientReferences(createOrderDto, providerPatient, 'antech')
        expect(createOrderDto.patient).toEqual(expect.objectContaining({
          name: 'Medicalnotes_author_test',
          birthdate: '2022-08-15',
          sex: 'b81354c6-9dca-46d1-91cb-b41c03ee3184',
          species: '36c3cde0-bd6b-11eb-9610-302432eba3e9',
          breed: '1ddc42c3-d7ed-11ea-aa5e-302432eba3ec'
        }))
        expect(providerPatient).toEqual(expect.objectContaining({
          sex: 'U',
          species: '41',
          breed: '163'
        }))
      })
    })
    describe('Idexx', () => {
      it('should map patient coming as dmi refs', async () => {
        const createOrderDto = {
          patient: {
            name: 'Medicalnotes_author_test',
            sex: 'b81354c6-9dca-46d1-91cb-b41c03ee3184',
            species: '36c3cde0-bd6b-11eb-9610-302432eba3e9',
            breed: '1ddc42c3-d7ed-11ea-aa5e-302432eba3ec',
            birthdate: '2022-08-15'
          } as CreateOrderDtoPatient
        }
        const providerPatient = {
          sex: 'b81354c6-9dca-46d1-91cb-b41c03ee3184',
          species: '36c3cde0-bd6b-11eb-9610-302432eba3e9',
          breed: '1ddc42c3-d7ed-11ea-aa5e-302432eba3ec'
        } as Patient
        findOneByCodeAndProviderMock.mockResolvedValueOnce({ code: '36c3cde0-bd6b-11eb-9610-302432eba3e9' })
        findOneByCodeAndProviderMock.mockResolvedValueOnce({ code: '1ddc42c3-d7ed-11ea-aa5e-302432eba3ec' })
        findOneByCodeAndProviderMock.mockResolvedValueOnce({ code: 'b81354c6-9dca-46d1-91cb-b41c03ee3184' })
        findOneByCodeAndProviderMock.mockResolvedValueOnce({ code: 'UNKNOWN' })
        findOneByCodeAndProviderMock.mockResolvedValueOnce({ code: 'CANINE' })
        findOneByCodeAndProviderMock.mockResolvedValueOnce({ code: 'SCHIPPERKE' })

        await refsService.mapPatientReferences(createOrderDto, providerPatient, 'antech')
        expect(createOrderDto.patient).toEqual(expect.objectContaining({
          name: 'Medicalnotes_author_test',
          birthdate: '2022-08-15',
          sex: 'b81354c6-9dca-46d1-91cb-b41c03ee3184',
          species: '36c3cde0-bd6b-11eb-9610-302432eba3e9',
          breed: '1ddc42c3-d7ed-11ea-aa5e-302432eba3ec'
        }))
        expect(providerPatient).toEqual(expect.objectContaining({
          sex: 'UNKNOWN',
          species: 'CANINE',
          breed: 'SCHIPPERKE'
        }))
      })
      it('should map patient coming as provider refs', async () => {
        const createOrderDto = {
          patient: {
            name: 'Medicalnotes_author_test',
            sex: 'UNKNOWN',
            species: 'CANINE',
            breed: 'SCHIPPERKE',
            birthdate: '2022-08-15'
          } as CreateOrderDtoPatient
        }
        const providerPatient = {
          sex: 'UNKNOWN',
          species: 'CANINE',
          breed: 'SCHIPPERKE'
        } as Patient
        findOneByCodeAndProviderMock.mockResolvedValueOnce({ code: '36c3cde0-bd6b-11eb-9610-302432eba3e9' })
        findOneByCodeAndProviderMock.mockResolvedValueOnce({ code: '1ddc42c3-d7ed-11ea-aa5e-302432eba3ec' })
        findOneByCodeAndProviderMock.mockResolvedValueOnce({ code: 'b81354c6-9dca-46d1-91cb-b41c03ee3184' })
        findOneByCodeAndProviderMock.mockResolvedValueOnce({ code: 'UNKNOWN' })
        findOneByCodeAndProviderMock.mockResolvedValueOnce({ code: 'CANINE' })
        findOneByCodeAndProviderMock.mockResolvedValueOnce({ code: 'SCHIPPERKE' })
        await refsService.mapPatientReferences(createOrderDto, providerPatient, 'antech')
        expect(createOrderDto.patient).toEqual(expect.objectContaining({
          name: 'Medicalnotes_author_test',
          birthdate: '2022-08-15',
          sex: 'b81354c6-9dca-46d1-91cb-b41c03ee3184',
          species: '36c3cde0-bd6b-11eb-9610-302432eba3e9',
          breed: '1ddc42c3-d7ed-11ea-aa5e-302432eba3ec'
        }))
        expect(providerPatient).toEqual(expect.objectContaining({
          sex: 'UNKNOWN',
          species: 'CANINE',
          breed: 'SCHIPPERKE'
        }))
      })
    })
    describe('Zoetis', () => {
      it('should map patient refs', async () => {
        const createOrderDto = {
          patient: {
            name: 'Medicalnotes_author_test',
            sex: 'b81354c6-9dca-46d1-91cb-b41c03ee3184',
            species: '36c3cde0-bd6b-11eb-9610-302432eba3e9',
            breed: '1ddc42c3-d7ed-11ea-aa5e-302432eba3ec',
            birthdate: '2022-08-15'
          } as CreateOrderDtoPatient
        }
        const providerPatient = {
          sex: 'b81354c6-9dca-46d1-91cb-b41c03ee3184',
          species: '36c3cde0-bd6b-11eb-9610-302432eba3e9',
          breed: '1ddc42c3-d7ed-11ea-aa5e-302432eba3ec'
        } as Patient
        findOneByCodeAndProviderMock.mockResolvedValueOnce({ code: '36c3cde0-bd6b-11eb-9610-302432eba3e9' })
        findOneByCodeAndProviderMock.mockResolvedValueOnce({ code: '1ddc42c3-d7ed-11ea-aa5e-302432eba3ec' })
        findOneByCodeAndProviderMock.mockResolvedValueOnce({ code: 'b81354c6-9dca-46d1-91cb-b41c03ee3184' })
        findOneByCodeAndProviderMock.mockResolvedValueOnce({ code: 'UNKNOWN' })
        findOneByCodeAndProviderMock.mockResolvedValueOnce({ code: 'DOG' })
        findOneByCodeAndProviderMock.mockResolvedValueOnce(undefined)

        await refsService.mapPatientReferences(createOrderDto, providerPatient, 'antech')
        expect(createOrderDto.patient).toEqual(expect.objectContaining({
          name: 'Medicalnotes_author_test',
          birthdate: '2022-08-15',
          sex: 'b81354c6-9dca-46d1-91cb-b41c03ee3184',
          species: '36c3cde0-bd6b-11eb-9610-302432eba3e9',
          breed: '1ddc42c3-d7ed-11ea-aa5e-302432eba3ec'
        }))
        expect(providerPatient).toEqual(expect.objectContaining({
          sex: 'UNKNOWN',
          species: 'DOG',
          breed: '1ddc42c3-d7ed-11ea-aa5e-302432eba3ec'
        }))
      })
      it('should map patient coming as provider refs', async () => {
        const createOrderDto = {
          patient: {
            name: 'Medicalnotes_author_test',
            sex: 'UNKNOWN',
            species: 'DOG',
            breed: '1ddc42c3-d7ed-11ea-aa5e-302432eba3ec',
            birthdate: '2022-08-15'
          } as CreateOrderDtoPatient
        }
        const providerPatient = {
          sex: 'UNKNOWN',
          species: 'DOG',
          breed: '1ddc42c3-d7ed-11ea-aa5e-302432eba3ec'
        } as Patient
        findOneByCodeAndProviderMock.mockResolvedValueOnce({ code: '36c3cde0-bd6b-11eb-9610-302432eba3e9' })
        findOneByCodeAndProviderMock.mockResolvedValueOnce({ code: '1ddc42c3-d7ed-11ea-aa5e-302432eba3ec' })
        findOneByCodeAndProviderMock.mockResolvedValueOnce({ code: 'b81354c6-9dca-46d1-91cb-b41c03ee3184' })
        findOneByCodeAndProviderMock.mockResolvedValueOnce({ code: 'UNKNOWN' })
        findOneByCodeAndProviderMock.mockResolvedValueOnce({ code: 'DOG' })
        findOneByCodeAndProviderMock.mockResolvedValueOnce(undefined)
        await refsService.mapPatientReferences(createOrderDto, providerPatient, 'antech')
        expect(createOrderDto.patient).toEqual(expect.objectContaining({
          name: 'Medicalnotes_author_test',
          birthdate: '2022-08-15',
          sex: 'b81354c6-9dca-46d1-91cb-b41c03ee3184',
          species: '36c3cde0-bd6b-11eb-9610-302432eba3e9',
          breed: '1ddc42c3-d7ed-11ea-aa5e-302432eba3ec'
        }))
        expect(providerPatient).toEqual(expect.objectContaining({
          sex: 'UNKNOWN',
          species: 'DOG',
          breed: '1ddc42c3-d7ed-11ea-aa5e-302432eba3ec'
        }))
      })
    })
  })
  describe('findDefaultBreedBySpecies', () => {
    describe('Antech', () => {
      it('should find default breed', async () => {
        const mockData = { defaultBreed: '163', species: '41', provider: { id: 'antech' } }
        mockProviderDefaultBreedRepository.createQueryBuilder.mockReturnValue({
          leftJoin: jest.fn().mockReturnThis(),
          select: jest.fn().mockReturnThis(),
          where: jest.fn().mockReturnThis(),
          getOne: jest.fn().mockResolvedValueOnce(mockData)
        })
        const defaultBreed = await refsService.findDefaultBreedBySpecies('36c3cde0-bd6b-11eb-9610-302432eba3e9', 'antech')
        expect(defaultBreed?.defaultBreed).toEqual('163')
      })
    })
    describe('Idexx', () => {
      it('should find default breed', async () => {
        const mockData = { defaultBreed: 'SCHIPPERKE', species: 'DOG', provider: { id: 'idexx' } }
        mockProviderDefaultBreedRepository.createQueryBuilder.mockReturnValue({
          leftJoin: jest.fn().mockReturnThis(),
          select: jest.fn().mockReturnThis(),
          where: jest.fn().mockReturnThis(),
          getOne: jest.fn().mockResolvedValueOnce(mockData)
        })

        const defaultBreed = await refsService.findDefaultBreedBySpecies('36c3cde0-bd6b-11eb-9610-302432eba3e9', 'idexx')
        expect(defaultBreed?.defaultBreed).toEqual('SCHIPPERKE')
      })
    })
  })
  describe('findOneProviderRefByCodeAndProvider', () => {
    describe('Idexx', () => {
      it('should find provider ref', async () => {
        const mockData = { code: 'SCHIPPERKE', species: 'DOG', provider: { id: 'idexx' }, type: 'breed' }
        mockProviderRefsRepository.createQueryBuilder.mockReturnValue({
          leftJoin: jest.fn().mockReturnThis(),
          select: jest.fn().mockReturnThis(),
          where: jest.fn().mockReturnThis(),
          getOne: jest.fn().mockResolvedValueOnce(mockData)
        })
        const providerBreed = await refsService.findOneProviderRefByCodeAndProvider('SCHIPPERKE', 'idexx')
        expect(providerBreed?.code).toEqual('SCHIPPERKE')
      })
    })
  })
})
