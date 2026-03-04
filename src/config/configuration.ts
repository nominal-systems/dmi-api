import { AppConfig } from './config.interface'
import ormconfig from './ormconfig'

export default (): AppConfig => ({
  nodeEnv: process.env.NODE_ENV ?? 'development',
  baseUrl: process.env.BASE_URL ?? '',
  port: Number(process.env.PORT ?? 3000),
  secretKey: process.env.SECRET_KEY ?? '',
  admin: {
    authStrategy: process.env.ADMIN_AUTH_STRATEGY === 'okta' ? 'okta' : 'jwt',
    username: process.env.ADMIN_USERNAME ?? 'admin',
    password: process.env.ADMIN_PASSWORD ?? 'admin',
  },
  redis: {
    host: process.env.REDIS_HOST ?? '',
    port: Number(process.env.REDIS_PORT ?? 6379),
    password: process.env.REDIS_PASSWORD ?? '',
    db: Number(process.env.REDIS_DB ?? 0),
    keyPrefix: process.env.REDIS_SESSION_KEY_PREFIX ?? 'dmi:sess:',
    sessionTtlSeconds: Number(process.env.REDIS_SESSION_TTL_SECONDS ?? 1800),
  },
  activeMQ: {
    protocol: process.env.ACTIVEMQ_PROTOCOL ?? 'mqtt',
    hostname: process.env.ACTIVEMQ_HOSTNAME ?? 'localhost',
    port: Number(process.env.ACTIVEMQ_PORT ?? 1883),
    username: process.env.ACTIVEMQ_USERNAME ?? '',
    password: process.env.ACTIVEMQ_PASSWORD ?? '',
  },
  typeorm: ormconfig,
  mongoose: {
    uri: process.env.MONGO_URI ?? 'mongodb://localhost/diagnostic-modality-integration',
  },
  docs: {
    title: 'DMI API',
    description:
      'The Diagnostic Modality Integration API (DMI API) provides common workflows and standardized resource formats for interacting with multiple diagnostic providers through a single interface, by handling all the work specific to each provider and helping partners integrate in a flexible way.',
    openApiSpecUrl: '/swagger-json',
  },
  okta: {
    clientId: process.env.OKTA_CLIENT_ID ?? '',
    clientSecret: process.env.OKTA_CLIENT_SECRET ?? '',
    issuer: process.env.OKTA_ISSUER ?? '',
    audience: process.env.OKTA_AUDIENCE ?? '',
  },
})
