import { Entity } from 'typeorm'
import { Client } from './client.entity'

@Entity()
export class Veterinarian extends Client {}
