# Homepage publication security update — 20 November 2026

The release audit discovered 11 affected package nodes (3 high and 8 moderate), including newly published Next.js advisories, Effect through Prisma configuration, and minimatch through the TypeScript ESLint toolchain. These were not introduced by the footer/header corrections. No Production change was made during this investigation.

Targeted corrections:
- Next.js and eslint-config-next 16.4.3 → 16.4.6, staying on the same framework release line.
- Scoped override of @prisma/config's pinned Effect 3.20.0 to patched 3.22.1. Prisma/client/adapter remain 7.10.1; no schema, migration or application database model change.
- Compatible TypeScript ESLint transitive updates to remove the affected minimatch path. No audit fix --force or Prisma major-version downgrade.

Installation used a separate local dependency directory, with lifecycle scripts disabled. Only this feature worktree's node_modules symlink was changed; other working trees and all deployed websites were untouched. Package lock records exact resolved versions. The final npm audit reports zero vulnerabilities. The complete guarded build/TypeScript and all 237 tests pass; ESLint has zero errors and 16 existing warnings. Browser and hosted checks remain required before promotion.

Official sources:
- https://github.com/vercel/next.js/releases/tag/v16.4.6
- https://github.com/vercel/next.js/security/advisories/GHSA-f3mh-rxg3-f5g2
- https://github.com/vercel/next.js/security/advisories/GHSA-7qx7-33qx-rqx2
- https://github.com/Effect-TS/effect/security/advisories/GHSA-7589-6fvf-x4pw
- https://github.com/advisories/GHSA-g3hv-75wg-m249

The customer-facing publication corrections remove the homepage header scroll handler/animation and blue header CTA override. Footer coverage becomes one brief, sentence-case line, “Serving Tanzania from Moshi & Arusha.” Office phone/address details remain separate. Existing belts, service illustrations, credentials, bilingual content and public URLs are retained.
