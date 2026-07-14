# Analyzer-results injection harness

Reproduces and verifies the **typed-requisition-id funnel defect**: in-house
analyzer (IVLS) results that carry a typed requisition id (`000000`, `1234`, …)
were appended to the report of whatever *older* order already used that value
as its `externalId` — under the wrong patient, without ever emitting
`report:created`, so the run never surfaced in VH Unmatched.

The harness runs **locally on your machine against a remote environment**
(DEV by default). It publishes `external_order_results` + `external_results`
messages to the environment's ActiveMQ broker — byte-compatible with what the
IDEXX engine emits when it polls analyzer results — and then verifies the
outcome through dmi-api's REST API (`x-api-key`).

Because injection happens at the message bus, no IDEXX sandbox or physical
analyzer is needed, and the full real path is exercised: identity guard →
order/report persistence → event emission.

## Prerequisites

- Node ≥ 18 (uses global `fetch`), `npm install` done in this repo (uses the
  `mqtt` dependency).
- Network reachability to the environment's ActiveMQ MQTT port (DEV: the
  `voyageractivemqdev` broker VM, MQTT default port 1883 — VPN required).
  Broker host/credentials come from the environment's dmi-api deployment env
  (`ACTIVEMQ_HOSTNAME` / `ACTIVEMQ_PORT` / `ACTIVEMQ_USERNAME` /
  `ACTIVEMQ_PASSWORD`), readable from a pod spec:
  `kubectl --context voyager-devv2-aks-scus -n devv2 get pods -l app=dmiapi -o jsonpath='{.items[0].spec.containers[0].env}'`
- A DEV API key (`x-api-key`) whose organization owns the integration you
  target, and the target **integration id** (use a DEV IDEXX integration).

## Usage

Always start with a dry run — it prints the exact payloads and the
verification plan without touching the network:

```sh
node scripts/analyzer-results-harness.js --dry-run --integration <integration-id>
```

Real run against DEV:

```sh
export HARNESS_BROKER_URL='mqtt://<broker-host>:1883'
export HARNESS_BROKER_USERNAME='…'
export HARNESS_BROKER_PASSWORD='…'
export HARNESS_API_BASE='https://devv2.dmi.voyager.marsvh.com/dmi'   # default
export HARNESS_API_KEY='…'
export HARNESS_INTEGRATION_ID='<dev idexx integration id>'

node scripts/analyzer-results-harness.js                # runs s1, s2, s4
node scripts/analyzer-results-harness.js --scenario s1  # single scenario
```

Every flag has an env-var equivalent; flags win. See `--help`.

## Scenarios

| # | What it does | Expected with the fix | Expected on a pre-fix build |
|---|---|---|---|
| s1 | Final result for patient Fixture-A with requisition id `<prefix>-R1`, then a final result for **Fixture-B with the same id** | Two orders; each patient keeps their **own** report; Fixture-A's report untouched | **FAIL** — Fixture-B's results land on Fixture-A's report, patient overwritten (this is the prod defect) |
| s2 | One run polled three times: PARTIAL → PARTIAL → FINAL for the same patient/id | Exactly **one** order, one report ending FINAL with all analytes | **FAIL** — one orphan order per poll (3 orders) |
| s4 | Run with **no** typed id (diagnosticSetId only) | One order + one report (classic unmatched path, unchanged) | PASS (unchanged behavior) |
| s5 | Re-sends an id from a run **>60 min old** (requires `--reuse-prefix <old prefix>`) | A **new** order/report — the match window still refuses stale reuse | n/a (guards the fix's relaxation) |
| s6 | Same requisition id **and same pet name** sent to **two different hospitals** (requires `--integration-b <id>`) | Two separate orders, one per hospital, each with its own report — no cross-hospital merge | PASS (integration scoping predates the fix) |

Recommended sequence for the DEV sign-off:

1. **Before deploying the fix**: run `--scenario s1` and `--scenario s2` —
   both must FAIL. That proves the harness reproduces the prod defect.
2. Deploy the fixed dmi-api to DEV.
3. Run all scenarios — all must PASS. Note the printed run prefix.
4. **≥60 min later**: `--scenario s5 --reuse-prefix <that prefix>` — must PASS.
5. Ask the Voyager side to confirm the s1/s2/s4 runs appear in **VH Unmatched**
   with the correct patient names (`Harness Fixture-A/B/C/D`) — that closes the
   loop on the user-visible symptom, which is not observable from DMI.

s6 note: every lookup in this path (order, report, identity guard) is scoped by
integrationId, so hospital isolation is provider-agnostic — the second
integration does not need to be an IDEXX one, any integration of the same
organization works as "hospital B".

## Notes

- Everything the harness creates is an orphan order/report whose `externalId`
  starts with the run prefix (`HARNESS-<timestamp>` by default) and whose
  patients are named `Harness Fixture-*` — easy to identify, harmless to leave
  in DEV, easy to clean up if desired.
- The harness never runs against prod: point it only at non-production
  brokers/APIs. It creates data by design.
- Events (`report:created` / `report:updated`) are not exposed via REST; if
  you also want event-level assertions, check the environment's `events_v2`
  Mongo collection for the created order ids after a run.
