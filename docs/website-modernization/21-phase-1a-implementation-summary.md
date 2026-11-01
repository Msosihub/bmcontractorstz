# Phase 1A implementation summary
Branch: codex/phase-1a-bilingual-corrections. Baseline: abae7f8779f101848309b1ce12090da3da1e8742. Date: 16 October 2026.

## Changes
- All 17 sensitive admin actions call requireAdmin before validation/mutation. Sessions must be current and still allowlisted. Existing allowlist grants ADMIN; unused AdminUser roles are not falsely treated as an implemented permission system.
- Protected pages guard their own reads. Removed duplicate app/admin/page.tsx while preserving /admin through its protected route group.
- OTP consumption now uses conditional atomic updateMany so used/expired/locked codes cannot create another session through repeated consumption.
- Shared admin form bounds reject oversized values, malformed IDs/publication booleans and invalid integer prices/counts or image URL protocols.
- Added forward-only reconciliation migration: auth/intake tables, missing catalogue/content fields, legacy data backfills and preservation of existing relations. Legacy columns retained as ignored fields, no customer or price deletion.
- Homepage renders actual published products separately from packages, with typed catalogue props, truthful request-price/brand states and a genuine empty state.
- Request-derived locale/path metadata, stable www canonicals, reciprocal alternates for translated pages, correct SSR html lang, bilingual sitemap and admin/success noindex. No language URL migration.
- Language selector uses crawlable full-document links (layouts cache on client navigation), preserves enquiry query context and provides visible EN/SW with full accessible language names.
- Identified translation gaps remain accessible and marked. Product descriptions and shared package inclusion lists are not falsely declared complete translations; affected SW detail pages temporarily noindex/omit hreflang. Review/finish in Phase 1B.
- Fixed navigation callback behavior and mobile close handlers; corrected broken project-detail links to existing portfolio.
- Replaced generic review styling and unsupported live-feed/absolute-security/warranty wording with neutral statements; added reduced-motion handling.
- Public forms have bounded validation, localized errors and honeypot. Persistent DB locks/receipts deduplicate ten-minute retries and rate-limit to three distinct submissions per normalized contact in ten minutes; duplicate submissions trigger no extra SMS attempt.
- SMS testing can be disabled; logs omit provider/customer payloads, recipients are deduplicated and request timeout is bounded. Saved enquiries survive notification failure.
- Owner confirmed WhatsApp +255 745 778 821; label/raw/link and /whatsapp redirect now agree. Phone role labels were not changed.
- Preserved final brief, bilingual supplement and all six official logo originals; produced design/competitor proposals separately.

Relevant paths: lib/auth/*, lib/admin-validation.ts, app/admin/*, lib/enquiries/*, components/site/EnquiryForm.tsx, prisma/schema.prisma and migration, lib/seo.ts, proxy.ts, app/layout.tsx, app/sitemap.ts, lib/services.ts, public page metadata, catalogue/trust/navigation components, data/site.ts, tests/ and scripts/.

## Remaining limits
No production DB inspection, deploy, push, live messages or Phase 1B implementation. Prisma CLI migrate deploy against embedded local runtime returned a nonspecific schema-engine error; SQL chain/data-preservation tests passed, but native PostgreSQL/approved disposable Neon migration-engine validation is still a release gate. Contact-based throttling is not an IP-level WAF or complete bot defense. OTP request issuance still uses the existing cooldown; stronger cross-instance issuance controls can follow. No CRM/inventory/payment/upload system added.
