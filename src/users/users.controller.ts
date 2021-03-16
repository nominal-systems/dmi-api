import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { User } from '../common/decorators/user.decorator'
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard'
import { CreateUserDto } from './dtos/create-user.dto'
import { UserCredentialsDto } from './dtos/user-credentials.dto'
import { User as UserEntity } from './entity/user.entity'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor (private readonly usersService: UsersService) {}

  @Post('sign_up')
  async signUp (@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto)
  }

  @Post('authenticate')
  async authenticate (@Body() credentials: UserCredentialsDto) {
    return await this.usersService.authenticate(credentials)
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async profile (@User() user: UserEntity) {
    return user
  }
}
