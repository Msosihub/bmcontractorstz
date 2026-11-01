# Phase 1A test evidence
Date: 16 October 2026. Test fixtures only, no customer data or live SMS.

| Check | Outcome |
|---|---|
| TypeScript: tsc --noEmit --incremental false | PASS |
| ESLint | PASS, 0 errors; 18 remaining warnings in the measured run (mostly existing plain img/unused props) |
| Node unit/migration suite | 60 PASS |
| Admin action boundaries | 17 actions × missing/expired/revoked access with zero writes; authorized and oversized-input cases pass |
| PostgreSQL SQL migration chain in isolated PGlite | PASS; columns reproduced, legacy records/prices retained; package-item FK additionally checked |
| Intake integration through Prisma/PG adapter on localhost | PASS; simultaneous retry saves once; three-submission rate limit enforced |
| Production-mode Next build in isolated source snapshot | PASS (webpack; no env files copied; only localhost DB; notifications disabled) |
| Rendered route/metadata checks | PASS for EN/SW home/CCTV/fence/gates/contact/survey: 200, correct html lang/self-canonical/reciprocal hreflang |
| Admin anonymous request | Redirect to login verified; no dashboard data. Next streaming may return 200 with redirect metadata |
| SW product gap / sitemap | Notice, self-canonical/noindex and omission of false alternates verified; localized sitemap uses www |
| Mobile screenshot/browser review | Performed on local SW preview; mobile menu closure and full-document EN switch verified; remaining popup/visual defects documented for Phase 1B |
| Prisma CLI migrate deploy on isolated embedded runtime | FAILED with nonspecific schema-engine error, including escalated retry; no production attempt |
| Real hosted preview/native PostgreSQL migration engine | NOT RUN; release gate |
| Search Console, live lead performance, field CWV | NOT RUN; access/baseline needed |
| Comprehensive keyboard/screen-reader/three-breakpoint regression | NOT COMPLETE; do not claim accessibility certification |
| Live form/OTP/SMS/WhatsApp sends, production migration/deploy | NOT RUN by design |

Evidence files are exported with the review bundle under phase1a-test-evidence/. Test commands and isolated preview helper are in scripts/.

An initial integration test revealed Prisma cannot deserialize the void return of an advisory lock; explicit text casting fixed it and the integration test passed. An initial build hit the test server's connection cap; adjusted harness then passed. A stale copied duplicate admin route caused a preview manifest error; a fresh source snapshot fixed it. Generated root development type references were stale after removing that duplicate; preserved the obsolete generated validator as .stale and rechecked TypeScript. A draft duplicate package-item foreign-key addition was caught by the fresh-chain test and removed; the existing constraint is preserved. These failures were not hidden.

The migration test uses embedded PostgreSQL-compatible PGlite and local Prisma queries. This is useful validation but not a substitute for testing the migration engine and actual production-schema reconciliation on a native/approved disposable PostgreSQL environment.
