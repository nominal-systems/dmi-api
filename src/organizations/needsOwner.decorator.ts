import { SetMetadata } from '@nestjs/common'

export const NeedsOrganizationOwner = () =>
  SetMetadata('needsOrganizationOwner', true)
