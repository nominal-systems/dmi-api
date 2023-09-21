import { Test, TestingModule } from '@nestjs/testing'
import { ResultsController } from './results.controller'
import { ProvidersService } from '../providers/services/providers.service'

describe('ResultsController', () => {
  let resultsController: ResultsController

  const clientProxyMock = {
    send: jest.fn()
  }
  const providersServiceMock = {
    saveProviderRawData: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResultsController],
      providers: [
        {
          provide: 'ACTIVEMQ',
          useValue: clientProxyMock
        },
        {
          provide: ProvidersService,
          useValue: providersServiceMock
        }
      ]
    }).compile()

    resultsController = module.get<ResultsController>(ResultsController)
  })

  it('should be defined', () => {
    expect(resultsController).toBeDefined()
  })
})
