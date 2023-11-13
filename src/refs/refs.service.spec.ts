import { Test, TestingModule } from '@nestjs/testing'
import { RefsService } from './refs.service'
import { ProvidersService } from '../providers/services/providers.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Ref } from './entities/ref.entity'
import { ProviderRef } from './entities/providerRef.entity'
import { CreateRefsDTO } from './dtos/create-refs.dto'
import { CreateOrderDtoPatient } from '../orders/dtos/create-order.dto'

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
    findByIds: jest.fn(entity => entity)
  }

  const mockProvidersService = {
    findOneById: jest.fn(entity => entity),
    update: jest.fn(entity => entity)
    // mock your methods here
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
})
