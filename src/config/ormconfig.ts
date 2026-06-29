import * as path from 'path'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { loadEnv } from './load-env'

loadEnv()

const typeormConfig: TypeOrmModuleOptions = {
  type: (process.env.DATABASE_TYPE ?? 'mysql') as any,
  host: process.env.DATABASE_HOST ?? 'localhost',
  port: Number(process.env.DATABASE_PORT ?? 3306),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DATABASE ?? 'diagnostic-modality-integration',
  synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
  entities: [path.join(__dirname, '../**/*.entity{.ts,.js}')],
  migrations: [path.join(__dirname, '../migrations/*.{ts,js}')],
  migrationsRun: process.env.DATABASE_RUN_MIGRATIONS === 'true',
  logging: process.env.DATABASE_LOGGING === 'true',
  dropSchema: false,
  timezone: 'Z'
}

export default typeormConfig
