export interface AppConfig {
  nodeEnv: string
  port: number
  secretKey: string | undefined
  integrationEngine: IntegrationEngineConfig
  typeorm: TypeormConfig
  mongoose: MongooseConfig
}

export interface IntegrationEngineConfig {
  protocol: string
  hostname: string
  port: number
  username: string
  password: string
}

export interface MongooseConfig {
  uri: string
}

export interface TypeormConfig {
  type: string
  host: string
  port: number
  username: string | undefined
  password: string | undefined
  database: string
  synchronize: boolean
}
