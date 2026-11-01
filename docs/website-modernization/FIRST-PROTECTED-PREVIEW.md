# First protected Preview candidate — 25 October 2026

Local preparation only. No push, merge, deployment, Production migration or notifications authorized.

The dedicated local branch codex/phase-1a-protected-preview preserves the Phase 1A baseline plus all original pending source, official logo/assets and the separate luxury bilingual homepage project. The first hosted candidate serves the main Next.js correctness application from repository root. The premium design remains preserved under design-preview/luxury-homepage, with its original styles and imagery; it has not been substituted for the root application or expanded across pages in this safety task. The design-review directory is excluded from the hosted upload, not removed from Git.

## Included safeguards
- Exact approved Neon endpoint/database/runtime-role allowlist; database-URL override options and live messaging configuration rejected.
- Read-only database identity and role-privilege checks in build preflight and Next server startup. No migration, seed or customer query in these checks.
- Preview SMS/office notification transports return before network calls. No WhatsApp API implementation or credentials. Build-derived public Preview marker sends WhatsApp links and /whatsapp to a bilingual disabled-notification page.
- Preview noindex metadata and X-Robots-Tag, disallow-all robots and empty sitemap.
- .vercelignore excludes environment files, local build/dependency caches, tests/docs/design-review sources, seeds/migrations and unused database-management scripts from the deployment upload. Preservation in Git is separate from upload inclusion.
- Production paths keep their existing conditional behavior. This is not authorization to merge or deploy them to Production.

## Validation and holds
88 tests passed on Node 24; Node 24 build passed. TypeScript passed. Lint: zero errors, 17 warnings. Local smoke checks confirm EN/SW lang attributes and noindex, synthetic database identity, disabled WhatsApp links/redirect, disallow-all robots and empty sitemap. Tests and build used the existing installed dependency directory through a local symlink, which is excluded from Git/upload; a clean lockfile install and repeat checks remain a release gate.

Fresh npm audit reports 19 vulnerability entries (1 critical, 13 high, 5 moderate). Next 16.2.10 has a reported fix at 16.4.3; Prisma/transitive dependencies also need targeted remediation. No blanket audit fix or framework upgrade was applied. Do not approve hosting this dependency set until remediation or an explicit evidence-based security decision is reviewed. The standalone luxury project also retains Next 16.2.10 and requires its own version/lockfile review before separate deployment.

## One-deployment proposal — not executed
Keep Preview Branch Tracking OFF, production main unchanged, and Standard Protection enabled. Resolve official CLI or connector access to erangs-projects. Verify the existing project ID and team in local linking metadata; never create another project or repository. Export the reviewed exact commit to a clean source directory with no environment files or dependencies. Apply the reviewed upload exclusions and verify its file manifest. Build remotely from source with the existing isolated Preview variables; do not use an old prebuilt artifact or send credentials as command flags.

After dependency/install gates pass and explicit approval identifies the exact new commit, one authenticated CLI deploy invocation may target preview with explicit erangs-projects scope, no production flag, no promotion, no stable-domain assignment, no automatic retry and no cache reuse. Record the resulting deployment ID. If status is uncertain, inspect that ID/list before doing anything else: a second call requires a separate decision. No push is required. No share links, auth bypasses, deploy hooks, tracking changes or Production settings are part of this approval.

Hosted acceptance must verify signed-out denial, exact effective build/runtime database identity, restricted privileges, synthetic fixtures, suppression of outbound SMS/WhatsApp, public/admin/product journeys on mobile/desktop in EN/SW, headers/robots/sitemap and logs with no credentials.

## Existing deployment lifecycle
Read-only dashboard inspection at environment=preview showed no matching deployments. Unfiltered history showed three Production deployments, with current abae7f8 on main. Do not mistake these Production deployments for disposable Previews. Connector inventory remains 403 for erangs-projects, so API-complete or recently-deleted history was not proven.

Any older Preview that is rediscovered must be treated as retaining its original environment snapshot and potentially live database/messaging credentials. Do not visit its application or submit fixtures. Maintain authentication, inventory aliases/share links, and request targeted Preview retirement/deletion approval by ID. Do not rotate shared Production credentials or remove Production rollback deployments as cleanup. Retention alone is not evidence that secrets are revoked.

## Rollback / abort
Before deployment, abort by leaving this local branch/worktree intact; no server changes exist. If an approved Preview fails, do not promote it or enable tracking. Keep authentication, cancel an in-progress build or retire only the resulting Preview after the necessary approval; preserve sanitized logs and its source commit. Do not fall back to an old Production-connected Preview. Restore no database and run no reverse migrations. Synthetic test records can remain until separately approved cleanup. Production main, domains and deployment remain untouched.
