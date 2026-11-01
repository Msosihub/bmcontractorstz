# Phase 1B quality refinement — local review

25 October 2026. Branch: `codex/phase-1b-premium-corporate`.

The approved graphite/ivory/bronze presentation, architectural homepage, editorial typography and official logo are preserved. This is local development only. Production and the accepted hosted Phase 1A Preview have not been pushed, merged, deployed, promoted or reconfigured.

## Content and experience delivered

- All ten core service pages now explain the service in a prominent plain-language label and introduction, suitable applications, equipment categories, assessment/installation/handover, maintenance and two specific FAQs in both languages. Tanzanian Kiswahili uses explanatory terms such as *namba za ndani*, *bodi ya usambazaji*, *awamu*, *nyaya* and *mota*, while retaining accurate PBX/IP-PBX, SIP, PoE, DVR/NVR, UPS and model terminology.
- CCTV, electric fencing and gate automation remain first in the main service directory. Their existing URLs are unchanged. No URL migration, canonical restructuring or redirect changes were introduced.
- Equipment guidance, connected services, CCTV packages and institutional procurement are linked from relevant pages. Product and package enquiries now retain their selected-record context, including wholesale enquiries.
- About, privacy, terms, support index/detail, package index/detail, appointments and notification-disabled pages use the premium editorial layout. Six retained secondary service routes have bilingual scope/assessment content in the same layout. These cover access control, air conditioning, fire alarms, maintenance, solar outdoor lighting and video intercom, within the existing approved service scope.
- Support drafts cannot resurface via static article fallback. Package listings show only published database records; fabricated fallback offers and dead package-detail links were removed. Static support guides remain editorial guidance when there is no overriding CMS record.
- Catalogue search now supports category filtering, clear filters and bounded pagination; cards show up to three stored specification values. Product details still display only recorded names, prices and specifications, and identify missing product translation/specification data. No models, prices, stock, supplier relationships or qualifications were invented.
- All 37 approved imagery/logo files are byte-identical to the prior Phase 1B commit. AI illustrations remain labelled as illustrative, not BM installations. No new media or licensing assumptions were introduced.
- Privacy/terms retain the existing substantive commitments and dated policy text; presentation and Kiswahili terminology were refined. This is not a new legal-policy approval.

## Verification

Evidence directory: `../../outputs/phase1b-quality-20261025/` from this worktree.

| Check | Evidence/result |
|---|---|
| Automated regressions | 97/97 pass, including existing admin authorization/completion, publication, enquiry validation/deduplication, bilingual SEO, isolation and zero-provider-fetch suppression tests; new FAQ, support-draft, package-empty-state, catalogue pagination/filter and product/package-context tests |
| TypeScript | Explicit no-emit check and production build type check pass |
| ESLint | 0 errors; 15 existing warnings in unchanged admin/legacy components and preserved standalone design tooling |
| Production-mode build | Pass with restricted synthetic database identity preflight; no migration or seed |
| Local routes | 60 EN/SW responses checked: HTTP 200, one H1, correct HTML language, title/description and Preview noindex header; core service pages contain two FAQ controls |
| Desktop/mobile | 1440px and 390px checks across CCTV, generators, catalogue, support, About and packages: no horizontal overflow, one visible main landmark after streaming settles, one H1, image alt attributes and labelled controls |
| Interaction | Mobile menu opened and navigated to contact; native FAQ opened by Enter; retail/trade context covered in automated render tests |
| Browser → database → success | One synthetic Kiswahili contact and one synthetic English survey saved in `bm_preview_20261025` as `bm_preview_runtime_20261025`; both success screens captured |
| Preservation | Main/origin-main remain `abae7f8779f101848309b1ce12090da3da1e8742`; accepted Phase 1A branch remains `27ab0774f9138c4904da205d1c3aab229595bdb9`; no root environment files; unchanged assets |

