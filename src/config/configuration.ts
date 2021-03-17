export default () => ({
  port: Number(process.env.PORT) || 3000,
  integrationEngine: {
    host: process.env.INTEGRATION_ENGINE_HOST ?? 'localhost',
    port: process.env.INTEGRATION_ENGINE_PORT ?? 4000,
    microservicePort: process.env.INTEGRATION_ENGINE_MICROSERVICE_PORT ?? 1883,
  },
  database: {
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT) || 3306,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
    synchronize: Boolean(process.env.DATABASE_SYNCHRONIZE),
  },
})
