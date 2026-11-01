# Mianzini office and specialist architecture — local Phase 1B review

25 October 2026. Existing branch: `codex/phase-1b-premium-corporate`. No push, merge, deployment, Production access or new integration.

## Delivered

Arusha now reads **Mianzini, Arusha, Tanzania — +255 799 660 068** in the Contact office section, both footers (shared public and homepage), support contact guidance and structured contact data. Pending-address wording is removed from public content. Structured data includes only the confirmed locality/region/country; no street number, building, coordinates, hours or Google profile was inferred. Moshi remains **55 Market Road, Vijana Street, Moshi, Kilimanjaro, Tanzania — +255 745 778 821**. National sales remains **+255 760 111 880; sales@bmcontractorstz.com**. WhatsApp remains Moshi-only and suppressed in the isolated preview.

The existing sixteen service routes are organized into five divisions. Security, Safety & Automation is first, with CCTV, electric fencing and gate automation as its first three links. A native desktop Security & Safety menu exposes those existing URLs directly; mobile menus place the same three links before general navigation. The homepage's security content order, imagery, premium palette and official logo remain unchanged.

The six supporting pages now include equipment/system options, maintenance and one specific FAQ, alongside their existing assessment/delivery guidance. Access control explicitly includes biometric attendance; the existing fire-alarm page includes a distinct intrusion-alarm requirement without creating another URL. Generators/ATS is explicit in the core generator title. Core pages retain their two FAQs and technical guidance, gain an early institutional/BOQ link, and link to relevant equipment search. Supporting pages link to related specialties as well as procurement.

Equipment journeys use the existing catalogue search rather than invented category IDs or model records. Institutional procurement is discoverable within Equipment Supply and linked across divisions. Existing retail/wholesale and product/package enquiry context is preserved.

## Coverage and navigation decisions

See [the route-to-specialty matrix](SPECIALIST-SERVICE-COVERAGE.md) and [its CSV](SPECIALIST-SERVICE-COVERAGE.csv). They document all sixteen URLs, five divisions, specialist search intent, EN/SW completeness, scope evidence, related equipment/services and page decisions.

No new specialty route is justified now. Attendance, intrusion and ATS already fit existing pages. Separate child pages require distinct verified delivered configurations and original assessment, installation, maintenance and FAQ content. Broader industrial HVAC, integrations, qualifications, monitoring contracts and manufacturer relationships are not inferred.

Owner confirmation establishes the listed service scope; it is not independent evidence of qualifications, stock, completed installations or model-specific performance. These remain business evidence requirements.

## Regression and rendered verification

Evidence directory: `../../outputs/specialist-architecture-20261025/` from the worktree root.

- **105 automated tests pass**, including office/schema corrections, division coverage and ordering, withdrawal/publication behavior, security links, secret-safe diagnostic classification and existing admin/enquiry/SEO/isolation regressions.
- Production-mode restricted-database build and explicit TypeScript check pass. ESLint: **0 errors, 15 existing warnings**.
- **38 rendered EN/SW routes pass**: homepage, Contact, Services and all sixteen specialists. Checks include HTTP status, HTML language, one H1, self-canonical/alternate URLs, Preview noindex, confirmed business contacts/address and content FAQ presence. These are successful samples, not a reliability guarantee.
- Desktop security grouping and native security menu, mobile Kiswahili grouping, and Moshi/Mianzini contact presentation were reviewed visually. Four independent Contact browser cases (1440px/390px, EN/SW) passed without horizontal overflow; phone href/display values and both addresses matched. The mobile menu exposes CCTV, electric fence and gate automation as its first three links. Subsequent browser verification encountered the intermittent read failure described below. Do not describe the full interactive acceptance run as clean.
- Original logo/image assets, database schema, model records, recipient configuration and production branch are preserved. No migration, seed or provider notification call was made. Two clearly synthetic diagnostic enquiries were saved in the restricted synthetic database; no production/customer data was used.

## Reliability investigation — unresolved

The earlier failure was reproduced during startup checks, now classified without exposing credentials as **connection-timeout**. The running local site also produced a Prisma **ETIMEDOUT** on `Service.findMany` (and an old local process showed `Service.findUnique`). A later browser request displayed the server-error page. Evidence is retained in the initial preflight logs and `intermittent-read-error.png`.

Findings:

1. DNS resolved the approved endpoint. Direct TCP connections to three resolved IPv4 addresses succeeded (approximately 58–386 ms).
2. A connection-event trace subsequently succeeded in about 6.6 seconds, with authentication completing around 6.3 seconds. The trace does not prove a specific TLS, compute-resume or provider-side cause.
3. Explicit IPv4-first resolution did not eliminate the initial failure. No global DNS/IP workaround was adopted.
4. Six later fresh PostgreSQL client connections passed at approximately 1.66–2.55 seconds. The compute was not deliberately suspended, so these are not controlled cold-compute tests.
5. Actual contact and survey persistence, followed by an identical duplicate submission, passed through the existing store on `bm_preview_20261025` as `bm_preview_runtime_20261025`. Each duplicate returned the same record and did not create another enquiry. Paired first+duplicate timings were approximately 4.93s and 2.80s.
6. No identity/permission rejection was observed on successful samples. The transaction probes call the store directly, not notification providers; application notification suppression still has automated zero-request coverage. Independent provider-side telemetry remains unavailable.

The root cause of intermittent connection/read/save failure remains **unconfirmed**. Successful retries do not establish reliability. Provider/compute connection events around the failure window and a controlled idle/resume plus concurrent-request rehearsal are still needed before release readiness can be claimed. No provider settings, endpoint, credentials, timeouts, pool limits or retry policy were changed.

To improve the next diagnosis, the local source now records fixed safe error categories for isolated-preview startup/contact/survey failures. It logs only event name, a fixed stage and a fixed category—never driver messages, SQL, connection strings, contact data or credentials. It does not log in Production, weaken the identity guard, retry a write or change error responses. Fail-closed startup behavior remains intact.

## Review and release boundary

Review the local Contact/Services pages and the screenshot evidence. Production and the accepted hosted Phase 1A deployment are unchanged by this task. Production release and any new hosted deployment remain on HOLD. The next technical release task is the unresolved connection/read reliability investigation, not adding more service routes.

## Screenshot review set

- `offices-desktop-en.png` and `offices-mobile-sw.png`: confirmed Moshi and Mianzini locations.
- `security-division-desktop.png` and `security-division-mobile-sw.png`: Security first in the existing-route hierarchy.
- `security-navigation-desktop.png` and `security-navigation-mobile-sw.png`: direct security specialty links.
- `intermittent-read-error.png`: actual failure evidence, retained rather than omitted.

These files are in the evidence directory above. `synthetic-diagnostics.json`, `connection-trace.json`, `transport-diagnostic.jsonl`, `rendered-routes.json`, `contact-layouts.json`, and the test/build/type/lint logs support this review. The service matrix and this report supersede earlier pending-Arusha-address notes in historical review documents.
