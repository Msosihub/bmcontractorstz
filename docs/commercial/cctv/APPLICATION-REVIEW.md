# CCTV application selector — local review, 2 November 2026

Adapted the accepted electric-fence application selector to the CCTV page, preserving the existing installed-system packages and customer/enquiry foundation.

- Seven existing applications remain: home/compound, shop, tour office/business, hotel/lodge, school, warehouse and institution.
- Each selectable block reveals its own optimized image, plain-language coverage/technical guidance, quotation and site-survey actions.
- All four package enquiries continue to inherit the selected property type; no single-camera shopping or invented pricing added.
- English and natural Tanzanian Kiswahili supported; security URL, canonical/hreflang and Preview noindex retained.
- Five new scenes generated using the built-in image_gen tool. Originals, fifteen WebP variants and the exact prompts/source paths are recorded in APPLICATION-ASSETS.json. Existing home and hotel illustrations reused. No real client, staff, project or manufacturer relationship is implied. Existing restrained disclosure remains; no repeated image badges added.

## Verification

- Guarded Next.js production-mode build using only the existing restricted synthetic Preview database: passed.
- 215 automated tests, TypeScript and scoped ESLint: passed.
- Real application: all seven panels/photos, keyboard selection, EN/SW quotation/survey and package context, contact subject prefill and metadata passed on desktop/mobile. No overflow at 360/390/768/1440 widths.
- Focused WCAG 2 A/AA and 2.1 AA axe checks: zero violations within the changed selector in all four language/viewport combinations.
- Baseline comparison confirms existing colour-contrast findings elsewhere on the page (hero/customer belt/options/hotel text). These were recorded rather than changing unrelated sections. The previous selector contrast warning is absent from the new section.
- No external browser requests, application browser errors or form submissions. No Production records or settings accessed or changed.
- Screenshot-only captures hide the floating mobile action bar/skip link to avoid stitched long-section artefacts; keyboard and fixed-action behaviour remain active in the actual app.

## Review

Local URL: http://127.0.0.1:3018/services/cctv?lang=en#plan

Before/after EN/SW desktop/mobile screenshots and browser-results.json are saved in outputs/cctv-applications-20261102 outside the source tree.

Branch: codex/commercial-cctv-applications-02, based on released main fb0edcfee01e808c76ee30271dc3f9c8f9e83fd9. Local only: no push, merge or deployment. Gate-automation branch remains untouched.
