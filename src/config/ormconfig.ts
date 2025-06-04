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
  synchronize: Boolean(process.env.DATABASE_SYNCHRONIZE ?? false),
  entities: [path.join(__dirname, '../**/*.entity{.ts,.js}')],
  migrations: [path.join(__dirname, '../migrations/*.{ts,js}')],
  migrationsRun: Boolean(process.env.DATABASE_RUN_MIGRATIONS ?? false),
  cli: {
    migrationsDir: 'src/migrations'
  },
  logging: Boolean(process.env.DATABASE_LOGGING ?? false),
  dropSchema: false
}

export default typeormConfig
