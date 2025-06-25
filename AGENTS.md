# Codex Agent Guidelines

This repository contains the Diagnostic Modality Integration API built with NestJS.

## Environment Setup

- A setup script installs npm dependencies automatically when the container is created. If packages are missing, run
  `npm install`.
- Local development may rely on `docker-compose.yml` which starts MySQL, MongoDB and ActiveMQ. Use `docker-compose up`
  to launch these services.
- Environment variables can be configured via `.env` (see `.env.example`).

## Common Tasks

- **Build:** `npm run build` creates the compiled files in `dist/`.
- **Start in development:** `npm run start:dev`.
- **Run migrations:** `npm run migration:run`.
- **Commit message:** generate a short (one-liner, if possible) commit message for all proposed changes

### Testing

- **Unit tests:** `npm test`
- **End‑to‑end tests:** `npm run test:e2e`
- **Coverage report:** `npm run test:cov`

### Linting and Formatting

- **ESLint:** `npm run lint` fixes lint errors automatically.
- **Prettier:** `npm run format` formats `src/` and `test/` using Prettier (`singleQuote: true`, `semi: false`). Always
  run formatting before committing.

## Project Structure

- `src/` – main application code
    - `app.module.ts` – root module importing feature modules
    - `main.ts` – application bootstrap (Fastify adapter, Swagger docs, microservice)
    - Feature modules include `users`, `organizations`, `providers`, `integrations`, `orders`, `events`, `refs`,
      `reports`, `results`, `practices`, `admin`, and `health`.
    - `common/` – shared classes, guards, interceptors and utilities
    - `config/` – configuration helpers and TypeORM settings
    - `migrations/` – database migrations
- `public/` – Admin UI assets served at `/ui`
- `scripts/` – helper scripts such as `wait-for-all.sh` used by Docker
- `test/` – JSON fixtures and additional test resources

Swagger documentation is available under `/docs` when the app is running.

