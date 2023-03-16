import { Controller, Get } from '@nestjs/common'
import {
  HealthCheck,
  HealthCheckService,
  MicroserviceHealthIndicator,
  MongooseHealthIndicator,
  TypeOrmHealthIndicator
} from '@nestjs/terminus'
import { HealthCheckResult } from '@nestjs/terminus/dist/health-check/health-check-result.interface'
import { Transport } from '@nestjs/microservices'
import { ConfigService } from '@nestjs/config'

@Controller('health')
export class HealthController {
  constructor (
    private readonly health: HealthCheckService,
    private readonly db: TypeOrmHealthIndicator,
    private readonly mongoose: MongooseHealthIndicator,
    private readonly microservice: MicroserviceHealthIndicator,
    private readonly configService: ConfigService
  ) {
  }

  @Get()
  @HealthCheck()
  async check (): Promise<HealthCheckResult> {
    return await this.health.check([
      async () => await this.db.pingCheck('database'),
      async () => await this.mongoose.pingCheck('mongo'),
      async () => await this.microservice.pingCheck('activemq', {
        transport: Transport.MQTT,
        options: {
          protocol: this.configService.get('activeMQ.protocol'),
          hostname: this.configService.get('activeMQ.hostname'),
          port: this.configService.get('activeMQ.port'),
          username: this.configService.get('activeMQ.username'),
          password: this.configService.get('activeMQ.password')
        }
      })
    ])
  }
}
