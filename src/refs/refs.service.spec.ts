import { Test, TestingModule } from '@nestjs/testing'
import { RefsService } from './refs.service'
import { ProvidersService } from '../providers/services/providers.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Refs } from './entities/refs.entity'
import { ProviderRefs } from './entities/providerRefs.entity'
import { RefsMap } from './entities/refsMap.entity'
import { CreateRefsDTO } from './dtos/create-refs.dto'

describe('RefsService', () => {
  let refsService: RefsService
  let refsRepository: Repository<Refs>
  let refsMapRepository: Repository<RefsMap>

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

  const mockRefsMapRepository = {
    create: jest.fn(entity => entity),
    save: jest.fn(entity => entity),
    delete: jest.fn(entity => entity)
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
          provide: getRepositoryToken(Refs),
          useValue: mockRefsRepository
        },
        {
          provide: getRepositoryToken(ProviderRefs),
          useValue: mockProviderRefsRepository
        },
        {
          provide: getRepositoryToken(RefsMap),
          useValue: mockRefsMapRepository
        }
      ]
    }).compile()

    refsService = module.get<RefsService>(RefsService)
    refsRepository = module.get<Repository<Refs>>(getRepositoryToken(Refs))
    refsMapRepository = module.get<Repository<RefsMap>>(getRepositoryToken(RefsMap))
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
            providerRefIds: [1832, 1774]
      }

      const mockNewRef = {
        name: 'Male',
        code: 'MALE',
        type: 'sex',
        species: undefined
    }

    mockRefsRepository.findOne.mockResolvedValue(undefined)
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
      refsMapRepository.delete = jest.fn().mockResolvedValue(true)
      refsMapRepository.create = jest.fn().mockReturnValue({}) // mock refsMap object
      refsMapRepository.save = jest.fn().mockResolvedValue(true)
      refsRepository.merge = jest.fn()
      refsRepository.save = jest.fn().mockResolvedValue(existingRef)

      const result = await refsService.updateRefs(refId, updateDto)

      expect(result).toEqual(existingRef)
      expect(refsService.findOneById).toHaveBeenCalledWith(refId)
      // assert other expected method calls
    })
  })
})
