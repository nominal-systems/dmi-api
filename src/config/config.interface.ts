import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export interface AppConfig {
  nodeEnv: string
  baseUrl: string
  port: number
  secretKey: string
  admin: AdminConfig
  redis: RedisConfig
  activeMQ: ActiveMQConfig
  typeorm: TypeOrmModuleOptions
  mongoose: MongooseConfig
  docs: DocsConfig
  okta: OktaConfig
}

export interface ActiveMQConfig {
  protocol: string
  hostname: string
  port: number
  username: string
  password: string
}

export interface RedisConfig {
  host: string
  port: number
  password: string
  db: number
  keyPrefix: string
  sessionTtlSeconds: number
}

export interface MongooseConfig {
  uri: string
}

export interface AdminConfig {
  authStrategy: 'jwt' | 'okta'
  username: string
  password: string
}

export interface DocsConfig {
  title: string
  description: string
  openApiSpecUrl: string
  version?: string
}

export interface OktaConfig {
  clientId: string
  clientSecret: string
  issuer?: string
  audience?: string
}
