import { SetMetadata } from '@nestjs/common'

export const DisableGuards = (...guards: string[]) =>
  SetMetadata('disabledGuards', guards)
