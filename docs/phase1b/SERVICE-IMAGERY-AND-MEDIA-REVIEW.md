# Service imagery, people and existing media review

26 October 2026. Local Phase 1B only, branch `codex/phase-1b-premium-corporate`. Production and the accepted hosted Phase 1A Preview were not changed. No push, merge, deployment, provider activation, seed or migration.

## Public work completed

- `/services`: ten coordinated visual entries within the existing five divisions, with meaningful EN/SW image descriptions, plain service titles and links to all 16 established specialist URLs. CCTV, electric fencing and gate automation remain first. Other specialist links use light editorial rows rather than another six large images. Existing publication withdrawal filtering remains authoritative.
- `/about`: fictional technical consultation scene, explicitly labelled in EN/SW as AI people who are not BM staff or clients. Existing honest scope/process content retained; no names, counts, certifications or client claims. This illustration can later be replaced with a consented authentic photo through the proposed assignment workflow.
- Product/project/service image consumers now support exact approved record-specific local media, through `RecordImage` and `approvedRecordMedia`. Unknown/remote/unapproved image URLs render no image. Existing generated service illustrations remain labelled fallbacks; there are no fake product/project photo placeholders.
- Project category and optional location are shown from stored values; untranslated project prose is identified. Product list specifications now accept existing admin label/value rows as well as legacy objects; related product links use a bounded published-only same-category query excluding the current product.
- Optional survey budget restored as a free-text field (100-character existing validator limit), with EN/SW “optional” label. No budget is required and no suggested range implies a service price. Existing context, validation, deduplication, storage and notification boundaries remain.
- Service metadata follows the current visible content owner; protected service editor explains its actual field ownership. Full service CMS/revision migration and draft-first behavior are proposals only.

## Existing versus proposed imagery

| Area | Before this change | Local proposal |
|---|---|---|
| Service directory | Architectural hero plus text-only division directory | Same hero; existing CCTV/gate/electrical/solar/generator/network/telephone imagery reused; additional access-control/HVAC/agricultural fencing illustrations |
| Security fencing | Existing security illustration on specialist page | Security specialist page retained; paddock-fence illustration adds agricultural context in the directory without implying a completed farm job or delivery certification |
| About/people | Text only | New fictional East African technical consultation image, explicitly disclosed |
| Stored product/project images | URL fields not rendered in premium lists/details | Approval-aware rendering prepared; **no actual product/project images newly approved** |
| Real project evidence | Only published records, with no new evidence invented | Same record authority; actual category/location restored; image rights/consent still required |
| Original BM logo and approved imagery | 37 assets | All 37 preserved byte-for-byte; four new families added separately |

The approval registry `data/approved-record-media.json` is intentionally empty. No production business record or licence was inspected to establish image rights in this task. Publication alone is insufficient rights evidence. To display a verified existing image, review the exact record ID, URL, model/project match, rights/consent and EN/SW alt; save an optimized local asset under `/media/` and add the exact reviewed assignment. This temporary source registry is explicit and conservative, not the proposed staff Media Library. Existing remote images require ingestion/rights review; they are not silently fetched. No record content, price, stock or publication state was manufactured or changed.

## New assets and usage

Built-in OpenAI image generation, 26 October 2026. No external competitor, stock or manufacturer imagery copied. Generated visuals are illustrative and owner review is pending; this is not verification of an actual installation, employee or specific equipment model. Originals preserved under `design-preview/media-originals/`, excluded from deployments by the existing `.vercelignore`. Manifest includes source, original SHA-256, derivative hashes and bytes. Full prompts: `MEDIA-GENERATION-PROMPTS.md` beside this report. No logo generation or logo edits.

| Family | Use | 640 / 960 / 1440 WebP bytes |
|---|---|---|
| team | About consultation | 47,464 / 86,914 / 151,950 |
| agricultural-fence | Electric fencing directory | 56,596 / 103,462 / 173,244 |
| access | Access-control directory/detail | 22,416 / 41,612 / 74,162 |
| hvac | Air-conditioning directory/detail | 26,890 / 47,470 / 84,504 |

## Verification

- 122/122 automated tests pass, including existing admin authorization, product publication, enquiry/survey deduplication and notification suppression, EN/SW metadata and isolated DB checks. New tests cover media approval/unsafe URL rejection, bilingual illustrated people disclosure, service asset coverage, project fields, metadata ownership and published related products.
- TypeScript and restricted-database production-mode build pass. ESLint: 0 errors, 15 pre-existing warnings. No dependency or Prisma schema changes.
- Local HTTP checks: both languages of Services/About plus catalogue/projects returned 200 without a streamed application error; `/huduma` returned 308 to `/services?lang=sw`, `/whatsapp` returned 307 to the internal suppression notice. Application pages carry `X-Robots-Tag: noindex, nofollow, noarchive`; robots disallows all and Preview sitemap contains no URL entries.
- Legacy regression suite retains all 46 baseline URL patterns, `/huduma`, environment-specific `/whatsapp`, survey service/product/package context, support guides and disabled-notification provider boundaries. No route changes, new integrations or live provider calls.
- Browser visual review at 1440×1000 and 390×844: Services EN desktop and SW mobile; About EN desktop and SW mobile. Mobile has no horizontal overflow; image alt present; service link targets retain language and exceed 44px height. Explicit AI captions remain visible. Survey optional budget and selected context verified in rendered SW form without submission.
- Performance controls: Next Image responsive sizing, native lazy loading below fold, reserved 3:2 figure boxes, intrinsic dimensions for approved record images. No animation or client dependency added. Browser observation confirmed below-fold images remained lazy/unloaded until nearer the viewport. This is structural/visual validation, **not a measured Lighthouse score or field Core Web Vitals certification**. No measured CLS/LCP percentile is claimed.
- Read-only synthetic DB follow-up: DNS 10ms, six fresh connections including three concurrent passed identity/privilege checks at 1,649–2,270ms; four reads through max:1 passed in 2,349ms total. No timeout in this small sample; intermittent reliability risk remains open. No DB settings or retries changed. See existing `NEON-TIMEOUT-INVESTIGATION.md` and new evidence below.

Evidence: `../../outputs/media-readiness-20261026/` (relative to worktree root). Screenshots: `services-desktop.png`, `services-mobile-sw.png`, `about-desktop.png`, `about-mobile-sw.png`; DOM checks, build/lint/tests logs, read-only connection stages and asset-preservation summary alongside them. Review server: `http://127.0.0.1:3007/services?lang=en`, About `/about?lang=en`.

## Outstanding approvals and limits

Review the four new illustrative families and page compositions. Supply or approve real product/project/team media evidence before publication of those images. Approve the separate CMS/media plan before uploads, provider provisioning, new roles, schema/default changes or draft workflow implementation. Cloud storage inventory and provider cost review remain required. Continue sustained Neon fault correlation; this successful sample is not release clearance. Independent provider-side telemetry and previous protection-token lifecycle remain the existing separate follow-ups. Production release remains on HOLD.
