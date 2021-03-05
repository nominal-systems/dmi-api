import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateUserDto } from './dtos/create-user.dto'
import { UserCredentialsDto } from './dtos/user-credentials.dto'
import { User, UserDocument } from './schemas/user.schema'
import * as argon2 from 'argon2'
import { OrganizationDocument } from '../organizations/schemas/organization.schema'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class UsersService {
  constructor (
    @InjectModel(User.name) private UserModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async findOne (user: any) {
    return await this.UserModel.findOne(user, { password: 0 })
  }

  async create (user: CreateUserDto) {
    const newUser = new this.UserModel(user)

    try {
      await newUser.save()
      const token = await this.generateJwt(newUser)
      return { token }
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('The email already exists')
      }
    }
  }

  async updateOrganization (
    user: UserDocument,
    organization: OrganizationDocument,
  ) {
    return await this.UserModel.updateOne(
      { email: user.email },
      { organization: organization._id },
    )
  }

  async authenticate (credentials: UserCredentialsDto) {
    const user = await this.UserModel.findOne({ email: credentials.email })

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

  async generateJwt (user: UserDocument) {
    const token = await this.jwtService.signAsync({}, { subject: user.id })

    return token
  }
}
