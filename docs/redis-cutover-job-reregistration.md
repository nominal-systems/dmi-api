# Re-registering polling jobs after a Redis cutover

## Why this exists

Repeatable polling jobs live **only in Redis** and nothing re-creates them.

- `QueueManager.onModuleInit` (dmi-engine) only adjusts intervals on jobs that already exist.
- Jobs are registered solely by dmi-api's `doStart()` publishing MQTT `integration/create`.

Neither service reconciles at startup, so **restarting pods does not help**. After a cutover to a
new Redis instance — or any eviction, flush or data loss — integrations stay `RUNNING` in the
database while polling is silently dead, and the pods report healthy throughout. This was
confirmed end-to-end in DEV on 2026-07-23.

`ensure-integration-status` is the reconciliation pass: it restarts integrations so the engines
re-register their jobs. It is idempotent and safe to re-run — restarting an integration whose jobs
already exist simply replaces them.

Tracked in [nominal-systems/dmi-api#328](https://github.com/nominal-systems/dmi-api/issues/328).

## What it does

For each selected integration it calls the same `restart()` used by
`POST /admin/integrations/:id/restart`: `integration/remove` followed by `integration/create` over
ActiveMQ. Note `/start` cannot be used — it short-circuits with "already running" because the
database still says `RUNNING`.

Defaults:

- **`RUNNING` integrations only.** Restarting a `STOPPED` integration only issues a pointless
  `integration/remove`; it is never started.
- **Concurrency 5**, 3 attempts per integration with exponential backoff from 1s.
- **Failures do not abort the run.** Every failure is collected and reported at the end, and the
  process exits non-zero.

If a start fails after the stop succeeded, the previous status is restored in the database. A
`RUNNING` row whose jobs are missing is exactly what this pass repairs, so it stays visible to a
re-run; leaving it `STOPPED` would make it invisible forever.

Each engine request is bounded by `ENGINE_RESPONSE_TIMEOUT` (default 90s). Lower it for large
batches where some engines are expected to be unreachable — the worst case is
`attempts × 90s` per integration otherwise.

## Usage

```
npm run ensure-integration-status -- [options]
```

| Option | Default | |
| --- | --- | --- |
| `--status=RUNNING[,STOPPED]` | `RUNNING` | Statuses to restart |
| `--provider=idexx[,zoetis]` | all | Restrict to provider ids |
| `--integration-id=<id>[,...]` | all | Restrict to integration ids |
| `--concurrency=<n>` | `5` | Restarted in parallel |
| `--attempts=<n>` | `3` | Attempts per integration |
| `--backoff=<ms>` | `1000` | Base delay, doubled each retry |
| `--dry-run` | off | List what would be restarted, change nothing |

It needs database and ActiveMQ access, not the admin API — so it runs in-cluster and is unaffected
by the Okta admin auth in DEV.

### Running it as a Job

Reuse the deployed image and its environment. `<release>` is the running dmi-api deployment.

```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: ensure-integration-status
  namespace: devv2
spec:
  backoffLimit: 0
  ttlSecondsAfterFinished: 86400
  template:
    spec:
      restartPolicy: Never
      containers:
        - name: ensure-integration-status
          image: <same image as the dmi-api deployment>
          command: ['npm', 'run', 'ensure-integration-status', '--']
          args: ['--dry-run']
          envFrom:
            - configMapRef:
                name: <dmi-api configmap>
            - secretRef:
                name: <dmi-api secret>
```

```bash
kubectl -n devv2 logs -f job/ensure-integration-status
```

Drop `--dry-run` for the real pass. Delete the Job before re-applying it.

## Cutover procedure

1. **Before** — record the baseline:
   ```bash
   python3 scripts/verify-repeat-keys.py --host <old-instance>.redis.cache.windows.net
   ```
   Note the total. Also count `RUNNING` integrations: expect **2 jobs each** (orders + results).
2. Repoint the deployments at the new instance and roll them.
3. **Dry run** the pass and check the count matches what you expect to restart.
4. Run it for real. It exits non-zero and lists every integration it could not restart.
5. **After** — verify the jobs actually landed:
   ```bash
   python3 scripts/verify-repeat-keys.py --host <new-instance>.redis.cache.windows.net --expect <2 × RUNNING>
   ```
6. Re-run the pass for any failures. It is idempotent.

Use `--provider=` to move one engine at a time; each engine has its own queue prefix
(`{}` for core dmi-engine and wisdom-panel, `{bull:idexx}`, `{bull:antech}`, and zoetis is not
hash-tagged — see
[dmi-engine-zoetis-integration#36](https://github.com/nominal-systems/dmi-engine-zoetis-integration/issues/36)).

## Verifying what is registered

`scripts/verify-repeat-keys.py` counts Bull's repeat registries (the `<prefix>:<queue>:repeat`
ZSETs), grouped by prefix. It scans rather than assuming a layout, so it works across engines with
different prefixes.

```bash
REDIS_PASSWORD=... python3 scripts/verify-repeat-keys.py \
  --host voyager-dev-dmi-scus-rc.redis.cache.windows.net --expect 10
```

It also reports keys still sitting under the legacy non-hash-tagged `bull:` prefix — debris from
the earlier prefix migration, which must be 0 on the new instances.

Needs the `redis` package and network access to the instance: run it from the dmi-monitor
container, or via `kubectl run` inside the cluster when the instance is behind a private endpoint.
