import { Body, Controller, Post } from '@nestjs/common'
import { CreateUserDto } from './dtos/create-user.dto'
import { UserCredentialsDto } from './dtos/user-credentials.dto'
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
}
