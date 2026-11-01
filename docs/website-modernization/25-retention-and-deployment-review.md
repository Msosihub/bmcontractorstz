# Retention and deployment review
Current status and approvals: 26-release-readiness-review.md. Native PostgreSQL 18 engine checks subsequently passed; backup restore and hosted acceptance remain blocked.

Proposed rate-limit receipt retention: 24 hours. The enforcement/deduplication window remains 10 minutes. Customer enquiries have a separate business retention policy and are never deleted by this mechanism.

New enquiries opportunistically expire up to 500 old EnquirySubmission rows inside their transaction. A dedicated scheduler command, scripts/cleanup-enquiry-receipts.mjs, supports read-only dry-run by default and explicit --apply. It requires BM_RECEIPT_CLEANUP_DATABASE_URL; it does not implicitly use the application database or load .env. Apply uses a 500-row SKIP LOCKED batch and a 10-second statement timeout. No scheduler or production cleanup has been enabled.

Proposed operation: hourly run with a role limited to SELECT/DELETE on EnquirySubmission; repeat bounded batches when backlog exceeds 500, monitor expired-row backlog and failure, alert when older-than-25-hour receipts remain. Configure maximum runs and execution cost limits with hosting provider. Hard expiry during traffic-free periods requires this scheduler: opportunistic cleanup alone does not guarantee it. Owner must approve retention and operations before release.

Production inspected read-only: Neon PostgreSQL 18, project bmcontractorstz-production, production branch. Transaction read-only reported on. Schema/history metadata only, no customer rows. Initial migration checksum matches local file. Only initial migration is recorded, but auth tables and most later application columns already exist. EnquirySubmission is absent. Several initial legacy columns are absent in production.

The local pending reconciliation migration is revised to preserve existing values and handle both initial-chain and inspected drift. Existing object definitions must match expected types/constraints; IF NOT EXISTS alone is not validation. This migration has never run on production. Fresh-chain and drift-fixture tests, native migration-engine evidence, exact indexes/types comparison and restore rehearsal are gates.

Deployment order after approval: (1) freeze release artifacts and record current deployed SHA/project/deployment ID; (2) capture verified recoverable backup and rehearse restore into isolated target; (3) validate exact production metadata against tested assumptions; (4) apply reviewed forward migration only; (5) deploy compatible application with notifications disabled for smoke tests; (6) verify public/admin journeys and receipt cleanup; (7) separately enable approved notifications; (8) monitor errors/enquiries/SEO.

Rollback: retain expanded schema and roll code back to verified previous deployment. Old code was not conclusively identified through Vercel yet, so compatibility is conditional. Newly added receipt table is safe to retain; do not drop auth or customer tables, overwrite existing descriptions/slugs or restore over newer enquiries. Test previous application against migrated isolated schema before claiming rollback readiness. Document forward fix if old code is incompatible.

Neon evidence: recovery history 21600 seconds (6 hours); snapshot schedule empty; saved snapshots list empty. This does not prove no other external backup exists. RPO/RTO, backup owner, snapshot/export mechanism and successful isolated restore remain unverified. No production backup settings changed.
