import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm'
import { Provider } from '../../providers/entities/provider.entity'

@Entity()
@Unique(['provider', 'species'])
export class ProviderDefaultBreed {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    species: string

    @Column()
    defaultBreed: string

    @ManyToOne(() => Provider)
    @JoinColumn({ name: 'provider', referencedColumnName: 'id' })
    provider: Provider
}
