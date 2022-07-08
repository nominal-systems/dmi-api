import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export interface AppConfig {
  nodeEnv: string
  port: number
  secretKey: string
  admin: AdminCredentials
  activeMQ: ActiveMQConfig
  typeorm: TypeOrmModuleOptions
  mongoose: MongooseConfig
}

export interface ActiveMQConfig {
  protocol: string
  hostname: string
  port: number
  username: string
  password: string
}

export interface MongooseConfig {
  uri: string
}

export interface AdminCredentials {
  username: string
  password: string
}
