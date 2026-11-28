/** What an integration log entry records (#306). A restart is one entry, not a stop and a start. */
export enum IntegrationLogAction {
  START = 'start',
  STOP = 'stop',
  RESTART = 'restart',
  DELETE = 'delete',
}

/** Who asked for it: a person in the Admin UI, an organization with its API key, or dmi-api itself. */
export enum IntegrationActorType {
  ADMIN = 'admin',
  ORGANIZATION = 'organization',
  SYSTEM = 'system',
}

export interface IntegrationActor {
  type: IntegrationActorType
  /** The admin's username (`Admin` with the jwt strategy), the organization's name, or `system`. */
  name: string
}

/** The actor of the ensure-integration-status job. */
export const SYSTEM_ACTOR: IntegrationActor = { type: IntegrationActorType.SYSTEM, name: 'system' }

export function adminActor (username: string): IntegrationActor {
  return { type: IntegrationActorType.ADMIN, name: username }
}

export function organizationActor (organization: { name: string }): IntegrationActor {
  return { type: IntegrationActorType.ORGANIZATION, name: organization.name }
}
