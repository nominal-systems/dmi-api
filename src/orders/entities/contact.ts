import { Column } from 'typeorm'

export class Contact {
  @Column({ nullable: true })
  phone?: string

  @Column({ nullable: true })
  email?: string
}
