# Phase 0 — BM Contractors repository audit
Date: 16 October 2026, Africa/Dar_es_Salaam.
Baseline commit: abae7f8779f101848309b1ce12090da3da1e8742.

Scope: BM Engineering Contractors Limited only. BM Car Accessories remains separate. The supplied master instruction and Division C generator supplement govern the work. No application code, production data or environment variables were changed.

## Management recommendation
Preserve the existing Next.js application. Repair authorization, catalogue presentation and SEO correctness before broader commercial expansion. Reuse the existing catalogue, administration and enquiry persistence.

## What works at source level
- Next.js 16.2.10 App Router, React 19.2.4, TypeScript, Tailwind 4, Prisma 7.8 and PostgreSQL adapter.
- Existing security, networking, solar, backup and HVAC service pages.
- Products/categories, product detail pages, CCTV packages, project/support content and administration.
- Contact/survey persistence, English/Swahili content and Africa’s Talking SMS notifications.
- Live www homepage, CCTV page and sitemap returned HTTP 200; apex redirects 308 to www. This verifies availability, not full functionality.

## Priority findings
| ID | Priority | Confirmed source finding | Consequence |
|---|---|---|---|
| SEC-01 | P1 | Admin write actions lack operation-level session/authorization checks; only the protected layout checks sessions. | Sensitive mutations lack a required boundary; live exploitability untested. |
| DATA-01 | P1 | AdminOtp/AdminSession are defined in schema but absent from the only committed migration. | Fresh migration-based setup cannot reproduce authentication schema. |
| UX-01 | P1 | Homepage passes products={packages} into CatalogSection. | Missing product fields and product links built from package slugs. |
| SEO-01 | P1 | Root canonical and language alternates point to homepage; inspected child metadata does not override them. | Risk of wrong canonical consolidation. |
| SEO-02 | P2 | Live host redirects to www; source metadata/sitemap use apex. | Redirect/canonical/discovery mismatch. |
| TRUST-01 | P2 | Generic first-person customer examples are styled as five-star reviews. | Illustrative text can look like genuine endorsements. |
| OPS-01 | P2 | Public forms lack explicit payload bounds, deduplication and anti-spam limits. | Spam, duplicate enquiries and notification cost exposure. |
| CONTACT-01 | P2 | WhatsApp visible number differs from link destination. | Confusing customer contact journey. |

## Verification
TypeScript passed: tsc --noEmit --incremental false.
ESLint passed: 0 errors, 33 warnings (unused values and plain img elements).
HEAD checks: www homepage, /services/cctv and /sitemap.xml returned 200 with Vercel/HSTS headers; apex returned 308 to www.

Limits: no production DB reads/writes, migrations, seeds, form submissions, OTP or SMS tests. No build, full rendered crawl, screenshots, Search Console, analytics, dependency advisory check or measured Core Web Vitals. Current deployed commit, DB contents, backups and business credentials remain unverified. Build should run against an isolated preview DB because pages query persistence and fonts may fetch externally.

## Next decision
Review document 15: Corporate Credibility & Security-Safe Expansion, starting with security/correctness repairs. Wholesale/basket/inventory/CRM follow later. Do not build ERP, accounting, microservices or generator-management software. Phase 0 is a repository audit with bounded live checks, not production certification.


## Phase 1A follow-up
The original audit above is retained as a dated baseline. See 21–23 for implemented corrections, test results and unresolved release gates; see 16–20 for the review-only design and expansion proposal. No production release has occurred.
