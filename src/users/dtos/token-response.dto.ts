import { Type } from 'class-transformer'
import { User } from '../entity/user.entity'

export class TokenResponseDto {
  @Type(() => User)
  user: User

  token: string
}
