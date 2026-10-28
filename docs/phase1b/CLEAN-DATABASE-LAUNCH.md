# Clean-database release preparation

Owner-approved strategy, 28 October 2026. Based on accepted premium candidate `ce1faafadfaaa2e1e6967358eb336bea9d31d2ab`. Design, imagery, contacts, service content, dependency lockfile, Prisma models and migration files are preserved.

New independent Neon project: `dark-pond-13950155` (`bmcontractorstz-clean-launch`), organization Free plan. PostgreSQL 18, AWS us-east-1, 0.25 CU min/max, default Free suspension. No paid upgrade or old-project operation. Actual returned storage limit is 512 MiB; do not assume larger advertised allowances. Monitor compute/storage allowances after launch.

Production branch `br-muddy-wildflower-b7zefdv1`, endpoint `ep-nameless-bread-b7ki5wyv`, database `bm_production_20261028`, restricted role `bm_production_runtime_20261028`. Synthetic branch `br-young-grass-b7htmd1h`, endpoint `ep-dawn-breeze-b7yxn2j2`, database `bm_preview_20261028`, role `bm_preview_runtime_20261028`. Schema-owner credentials are separate from runtime credentials and never belong in Vercel.

Both committed migrations are replayed through Prisma Migrate, without schema push, migration resolution, seeds, snapshots or inherited business data. Two independent empty validation databases reproduce the clean Production structure; migration checksums and a native Prisma schema diff are verified. Runtime roles have application DML, no DDL, TEMP, role membership, superuser or creation privileges; migration-history table access is withheld. Application Production startup checks the committed exact host/database/role, TLS mode, privileges and required tables/receipt indexes. The build runs the same guard. Connection acquisition is bounded at 15 seconds; no write retry was added.

Production requires `VERCEL_ENV=production`, `BM_CLEAN_PRODUCTION=1`, the new restricted URL with `sslmode=verify-full`, and no Preview flags. Preview accepts only the individually approved old synthetic tuple or new synthetic tuple, with notification suppression, no live provider secrets and noindex retained. An old tuple remains accepted to preserve the earlier validated Preview workflow; existing hosted artifacts are immutable and unchanged.

Sitemap now follows reviewed premium/secondary fallback translation availability and includes static public support guides while respecting explicit unpublished database overrides. Incomplete catalogue translations remain disclosed and not advertised as complete language alternates. No snippet, breadcrumb, animation or visual redesign is included.

Do not put secrets in this repository. Private credential artifacts are held outside it with directory mode 0700/file mode 0600. Runtime source packaging must include both new Production-guard files and root instrumentation; deployment requires exact reviewed commit/archive and owner authorization.

Release target remains existing Vercel project `prj_RHNQnlM5RmscyTmfXfyyWOKTwVVJ`, scope `erangs-projects`. No GitHub push/merge, hosted deployment, domain assignment, old database modification or live messaging is authorized by this document. Production-specific local verification uses suppressed notifications; real OTP/provider delivery needs owner-controlled confirmation after explicit authorization. Preserve current Production admin/provider configuration, never the synthetic test allowlist.

Golden `dpl_Ax4WbFNb7xwcykXonzejPFM2BQx2` retains its original database connection. The new release must receive new database settings as deployment-specific build/runtime overrides, without changing that Golden deployment or the project's existing Preview values. An explicitly approved staged Production deployment uses `--prod --skip-domain`, then exact-ID promotion only after acceptance. Preserve all prior deployments.

Rollback must preserve both databases. Returning domains to Golden restores the old code/old database pairing; it does not display enquiries saved in the new database. Keep those enquiries intact in the new database for a reviewed forward fix/export, and review both enquiry queues while split. Do not point old code at the new database, overwrite with a snapshot, drop tables or delete newer records. Prefer a forward fix retaining the new database; approve any rollback action separately.

Independent encrypted backups on the existing owner-controlled backup server are immediate post-launch work; server access, jobs and off-site storage remain untouched. The prior incident is preserved in the separate incident record, with no further investigation or remediation required for this independent project.
