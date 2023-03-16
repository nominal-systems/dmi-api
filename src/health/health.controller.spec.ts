import { Test, TestingModule } from '@nestjs/testing'
import { HealthController } from './health.controller'
import {
  HealthCheckService,
  MicroserviceHealthIndicator,
  MongooseHealthIndicator,
  TypeOrmHealthIndicator
} from '@nestjs/terminus'
import { ConfigService } from '@nestjs/config'

describe('HealthController', () => {
  let controller: HealthController

  const healthCheckServiceMock = {}
  const typeOrmHealthIndicatorMock = {}
  const mongooseHealthIndicatorMock = {}
  const microserviceHealthIndicatorMock = {}
  const configServiceMock = {}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        {
          provide: HealthCheckService,
          useValue: healthCheckServiceMock
        },
        {
          provide: TypeOrmHealthIndicator,
          useValue: typeOrmHealthIndicatorMock
        },
        {
          provide: MongooseHealthIndicator,
          useValue: mongooseHealthIndicatorMock
        },
        {
          provide: MicroserviceHealthIndicator,
          useValue: microserviceHealthIndicatorMock
        },
        {
          provide: ConfigService,
          useValue: configServiceMock
        }
      ]
    }).compile()

    controller = module.get<HealthController>(HealthController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
