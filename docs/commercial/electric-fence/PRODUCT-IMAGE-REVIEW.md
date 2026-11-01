# Equipment photography — local review only

2 November 2026 · Electric-fencing page only

Eight genuine product photos were sourced from the model pages on Nemtek, JVA, Gallagher and Stafix manufacturer sites. Each was visually checked against the selected model. The JVA Z14 photo was selected specifically instead of the Z14R image also returned by the official store. The Nemtek Agri 10km page uses the Agri-1J-labelled device photo; it has not been relabelled or altered.

Optimisation was limited to orientation metadata, proportional resizing without enlargement, and WebP conversion. No generative enhancement, relabelling, watermark removal or invented product reconstruction was used. All originals and optimised files are preserved locally, with dimensions, source URLs and hashes in `data/electric-fence-product-images.json`.

## Sources and clearance

| Model | Official source | Publication status |
|---|---|---|
| nemtek-druid-13lcd | [Product page](https://www.nemtek.co.za/product/druid-13lcd-energizer/) | Permission pending — local review only |
| nemtek-druid-28lcd | [Product page](https://www.nemtek.co.za/product/druid-28lcd-energizer/) | Permission pending — local review only |
| nemtek-agri-10km | [Product page](https://www.nemtek.co.za/product/agri-10km-energizer/) | Permission pending — local review only |
| jva-z28 | [Product page](https://store.jva-fence.com.au/products/jva-z28) | Permission pending — local review only |
| gallagher-mbs200 | [Product page](https://shop.am.gallagher.com/au/en_AU/animal-management/electric-fencing/power/multi-powered-energizers/mbs200-multi-powered-fence-energizer/p/G38911) | Permission pending — local review only |
| jva-z14 | [Product page](https://store.jva-fence.com.au/products/jva-z14) | Permission pending — local review only |
| stafix-x3 | [Product page](https://au.stafix.com/products/energizers/x3-unigizertm) | Permission pending — local review only |
| stafix-x6i | [Product page](https://nz.stafix.com/products/energizers/x6i-unigizertm) | Permission pending — local review only |

Nemtek's [document terms](https://www.nemtek.co.za/documents/) restrict image reproduction without express permission. Commercial reuse permission for the other manufacturer photos has not been established. Public availability is not treated as a licence.

The raw and optimised photos are excluded from Git to prevent accidental upload to the public repository. They remain present in the local worktree for review. A tested build-preflight check blocks any hosted Vercel build or Production build while an image lacks explicit clearance and recorded permission evidence. The validator and manifest are mandatory archive entrypoints. Existing deployed artifacts and their settings are unchanged.

Before publication or GitHub upload, obtain permission covering the specific source images and intended commercial website use (including size/format optimisation), or replace them with appropriately cleared photographs. Only then update the evidence/approval fields, verify hashes, remove the image-directory exclusions deliberately, and review a new release candidate. No messages requesting permission have been sent.

## Customer belt

The visible “Pause movement” / “Sitisha mwendo” wording is removed. A small pause/play icon replaces the text so keyboard and pointer users can still stop the motion. Hover/focus pause and the static reduced-motion layout remain. No customer names or image disclosures were added or changed.

All work remains on the local electric-fencing branch; no push, merge, deployment, database write or provider request is part of this change.

## Verification

- 214 automated tests passed; TypeScript, scoped ESLint and the complete guarded Next.js production-mode build passed.
- Real application checks passed in English and Kiswahili at desktop and mobile sizes: eight loaded photos, brand/application filters, model-specific enquiry context, all seven customer names, keyboard pause/resume, reduced-motion fallback, canonical URLs and Preview noindex.
- No horizontal overflow, browser errors, external browser requests or axe accessibility violations were detected in those checks. No forms were submitted or database records changed during this image update.
- Negative build-preflight checks rejected both hosted Preview and Production configurations before database access while image permissions remain pending.
- The user's existing local browser tab was refreshed and confirmed to contain eight product photos and no visible “Pause movement” wording.

Evidence is retained outside the source tree in `outputs/electric-fence-images-20261102/`: `browser-results.json`, `tests.log`, `build.log`, `types.log`, `lint.log`, `publication-block.json`, and `after-{en,sw}-{desktop,mobile}-{catalogue,customers}.png`.

## Owner publication confirmation — 2 November 2026

The owner explicitly confirmed that BM's equipment suppliers were contacted by telephone and advised proceeding with publication of the eight product photographs. Publication is authorized on that owner-reported supplier confirmation. Supplier names and written rights-holder permission were not supplied or independently verified; this record does not assert a public-domain licence or official manufacturer endorsement. The prior local-only status above describes the earlier review. Optimised WebP variants are now tracked for release; originals remain locally preserved.

The existing publication validator remains in place. All eight records now contain the actual owner-reported evidence; tests continue to reject missing approval or evidence. No product labels or device geometry have been altered.
