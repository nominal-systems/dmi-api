# Prod Redis cutover plan

Moving DMI in production off the shared `voyager-prod-cus-cc-rcs` instance (shared with Code
Catalog) onto a dedicated Redis instance. Tracked in
[#328](https://github.com/nominal-systems/dmi-api/issues/328).

The runbook below is the one proven in DEV, QA, QE and UAT, adjusted for three things that are
only true in production: every DMI service is on the shared instance (not just two), `kubectl
exec` is not available, and the blast radius is real customer traffic.

## Current state

AKS `voyager-prod-aks-cus-01`, namespace `prod`. Builds as deployed 2026-09-01; Redis and broker
verified 2026-08-10.

| Service | Pods | Build | Redis | Broker |
| --- | --- | --- | --- | --- |
| `dmiapi` | 2 | `dmi:1.0.0.923` (v1.14.9) | `voyager-prod-cus-cc-rcs:6379` | `cus.activemq` |
| `dmiengineapi` | 2 | `dmiengine:1.0.0.1085` (v1.5.7) | same | same |
| `dmiantechengineapi` | 2 | `dmiantechengine:1.0.0.851` (v1.5.1) | same | same |
| `dmizoetisengineapi` | 2 | `dmizoetisengine:1.0.0.28` (v1.2.1) | same | same |
| `dmiidexxengineapi` | 1 | `dmiidexxengine:1.0.0.675` (v1.2.7) | same | same |

`dmiheskaengineapi` is deprecated and out of scope for this cutover; it is not migrated and needs
no changes.

Key differences from non-prod:

- **All five in-scope services share `cc-rcs`.** In non-prod only `dmiapi` and `dmiengineapi` moved, with the
  other engines left on separate non-prod caches. Here the whole point is to vacate `cc-rcs`, so
  every service moves and the re-registration pass covers **all** providers, not just antech-v6 and
  wisdom-panel.
- **Connections are non-TLS on 6379.** The new instance will be TLS-only on 6380, so the cutover
  changes protocol as well as host.
- **`REDIS_PASSWORD` is a literal value on the pod spec.** Since the variable is being touched
  anyway, this is the natural moment to move it to a K8s Secret (open criterion on #328).
- **`REDIS_CLUSTER_ENABLED` is not set.** Set it explicitly to `false` as in every other
  environment.
- **No `kubectl exec` in prod.** The re-registration pass must run as a Kubernetes Job deployed
  through ADO, not as an interactive command. This is the single biggest operational difference —
  see step 5.

Broker pre-flight is already satisfied: `cus.activemq.voyager.marsvh.com` (10.68.198.5) is
**Artemis**, not Classic — it is silent on the OpenWire port, where an ActiveMQ Classic broker
announces itself with a `WireFormatInfo` banner. That was the failure that blocked QA and QE for
two weeks ([#349](https://github.com/nominal-systems/dmi-api/issues/349)); prod is not exposed to
it. All five in-scope services already point at the same broker, so there is no split-broker problem either.

## Version gap

Both promotions are prerequisites, not nice-to-haves:

| Component | Prod today | Required | Why |
| --- | --- | --- | --- |
| `dmiapi` | `1.0.0.914` | **≥ `1.0.0.918`** (1.14.8) | Ships `ensure-integration-status` with RUNNING-only scope, retries, bounded concurrency, and failure-safe status restore ([#346](https://github.com/nominal-systems/dmi-api/issues/346)). The build in prod predates it — its restart loop leaves integrations `STOPPED` when a start fails, so a partial failure degrades state and re-running makes it worse. |
| `dmiengineapi` | `1.0.0.1076` | **≥ `1.0.0.1080`** | Carries dmi-engine#68: the engine refuses to start when queues cannot initialise instead of running with polling silently dead. Without it, a bad Redis value at cutover produces healthy-looking pods and no polling. It caught exactly that in QE (a wrong `REDIS_PORT`) within seconds. |

**This gate is closed.** Prod was updated on 2026-09-01 and now runs `dmiapi` v1.14.9
(`1.0.0.923`) and `dmiengineapi` v1.5.7 (`1.0.0.1085`) — both comfortably past the required builds.
The table above is retained as the rationale for why those versions are prerequisites.

## TLS support — a code prerequisite, not just config

Prod connects on **6379 without TLS** today; the new instance is **TLS-only on 6380**. When this
plan was first written the engines handled that transition three different ways — the core engine
inferred TLS from the port, idexx and zoetis read `REDIS_TLS_ENABLED` but defaulted to `false`, and
antech had no TLS support at all. That inconsistency is what made "set the variable everywhere"
insufficient, and it stayed hidden because the core engine's inference carried every non-prod
cutover until idexx was moved to a TLS instance in UAT on 2026-08-10 and failed immediately.

Three PRs normalise every engine onto the core engine's resolver — `true` forces TLS on, `false`
forces it off, and **unset infers TLS from port 6380**:

| Repo | PR | Notes |
| --- | --- | --- |
| dmi-engine-idexx-integration | [#78](https://github.com/nominal-systems/dmi-engine-idexx-integration/pull/78) | Bull factory, cache client and health module; unit tests for all three states |
| dmi-engine-zoetis-integration | [#37](https://github.com/nominal-systems/dmi-engine-zoetis-integration/pull/37) | Bull factory (its only client site) |
| dmi-engine-antech-integration | [#55](https://github.com/nominal-systems/dmi-engine-antech-integration/pull/55) | Adds TLS where none existed (closes [#54](https://github.com/nominal-systems/dmi-engine-antech-integration/issues/54)); also repairs a latent cluster-mode bug, irrelevant here since clustering is off everywhere |

Once merged and released:

| Service | TLS behaviour | Ready for TLS-only 6380 |
| --- | --- | --- |
| `dmiapi` | n/a — **does not use Redis at all**; its `REDIS_*` vars are vestigial | n/a |
| every engine | infers from port 6380; `REDIS_TLS_ENABLED` exists only to override | Yes, with no variable set |

**Consequences for the plan:**

1. **Do not set `REDIS_TLS_ENABLED` anywhere.** Unset is correct on both 6379 and 6380 for every
   engine, whereas a `true` that reaches a prod-scoped variable group would still break an engine
   on `cc-rcs:6379`. Removing the variable retires the scoping hazard recorded on #359 mechanically
   rather than by discipline. The `true` added for UAT idexx on 2026-08-10 should be **removed**
   after the idexx release, not preserved.
2. **Three engine promotions ride with the cutover, not one.** Prod runs idexx v1.2.7 and zoetis
   v1.2.1, both pre-PR, so idexx, zoetis and antech all need post-merge builds deployed together
   with the Redis variables. See step 2.
3. **Antech's TLS path has no automated coverage.** The PR carries no tests, and the repo's e2e
   spec cannot run outside an environment with a broker. Every non-prod antech engine still sits
   on an old shared cache on port 6379, so the new code will never execute before prod unless we
   make it: repoint one non-prod antech engine onto its environment's `*-dmi-*` TLS instance and
   run the restart pass. That is a pre-flight item below — and it is the already-open "repoint
   the remaining non-prod engines" work on #328, now with a reason to do it first.

## Pre-flight (T-7 to T-1)

- [ ] **Engine TLS PRs merged, released and verified in non-prod** — idexx #78, zoetis #37,
      antech #55. Idexx and zoetis verify themselves on release (UAT idexx already runs on a
      TLS-only instance). **Antech needs a deliberate check**: repoint one non-prod antech engine
      to its `*-dmi-*` instance, run the restart pass, and confirm `[redis] config … tls=true` in
      its startup log plus live polling against the provider API. Then **remove
      `REDIS_TLS_ENABLED`** from every variable group where it was set — see the TLS section.
- [x] **Prod Redis instance provisioned and validated (2026-08-19)** — `voyager-prod-dmi-cus-rc`
      in `voyager-data-prod-rg-cus`: Premium P1, single node (`shardCount: null`), TLS-only on 6380
      (6379 closed, TLS 1.3 verified), `maxmemory-policy = noeviction`, public network access
      disabled, private endpoint + private DNS resolving to 10.68.192.137. A staging instance
      `voyager-stg-dmi-cus-rc` (Standard C1, otherwise identical) was provisioned alongside it.
- [x] **Tier agreed — Premium P1.** Chosen to match the existing production standard rather than
      to meet a capacity need: DMI's Redis usage is Bull queue state, not cache — roughly 1,060
      repeatable jobs plus transient queue data (tens of MB) and on the order of 100-200
      connections, against P1's 6 GB and 7,500 connections. Any tier from Standard C1 upward would
      have covered the capacity.
- [x] **Promotions shipped** — prod updated 2026-09-01: `dmiapi` v1.14.9 (`1.0.0.923`),
      `dmiengineapi` v1.5.7 (`1.0.0.1085`), idexx v1.2.7 (`1.0.0.675`).
- [ ] **Baseline captured** (record the numbers; they are the verification targets):
      - `RUNNING` integration count per provider
      - repeatable-job count per queue prefix on `cc-rcs` — expect ≈ 2 × RUNNING
      - DMI memory footprint and connection count on `cc-rcs`
      Use dmi-monitor's existing sanctioned prod access; its deep collector already reads prod
      Redis with a bounded, cursor-persisted SCAN, which is the right pattern on a shared instance
      that has had memory-pressure incidents.
- [ ] **Re-registration Job manifest prepared and reviewed** — see step 5. It must reference the
      promoted `dmiapi` image and the prod config.
- [ ] **Broker `$share` delivery confirmed** on `cus.activemq` after the engine promotion reaches
      any environment sharing that broker. The Artemis fingerprint makes this a formality, but
      confirm rather than assume.
- [ ] **Confirm `dmiheskaengineapi` is excluded.** Deprecated, not migrated, no changes needed.
      Note its keys will therefore remain on `cc-rcs` — scope the post-cutover "no DMI keys remain"
      check to the five in-scope services.
- [ ] **Rollback values recorded** — the exact current variable values, so reverting is a paste,
      not a reconstruction.
- [ ] **Window agreed with DevOps and stakeholders**, including the expected polling gap below.

## Impact during the window

Provider **polling pauses** from the moment pods restart against the empty instance until the
re-registration pass completes. Nothing is lost: orders submitted through the DMI API continue to
work throughout (that path is request/response over MQTT and does not depend on repeatable jobs),
and provider-side orders and results that arrive during the gap are picked up on the first poll
after re-registration. The visible effect is delay, not data loss.

Expected gap: **10–15 minutes** — rollout of five deployments plus the re-registration pass.

## Cutover (T-0)

1. **Announce the window.** Confirm no conflicting Code Catalog work on `cc-rcs`.

2. **Deploy, as a single change per service** (DevOps, via ADO): the new Redis variables together
   with the promoted images.
   - `REDIS_HOST` = new instance hostname
   - `REDIS_PORT` = `6380`
   - `REDIS_CLUSTER_ENABLED` = `false`
   - `REDIS_PASSWORD` = from K8s Secret (see pre-flight)
   - `REDIS_TLS_ENABLED` — **not set** (every engine infers TLS from port 6380; see the TLS section)
   - images: `dmiapi` ≥ `1.0.0.918` and `dmiengineapi` ≥ `1.0.0.1080` (both already in prod), plus
     **idexx, zoetis and antech at their first post-TLS-PR builds** — prod runs pre-PR v1.2.7,
     v1.2.1 and v1.5.1 today
   
   **All five in-scope services must move together.** A partial move is worse than none: in QA an
   intermediate state where only `dmiengineapi` had been repointed broke messaging outright. This
   is precisely why the engine TLS work gates the window — without it antech cannot follow, and a
   cutover that leaves it behind is both a partial move and a failure of the "vacate `cc-rcs`"
   goal.

3. **Confirm every pod is healthy on the new instance.** The core engine logs
   `[redis] connected host=<new> port=6380 cluster=false tls=true`; idexx, zoetis and antech log
   `[redis] config host=<new> port=6380 cluster=false tls=true` at startup. With dmi-engine#68 in place, a
   wrong value produces a CrashLoopBackOff here rather than a silent failure — if that happens,
   fix the value and redeploy before continuing. Do not proceed to step 5 with any pod unhealthy.

4. **Confirm the new instance is empty of repeatable jobs** — expected at this point, and the
   reason step 5 exists.

5. **Run the re-registration pass** as a Kubernetes Job (prod has no `exec`):

   ```yaml
   apiVersion: batch/v1
   kind: Job
   metadata:
     name: dmi-reregister-polling-jobs
     namespace: prod
   spec:
     backoffLimit: 0
     ttlSecondsAfterFinished: 86400
     template:
       spec:
         restartPolicy: Never
         containers:
           - name: ensure-integration-status
             image: <same image as the promoted dmiapi deployment>
             command: ['npm', 'run', 'ensure-integration-status', '--']
             args: ['--concurrency=10', '--attempts=3', '--backoff=2000']
             env:
               - name: ENGINE_RESPONSE_TIMEOUT
                 value: '30000'
             envFrom:
               - configMapRef:
                   name: <dmiapi configmap>
               - secretRef:
                   name: <dmiapi secret>
   ```

   Run it **with `--dry-run` first** (same manifest, `args: ['--dry-run']`) and check the count
   matches the baseline `RUNNING` figure before running it for real.

   On the settings: at roughly 530 RUNNING integrations and two MQTT round trips each, concurrency
   10 puts a successful pass in the region of one to two minutes. `ENGINE_RESPONSE_TIMEOUT=30000`
   bounds the damage if some engine is unresponsive — at the 90s default, three attempts against a
   dead engine costs 4.5 minutes per integration. The pass is idempotent and exits non-zero with a
   per-integration failure list, so re-running it for stragglers is safe and expected.

   ```bash
   kubectl -n prod logs -f job/dmi-reregister-polling-jobs
   ```

## Verification

- [ ] Job reports `N succeeded, 0 failed`. Any failures are listed with integration id and
      provider — re-run the Job scoped to them with `--integration-id=`.
- [ ] Repeatable jobs on the new instance = **2 × RUNNING**, matching the baseline, with the
      per-prefix split as expected (`{}` per queue for the core engine and wisdom-panel,
      `{bull:idexx}`, `{bull:antech}`, zoetis untagged).
- [ ] **Zero** keys under the legacy non-hash-tagged `bull:` prefix on the new instance.
- [ ] Polling live in engine logs for every provider — real provider API calls returning 200.
- [ ] Order submission through the DMI API works end to end.
- [ ] No new errors in `dmiapi` or engine logs.

`scripts/verify-repeat-keys.py` performs the key counting; run it from dmi-monitor or as a
short-lived Job in the namespace, since the instance is behind a private endpoint.

## Rollback

Cheap and complete, provided one rule is respected: **do not delete or flush DMI keys on `cc-rcs`
until validation has passed.** The old repeatable jobs stay there untouched during the cutover, so
reverting `REDIS_HOST` and `REDIS_PORT` and redeploying puts the engines straight back onto a warm
instance with their jobs intact — no re-registration needed and polling resumes immediately.

Two properties keep this cheap. Every engine infers TLS from the port, so reverting to 6379 drops
TLS automatically with no further variable change — this is why `REDIS_TLS_ENABLED` must not be
set anywhere (see the TLS section). And the post-TLS-PR engine builds work unchanged against
`cc-rcs:6379`, so **the images do not need to be rolled back**, only the two variables.

Roll back if: pods will not come up healthy on the new instance, the re-registration pass fails for
a material share of integrations and re-runs do not clear it, or polling cannot be confirmed within
the window.

## Post-cutover

- [ ] Confirm **no keys from the five migrated services remain on `cc-rcs`** (heska is excluded and
      stays) — including the ~900 stranded jobs under legacy
      non-tagged `bull:*` keys (frozen since ≤2026-07-03, debris from the earlier prefix migration,
      not live queues). DevOps confirmed these are not carried over; they must be accounted for
      explicitly rather than quietly left behind.
- [ ] Repoint dmi-monitor's Redis alerts at the new instance.
- [ ] Update dmi-monitor's deep collector — `deep.py` currently reads the legacy `bull:*` keys, i.e.
      the stranded debris, and must switch to the hash-tagged keys on the new instance.
- [ ] Confirm Code Catalog's memory pressure on `cc-rcs` no longer has any path to DMI.
- [ ] Close out the remaining #328 criteria: `REDIS_PASSWORD` in a Secret with key rotation, and
      the in-flight drain/handover note.
- [ ] Follow-ups: Managed Identity / Entra auth
      ([#345](https://github.com/nominal-systems/dmi-api/issues/345)), producer/consumer prefix
      parity ([#344](https://github.com/nominal-systems/dmi-api/issues/344)), zoetis hash-tag
      cleanup (nominal-systems/dmi-engine-zoetis-integration#36).

## Open decisions

1. ~~**Tier and sizing** for the prod instance~~ — **resolved**: Premium P1, provisioned 2026-08-19.
2. ~~**`dmiheskaengineapi`** — decommission or migrate~~ — **resolved**: deprecated, excluded from
   this cutover, no changes required.
3. **Who runs the Job.** Prod has no `exec`, so either DevOps applies the Job manifest on our
   signal, or it is wired into the release pipeline as a post-deploy step gated to this release.
   The second is preferable: it removes a hand-off from the middle of the window.
