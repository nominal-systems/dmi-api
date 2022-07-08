import { AppConfig } from './config.interface'
import ormconfig from './ormconfig'

export default (): AppConfig => ({
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 3000),
  secretKey: process.env.SECRET_KEY ?? '',
  admin: {
    username: process.env.ADMIN_USERNAME ?? 'admin',
    password: process.env.ADMIN_PASSWORD ?? 'admin'
  },
  activeMQ: {
    protocol: process.env.ACTIVEMQ_PROTOCOL ?? 'mqtt',
    hostname: process.env.ACTIVEMQ_HOSTNAME ?? 'localhost',
    port: Number(process.env.ACTIVEMQ_PORT ?? 1883),
    username: process.env.ACTIVEMQ_USERNAME ?? '',
    password: process.env.ACTIVEMQ_PASSWORD ?? ''
  },
  typeorm: ormconfig,
  mongoose: {
    uri:
      process.env.MONGO_URI ??
      'mongodb://localhost/diagnostic-modality-integration'
  }
})
