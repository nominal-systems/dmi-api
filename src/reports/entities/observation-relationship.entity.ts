import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Observation } from './observation.entity'
import { ObservationRelationshipType } from '../../common/typings/observation-relationship-type.enum'

@Entity()
export class ObservationRelationship {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    type: 'enum',
    enum: ObservationRelationshipType
  })
  type: ObservationRelationshipType

  @Column()
  target: string

  @ManyToOne(() => Observation, (observation) => observation.related, {
    onDelete: 'CASCADE'
  })
  source: Observation
}
