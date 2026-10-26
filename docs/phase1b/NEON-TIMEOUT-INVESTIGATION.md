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

## 26 October bounded read-only follow-up

For the media milestone, six fresh restricted connections (three concurrent) and four queued `SELECT 1` reads passed. DNS: 10ms; identity/privilege reads: 1,649–2,270ms; max:1 queue: 2,349ms total. Actual TLS secure events were captured. Evidence: `../../outputs/media-readiness-20261026/connection-measurements.json` from worktree root. No observed-idle experiment or hosted comparison was repeated, so this does not resolve the prior intermittent failures. Guarded build and local public reads also succeeded. No settings/credentials, driver/pool configuration, write retry, Production or accepted hosted Preview changes.

## 26 October trust-sections follow-up: connection failure reproduced

The guarded build now fails at the read-only identity preflight with masked category `connection-timeout`, before Next build starts. A separate credential-free probe to the approved validation endpoint resolved DNS (12ms, IPv4 and IPv6 answers), but TCP connection establishment failed with `ETIMEDOUT` at 765ms across the default address-selection path. An earlier bounded probe in this milestone also failed at TCP. No TLS completion, authentication or SQL timing can be claimed for these failures. Evidence: `../../outputs/trust-sections-20261026/build.log` and `transport-check.json` from worktree root.

This contrasts with the preceding successful 1.6–2.3s fresh connections. The current observation locates a failure before Prisma query execution; it does not distinguish the Mac/network route, endpoint reachability, compute/resume or intermediary behavior. DNS success does not prove TCP/TLS reachability. Do not conclude this is a form-save logic defect or clear the existing application reliability risk. Next safe checks remain correlated endpoint/compute state and transport measurements from an independent authorized runtime. No driver, network, connection limit, pool, compute, credential or retry change was made. No writes were retried and the build/start guard remained fail-closed. A labelled offline static layout harness allows editorial review without asserting database-backed functionality.

## 26 October real-application verification: reproduced cause and local correction

This supersedes the earlier recommendation to leave pool configuration unchanged. The evidence now justifies a small **Preview-only source correction**, without changing Neon settings or Production behavior.

### Reproducible transport observations

On this Mac / Node 24, DNS resolved in 11 ms. Alternating warm-compute trials with the process default `autoSelectFamilyAttemptTimeout=250ms` failed 3/3 at 756–762 ms with `ETIMEDOUT`, before TCP connected, TLS or authentication. The same endpoint and credentials with a 1,000 ms per-address attempt window passed 3/3 in 2,120–2,205 ms: TCP connected at 354–426 ms, TLS completed at 923–985 ms, authentication completed at 1,838–1,914 ms. Initial separate 1,000/2,000 ms probes also passed. This identifies an address-attempt timing failure on the observed local route; it does not prove every historical timeout has that cause.

Neon read-only metadata was available: validation compute changed from idle to active; London, fixed 0.25 CU, pooler disabled, reported suspend timeout 0. No forced suspend/resume or configuration change. The warm alternating failures show that idle/resume alone cannot explain this sample. CPU/memory saturation, proxy traces and a controlled cold-start experiment remain unavailable. Earlier incorrect MCP argument calls are not evidence of a permissions failure.

### Applied correction and finite budget

`lib/preview-pg-options.mjs` supplies a pg socket with an explicit **1,000 ms address-attempt window**, retaining dual-stack selection, existing TLS verification and pool max 1. It sets a **15,000 ms connection/acquisition budget**. The shared startup/build identity check and actual PrismaPg adapter use these same options. Outside Preview the helper returns `{}`. There is no global Node/network change, IPv4 forcing, larger pool, retry, credential change or Neon spending increase.

The 1,000 ms window exceeds the measured 354–426 ms TCP establishment while remaining bounded; 15 seconds allows several connection-stage round trips and a short queue without indefinite waiting. It is a local verification budget, not a guaranteed public-response SLA. A held max-1 pool connection caused a queued checkout to fail at **15,002 ms**, then the next read succeeded. Four queued reads completed in 975 ms. A fresh connection after 12 seconds of pool idle succeeded in 2,449 ms. Actual shared-config identity verification passed in 2,599 ms while the process-global attempt default remained 250 ms before and after.

A budget bounds connection/acquisition only; it does not impose a universal SQL/transaction deadline. Startup retains its 10-second query timeout. No blind retries were added to enquiries or other writes. Existing transaction/receipt deduplication remains limited to identical input within its existing ten-minute window; lost commit acknowledgements still require reconciliation rather than automatic resubmission.

### Application evidence and limits

The complete guarded npm production-mode build passed, including identity preflight, Prisma client generation and Next compilation. The actual local React/Next app passed synthetic EN/SW enquiry, duplicate, authentication, product save/publication and dynamic-service publication checks. See `REAL-APP-VERIFICATION.md` for evidence and limitations.

The accepted hosted Phase 1A Preview was neither changed nor retested in this milestone. Its earlier iad1/London region difference remains a latency hypothesis; this correction has not been validated from that hosted runtime. Small finite samples do not establish sustained availability or p95/p99. Local provider transport auditing recorded zero attempts, but no independent provider-account telemetry was obtained.

A separate least-privilege gap was discovered by a catalog-only query from the synthetic database: `has_database_privilege(current_user,'neondb','CONNECT') = true`. This refers to the **inherited copy**, not the live Production endpoint. No connection to it or customer-table query was made; table-level access remains unknown. Database CONNECT can come from PUBLIC and does not establish table privileges. Obtain owner-approved ACL review/remediation before claiming that the role cannot access the inherited copy. Do not remove privileges blindly or change Production. Current URL/server-identity guards still permit only the approved synthetic database and role.

Before release: repeat staged samples across sessions and idle intervals; compare an explicitly approved hosted candidate; review inherited-copy ACLs; retain identity rejection and notification-suppression tests; rehearse connection/transaction/commit-ack failure handling without automatic write retries. No Neon setting change is currently justified.

Evidence from worktree root: `../../outputs/real-app-verification-20261026/{stages,warm-comparison,pool,neon-monitoring,verification-summary}.json`, build/test logs and real-app screenshots. No credentials included.

Primary references: [Node net connection options](https://nodejs.org/download/release/v24.19.0/docs/api/net.html), [pg Pool configuration](https://node-postgres.com/apis/pool), [pg Client configuration](https://node-postgres.com/apis/client).
