# Fire Safety and Telephony — local integration decisions
27 November 2026. Incremental integration only; no hosted operation or GitHub publication authorized by this source change.

## Verified history
- Integration starts at remote main `f99ea0d1d9d578a57a3eeb6049eac3c4ed857174` (tree `9cfa4d44aa49ff2c61de3b85a418fff7531fd5c5`).
- Staged Telephony deployment `dpl_EzzwVRaUJYmmetyNq7TtswCG3neC` freshly resolves to that main commit, source `git`, target Production, READY. This is a deployment identifier, not a commit. Its tree equals reviewed Telephony head `aa5d7e5b1e0edc7fa8da2e6153aea45912631d56`.
- Fire Safety head `33aaceba2121d302d6d5406bddd1e78e3fa4c44a` (tree `158289efe088d5701b1371726a66c706055be8db`) is preserved as the second parent of the local integration merge.
- The merge base is released Networking `dde65a461cf1838bc025c0d977816891427c22d9`. Telephony is already in main; it is not reapplied or reverted.

## Four conflicts, explicit resolutions
1. `app/products/page.tsx`: retain Telephony and add Fire Safety to contextual catalogue discovery; keep all previous manufacturer/networking destinations.
2. `data/blog.json`: preserve all 11 main articles as identical objects and append the one accepted Fire Safety article. No duplicate slug or content replacement; total 12.
3. `lib/local-image-policy.mjs`: preserve both exact equipment allowlists and both sets of responsive scene metadata. No wildcard permission, global image-optimizer change or regenerated image.
4. `scripts/preview-build-preflight.mjs`: run both accepted equipment-publication checks, alongside the existing fence check and database/archive guards.

Automatic merges in sitemap, navigation registry and catalogue/blog tests were reviewed. Both bilingual catalogue namespaces retain independent publication filtering. Existing journal-publication policy is retained. Two focused regression tests cover combined navigation and Production sitemap withdrawal cases for neither/either/both services.

`lib/runtime-archive.mjs` now additionally requires the Telephony media manifest alongside Fire Safety: 45 mandatory entrypoints. This protects both preflight inputs against packaging omissions. Existing generic archive-removal tests exercise the complete required list.

## Preservation and release boundary
All nonshared accepted Fire Safety and Telephony files are checked byte-for-byte against their source commits. Package/lockfile, schema, identity/privilege guards, authentication, notifications, contact/survey implementation, official branding and shared header/footer are unchanged. No new backend, CMS, integration, inventory or design work is included.

A clean integrated archive and source identity are produced after local validation. Prior branches, source archives, Fire Safety Preview and Telephony stage remain intact. Current public rollback reference is `dpl_GJwmKkgGfjDsaVZUnQ4mj1QQ2sUa`; no rollback is executed or implied. Golden historical deployment `dpl_Ax4WbFNb7xwcykXonzejPFM2BQx2` and its original database remain separate recovery references, never to be blindly pointed at the new database.

Next step requires separate owner approval for one protected integrated Preview, with fresh identity, authentication, isolation and tooling checks. No push/PR, remote merge, Production build, promotion, domain, migration, provider or database-permission change is part of this integration.
