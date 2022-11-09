import { Test, TestingModule } from '@nestjs/testing'
import { AdminController } from './admin.controller'
import { ConfigService } from '@nestjs/config'
import { ProviderConfigurationsService } from '../providers/services/provider-configurations.service'

describe('AdminController', () => {
  let controller: AdminController
  const configServiceMock = {
    get: jest.fn()
  }
  const providersConfigurationsServiceMock = {}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
      providers: [
        {
          provide: ConfigService,
          useValue: configServiceMock
        },
        {
          provide: ProviderConfigurationsService,
          useValue: providersConfigurationsServiceMock
        }
      ]
    }).compile()

    controller = module.get<AdminController>(AdminController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
