import { Test, TestingModule } from '@nestjs/testing'
import { RefsService } from './refs.service'
import { ProvidersService } from '../providers/services/providers.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Ref } from './entities/ref.entity'
import { ProviderRef } from './entities/providerRef.entity'
import { CreateRefsDTO } from './dtos/create-refs.dto'

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
})
