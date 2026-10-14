# Republishing a report event to the PIMS

## Why this exists

Sometimes the PIMS does not process a `report:*` event correctly. Today the only way to get the
results to it again is to ask the lab partner to requeue them. This feature lets an admin resend
the report from the admin console instead.

Tracked in [nominal-systems/dmi-api#294](https://github.com/nominal-systems/dmi-api/issues/294).
The alternatives (un-acknowledging at the provider, replaying the stored `events_v2` document)
were weighed in the issue and rejected there.

**Guiding principle:** a republished event is what production would send for the report's current
state. Wherever there is a choice, it mirrors the path a report takes when results arrive.

**Always `report:updated`.** A lab requeue of a report DMI already has reaches the PIMS as a
`report:updated`, so a republish sends the same kind of event. It never sends a second
`report:created`, whose handling by the PIMS is unknown. The failure Voyager reported is a missed
`report:updated`.

### Voyager's answers (#294)

- VH ignores unknown fields, so `context.republish` is harmless.
- Which field VH uses for the report date is not known yet. It does not block: a requeue also
  arrives with the requeue time as the event's `createdAt`, and a republish keeps
  `data.report.createdAt` / `updatedAt` as they are in MySQL. Whichever field VH reads, a republish
  dates the report no differently than a requeue does today. The event's `createdAt` stays the
  republish time, as a requeue's is the requeue time, and a new field with the original time would
  be ignored.
- Whether VH processed the `report:created` before the missed `report:updated` is not known. A
  `report:updated` for a report VH never got is what a requeue would send in that case too.

## How it works

```
Admin UI ──POST /admin/reports/:reportId/republish { sourceEventId? }──▶ dmi-api
                                                                          │
   ReportsService.republishReportEvent()                                  │
     1. check the source event, if given (a report:* event of this report)│
     2. load report from MySQL (production report:updated graph)          │
     3. load integration (practice, providerConfiguration)                │
     4. buildReportEvent(report:updated) + context.republish              │
     5. EventsService.publishEvent() ── events_v2 (new seq) ──▶ GET /events pollers
                                     └─ notifySubscriptions() ──▶ Event Hubs (partition key reportId)
                                                                          │
Admin UI ◀──── 201 { eventId, seq, type, createdAt, deliveries[] } ───────┘
```

The UI never reads MySQL. It only sends a report id (and, from an event, that event's id); dmi-api
rebuilds the event.

## dmi-api

### Building the event

**`ReportsService.buildReportEvent(report, integration, type): AddEventDto`** is extracted from the
emission loops at the end of `handleExternalResults`, which then use it for both types. It returns
the fields set today:

| Field | Source |
|---|---|
| `namespace` | `EventNamespace.REPORTS` |
| `type` | `report:created` or `report:updated` |
| `providerId` | `integration.providerConfiguration.providerId` |
| `practiceId` | `integration.practice.id` |
| `integrationId` | `integration.id` |
| `accessionId` | `report.order?.requisitionId` |
| `data` | `{ practice: integration.practice, orderId: report.orderId, reportId: report.id, report }` |

For `report:updated` it deletes `report.presentedFrom`, as `handleExternalResults` does today.
`report:created` keeps it, so a report with a PDF carries it inline, as in production. The
republish only builds `report:updated`, so it never carries a PDF; Wisdom PDFs stay available from
`GET /reports/:id/presentedForm`.

### Republishing

**`ReportsService.republishReportEvent(reportId, { sourceEventId?, requestedBy })`
returns `{ event, deliveries }`. The type is always `report:updated`.**

1. **Source event.** Optional; it only records where the admin started from. With
   `sourceEventId`: load the event by `_id`. Not found → 404. Not a `report:*` event, no
   `data.reportId`, or a `data.reportId` of a different report → 400. A `report:created` source event is accepted and
   still republished as `report:updated`. The comparison of `data.reportId` ignores case
   (`ParseUUIDPipe` accepts uppercase ids and MySQL matches them case-insensitively).
2. **Report.** Load it from MySQL with the same graph as the production update path
   (`reportGraphQuery()`: order, order veterinarian/patient/client and their identifiers, report
   patient and identifier, test results and observations ordered by `seq`). Not found → 404. No
   test results yet → 409: every order gets an empty `REGISTERED` report when it is created, and
   production never emits a report event without results.
3. **Integration.** `IntegrationsService.findById(report.order.integrationId)`, which loads
   `practice`, `practice.identifier` and `providerConfiguration` like the production path. A
   soft-deleted integration is not found → 404, and no event is persisted. A report whose order is
   missing or has no `integrationId` → 404 before any integration is loaded, and an integration
   whose practice was soft-deleted → 404. Nothing is persisted in either case. Any status
   (`RUNNING`, `STOPPED`, `ERROR`, …) is allowed; the UI warns about it (see below).
4. **Emit.** `buildReportEvent()` plus
   `context.republish = { sourceEventId, requestedAt }`, published with
   `EventsService.publishEvent()` with `REPUBLISH_DELIVERY_OPTIONS` (see "Delivery feedback"). The
   event gets a new `seq`, so `GET /events` pollers see it, and goes to the organization's Event
   Hubs subscriptions with the same partition key (`reportId`) as any report event.
5. **Log.** `Republished report <reportId> as 'report:updated' event <eventId> (seq <seq>), requested by
   <requestedBy>: <n> sent, <m> not delivered`.

`requestedBy` is **not** sent to the PIMS. `context` reaches Voyager verbatim (Event Hubs body and
`GET /events`), and no event carries a user identity today. It stays in the log only. Adding it to
`context.republish` later is additive.

### Delivery feedback

- **`EventSubscriptionService.notifySubscriptions(event)`** returns `SubscriptionDeliveryResult[]`
  (`sent` / `too_large` / `error`, from #381) and keeps logging as it does. No subscription for the
  organization and event type → `[]`.
- An organization has at most one subscription per event type (unique constraint on
  `event_type`, `subscription_type`, `organizationId`), so `deliveries` has at most one entry today.
- **`EventsService.publishEvent(dto, deliveryOptions?)`** persists and notifies, and returns
  `{ event, deliveries }`. **`addEvent(dto)`** keeps its signature and returns
  `publishEvent(dto).event`, so existing callers do not change.
- **Bounded delivery for the republish.** Without options, the producer keeps the SDK defaults
  (3 retries, 30 s apart), so an unreachable hub takes about 90 s. The admin waits on the response,
  so the republish passes `REPUBLISH_DELIVERY_OPTIONS`: `retryOptions` of 1 retry, 1 s apart, 10 s
  per attempt, and `timeoutInMs: 20000`, an `abortSignal` on `createBatch` / `sendBatch` per
  subscription. The signal is needed because `retryOptions.timeoutInMs` does not bound opening the
  AMQP connection (60 s against a host that does not answer). Measured with the SDK: a refused
  port fails in 1 s (90 s with the defaults), a host that does not answer in 20 s (60 s), an unknown
  namespace in 0.4 s. The results path keeps the defaults.

### Endpoint

`POST /admin/reports/:reportId/republish`, in `AdminController` (class-level `AdminGuard`).

- `reportId`: `ParseUUIDPipe` → 400 if malformed.
- Body: `RepublishReportDto { sourceEventId?: string }`, `@IsOptional() @IsMongoId()`.
- `requestedBy`: from `@User()`, the Okta session's `profile.username`, else `sub` (`"Admin"` with
  the jwt strategy; the login with an Okta bearer token), else `"unknown"`.
- `AdminModule` imports `ReportsModule` (no `forwardRef` needed; nothing imports `AdminModule`).

Response, **201 whenever the event was persisted**, regardless of delivery:

```json
{
  "eventId": "…",
  "seq": 12345,
  "type": "report:updated",
  "createdAt": "…",
  "deliveries": [
    { "subscriptionId": "…", "status": "sent" },
    { "subscriptionId": "…", "status": "too_large", "jsonSizeInBytes": 1200000, "maxSizeInBytes": 1048576 },
    { "subscriptionId": "…", "status": "error", "message": "…" }
  ]
}
```

A failed delivery is not an HTTP error: the event exists and pollers will see it, and an error
status would invite a retry that creates another event. Errors expose only their message; the
stack stays in the log. Once the SDK has retried, it throws an `AggregateError` whose own message is
empty, so `describeError()` returns the distinct messages of its `errors` (e.g.
`connect ECONNREFUSED …`); a delivery cut by the timeout reads `Not delivered within 20000 ms`.
4xx responses (above) are returned before anything is persisted.

One exception to "201 whenever the event was persisted": if `notifySubscriptions` itself throws
(e.g. a MySQL error loading the integration or subscriptions) the request returns 500 after the
event was persisted. The event exists: the admin should check the events list before retrying.

### Transaction logs

The `type: 'order'` entry of `GET /admin/transaction-logs` gets an optional `reportId` next to
`data` (`TransactionLog` interface extended). It comes from a light lookup of the report id by
`orderId`, not the full report graph. Set only when exactly one report matches, like
`findReportByOrderId`. Otherwise no `reportId`, and the UI shows no button.

## dmi-api-admin-ui

A separate PR (branch `dmi-api/issues/294`), after the dmi-api one.

- **Client:** `republishReport(reportId, sourceEventId?)` in `js/api-client.js`, calling
  `apiPost('/reports/${reportId}/republish', …)` with a JSON body (at least `{}`).
- **Confirmation:** one reusable inline panel that opens under the button. A panel rather than a
  modal, because the event detail already lives inside a Flowbite modal. It shows:
  - what is sent: *"Sends the report's current state in DMI as a new `report:updated` event. This
    is not a replay of the event you are viewing."* (always `report:updated`, also from a
    `report:created` event);
  - when the integration is not `RUNNING`: *"Integration is STOPPED. The event will still be sent
    to the organization's subscriptions."* The status is fetched when the panel opens, from the
    event's or the order's `integrationId`;
  - after confirming, the result in place: all `sent` → "Sent to N subscriptions"; `[]` → warning
    that the organization has no Event Hubs subscription for this event type and only `GET /events`
    pollers will see it; any `too_large` / `error` → the details. Always with a link to the new
    event.
- **Where:**
  1. Event detail (`src/partials/events/detail.hbs`), for `report:*` events with `data.reportId`.
     This covers the events modal and the event accordion in transaction logs.
  2. Event page (`src/pages/event.hbs`), same condition.
  3. Transaction logs order card, when the entry has `reportId`.
- **"Republished" badge** for events with `context.republish`: in the events list
  (`GET /admin/events` already returns `context`), the detail, the page and the transaction logs
  event tag.

## Tests and verification

**dmi-api, test-first:**

- `reports.service.spec.ts`:
  - `buildReportEvent`: `updated` without `presentedFrom`, `created` with it.
  - The existing `handleExternalResults` tests, unchanged, as the safety net for the extraction.
  - `republishReportEvent`: always `updated`, also from a `created` source event, without the PDF;
    404 for a missing report, integration or source event; 400 for a non-report source event or
    another report's; 409 for a report without results; no `publishEvent` call when the
    integration is missing; the `context.republish` shape; the bounded delivery options; the
    exact join list (the golden test reuses one report object, so it cannot see the graph); no
    `save` of the report.
  - **Golden test**: the `report:updated` event `handleExternalResults` emits for a report equals
    the one `republishReportEvent` emits for it, except `context`.
- `event-subscription.service.spec.ts`: returns the results; `[]` without subscriptions; SDK
  defaults without options, retry options and one timeout per subscription with them; a timeout
  reported as such; the `AggregateError` causes in the log.
- `describe-error.spec.ts`: plain errors, `AggregateError` causes, code/name fallbacks.
- `events.service.spec.ts`: `publishEvent` returns `{ event, deliveries }`; `addEvent` still
  returns the `Event`.
- `admin.controller.spec.ts`: the endpoint's response (error message only, also from an
  `AggregateError`), `reportId` and
  `sourceEventId` validation, `reportId` present/absent in transaction logs.