The local server remains available at `http://127.0.0.1:3007/`, using the existing restricted synthetic environment and notification suppression. No production-bearing root environment file was used. Admin source, authentication, schema, migrations, dependencies and notification code were not changed by this refinement. Admin coverage here is automated regression coverage, not a fresh full hosted admin acceptance run.

## Failures and practical limits

- An initial guarded local startup failed database verification and correctly blocked service. Restarting with the same guard and identity succeeded. An initial English survey save also returned the unavailable error and created no record; one explicit retry succeeded, with exactly one matching record. Database table permissions/schema were checked read-only. The initial failures are consistent with intermittent connectivity, but their exact cause was not exposed by the deliberately masked error handling. Do not treat the final pass as proof this reliability concern is resolved. No automatic retry, timeout relaxation or safety bypass was added.
- The synthetic database currently has no published product fixtures. Real catalogue cards, filter query constraints, stored specifications and pagination were verified with synthetic in-memory test records; the browser honestly shows the empty catalogue. No fabricated public product records were inserted merely to improve screenshots. Populated visual acceptance still needs verified catalogue records or separately approved clearly labelled synthetic fixtures.
- Accessibility checks were targeted semantic, keyboard and visual checks, not a full screen-reader or WCAG conformance audit.
- Live notification credentials remain absent/disabled in the isolated environment. Zero-request assertions are application test evidence; independent provider-side telemetry is still unavailable.
- The previously documented project automation-bypass token and recommended narrowly scoped revocation remain an owner decision; this task did not create/revoke tokens or change Vercel protection.

## Business evidence still required

1. Exact approved product models, manufacturer datasheets/specifications, licensed product photography, translations, current prices if published, availability and warranty terms.
2. Approved package contents, exact camera/recorder models, recording requirements, inclusions/exclusions and current quotations before publishing package records.
3. Genuine project photographs, customer permission, verified location/scope and completion details before project publication. AI illustrations cannot substitute for these.
4. Evidence for any qualification, registration, tender eligibility, manufacturer authorization or partner claim before it is added.
5. Confirmed service areas, installation/support commitments, lead times and maintenance terms. Current pages describe assessment requirements, not guaranteed coverage or response times.
6. Owner review of final bilingual wording and any institution-specific deliverables. Model-specific engineering design and compliance remain job-specific.

## Technical reference checks

Generic planning language was checked against primary manufacturer guidance: [3CX IP phones](https://www.3cx.com/docs/manual/ip-phones/), [3CX SIP provider configuration](https://www.3cx.com/docs/manual/sip-trunks/) and [Cummins generator load/sizing guidance](https://www.cummins.com/en-ame/news/2023/09/18/how-do-i-calculate-what-size-generator-i-need). These support compatibility/provider separation and running/starting-load considerations; they are not evidence of a BM manufacturer relationship or a product recommendation. No product-specific specifications were copied into the catalogue.

## Review and next step

Review the local desktop/mobile experience and content. Address the observed intermittent save/startup reliability before release acceptance, and populate only verified catalogue/project evidence. This report does not request or authorize another hosted deployment. Production release remains on HOLD; any further hosted Preview still needs explicit authorization.

## Screenshot review set

Files in the evidence directory include:

- `telephone-desktop-sw.png`, `telephone-desktop-en.png`: identifiable telephone service within the approved architectural composition.
- `electrical-mobile-sw.png`: natural Kiswahili, mobile headline and visible enquiry action.
- `telephone-faq-mobile-sw.png`: keyboard-opened native FAQ.
- `about-desktop-sw.png`, `packages-mobile-sw.png`, `catalogue-desktop-en.png`: consistent retained layouts and honest catalogue/package states.
- `contact-success-mobile-sw.png`, `survey-success-mobile-en.png`: successful synthetic form outcomes.
- `survey-initial-error-mobile-en.png`: preserved initial failure evidence, not a success claim.

`browser-layout-checks.json`, `route-metadata-checks.json`, `synthetic-form-evidence.json`, `preservation.json` and the build/test/type/lint logs support the results above. No evidence file contains credentials.
