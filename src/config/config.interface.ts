import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export interface AppConfig {
  nodeEnv: string
  baseUrl: string
  port: number
  secretKey: string
  admin: AdminConfig
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
