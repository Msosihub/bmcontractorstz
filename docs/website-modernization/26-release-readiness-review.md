# Phase 1A release readiness and Phase 1B review — 16 October 2026

**Decision: HOLD — production deployment is not authorized or release-ready.** Local changes and the design proposal are reviewable. No production data, migration history, backup settings, deployment or customer notification was changed.

## Passed

- Production metadata inspection used a PostgreSQL read-only transaction; the server confirmed read-only mode. No customer records were queried. The initial migration checksum matches the repository. Production already contains later columns/auth tables despite recording only the initial migration. Application scalar types/nullability match inspected production fields except the absent EnquirySubmission table. Constraints and indexes were inspected separately; timestamp precision/default expressions need final preflight.
- Revised pending migration preserves existing descriptions, slugs and camera counts. Fresh-chain and production-column-fixture tests pass. It handles legacy-column absence without overwriting existing approved values. IF NOT EXISTS is not a substitute for checking incompatible existing definitions.
- Actual Prisma migration-engine validation passed on approved Neon PostgreSQL 18 branch bm-phase1a-validation-20261016, in the separate empty bm_phase1a_validation database. Fresh migration deploy, status, repeat deploy, drift fixture baseline resolution, drift migration deploy and status all exited 0. Baseline resolution occurred ONLY on the empty isolated fixture, never production. The drift fixture models production columns, not all production data or a full production backup.
- TypeScript, lint (zero errors), 62 automated tests and database-backed intake verification pass. The isolated production-mode Next build passes. Final logs are in phase1a-review-v2-evidence/final; native results are in native-approved. Earlier failed TLS attempts are retained as diagnostic history, not final results. macOS trust access required the approved unsandboxed engine run; certificate checks remained strict.
- Retention implementation separates 24-hour rate-limit receipts from customer enquiries. Bounded opportunistic expiry and a dedicated dry-run/apply scheduler command are prepared. Integration checks verify deduplication, rate limits, expiry and preservation of customer enquiries. No production job is installed.
- Local route checks cover EN/SW homepage, CCTV, electric fence, gate motors, contact and survey metadata, admin denial, sitemap and incomplete-translation notices. Browser evidence includes Kiswahili mobile contact success, English desktop survey success, fixture OTP login, admin message visibility and persisted follow-up status. The duplicate admin shell found during review is corrected locally. Hosted acceptance and full admin/product journeys remain gates.
- Official logo originals and preserved copies still match all six recorded SHA-256 hashes.

## Remaining blockers

1. **Backup / restore proof:** Neon reports a six-hour recovery-history window, no saved snapshots and no snapshot schedule. Snapshot rehearsal on the validation branch was rejected: non-root branch snapshots are not allowed. External backups may exist but have not been verified. Obtain an approved recoverable production backup/checkpoint, recovery owner, RPO/RTO and successful restore into an isolated target. Do not restore over production.
2. **Hosting access:** owner identified erangs-projects/bmcontractorstz. The connected Vercel authorization returns 403 for that team; browser console requires sign-in. Owner is reconnecting the correct account. Current production deployment SHA, deployment ID, build settings, production/preview triggers and environment scoping remain unverified.
3. **Hosted preview:** not created. Before creating it, prove its database is isolated, use synthetic fixtures, disable notifications at build/runtime, omit live messaging credentials, protect admin access and prevent indexing. Never inherit a production DATABASE_URL through preview settings. Verify both public/admin journeys on desktop/mobile there.
4. **Release / rollback rehearsal:** migration-before-code order is documented, but previous deployed code is unidentified and has not been tested against the migrated isolated schema. Keep additive changes on code rollback; never drop customer/auth data or overwrite newer enquiries.
5. **Receipt operations:** owner must approve 24-hour policy, scheduler location, least-privilege role, hourly cadence, bounded backlog processing and failure/backlog alerts. Traffic-driven cleanup alone does not enforce expiry during idle periods.
6. **Final production preflight:** recheck schema/defaults/constraints/indexes and history immediately before release, review the revised migration diff and lock/data assumptions, and confirm the fresh backup. Native fixture success does not authorize production execution.
7. **Admin action completion:** local browser follow-up status updates persist in the database, but the button can remain on Saving until refresh. An explicit redirect did not resolve it and was not retained. Fix the response/UI completion issue and verify messages, surveys, product editing/publication and logout/session denial in the hosted preview before acceptance. Automated authorization tests do not prove this browser journey works.

## Required approvals

- Phase 1B visual direction and final genuine-photo selection; scope/evidence for IP-PBX, electrical, generator and procurement copy; translation quality review.
- Retention and operational cleanup policy.
- Backup creation / isolated restore mechanism and recovery objectives; production migration and code rollback plan.
- Explicit production migration/deployment approval only after every blocker closes. Notification enablement is separately controlled.
- Delete the temporary Neon validation branch after evidence review. Its compute was suspended; branch data is retained. No branch deletion was performed.

## Phase 1B proposal v2

Review the separate ten-screen bilingual HTML prototype. It adds stronger security entry points, refined service/card hierarchy, engineering/procurement panels, generators and backup, business telephones/IP-PBX, improved catalogue layouts, responsive navigation and enquiry placement. English defaults; Kiswahili remains visible and functional. The official shield is used without recolouring or changing proportions.

Photography is explicitly unfinished: no existing image has proven provenance as a genuine BM installation. Wide hero, electrical, power and telephony placements specify subjects/crops and consent requirements. Placeholders are labelled and are not project evidence. Product cards are illustrative layout shells, not new product records. No competitor imagery or branding is copied.

Prototype screen checks: ten EN screens at 1440 and 390 widths and ten SW screens at 390, plus a 768-width check, showed no horizontal overflow and one primary heading per screen. Language and mobile menu controls were exercised. This is design verification, not a hosted application acceptance test. Browser screenshots were viewed inline; saving them through the browser tool was denied by its filesystem sandbox, so no screenshot files are claimed.

The competitor capability matrix distinguishes existing approved BM capabilities, missing representation and opportunities needing verification. Kitotech and Pentagon are feature/industry references only. Inventory, payments, ERP and a site-wide production redesign remain outside scope.

## Review artifacts and isolation

Local branch: codex/phase-1a-bilingual-corrections. Previous local commits retained; follow-up changes are uncommitted for review. No Git push occurred. Pending migration has never been applied to production. Do not run the general production migration command from this report.

Temporary Neon target: project calm-bar-57598453; branch br-ancient-mountain-abvb2bco; validation database bm_phase1a_validation; endpoint ep-broad-river-abhqdvw9. Inherited production tables in neondb were not accessed or altered during validation. All test writes were in the separate validation database. Compute is suspended and will wake on a new connection; deletion awaits owner approval.
