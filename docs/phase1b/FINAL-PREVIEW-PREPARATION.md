# Phase 1B — final protected Preview preparation

27 October 2026. Preparation only; no push, merge, deployment, Production migration, provider activation, credential or ACL change.

## Presentation and freeze

Approved logo, graphite/ivory/bronze palette, architectural hero, five divisions, security-first routes/navigation, bilingual content, two belts, working approach, structured footer, Services imagery and catalogue/quotation journeys remain.

Both public headers now use one build-scoped `PreviewNotice`. Preview shows an explicit EN/SW testing notice. Production's compiled flag is 0 and renders no staging notice. Obsolete unused design-review/demo form strings were removed. The internal notification-disabled route now returns not-found outside Preview. This does not alter independent URL/identity guards, suppression, noindex, robots or sitemap logic.

AI image disclosures no longer have black rectangular backgrounds; small legible text remains on illustrative installations. About's fictional-people disclosure is plain text below its image. Alt text, nearby About explanation, belt context and footer disclosure remain. No fictional person is identified as BM staff/client; no installation is claimed as a completed BM project. No new assets, credentials, testimonials, stock/prices or qualifications.

## Verified local results

- Complete guarded npm build passed after cleanup: Preview identity → Prisma generation → Next production build.
- TypeScript passed. ESLint: zero errors, 15 existing warnings.
- **131 automated tests passed**, including Production/Preview notice separation and retained safety regressions.
- **13 actual-app test groups passed** across public and corrected admin-focused runs: real React motion and pause/resume, keyboard/reduced-motion, division anchors, mobile navigation/no overflow, footer contacts, EN/SW metadata, forms/deduplication, synthetic OTP/session, product Saving completion and publication, dynamic service withdrawal/restoration, admin messages/surveys, zero provider requests/JS errors.
- The first combined run applied a public-header assertion to admin pages, which intentionally do not use the public header. That harness assertion was scoped correctly; the repeated admin groups passed. No application/security assertion was removed.
- Four repeated EN/SW forms produced exactly two contact + two survey records and four receipts. Run-specific fixtures/receipts/sessions/OTPs removed; temporary service fixture removed. Preview fixtures are never a source for Production content.
- Fresh same-config read-only pool test: identity 1,503 ms; four queued reads 882 ms; finite acquisition timeout 15,000 ms; next read recovered; reconnect after 12 seconds of pool idle 1,443 ms. Process default remained 250 ms. No retry, pool expansion, TLS/identity relaxation or Neon setting change.
- Full npm audit: **zero findings**. No dependency/lockfile changes. Next 16.4.3, React 19.2.4, Prisma client/adapter 7.10.1, pg resolved by the existing lockfile. Audit is a point-in-time registry result.

This is sampled local evidence, not a hosted availability/SLA or independent SMS-provider account audit. Twelve seconds proves pool-idle reconnect, not a controlled Neon compute cold start. Hosted region behavior and longer observation remain acceptance checks.

## Database review

`PREVIEW-PERMISSION-REVIEW.md` resolves the prior table-access uncertainty: inherited-copy application DML/column/sequence privileges are denied; the role can connect via PUBLIC and has PUBLIC TEMP. No customer data was read. A separately reviewed minimal PUBLIC CONNECT/TEMP hardening transaction is prepared, **not executed**. The actual app continues to accept only the approved synthetic endpoint/database/role.

## Vercel mapping and safeguards

Read-only CLI 65.2.0 confirms existing `erangs-projects/bmcontractorstz`, project `prj_RHNQnlM5RmscyTmfXfyyWOKTwVVJ`, GitHub `Msosihub/bmcontractorstz`, Production branch `main`, Node 24.x, Next.js, root '.', default install and build (`npm run build`). No build-command override.

`previewDeploymentsDisabled=true` (branch tracking OFF); Authentication `all_except_custom_domains`; no custom environment. Masked project variable inventory: seven Production-only settings and seven Preview-only settings, no mixed assignments, no branch overrides or integration configuration references. Project-filtered Shared inventory is empty with pagination exhausted. Production variable IDs/assignments/update timestamps match the previous approved inventory. Values were not decrypted, exported, logged or changed; hosted effective values still require runtime verification after an approved deployment.

Preview keys: DATABASE_URL, ADMIN_ALLOWED_PHONES, BM_PREVIEW_DB_HOST/NAME/ROLE, BM_ISOLATED_PREVIEW, BM_DISABLE_NOTIFICATIONS. No Preview Africa's Talking credentials or live notification recipients. No environment pull or override file.

MCP still returned a team-scope 403; its supported one-time team-consent link was supplied to the owner. This is separate from the verified CLI authorization. A deployment must use a freshly verified CLI target or a subsequently verified MCP connection, never assume scopes transfer.

