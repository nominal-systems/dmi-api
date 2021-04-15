import { AppConfig } from './config.interface'

export default (): AppConfig => ({
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 3000),
  secretKey: process.env.SECRET_KEY,
  integrationEngine: {
    protocol: process.env.INTEGRATION_ENGINE_PROTOCOL ?? 'mqtt',
    hostname: process.env.INTEGRATION_ENGINE_HOSTNAME ?? 'localhost',
    port: Number(process.env.INTEGRATION_ENGINE_PORT ?? 1883),
    username: process.env.INTEGRATION_ENGINE_USERNAME ?? '',
    password: process.env.INTEGRATION_ENGINE_PASSWORD ?? ''
  },
  typeorm: {
    type: process.env.DATABASE_TYPE ?? 'mysql',
    host: process.env.DATABASE_HOST ?? 'localhost',
    port: Number(process.env.DATABASE_PORT ?? 3306),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database:
      process.env.DATABASE_DATABASE ?? 'diagnostic-modality-integration',
    synchronize: Boolean(process.env.DATABASE_SYNCHRONIZE)
  },
  mongoose: {
    uri:
      process.env.MONGO_URI ??
      'mongodb://localhost/diagnostic-modality-integration'
  }
})
