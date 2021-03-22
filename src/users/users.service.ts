import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common'
import { CreateUserDto } from './dtos/create-user.dto'
import { UserCredentialsDto } from './dtos/user-credentials.dto'
import { User } from './entity/user.entity'
import * as argon2 from 'argon2'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Organization } from '../organizations/entities/organization.entity'
import { TokenResponseDto } from './dtos/token-response.dto'
import { FindOneOfTypeOptions } from '../common/typings/find-one-of-type-options.interface'

@Injectable()
export class UsersService {
  constructor (
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  async findOne (args: FindOneOfTypeOptions<User>): Promise<User> {
    const user = await this.usersRepository.findOne(args.id, args.options)

    if (user == null) {
      throw new NotFoundException('The user was not found')
    }

    return user
  }

  async create (user: CreateUserDto): Promise<TokenResponseDto> {
    const newUser = this.usersRepository.create(user)

    try {
      await this.usersRepository.save(newUser)
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('The email already exists')
      }
    }

    const token = await this.generateJwt(newUser)

    return { user: newUser, token }
  }

  async updateOrganization (
    user: User,
    organization: Organization
  ): Promise<void> {
    await this.usersRepository.update({ email: user.email }, { organization })
  }

  async authenticate (
    credentials: UserCredentialsDto
  ): Promise<TokenResponseDto> {
    const user = await this.usersRepository.findOne({
      email: credentials.email
    })

    if (user == null) {
      throw new UnauthorizedException('Username or password is incorrect')
    }

    const isPasswordCorrect = await argon2.verify(
      user.password,
      credentials.password
    )

    if (isPasswordCorrect) {
      const token = await this.generateJwt(user)

      return { user, token }
    }

    throw new UnauthorizedException('Username or password is incorrect')
  }

  async generateJwt (user: User): Promise<string> {
    const token = await this.jwtService.signAsync({}, { subject: user.id })

    return token
  }
}
