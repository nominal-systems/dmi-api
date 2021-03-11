import { Organization } from '../entities/organization.entity'

export type OrganizationKeys = Pick<Organization, 'prodKey' | 'testKey'>
