import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { IntegrationActorType, IntegrationLogAction } from '../constants/integration-log.constants'
import { Integration } from './integration.entity'

/**
 * One start, stop, restart or delete of an integration, by whom, and whether it failed (#306). Kept for as long as
 * the integration row is: integrations are soft-deleted, so a deleted one keeps its log.
 */
@Entity()
@Index(['integrationId', 'createdAt'])
export class IntegrationLogEntry {
  @PrimaryGeneratedColumn()
  id: number

  /** char(36), as `integration.id` is: a foreign key's column must match the one it references. */
  @Column({ type: 'char', length: 36 })
  integrationId: string

  @ManyToOne(() => Integration, { onDelete: 'CASCADE' })
  integration?: Integration

  @Column({ type: 'enum', enum: IntegrationLogAction })
  action: IntegrationLogAction

  @Column({ type: 'enum', enum: IntegrationActorType })
  actorType: IntegrationActorType

  @Column()
  actor: string

  /** Why it failed; null when it succeeded. */
  @Column({ type: 'text', nullable: true })
  error: string | null

  @CreateDateColumn({ precision: 3, default: () => 'CURRENT_TIMESTAMP(3)' })
  createdAt: Date
}
