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

> ⚠️ **Pre-merge check.** This design assumes Voyager reads report status times from
> `data.report.updatedAt`, which a republish preserves. The event's own `createdAt` is the time of
> the republish. Voyager (Denis) has been asked on #294 and has not confirmed yet. Do not merge
> until they do.

## How it works

```
Admin UI ──POST /admin/reports/:reportId/republish { sourceEventId? }──▶ dmi-api
                                                                          │
   ReportsService.republishReportEvent()                                  │
     1. resolve type (source event's type, else report:updated)           │
     2. load report from MySQL (same graph as production for that type)   │
     3. load integration (practice, providerConfiguration)                │
     4. buildReportEvent() + context.republish                            │
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
`report:created` keeps it, so a report with a PDF carries it inline, as in production.

### Republishing

**`ReportsService.republishReportEvent(reportId, { sourceEventId?, requestedBy })`
returns `{ event, deliveries }`.**

1. **Type.** With `sourceEventId`: load the event by `_id`. Not found → 404. Not a `report:*`
   event, or its `data.reportId` is a different report → 400. The type is that event's type.
   Without `sourceEventId`: `report:updated`. The comparison of `data.reportId` ignores case
   (`ParseUUIDPipe` accepts uppercase ids and MySQL matches them case-insensitively).

   Production has two emitters of `report:created`: `handleExternalResults` (results arriving for
   an unknown/orphan order; may carry the PDF) and `OrdersService.createOrder`
   (`src/orders/orders.service.ts:326`), where every PIMS-placed order gets an empty `REGISTERED`
   `report:created`. Republishing from the latter sends a `report:created` with the current results
   (and PDF, if any) for a report the PIMS already has.
2. **Report.** Load it from MySQL. Not found → 404.
   - `report:updated`: the same graph as the production update path (`reportGraphQuery()`: order,
     order veterinarian/patient/client and their identifiers, report patient and identifier, test
     results and observations ordered by `seq`).
   - `report:created`: that graph plus `order.tests` and `presentedFrom`, which is what the
     production created-from-results path carries.
3. **Integration.** `IntegrationsService.findById(report.order.integrationId)`, which loads
   `practice`, `practice.identifier` and `providerConfiguration` like the production path. A
   soft-deleted integration is not found → 404, and no event is persisted. A report whose order is
   missing or has no `integrationId` → 404 before any integration is loaded, and an integration
   whose practice was soft-deleted → 404. Nothing is persisted in either case. Any status
   (`RUNNING`, `STOPPED`, `ERROR`, …) is allowed; the UI warns about it (see below).
4. **Emit.** `buildReportEvent()` plus
   `context.republish = { sourceEventId, requestedAt }`, published with
   `EventsService.publishEvent()`. The event gets a new `seq`, so `GET /events` pollers see it,
   and goes to the organization's Event Hubs subscriptions with the same partition key
   (`reportId`) as any report event.
5. **Log.** `Republished report <reportId> as '<type>' event <eventId> (seq <seq>), requested by
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
- **`EventsService.publishEvent(dto)`** persists and notifies, and returns `{ event, deliveries }`.
  **`addEvent(dto)`** keeps its signature and returns `publishEvent(dto).event`, so existing
  callers do not change.

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
status would invite a retry that creates another event. Errors expose only their `message`; the
stack stays in the log. 4xx responses (above) are returned before anything is persisted.

Two exceptions to "201 whenever the event was persisted": if `notifySubscriptions` itself throws
(e.g. a MySQL error loading the integration or subscriptions) the request returns 500 after the
event was persisted, and a failing Event Hubs subscription can hold the request for minutes under
the Azure SDK's default retries. In both cases the event exists: the admin should check the events
list before retrying.

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
    is not a replay of the event you are viewing."* (with the actual type);
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
  3. Transaction logs order card, when the entry has `reportId`. Sends `report:updated`.
- **"Republished" badge** for events with `context.republish`: in the events list
  (`GET /admin/events` already returns `context`), the detail, the page and the transaction logs
  event tag.

## Tests and verification

**dmi-api, test-first:**

- `reports.service.spec.ts`:
  - `buildReportEvent`: `updated` without `presentedFrom`, `created` with it.
  - The existing `handleExternalResults` tests, unchanged, as the safety net for the extraction.
  - `republishReportEvent`: type from the source event, default `updated`; 404 for a missing
    report, integration or source event; 400 for a non-report source event or another report's;
    no `publishEvent` call when the integration is missing; the `context.republish` shape.
  - **Golden tests**, `created` with a PDF and `updated`: the event `handleExternalResults` emits
    for a report equals the one `republishReportEvent` emits for it, except `context`.
- `event-subscription.service.spec.ts`: returns the results; `[]` without subscriptions.
- `events.service.spec.ts`: `publishEvent` returns `{ event, deliveries }`; `addEvent` still
  returns the `Event`.
- `admin.controller.spec.ts`: the endpoint's response (error `message` only), `reportId` and
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

- ⚠️ **Blocks merge:** Voyager's confirmation on status times (top of this document).
- Also open with Voyager (listed on #294): whether they handle a `report:updated` for a report they
  never got a `report:created` for; whether `context.republish` is harmless to them; whether they
  fetch Wisdom PDFs from `GET /reports/:id/presentedForm`; whether they upsert or reject a second
  `report:created` for a `reportId` they already have; whether an absent key in an event means
  "no change" or "cleared" (see the stale data caveat).
- **Stale data in MySQL.** The results flow clears some fields only in memory:
  `delete observation.interpretation` when a provider stops sending an interpretation
  (`updateObservationValue` in `reports.service.ts`), and `TestResult.notes` / `deviceId` assigned
  `undefined` (TypeORM skips `undefined` on UPDATE). Production events omit them, but MySQL keeps the
  old value, so `GET /reports/:id` and a republish return it. Pre-existing; a follow-up issue will
  track the fix.
- **Field comparison with real events** (local verification): republished events include as `[]` or
  `null` some keys the original omitted (identifier arrays, veterinarian, observation
  interpretation). Nothing present in the original is missing from the republished event.
- The `report:created` load joins `presentedFrom` into the full graph, so the PDF row is repeated
  across joined rows. Acceptable for an occasional admin action (Wisdom reports are small); a
  separate query would avoid it if it ever matters.
- The event's `createdAt` is the republish time.
- `report.updatedAt` moves only when the report row changes (in practice, its status), not when
  only observations change.
- If results arrive while a republish is reading MySQL, the PIMS could receive the older state
  last. The window is milliseconds; not mitigated.
- Orders with duplicate orphan orders (#384) can make the transaction logs card show a duplicate.
  The admin sees which order before confirming.
- Bulk republish is out of scope. `src/reemit-reports.ts`, a one-off script from the July 2026
  incident, is left as is: its payload differs from production (fewer relations, no PDF, the CSV's
  `integrationId`), and it is not meant to be run again. A bulk republish would replace it.
- Stacked on #381 (PR #382), which this branch targets until it merges.
