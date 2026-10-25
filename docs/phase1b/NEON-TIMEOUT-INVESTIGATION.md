# Isolated Neon timeouts — investigation

25 October 2026. **The intermittent release risk remains open.** New probes used read-only operations against the approved restricted synthetic database. No production/Preview configuration, credentials, limits, migrations, extensions or notification settings changed. No write retries added.

## 1. Reproducible observations

- Earlier local evidence reproduced Prisma `ETIMEDOUT` on service reads and identity preflights; one successful connection took 6.6 seconds. Previous synthetic contact/survey persistence and duplicate suppression also passed. Those observations do not identify a root cause.
- Validation endpoint `ep-broad-river-abhqdvw9`, branch `br-ancient-mountain-abvb2bco`: fixed 0.25 CU, London (`aws-eu-west-2`), direct endpoint, pooler disabled. Metadata reported active and later idle. `suspend_timeout_seconds=0` was **not** interpreted as “never suspend.” No forced state change. Initial schema inspection could itself wake compute.
- New Mac/Node 24 measurements: DNS 1,092 ms with A/AAAA answers; eight fresh pg connections plus identity/privilege SELECT passed in 1,643–2,265 ms. Baseline: 2,034 ms; after six minutes without local requests: 2,265 ms. Other clients were uncontrolled, so this is not a proven cold-start experiment.
- TCP-connected: 37–245 ms; actual TLS `secureConnect`: 696–959 ms; authentication/ready: 1,415–1,968 ms. Earlier `sslconnect` marked TLS initiation, not completion; the new probe corrects that distinction.
- Three concurrent fresh connections passed. Four queued pg reads at `max:1` completed in 2,351 ms. Actual Prisma reads passed 8/8: warm queue 282–1,001 ms; after a 12-second pool-idle gap 1,672–2,348 ms. No timeout reproduced in this bounded sample.
- Effective local configuration: PrismaPg/pg TCP, pool max 1, idle timeout 10 seconds, connection/acquisition timeout 0, client connect timeout 0, no URL connect_timeout, TLS verify-full with certificate verification enabled. Pool max is per instance, not a deployment-wide limit.
- Accepted hosted deployment remains READY in `iad1` (Northern Virginia), versus Neon London. Four authorised GETs passed: first homepage 5,783 ms; products 1,127/938 ms; SW CCTV 756 ms. All returned the application noindex header; no streamed error detected. These are whole-request timings, not DB timings.
- Existing protection token was reused only in memory; none created. Authentication retained. MCP inspection/log reads returned 403; CLI inspection worked. A 24-hour log window was rejected; a scoped 30-minute read returned no entries. That does not prove absence of errors or provider traffic.
- State/CU/last-active/cumulative usage metadata was available. Working-set metrics require the uninstalled `neon` extension; it was left uninstalled. CPU/memory/connection history and proxy traces were not obtained. No production-data queries filled these gaps.

## 2. Likely causes and evidence

**Connection-establishment variability leads the investigation.** DNS, TLS and authentication round trips contribute measurable latency; prior multi-second traces support this category. IPv4-only trials previously did not remove the problem, so forcing IPv4 is unjustified.

**Connection churn may amplify latency.** The 10-second pg idle timeout means later requests can need a new handshake; the 12-second-gap measurements show this cost. `max:1` serialises work, but there is no evidence of database connection-limit exhaustion. This is Prisma 7 with a pg adapter, not the v6 Rust pool.

**Resume and region distance are contributors to test, not established causes.** Idle state and different hosted/database regions are confirmed; no CPU/saturation evidence justifies resizing.

References: [Neon latency guidance](https://neon.com/docs/connect/connection-latency), [pg pool configuration](https://node-postgres.com/apis/pool), [Prisma v7 adapters](https://www.prisma.io/docs/orm/v7/core-concepts/supported-databases/database-drivers).

## 3. Remaining uncertainty

No failing-request/compute/proxy correlation, independently measured hosted DB stages, useful returned runtime entries or provider-side telemetry. These small samples establish no p95/p99 or sustained availability. The accepted Preview was not instrumented or redeployed. Persistent project-level bypass-token cleanup remains a separate owner decision.

## 4. Minimal correction recommended

Prepare a **future local patch** with masked connection/acquisition/query timings and fixed error categories. Test an explicit finite pg acquisition/connection budget, initially 10 seconds to match the identity preflight; retain the small pool initially. A finite budget bounds waiting, not network failure. No tuning was applied here.

Keep identity checks fail-closed. Do not automatically retry write actions. Existing enquiry/receipt creation shares a transaction and sender lock; identical input deduplicates for ten minutes and only `isNew` triggers notification. That is not unlimited exactly-once delivery. A lost commit response needs operation-ID/reconciliation design before automatic resubmission.

No Neon configuration change is justified now. If correlated evidence later implicates resume, separately propose a bounded suspend-delay trial: fewer resumes versus more billed active compute, record/restore the original setting for rollback. Region/pooler/compute changes likewise need evidence, transaction/identity tests, cost review and approval first.

## 5. Required release tests

1. Repeat observed-idle and warm trials across sessions with DNS/TCP/TLS/auth stages and Neon monitoring; correlate an actual failure.
2. Test concurrent public/admin operations with acquisition waits separated from transaction time, in synthetic isolation only.
3. Compare matching local/hosted operations in a separately approved instrumented candidate; retain Authentication, noindex and suppression.
4. Inject pre-connect, transaction and commit-response faults in disposable tests. Verify rollback/reconciliation, no duplicate enquiry, no false success and zero provider calls.
5. Recheck auth/publication, EN/SW, contact/survey and 24-hour receipt cleanup; define a sustained observation sample and latency budget before clearance.

Evidence directory: `../../outputs/deep-content-timeouts-20261025/`. See connection-measurements, prisma-readonly, effective-pool, compute-metadata, hosted-readonly, hosted-logs and log-summary JSON files. No credentials or customer records included.
