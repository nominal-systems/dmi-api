import { PracticesService } from './practices.service'
import { Test } from '@nestjs/testing'
import { Repository } from 'typeorm'
import { Practice } from './entities/practice.entity'
import { getRepositoryToken } from '@nestjs/typeorm'
import { MockUtils } from '../common/test/mock-utils'

const repositoryMockFactory: () => MockUtils<Repository<any>> = jest.fn(() => ({
}))

describe('PracticesService', () => {
  let service: PracticesService
  let repositoryMock: MockUtils<Repository<Practice>>

  beforeAll(async () => {
    const mockModule = await Test.createTestingModule({
      providers: [
        PracticesService,
        {
          provide: getRepositoryToken(Practice),
          useFactory: repositoryMockFactory
        }
      ]
    }).compile()

    service = mockModule.get(PracticesService)
    repositoryMock = mockModule.get(getRepositoryToken(Practice))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