**Limit of the golden tests:** with mocked repositories they prove how the event is *built*, not
that the joins load the same relations as production. That is checked on a local stack: process
results through the real flow, republish the same report, and diff the two `events_v2` documents
(only `_id`, `seq`, `createdAt` and `context` may differ); check `GET /events`; if a dev Event Hub
is available, check the real delivery.

**Before each PR:** `npm test`, `npm run build`, eslint (no `--fix`) on the touched files;
admin UI: `UI_URL=/ui npm run build` (restore `package-lock.json`) and a manual pass over the three
entry points and the three outcomes.

## Caveats

- Still open with Voyager, not blocking (see "Voyager's answers" above): which field VH uses for the
  report date; whether they fetch Wisdom PDFs from `GET /reports/:id/presentedForm`; whether an
  absent key in an event means "no change" or "cleared" (see the stale data caveat).
- **Stale data in MySQL.** The results flow clears some fields only in memory:
  `delete observation.interpretation` when a provider stops sending an interpretation
  (`updateObservationValue` in `reports.service.ts`), and `TestResult.notes` / `deviceId` assigned
  `undefined` (TypeORM skips `undefined` on UPDATE). Production events omit them, but MySQL keeps the
  old value, so `GET /reports/:id` and a republish return it. Pre-existing; a follow-up issue will
  track the fix.
- **Field comparison with real events** (local verification): compared with a `report:created` or
  orphan-path original, republished events include as `[]` or `null` some keys the original omitted
  (identifier arrays, veterinarian, observation interpretation). Against a results-path
  `report:updated` (the wisdom-panel loop), the two differ only in the order's newer state. Nothing
  present in the original is missing from the republished event.
- The event's `createdAt` is the republish time, as it is the requeue time for a requeue.
- `report.updatedAt` moves only when the report row changes (in practice, its status), not when
  only observations change.
- If results arrive while a republish is reading MySQL, the PIMS could receive the older state
  last. The window is milliseconds; not mitigated.
- Orders with duplicate orphan orders (#384) can make the transaction logs card show a duplicate.
  The admin sees which order before confirming.
- Bulk republish is out of scope. `src/reemit-reports.ts`, a one-off script from the July 2026
  incident, is left as is: its payload differs from production (fewer relations, no PDF, the CSV's
  `integrationId`), and it is not meant to be run again. A bulk republish would replace it.
