import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Query, UseGuards } from '@nestjs/common'
import { Organization } from '../common/decorators/organization.decorator'
import { ApiGuard } from '../common/guards/api.guard'
import { Organization as OrganizationEntity } from '../organizations/entities/organization.entity'
import { CreatePracticeDto } from './dto/create-practice.dto'
import { Practice } from './entities/practice.entity'
import { PracticesService } from './practices.service'
import { PracticeSearchQueryParams } from './dto/practice-search-query-params.dto'

@Controller('practices')
@UseGuards(ApiGuard)
export class PracticesController {
  constructor (private readonly practicesService: PracticesService) {
  }

  @Get()
  async searchPractices (
    @Organization() organization: OrganizationEntity,
    @Query() searchQuery: PracticeSearchQueryParams
  ): Promise<Practice[]> {
    return await this.practicesService.search(organization.id, searchQuery)
  }

  @Get(':id')
  async getPractice (
    @Organization() organization: OrganizationEntity,
    @Param('id') id: string
  ): Promise<Practice> {
    return await this.practicesService.findOne({
      options: {
        where: {
          id,
          organizationId: organization.id
        },
        relations: ['integrations']
      }
    })
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createPractice (
    @Organization() organization: OrganizationEntity,
    @Body() practiceDto: CreatePracticeDto
  ): Promise<Practice> {
    return await this.practicesService.create(organization, practiceDto)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deletePractice (
    @Organization() organization: OrganizationEntity,
    @Param('id') practiceId: string
  ): Promise<void> {
    return await this.practicesService.delete(organization, practiceId)
  }
}
