export interface AppConfig {
  nodeEnv: string
  port: number
  integrationEngine: IntegrationEngineConfig
  typeorm: TypeormConfig
  mongoose: MongooseConfig
}

export interface IntegrationEngineConfig {
  hostname: string
  port: number
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
