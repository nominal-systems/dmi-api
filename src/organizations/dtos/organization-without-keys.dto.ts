import { Organization } from '../entities/organization.entity'

export type OrganizationWithoutKeys = Omit<Organization, 'testKey' | 'prodKey'>
