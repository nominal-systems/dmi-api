import { CustomDecorator, SetMetadata } from '@nestjs/common'

export const NeedsOrganizationOwner = (): CustomDecorator =>
  SetMetadata('needsOrganizationOwner', true)
