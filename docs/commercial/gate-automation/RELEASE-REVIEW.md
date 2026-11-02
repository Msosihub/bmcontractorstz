# CENTURION reference-catalogue release — 2 November 2026

## Scope and ownership

This focused branch starts at released main d1274acc317ae359ab282bedb3827eba2fc4c24e. It contains the approved bilingual gate automation page, 18 CENTURION manufacturer-reference records, catalogue/detail routes, optimized authentic equipment images, approved fictional application scenes, contextual enquiries and sitemap additions. CCTV, fencing, existing Prisma administration, database schema, dependencies and security instrumentation are unchanged.

The public provider reads only data/centurion-reference.json. It has no environment switch, CMS fetch, localhost endpoint, private-media dependency or car-accessory sample. Prices remain null / Request Current Price; availability must be confirmed. Manufacturer ratings are selection guidance, not BM stock, dealership or installation promises. Source/asset manifests are retained alongside the code.

## Separate Payload milestone

Prototype commit 09bc9bbbf4e149e55fd68a201b8eaa0aa6ae483a remains on codex/commercial-gate-automation-01 with its private local SQLite/media runtime untouched. No integrations directory or Payload package/lockfile is included in this release branch or runtime archive. Its next controlled milestone must address durable database/storage and independent recovery, public/private media authorization, authentication/session hardening, tenant-isolation regression coverage, safe publication/revalidation and a reviewed gradual ownership transfer. No production CMS or commerce/payment activation is authorized here.

## Local verification

- Guarded Next.js production-mode build, TypeScript and scoped lint pass.
- 221 automated tests pass; root runtime dependency audit: zero findings.
- EN/SW desktop/mobile gate views: no page errors, image failures, horizontal overflow, external requests or focused axe violations.
- Catalogue search, comparison, category filter, model gallery, variant-specific quotations and survey links pass. CCTV, fencing, products and existing enquiry routes load.
- All 40 bilingual gate/catalogue/model routes render. Invalid product uses Next.js not-found with noindex; a streamed response can have HTTP 200.
- Synthetic database preflight failed twice before successful build/startup checks; no guard was bypassed, configuration changed or write retried. This local connectivity variability must remain visible in staging acceptance.
- No new form submissions, provider requests, Production record access or changes to Production configuration.

## Release controls

Verified existing Vercel project prj_RHNQnlM5RmscyTmfXfyyWOKTwVVJ / erangs-projects, GitHub Msosihub/bmcontractorstz, main still d1274ac. Preview branch tracking OFF; automatic Production domain assignment OFF; Vercel Authentication all_except_custom_domains. No Shared or branch-specific overrides; Production and Preview variables have separate single-environment scopes.

Open a draft focused PR; do not merge or promote automatically. Stage only the exact archived candidate in the existing isolated, authenticated Preview environment, verify read-only hosted routes/assets and isolation, then obtain explicit approval for a Production release. A Preview is not promoted as the same Production artifact: a separately approved staged Production build must use the established clean-Production identity guard and be verified before domain promotion.

Retain live deployment dpl_J1QLF4Q4DL2sLKbGhLemckYqNFT1 and all previous previews. No migrations, seeds, new resources, database permissions, credentials or provider settings are needed. If staging fails, preserve it and report; do not retry automatically. Rollback of any future approved release must preserve enquiries and use the retained clean-database-compatible deployment under owner authorization.

Access Control & Time Attendance is queued until the gate service is published. No other service is changed here.
