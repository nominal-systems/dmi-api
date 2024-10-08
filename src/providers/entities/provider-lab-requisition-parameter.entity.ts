import { Exclude } from 'class-transformer'
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { Provider } from './provider.entity'

@Entity()
export class ProviderLabRequisitionParameter {
    @PrimaryGeneratedColumn()
    @Exclude()
    id: number

    @Column()
    name: string

    @Column({ type: 'enum', enum: ['string', 'number', 'boolean'] })
    type: ['string', 'number', 'boolean']

    @Column()
    required: boolean

    @ManyToOne(() => Provider, provider => provider.labRequisitionParameters)
    provider: Provider
}
