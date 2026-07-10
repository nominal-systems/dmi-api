# dmi-api integration harness

A black-box integration harness. It starts MySQL, Mongo and ActiveMQ in Docker, runs the
migrations, boots dmi-api, and then talks to it over real HTTP as an integrator would.

Nothing under `test/harness/` imports from `dmi-api/src/`. No entities, no services, no DTOs. The
harness must survive internal refactors, and it should be extractable later as a shared acceptance
suite. The one sanctioned exception is `sql.ts`, which reaches into MySQL with raw `mysql2` for
setup and assertions that no HTTP route can express — never through TypeORM.

> **Read the [Findings](#findings) section before you read the tests.** Several tests are marked
> `it.failing`, which is *not* a way of saying "this is fine". Each one marks a live defect.

## Running it

```bash
npm install          # requires GHP_TOKEN with read:packages (see Prerequisites)
npm run test:harness
```

That is the whole thing from a clean checkout. `test:harness` will, in order:

1. `docker compose -f test/harness/docker-compose.harness.yml up -d` — MySQL 8, Mongo 4, ActiveMQ.
2. Poll until all three accept connections. No fixed sleeps.
3. `npm run migration:run` against the harness database. This also regression-tests that the 47
   migrations produce a working schema from empty, which nothing else in the repo checks.
4. `npm run build`, then spawn `node dist/main` and poll `/health` until every dependency reports
   up.
5. Run the scenarios.
6. Stop the app and `docker compose down -v`.

To iterate quickly, keep the stack warm between runs:

```bash
HARNESS_KEEP_UP=1 npm run test:harness    # leave containers running on exit
HARNESS_BUILD=0   npm run test:harness    # skip `npm run build`
```

To point the harness at an app you started yourself, set `HARNESS_BASE_URL`; the harness then
neither builds nor spawns one.

### Prerequisites

- **Docker**, running.
- **Node 20+**.
- **`GHP_TOKEN`**, a GitHub token with `read:packages`. The repo's `.npmrc` resolves
  `@nominal-systems/dmi-engine-common` from GitHub Packages, so `npm install` fails without it.
  This is a property of the repo, not of the harness. In CI it comes from `secrets.GHP_TOKEN`.

### Ports

The harness deliberately does **not** use the default ports, so it can run alongside a developer's
`docker compose up -d mysql mongo activemq` dev stack without a collision.

| Service  | Harness | Repo default |
|----------|---------|--------------|
| dmi-api  | 3010    | 3000         |
| MySQL    | 3307    | 3306         |
| Mongo    | 27018   | 27017        |
| ActiveMQ | 1884    | 1883         |

## Environment

Every variable has a working default; the table exists so CI and debugging are not guesswork.

| Variable | Default | Purpose |
|---|---|---|
| `HARNESS_BASE_URL` | `http://127.0.0.1:3010` | App under test. Setting it implies `HARNESS_MANAGE_APP=0`. |
| `HARNESS_APP_PORT` | `3010` | Port the harness starts the app on. |
| `HARNESS_ADMIN_USERNAME` | `admin` | Basic-auth admin, for `POST /users`. |
| `HARNESS_ADMIN_PASSWORD` | `admin` | |
| `HARNESS_SECRET_KEY` | a 32-byte literal | `aes-256-ctr` key for provider-config encryption. Must be exactly 32 bytes. |
| `HARNESS_JWT_SECRET_KEY` | `harness-jwt-secret` | |
| `HARNESS_MYSQL_HOST` / `_PORT` / `_USER` / `_PASSWORD` / `_DATABASE` | `127.0.0.1` / `3307` / `root` / `harness` / `dmi_harness` | Also consumed by `docker-compose.harness.yml`. |
| `HARNESS_MONGO_URI` | `mongodb://127.0.0.1:27018/dmi_harness` | |
| `HARNESS_MONGO_PORT` | `27018` | Host port published by the Mongo container. |
| `HARNESS_ACTIVEMQ_HOST` / `_PORT` | `127.0.0.1` / `1884` | |
| `HARNESS_MANAGE_CONTAINERS` | `1` | `0` to bring your own MySQL/Mongo/ActiveMQ and schema. |
| `HARNESS_MANAGE_APP` | `1` unless `HARNESS_BASE_URL` is set | `0` to bring your own app. |
| `HARNESS_BUILD` | `1` | `0` to reuse an existing `dist/`. |
| `HARNESS_KEEP_UP` | `0` | `1` to skip `docker compose down -v` on exit. |
| `HARNESS_DEPS_READY_MS` | `180000` | Readiness budget for MySQL/Mongo/ActiveMQ. |
| `HARNESS_APP_READY_MS` | `180000` | Readiness budget for `/health`. |
| `HARNESS_REQUEST_MS` | `30000` | Per-request timeout. |

The app under test is started with a fixed environment (`env.ts`, `appEnv()`), the load-bearing
parts of which are:

- **`NODE_ENV=seed`** — `orders.service.ts` returns from `createOrder` *after* the order is
  committed to MySQL and the `order:created` event to Mongo, but *before* the MQTT round-trip to
  the engine. No engine or demo lab runs in this harness, so this is how orders get created
  through the real HTTP endpoint. It is a pre-existing code path, not one added for testing.
- **`ENGINE_RESPONSE_TIMEOUT=2000`** — anything that *does* reach for the absent engine fails in
  2s rather than hanging for the 90s default.
- **`STATSIG_ENABLED=false`** — feature flags resolve from the env provider; no network.
- **`DATABASE_RUN_MIGRATIONS=false`** — migrations run as an explicit, observable step.

The app also needs a `public/` directory to exist (`registerStaticAssets` points `@fastify/static`
at it), which a clean checkout does not have. The harness creates it, exactly as the release
workflow does.

## Layout

```
test/harness/
  README.md                     this file
  docker-compose.harness.yml    MySQL + Mongo + ActiveMQ, own project & volumes
  env.ts                        all configuration, resolved once
  containers.ts                 compose up/down, readiness polling, migrations
  app.ts                        build, spawn `node dist/main`, poll /health, kill
  api-client.ts                 immutable HTTP client: basic / bearer / api-key
  sql.ts                        mysql2 pool for setup and assertions
  seed.ts                       the quickstart flow; two independent organizations
  global-setup.ts               orchestration, once per run
  global-teardown.ts            teardown, once per run
  scenarios/
    smoke.e2e.ts                the stack is really up and really wired
    tenant-isolation.e2e.ts     the point of this suite
```

### Why a standalone compose file

The repo's `docker-compose.yml` declares `env_file: .env`, and `.env.example` does not define the
`MYSQL_ROOT_PASSWORD` / `MYSQL_DATABASE` the `mysql:8` image needs — so it cannot start MySQL from
a clean checkout. It also bind-mounts `./docker/mysql/data`, which `docker compose down -v` does
not remove, so it cannot give the harness a cold start. `docker-compose.harness.yml` uses its own
compose project (`dmi-harness`) and named volumes instead. The repo's compose file is untouched.

## Findings

The harness was built to test tenant isolation. It found that dmi-api does not have it, in five
distinct places. **None of these are fixed here** — fixing them is explicitly out of scope for this
PR, and they want a considered fix plus a data-exposure review, not a drive-by patch.

Each finding has a test that asserts the *correct* behaviour and is marked `it.failing`. That
keeps CI green while the defect exists, and turns the test red the moment someone fixes it — at
which point the `.failing` marker should be deleted in the same commit.

| # | Route | Defect |
|---|---|---|
| F1 | `GET /events` | `events.service.ts` `getEventsForOrganization` takes an `organization` and never reads it. Returns **every tenant's** events. |
| F2 | `GET /reports/*` | `reports.controller.ts` has **no guard at all** — no `@UseGuards(ApiGuard)`, and there is no global guard in `src/`. Reachable **unauthenticated**. |
| F3 | `GET /reports/:id` | `reports.service.ts` `getReport(id, _organization)` ignores the organization. Carries a `TODO(gb)` saying so. |
| F4 | `POST /orders`, `POST /integrations` | Neither takes an `@Organization()`; `integrationId` and `providerConfigurationId` are never checked for ownership. Cross-tenant **writes**. |
| F5 | `GET /orders/:id/report` | `orders.service.ts` `getOrderReport(organization, orderId)` ignores the organization. |

F1 is the most serious: `GET /events` is a data-plane endpoint reachable with any valid API key,
and `event.data` for an `order:created` event embeds the whole order — patient name, client first
and last name, veterinarian. F2 needs no credentials at all, though report IDs are UUIDv4 and so
are not enumerable.

F4 compounds: on success, org B binds its own practice to org A's provider configuration, which
would place org B's subsequent orders against org A's lab account.

What **is** correctly scoped, and has ordinary passing tests here: `GET /orders/:id` (403),
`GET /orders`, `GET /orders/:id/result.json`, `GET /practices`, `GET /practices/:id`,
`GET /integrations`, `GET /providers/configurations`, and `GET /organizations/:id/keys`.

### Do not "fix" a red build by relaxing an assertion

If a test in `tenant-isolation.e2e.ts` starts failing with *"Failing test passed even though it was
supposed to fail"*, that is the tripwire firing: the underlying defect was fixed. Delete the
`.failing` marker and the comment above it. That is the only correct response.

## Known gaps

- **No engine, no demo lab.** The full order → report loop needs
  `dmi-engine-demo-provider-integration` and `dmi-demo-provider-api` in a compose profile. Deferred.
  Consequently reports are inserted via `sql.ts` rather than arriving over MQTT, and orders never
  leave `accepted`.
- **No wire-format snapshots.** Deferred to a follow-up PR to keep this diff reviewable.
- **`GET /reports/:id/presentedForm`** is asserted only for the unauthenticated case. The seeded
  report has no attachments, so both a guarded and an unguarded app can answer 404 for a caller
  with credentials; the test would not be able to tell them apart.
- **`maxWorkers: 1`.** One database, one event stream, one `seq` counter. Scenarios must not race.
