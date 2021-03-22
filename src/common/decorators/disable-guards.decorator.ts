import { CustomDecorator, SetMetadata } from '@nestjs/common'

export const DisableGuards = (...guards: string[]): CustomDecorator =>
  SetMetadata('disabledGuards', guards)
