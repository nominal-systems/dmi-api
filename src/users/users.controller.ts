import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors
} from '@nestjs/common'
import { User } from '../common/decorators/user.decorator'
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard'
import { CreateUserDto } from './dtos/create-user.dto'
import { UserCredentialsDto } from './dtos/user-credentials.dto'
import { TokenResponseDto } from './dtos/token-response.dto'
import { User as UserEntity } from './entity/user.entity'
import { UsersService } from './users.service'
import { TransformInterceptor } from '../common/interceptors/transform.interceptor'
import { BasicAuthGuard } from '../common/guards/basic-auth.guard'
import { UserPasswordDto } from './dtos/user-password.dto'

@Controller('users')
export class UsersController {
  constructor (private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(BasicAuthGuard)
  async create (
    @Body() createUserDto: CreateUserDto
  ): Promise<UserEntity> {
    return await this.usersService.create(createUserDto)
  }

  @Get()
  @UseGuards(BasicAuthGuard)
  async listAll (): Promise<UserEntity[]> {
    return await this.usersService.findAll()
  }

  @Get(':id')
  @UseGuards(BasicAuthGuard)
  async getUser (@Param('id') userId: string): Promise<UserEntity> {
    return await this.usersService.findOne({
      id: userId,
      options: {
        relations: ['organization']
      }
    })
  }

  @Post('auth')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(new TransformInterceptor(TokenResponseDto))
  async authenticate (
    @Body() credentials: UserCredentialsDto
  ): Promise<TokenResponseDto> {
    return await this.usersService.authenticate(credentials)
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async profile (@User() user: UserEntity): Promise<UserEntity> {
    return user
  }

  @Put('me/password')
  @UseGuards(JwtAuthGuard)
  async changePassword (@User() user: UserEntity, @Body() userPasswordDto: UserPasswordDto): Promise<void> {
    return await this.usersService.updatePassword(user, userPasswordDto)
  }
}
