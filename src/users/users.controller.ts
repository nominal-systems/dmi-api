import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, UseInterceptors } from '@nestjs/common'
import { User } from '../common/decorators/user.decorator'
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard'
import { CreateUserDto } from './dtos/create-user.dto'
import { UserCredentialsDto } from './dtos/user-credentials.dto'
import { TokenResponseDto } from './dtos/token-response.dto'
import { User as UserEntity } from './entity/user.entity'
import { UsersService } from './users.service'
import { TransformInterceptor } from '../common/interceptors/transform.interceptor'
import { BasicAuthGuard } from '../common/guards/basic-auth.guard'

@Controller('users')
export class UsersController {
  constructor (private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(BasicAuthGuard)
  @UseInterceptors(new TransformInterceptor(TokenResponseDto))
  async create (
    @Body() createUserDto: CreateUserDto
  ): Promise<TokenResponseDto> {
    return await this.usersService.create(createUserDto)
  }

  @Get()
  @UseGuards(BasicAuthGuard)
  async listAll (): Promise<UserEntity[]> {
    return await this.usersService.findAll();
  }

  @Post('authenticate')
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
}