Accepted Phase 1A reference deployment `dpl_3SuSFwqhrTwk4nnuwyRxoPs234fN` remains READY at `https://bmcontractorstz-ankmbnhm9-erangs-projects.vercel.app`. Nothing was deleted, promoted or redeployed. Do not create another protection-bypass token; use an already authorized access method and do not log it.

## Schema and compatibility

Schema, migration files, package manifest and lockfile are byte-identical to accepted Phase 1A candidate `27ab0774f9138c4904da205d1c3aab229595bdb9`. Thus Phase 1B introduces **no further database migration or dependency transition**. Existing migration regression tests preserve representative values and handle the inspected drift fixture, including repeated reconciliation.

This does not prove today's Production schema/history, native migration-engine deployment, a recoverable backup or old deployed runtime against forward schema. Original Production `abae7f8` already uses the application column names retained by reconciliation; the reconciliation keeps legacy columns and adds missing tables/fields, but exact live definitions and constraints must be compared before release. Do not run the new website against live Production simply because the visual diff appears safe. No old-code restore/release rehearsal is claimed here.

## Candidate packaging

A final local commit and deterministic runtime source archive are recorded in `../../outputs/phase1b-final-candidate-20261027/RELEASE-MANIFEST.json` and the final readiness report. The manifest includes full revision, archive SHA-256 and per-file hashes. The archive is built from the commit, never a dirty directory.

Runtime source includes app/components/data/lib/public, package manifest/lockfile, Next/TypeScript/PostCSS/ESLint configuration, proxy, Prisma schema/config, preview safety preflight and `.vercelignore`. The packaging manifest explicitly lists included/excluded files. Excluded: Git metadata, env/credential files, private outputs/logs/screenshots, `.vercel`, dependencies/build caches, tests/CI/docs/design harness, original concept exports, local diagnostic utilities, seeds and migrations. Original assets and development history remain in Git; exclusion is from upload only. No fixture or customer database dump is uploaded.

Only the build preflight script is required in the runtime archive. Root package scripts have no migration/seed/postinstall hook; build runs guarded read-only identity verification, Prisma client generation and Next build. No `vercel.json` env/build overrides. GitHub checks remain read-only and do not deploy; they are not newly activated here.

## One protected Preview acceptance plan

After separate approval, recheck exact archive hash, extracted inventory, existing project/team, branch tracking OFF, Authentication and independent Production/Preview/Shared/branch assignments. Fail closed on drift. Use installed CLI help-supported explicit project/scope/environment, one attempt, no `--prod`, `--skip-domain`, `--create-if-missing`, auto-link or retry. No Git push.

1. Record deployment ID, URL, candidate metadata and READY/build status. On command/build/target error, stop; preserve resources and report. No automatic retry or secret adjustment.
2. Signed-out browser must be denied by Vercel Authentication; signed-in authorized request must reach the app. Keep reference Phase 1A Preview.
3. Verify actual host/database/runtime role and forbidden privileges from a guarded, non-secret diagnostic path, without adding a public diagnostic endpoint. Verify no Production/inherited-copy app connection and no Preview notification credentials.
4. Obtain the actual app noindex header through authorized access; robots disallow-all and Preview sitemap empty. Keep staging notice visible. Do not mistake Vercel's login response for the app header.
5. Test all major EN/SW public journeys and all 16 specialist routes, especially CCTV/fence/gates, electrical, generators/backup/solar, networking, telephony and HVAC. Confirm titles, canonical/hreflang intent, imagery and preserved URLs/shortcuts.
6. Synthetic-only product search, filters/pagination, detail specifications, retail/wholesale quotation context; contact/survey validation, localized success, selected product/package/service, duplicate behavior and admin visibility.
7. Synthetic allowlisted admin sign-in, create/edit/Save completion, publish/hide and withdrawn-content discovery. Clean exact test fixtures; do not export or reuse auth/session values.
8. Desktop/mobile imagery, menus, footer contacts, belts pause/resume, keyboard and reduced motion; no horizontal overflow. Distinguish real business records from illustrations.
9. Verify suppression at application boundaries and zero observed live provider requests; document independent account-telemetry limits. No live test SMS/WhatsApp.
10. Run finite warm/pool-idle checks from hosted runtime, record region/request timing and errors. Stop on unsafe identity or repeated save/connect failures; do not retry writes blindly.

## Abort/rollback

Before upload, abort on any scope/identity/hash/isolation drift. After creating the one approved Preview, failure means stop testing and do not promote, alias, retry, enable tracking or change credentials. New-deployment restriction/deletion needs separate approval. Clean only exact synthetic fixtures; leave reference Preview and Production untouched. No Production rollback is required for a Preview-only attempt.

## Production launch remains HOLD

Use `PRODUCTION-LAUNCH-CHECKLIST.md`. Hosted acceptance is not a Production launch authorization. Resolve recovery, exact migration/schema, old/new rollback and operator controls first. Future launch needs its own explicit approved candidate, deployment order and production-specific settings check.
