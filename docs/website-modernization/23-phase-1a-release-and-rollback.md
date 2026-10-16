# Release and rollback plan — no deployment authorized
## Release status
Locally implemented and reviewable; NOT approved for production. Phase 1B concept implementation also awaits review.

## Gates
1. Review branch diff, security/enquiry behavior, bilingual indexing policy and official-brand concept.
2. Verify actual deployed commit, GitHub/Vercel project mapping and production-branch/preview triggers in provider settings. No tracked vercel.json or GitHub workflows were found; provider automation is not proven absent. No push occurred.
3. Obtain read-only production schema/migration history comparison, backup and restore evidence. Existing production tables may already differ from the initial committed migration.
4. Validate the migration engine on disposable native PostgreSQL or an explicitly approved Neon development branch. Embedded SQL validation passed; CLI engine did not.
5. Reconcile drift without blindly applying the fresh-chain SQL. New-column conflicts/orphan package items must be resolved by an approved data-preserving plan; never delete records to make a migration pass.
6. Stage an isolated hosted preview with production-like configuration, disabled/mock notifications and no production database.
7. Check mobile/tablet/desktop, keyboard, all translated routes, admin/session cases, contact/site survey success/error/deduplication and privacy/logging.
8. Owner explicitly approves production migration/release and notification enablement.

## Migration sequencing
Intake code requires EnquirySubmission and current auth/schema fields. Coordinate migration-before-code deployment with a compatibility plan and short release window; never deploy code that assumes missing columns. Retain legacy fields. Confirm old deployed app compatibility before applying any schema change.

## Rollback
Before release, record previous production deployment ID and Git SHA; keep database backup and protected originals.
For code regression, return to the known-good deployment; do not use destructive Git reset on the shared checkout.
For forward-only DB changes, retain newly added tables/columns and restore compatible code or make a reviewed forward fix. Do not drop receipts/auth/customer tables or overwrite newer submissions. Backups are disaster recovery, not a casual overwrite of post-release enquiries.
Turn off new outbound notification processing if needed; saved enquiries remain available to staff. Test rollback on preview first.

## Operational notes
Persistent rate-limit receipts contain hashed contact/fingerprint plus record references. Approve retention and scheduled expiry cleanup before release; no cleanup job was deployed.
Local snapshot helper excludes .env/.git/node_modules/.next and supplies only hardcoded localhost DB plus disabled notifications. Use a fresh destination after file removals so stale copied routes cannot survive.
Official logo originals/hashes are retained; Phase 1B replacement assets can be rolled back independently. BM Car Accessories is excluded.
