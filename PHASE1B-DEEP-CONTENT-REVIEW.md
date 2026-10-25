# Phase 1B — specialist content and reliability review

25 October 2026. Local branch: `codex/phase-1b-premium-corporate`.

**Ready for local editorial review. Database reliability is not cleared for release. Production and the accepted hosted Phase 1A Preview remain unchanged.**

## Delivered

- Substantive EN/SW technical guidance on all 16 existing service URLs: system choices, applications, assessment, commissioning/handover, maintenance and specific FAQs. No new service routes or city doorway pages.
- Existing electric-fence page now distinguishes residential/commercial security, farm/livestock and specialist game/wildlife briefs. It does not claim completed BM agricultural/wildlife projects or publish universal energizer settings.
- Structured manufacturer research: 23 identities/families checked through primary sources; five unresolved entries held. Educational references are visibly distinguished from BM stock, dealership and installation evidence. No manufacturer or competitor images copied.
- The service-to-survey journey preserves the selected service and language. Two remaining Kiswahili contact-method labels now read Simu / Barua pepe while keeping their stored form values unchanged.
- Public product specifications now render both the current admin label/value format and legacy scalar objects. No catalogue records, prices, stock or schema were invented or rewritten.
- Source-based backend inventory, a proposed Draft → Review → Approved → Published lifecycle, compact admin UX plan and phased reuse of the existing Next.js/Prisma/admin foundation. Nothing resembling a second backend, inventory, payments or ERP was built.
- Project portfolio architecture and private evidence requirements, informed only by Kitotech's public interaction patterns. Management leads remain outside all public content and fixtures.
- Security-first navigation, canonical/EN-SW URLs, confirmed Moshi/Mianzini contacts, original logo and approved generated assets preserved. No animation work.

Read [content, equipment, projects and backend roadmap](docs/phase1b/CONTENT-AND-BACKEND-ROADMAP.md) and the [timeout investigation](docs/phase1b/NEON-TIMEOUT-INVESTIGATION.md). The full research fields are in `data/manufacturer-research.json`; bilingual additions are in `data/specialist-technical-content.json`.

## Verification

- Restricted synthetic database identity/privilege preflight passed; no inherited production environment file used.
- Production-mode local build and TypeScript passed. ESLint: zero errors, 15 existing warnings.
- 109 automated tests passed, including auth/publication, enquiries/deduplication, notification suppression, metadata, service coverage and both product-specification formats.
- 38 rendered EN/SW route checks passed: homepage, contact, service directory and 16 service pages. Checked HTML language, canonical/hreflang, office structured data and Preview noindex header.
- Representative desktop/mobile visual checks completed. At 390px, telephone and air-conditioning pages had no horizontal document overflow; fence comparison also checked. Native reference disclosure opened through Enter. Enquiry context and translation links remain present.
- Original approved asset manifest: 37 hashes unchanged. No public assets, auth/store/notification code, database schema, dependencies or production configuration changed.
- Read-only diagnostics: eight fresh pg connections, eight real Prisma reads and four queued pg reads passed; an idle window and compute state were observed. Four authorised GETs to the existing hosted Preview passed with noindex. This small passing sample does not close intermittent ETIMEDOUT risk.

Evidence directory (outside source): `../../outputs/deep-content-timeouts-20261025/`. Contains `test.txt`, `types.txt`, `lint.txt`, `build.txt`, `rendered-routes.json`, `browser-checks.json`, masked transport/configuration results and screenshots. No credential values or customer records included.

## Remaining requirements

1. Reliability: correlate a failing request with connection stages and Neon monitoring; test a finite pg connection budget and unknown-commit reconciliation in a future local patch. No blind write retries or compute/connection-limit changes. See the short investigation for exact observations, uncertainty and release tests.
2. Business evidence: approve exact model/supply/installation scope, current availability, warranty and any reproduction rights. Resolve Lanster/Lanstar, Starfix, Lux, Sundar and proposed Hikvision gate/PBX claims. Manufacturer documentation is not a BM partnership certificate.
3. Projects: verify BM role, status, quantities, outcomes and genuine photo/client permissions before publishing. No public case studies were created from unverified management leads.
4. Editorial: owner/technical review of the new EN/SW drafts; richer service sections remain source-managed until the separately reviewed admin milestone. Product SW gaps remain identified where the existing database has no translated field.
5. Release controls: persistent project-level Vercel automation token remains a separate lifecycle decision; provider-side zero-notification telemetry is unavailable. No new deployment or token was created. Existing Preview Authentication was retained.

## Exact safe next step

Review the local pages at `http://127.0.0.1:3007`, approve/correct technical and business scope, then prepare the small existing-admin product-content milestone and bounded local reliability patch. Any further hosted deployment, Neon configuration change or production release requires separate approval. No push, merge, migration or deployment was performed here.
