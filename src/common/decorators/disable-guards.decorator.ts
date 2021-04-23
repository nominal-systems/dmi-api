import { CustomDecorator, SetMetadata } from '@nestjs/common'
import { ClassType } from '../typings/class.type'

export const DisableGuards = (...guards: ClassType[]): CustomDecorator =>
  SetMetadata('disabledGuards', guards)
