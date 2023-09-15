import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Attachment {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ nullable: true })
    uri: string

    @Column({ type: 'text', nullable: true })
    data: string

    @Column({ nullable: true })
    contentType: string
}
