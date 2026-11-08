# ZKTeco commercial milestone — local review

3 November 2026 · branch `codex/commercial-access-control-01` · released integration base `80e1944350a3274c1b8ccf13a89542e27b929986`.

## Implemented

- Existing `/services/access-control`: six visual solution paths, clear door/attendance distinction, controller/standalone choices, software comparison, entrances, support and practical FAQs.
- Substantive `/services/access-control/time-attendance` and `/services/access-control/smart-locks`: different customer journeys, not duplicated city/keyword pages.
- `/catalogue/zkteco` and 13 model/family pages: search, category filter, up-to-three comparison, exact variant and equipment/installed/support enquiry context, manufacturer links and useful specifications. A ZKTeco entry is also available from the existing Equipment page.
- EN/SW copy, existing language URLs, unique metadata/canonicals/alternates, Product/Service/Breadcrumb data where appropriate, and bilingual sitemap entries. No invented Offers, prices, stock, partnerships or qualifications.
- Genuine locally optimized equipment photographs and two original generated application scenes. One restrained disclosure distinguishes fictional environment scenes from actual projects; rights and source hashes are in `MEDIA-MANIFEST.json`.
- One original complete-door explainer, opt-in and finite, with pause/replay/manual steps, offscreen/hidden-tab stop, reduced-motion and no-JavaScript alternatives. Desktop diagram and readable mobile layout. No animation library or new runtime dependency.
- Code-owned reference catalogue plus an offline engineering-tenant Payload draft export; no live Payload/SQLite dependency or prototype change. See `PAYLOAD-HANDOFF.md` and `COMPATIBILITY-AND-VERIFICATION.md`.

## Verification

- Complete guarded Next.js 16.4.3 production-mode build: PASS against the existing restricted synthetic Preview database. No migration or seed.
- TypeScript: PASS. Changed-source lint: PASS. Full-repository lint: zero errors; 16 pre-existing warnings in unchanged legacy/admin files.
- Automated suite: **227 passed, zero failed** (221 released tests plus six new commercial/data/route/metadata/sitemap/compatibility checks).
- Real application: 20 EN/SW desktop/mobile page views across hub, attendance, locks, catalogue and model detail; **zero axe WCAG A/AA violations**, no broken images, no document overflow or application JavaScript errors.
- All 26 bilingual curated model URLs: PASS. CCTV, electric fence, CENTURION and Equipment regressions: PASS. Unknown model displays the framework not-found UI and noindex; streamed responses may have status 200 rather than an HTTP 404, as with the existing Next.js architecture.
- Search/filter/comparison/reset, variant/scope context and contact prefill: PASS. Mobile menu, language switch, native FAQ keyboard interaction and manual diagram steps: PASS. No-JavaScript content and all 13 catalogue entries: PASS.
- Actual synthetic contact and site-survey saves in both languages: PASS, context retained; confirmed-success contact resubmission produced no duplicate. Four exact records and four receipts cleaned up.
- Actual authenticated admin/product create, completed Saving state, hide/publish, messages/survey pages: PASS. Unauthorized admin redirected. Exact synthetic product/category/session cleaned up. No live OTP.
- Runtime dependency audit: **zero vulnerabilities**. Dependency/lockfile, schema, authentication, startup identity checks and notification code unchanged.
- All 19 public WebP assets total approximately 670 KiB; responsive hero, priority loading and lazy catalogue imagery. Local mobile Chrome observation: LCP 3.39s, CLS 0, 144,019 encoded JavaScript bytes in the observed navigation. This was an unthrottled local lab observation during testing, **not a Lighthouse score or field CWV pass**. Validate performance on an approved hosted artifact before release.

## Reliability and limits

One guarded local restart after idle hit the known restricted Preview connection timeout; the identity guard blocked startup. The next read-only startup check succeeded without configuration changes. This service work does not claim the intermittent connectivity issue is resolved. Repeat cold/idle connection and form checks on the approved protected hosted candidate before any Production decision.

Notifications stayed disabled; live provider credentials were absent, browser external requests were blocked and suppression tests passed. No provider call was observed in the isolated runtime. Independent provider-side telemetry/live delivery was not tested.

Local test/screenshot evidence is in `outputs/access-control-20261102/` at the workspace root, including `build.log`, `tests.log`, `browser-results.json`, `routes-performance.json`, `forms-results.json`, `admin-results.json` and desktop/mobile EN/SW PNGs. Readable entry captures are `review-en-desktop.png` and `review-sw-mobile.png`.

## Owner confirmations / release gates

- Review EN/SW presentation and terminology. Confirm exact BM-saleable models/revisions, prices, stock, accessories, warranty and licensing/support terms before advertising them; the current enquiry-first release does not invent these.
- Software/device/firmware compatibility, Tanzania cloud plans/data terms and each payroll/PMS/visitor/ticketing integration need offer-specific confirmation. No universal integration or upgrade promise.
- Manufacturer image use is owner-authorized by reported dealer phone calls; written evidence/dealer identities can strengthen the register. No new permission request is implied by this note.
- Draft PR only. GitHub Actions billing lock remains an external CI limitation. Do not bypass any required check or protection. Resolve it or obtain a release-specific owner decision where no mandatory protection is bypassed.
- Seek separate approval for exactly one protected isolated Preview of the frozen candidate. Recheck project/environment isolation, authentication and disabled branch tracking before it. Do not merge or deploy automatically.
- A future Production release requires separate staging/acceptance and explicit promotion authorization. Reconfirm the restricted clean Production database identity, guards and retained rollback artifact then; no database migration is required by these page changes.

## Preservation

Current live CENTURION artifact `dpl_Fe6PMfCwFM8kh9bsh84KFgoMErUe`, Production main, previous deployments/Previews, all database resources, provider settings, logo, CCTV/fence/gate source and Payload prototype are preserved. Full-resolution originals remain in the ignored local `design-preview/media-originals/access-control/` directory; optimized derivatives are versioned. No schema, credentials, provider, environment or hosting change is part of this milestone.
