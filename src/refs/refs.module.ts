import { Module } from '@nestjs/common'
import { RefsService } from './refs.service'
import { RefsController } from './refs.controller'

@Module({
  controllers: [RefsController],
  providers: [RefsService]
})
export class RefsModule {}
