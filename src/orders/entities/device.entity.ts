import { Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class Device {
  @PrimaryColumn()
  serialNumber: string
}
