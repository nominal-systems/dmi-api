import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { CreateUserDto } from './dtos/create-user.dto'
import { UserCredentialsDto } from './dtos/user-credentials.dto'
import { User } from './entity/user.entity'
import * as argon2 from 'argon2'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Organization } from '../organizations/entities/organization.entity'

@Injectable()
export class UsersService {
  constructor (
    @InjectRepository(User) private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async findOne (user: Partial<User>) {
    return await this.usersRepository.findOne(null, { where: user, relations: ['organization'] })
  }

  async create (user: CreateUserDto) {
    try {
      const newUser = await this.usersRepository.save(user)
      const token = await this.generateJwt(newUser)
      return { token }
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('The email already exists')
      }
    }
  }

  async updateOrganization (user: User, organization: Organization) {
    return await this.usersRepository.update(
      { email: user.email },
      { organization },
    )
  }

  async authenticate (credentials: UserCredentialsDto) {
    const user = await this.usersRepository.findOne(
      { email: credentials.email },
      { select: ['id', 'password'] },
    )

    if (!user) {
      throw new UnauthorizedException('Username or password is incorrect')
    }

    const isPasswordCorrect = await argon2.verify(
      user.password,
      credentials.password,
    )

    if (isPasswordCorrect) {
      const token = await this.generateJwt(user)

      return { token }
    }

    throw new UnauthorizedException('Username or password is incorrect')
  }

  async generateJwt (user: User) {
    const token = await this.jwtService.signAsync({}, { subject: user.id })

    return token
  }
}
