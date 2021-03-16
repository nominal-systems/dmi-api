import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common'
import { Organization } from '../common/decorators/organization.decorator'
import { ApiGuard } from '../common/guards/api.guard'
import { Organization as OrganizationEntity } from '../organizations/entities/organization.entity'
import { CreatePracticeDto } from './dto/create-practice.dto'
import { PracticesService } from './practices.service'

@Controller('practices')
@UseGuards(ApiGuard)
export class PracticesController {
  constructor (private readonly practicesService: PracticesService) {}

  @Get()
  async getPractices (@Organization() organization: OrganizationEntity) {
    return await this.practicesService.findAll({
      where: {
        organizationId: organization.id,
      },
      relations: ['integrations'],
    })
  }

  @Post()
  async createPractice (
    @Organization() organization: OrganizationEntity,
    @Body() practiceDto: CreatePracticeDto,
  ) {
    return await this.practicesService.create(organization, practiceDto)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deletePractice (
    @Organization() organization: OrganizationEntity,
    @Param('id') practiceId: string,
  ) {
    return await this.practicesService.delete(organization, practiceId)
  }
}
