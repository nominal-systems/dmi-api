import { Module } from '@nestjs/common'
import { AdminController } from './admin.controller'
import { ProvidersModule } from '../providers/providers.module'

@Module({
  imports: [ProvidersModule],
  controllers: [AdminController]
})
export class AdminModule {}
