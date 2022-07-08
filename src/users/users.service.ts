import { ConflictException, Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { CreateUserDto } from './dtos/create-user.dto'
import { UserCredentialsDto } from './dtos/user-credentials.dto'
import { User as UserEntity, User } from './entity/user.entity'
import * as argon2 from 'argon2'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Organization } from '../organizations/entities/organization.entity'
import { TokenResponseDto } from './dtos/token-response.dto'
import { FindOneOfTypeOptions } from '../common/typings/find-one-of-type-options.interface'
import { DBErrorCodes } from '../common/constants/db-error-codes.enum'
import { UserPasswordDto } from './dtos/user-password.dto'

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name)

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

  async findAll (): Promise<User[]> {
    return await this.usersRepository.find()
  }

  async create (user: CreateUserDto): Promise<UserEntity> {
    const newUser = this.usersRepository.create(user)

    try {
      await this.usersRepository.save(newUser)
    } catch (error) {
      if (error.code === DBErrorCodes.DuplicateEntry) {
        throw new ConflictException('The email already exists')
      }

      this.logger.debug(JSON.stringify(error, null, 2))

      throw error
    }

    return newUser
  }

  async updatePassword (user: User, userPasswordDto: UserPasswordDto): Promise<void> {
    user.password = userPasswordDto.password
    await this.usersRepository.save(user)
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
    const user = await this.findOne({
      options: {
        where: { email: credentials.email }
      }
    })

    const isPasswordCorrect = await argon2.verify(
      user.password,
      credentials.password
    )

    if (isPasswordCorrect) {
      const token = await this.generateJwt(user)

      return {
        user,
        token
      }
    }

    throw new UnauthorizedException('Username or password is incorrect')
  }

  async generateJwt (user: User): Promise<string> {
    const token = await this.jwtService.signAsync({}, { subject: user.id })

    return token
  }
}
