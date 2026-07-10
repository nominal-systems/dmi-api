import * as path from 'path'

/* Harness configuration, resolved once from process.env against defaults that match
 * docker-compose.harness.yml. Nothing under test/harness/ may import from dmi-api's src/ — the
 * harness is a black-box client and must survive internal refactors. See README.md. */

function str (name: string, fallback: string): string {
  const value = process.env[name]
  return value == null || value === '' ? fallback : value
}

function int (name: string, fallback: number): number {
  const value = process.env[name]
  if (value == null || value === '') return fallback
  const parsed = Number(value)
  if (Number.isNaN(parsed)) throw new Error(`${name} must be a number, got '${value}'`)
  return parsed
}

function flag (name: string, fallback: boolean): boolean {
  const value = process.env[name]
  if (value == null || value === '') return fallback
  return value === '1' || value.toLowerCase() === 'true'
}

export interface MysqlEnv {
  host: string
  port: number
  user: string
  password: string
  database: string
}

export interface HarnessEnv {
  repoRoot: string
  composeFile: string
  appPort: number
  baseUrl: string
  admin: { username: string, password: string }
  /* aes-256-ctr keys the app's provider-configuration encryption; must be exactly 32 bytes. */
  secretKey: string
  jwtSecretKey: string
  mysql: MysqlEnv
  mongoUri: string
  activemq: { hostname: string, port: number }
  /* Orchestration. Set HARNESS_BASE_URL to point at an app you started yourself, in which case
   * the harness neither builds nor spawns one. */
  manageContainers: boolean
  manageApp: boolean
  build: boolean
  keepUp: boolean
  timeouts: { depsReadyMs: number, appReadyMs: number, requestMs: number }
}

const repoRoot = path.resolve(__dirname, '..', '..')
const appPort = int('HARNESS_APP_PORT', 3010)
const explicitBaseUrl = process.env.HARNESS_BASE_URL

export const env: HarnessEnv = {
  repoRoot,
  composeFile: path.join(repoRoot, 'test', 'harness', 'docker-compose.harness.yml'),
  appPort,
  baseUrl: str('HARNESS_BASE_URL', `http://127.0.0.1:${appPort}`),
  admin: {
    username: str('HARNESS_ADMIN_USERNAME', 'admin'),
    password: str('HARNESS_ADMIN_PASSWORD', 'admin'),
  },
  secretKey: str('HARNESS_SECRET_KEY', 'harness_secret_key_exactly_32_by'),
  jwtSecretKey: str('HARNESS_JWT_SECRET_KEY', 'harness-jwt-secret'),
  mysql: {
    host: str('HARNESS_MYSQL_HOST', '127.0.0.1'),
    port: int('HARNESS_MYSQL_PORT', 3307),
    user: str('HARNESS_MYSQL_USER', 'root'),
    password: str('HARNESS_MYSQL_PASSWORD', 'harness'),
    database: str('HARNESS_MYSQL_DATABASE', 'dmi_harness'),
  },
  mongoUri: str('HARNESS_MONGO_URI', `mongodb://127.0.0.1:${int('HARNESS_MONGO_PORT', 27018)}/dmi_harness`),
  activemq: {
    hostname: str('HARNESS_ACTIVEMQ_HOST', '127.0.0.1'),
    port: int('HARNESS_ACTIVEMQ_PORT', 1884),
  },
  manageContainers: flag('HARNESS_MANAGE_CONTAINERS', true),
  manageApp: flag('HARNESS_MANAGE_APP', explicitBaseUrl == null),
  build: flag('HARNESS_BUILD', true),
  keepUp: flag('HARNESS_KEEP_UP', false),
  timeouts: {
    depsReadyMs: int('HARNESS_DEPS_READY_MS', 180_000),
    appReadyMs: int('HARNESS_APP_READY_MS', 180_000),
    requestMs: int('HARNESS_REQUEST_MS', 30_000),
  },
}

if (Buffer.byteLength(env.secretKey, 'utf8') !== 32) {
  throw new Error(
    `HARNESS_SECRET_KEY must be exactly 32 bytes (aes-256-ctr), got ${Buffer.byteLength(env.secretKey, 'utf8')}`,
  )
}

/* Environment handed to `migration:run` and to the app process. NODE_ENV=seed is load-bearing:
 * orders.service.ts short-circuits before the MQTT round-trip to the engine, which is not part of
 * this harness. dotenv (via the app's loadEnv) never overwrites keys already present in the
 * environment, so these win over any .env a developer happens to have. */
export function appEnv (): NodeJS.ProcessEnv {
  return {
    ...process.env,
    NODE_ENV: 'seed',
    PORT: String(env.appPort),
    BASE_URL: '',
    JWT_SECRET_KEY: env.jwtSecretKey,
    SECRET_KEY: env.secretKey,
    ADMIN_AUTH_STRATEGY: 'jwt',
    ADMIN_USERNAME: env.admin.username,
    ADMIN_PASSWORD: env.admin.password,
    DATABASE_TYPE: 'mysql',
    DATABASE_HOST: env.mysql.host,
    DATABASE_PORT: String(env.mysql.port),
    DATABASE_USERNAME: env.mysql.user,
    DATABASE_PASSWORD: env.mysql.password,
    DATABASE_DATABASE: env.mysql.database,
    DATABASE_SYNCHRONIZE: 'false',
    DATABASE_RUN_MIGRATIONS: 'false',
    DATABASE_LOGGING: 'false',
    MONGO_URI: env.mongoUri,
    ACTIVEMQ_PROTOCOL: 'mqtt',
    ACTIVEMQ_HOSTNAME: env.activemq.hostname,
    ACTIVEMQ_PORT: String(env.activemq.port),
    ACTIVEMQ_USERNAME: '',
    ACTIVEMQ_PASSWORD: '',
    STATSIG_ENABLED: 'false',
    /* The engine is absent; fail fast instead of hanging for the 90s default. */
    ENGINE_RESPONSE_TIMEOUT: '2000',
  }
}
