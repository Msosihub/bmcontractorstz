# Generator manufacturer belt — local revision

21 November 2026. The owner explicitly paused the release before any push, PR, merge or Production build to add this refinement. The accepted candidate `a5529ec0db1e5997194bc77dbff9824614e4a2d6`, its archive and protected Preview are retained.

A restrained full-width brand belt now sits between maintenance and the equipment guide. The owner subsequently confirmed sourcing and logo permission for all eighteen brands in the screenshot. All eighteen are now included, using current original artwork. No competitor artwork was copied and no partnership, dealership, stock or price claim was introduced.

Two simultaneous, opposing rows show nine distinct brands each. The four reviewed product-reference brands link to the existing equipment guide; the other fourteen open relevant bilingual, editable brand/equipment enquiries. The belt is a broader technical-supply reference, not a claim that every manufacturer makes complete generator sets. Original artwork, source URLs and hashes are preserved in `BRAND-BELT-SOURCES.json` and the adjacent original-assets directory. Manufacturer colours/proportions are preserved. The DSE badge is accompanied by an ordinary readable company-name caption.

A small icon-only control provides persistent pause/resume, with accessible EN/SW labels. There is no checkbox or visible Pause movement label. Hover/focus stops the track; keyboard focus and reduced motion expose a static, scrollable list with unique accessible links. Duplicate loops are inert and hidden from screen readers. Without JavaScript all eighteen brands remain available in the static list. Existing shared motion observation stops activity offscreen and in hidden tabs. The eighteen static local artwork files (about 131 KB total) load eagerly to avoid blank logos during a loop; repeats reuse the same cached files.

No backend, media upload, schema, credentials, forms, equipment records, existing service content or Production configuration changed. Existing homepage belts are untouched. Review is local only at `http://127.0.0.1:3025/services/generators?lang=en#ge-brands-title` and the Kiswahili equivalent.

The corrected source must be reviewed as a new candidate. Neither the earlier Production staging approval nor the consumed protected Preview approval permits automatically deploying this revision. No feature push, PR, merge, Production build or promotion has occurred. Final hashes and current browser/test evidence are recorded outside the repository under `outputs/generator-belt-20261121` after verification.

## Verification

- Complete guarded Next.js production-mode build passed, including TypeScript.
- All 252 automated tests passed; changed-file ESLint and whitespace checks passed.
- Real local Chrome: EN/SW at 1440, 820, 390 and 320 px; all logos loaded, no viewport overflow, no page errors and zero automated main-content WCAG A/AA violations.
- The 36-second loop boundary was sampled before/after wrap: maximum card gap remained 16 px; positions one complete period apart differed by less than 0.01 px.
- Persistent icon pause/resume, hover stopping, keyboard access and hidden/offscreen stopping passed.
- Reduced-motion and JavaScript-disabled EN/SW views showed exactly the eighteen original brands with no decorative duplicate links. Brand anchors reached existing equipment references.
- Comparison against the previous 580-file runtime manifest found exactly one changed existing runtime file: the Generator page insertion. The equipment data, all original imagery, forms, metadata logic and 40 security entrypoints remain unchanged. New belt files are additive.
- No synthetic database writes were needed for this UI-only refinement. Prior hosted persistence/admin evidence applies to the unchanged forms/backend source; the new belt itself has not been deployed.
