# Living Website Experience — local milestone

The frozen Champagne Current Preview is preserved at commit 87bcb161000ee4c208d5a7201587782e480a6131. Phase 2 starts from that exact commit in codex/living-website-experience-01; it does not modify its archive or hosted deployment.

Three focused changes:

- Service discovery uses a compact 4 × 2 desktop/tablet grid and 2 × 4 narrow-mobile grid. Original destinations and copy remain. A coherent SVG signal line joins the eight service-specific icon interactions. No extra WebGL, animation library, content or database fetch.
- Contact and Site Survey share TanzaniaConnected, with verified Natural Earth geometry and city points. Two real office cities use gold circular markers; arranged-service enquiry cities use teal diamonds. Original headlines, server actions and form inputs remain. Native office disclosures and direct form navigation work without JavaScript. Addresses come from data/site.ts. No exact street coordinate, live network, travel route, response promise or additional office is implied.
- Desktop genuine-mouse hover opens native details after 140 ms, switching panels after 85 ms; leaving gets a 240 ms grace period. Click, keyboard, Escape, outside dismissal and touch remain. Labels are medium/semibold at the original size. The five-group panels and responsive breakpoint remain intact.

LivingMotion enables CSS animation only when in view and the document is visible. Reduced motion disables all new motion. Without JavaScript, content and native navigation remain visible and static. No rAF loop, additional rendering library or runtime map request is introduced.

The React checklist was applied: static SVG/data stay server-rendered; the client lifecycle controller uses one IntersectionObserver and visibility listener with cleanup; no per-frame state updates or data fetching; native details and anchors provide semantic fallbacks. Existing security/publication filtering and enquiry hydration ownership are untouched.

Geography provenance and licence: TANZANIA-GEOGRAPHY-SOURCES.json. Natural Earth public domain. Stripe is a quality and interaction reference only, with no copied artwork, code or text.

No push, merge, deployment, migration, provider activation, credential/settings change or Production record access is authorized for this milestone.

During verification, a synthetic database publication read returned a raw pg-pool pending-client acquisition timeout and produced a 500. The exact message was traced to installed pg-pool/index.js, where a bounded checkout timer removes its waiter and returns an Error with no code. A minimal navigation-only correction recognizes this one observed exact message, reusing the existing conservative fallback (omit every service-dependent link; retain independent directories/contact). It does not retry the query, alter connection budgets, modify startup guards, or swallow permission/authentication/identity errors. A regression test covers one read, safe omissions, independent destinations, later recovery, fatal nested causes and rejection of similar unknown strings. Underlying intermittent transport/pool availability is not claimed fixed.

A continuous diagonal-pointer test (20 browser mouse steps per travel) found a stale hover timer could switch to a label crossed on the way into a wide panel. Leaving that summary now cancels its pending open timer. The open panel retains its grace period; keyboard/touch behavior stays native. Real continuous pointer travel is included in final acceptance, beyond direct locator-hover tests.

## Final verification

- 279 automated regressions pass, including the new source-confirmed pool-timeout fallback case.
- Guarded Next.js production build, TypeScript and targeted ESLint pass. Runtime source copy matched the worktree byte-for-byte.
- Final real-Chrome matrix: 41 passing cases, EN/SW at 1920/1440/820/390/375/320, zero blocked write attempts and zero page errors. Service/map regions pass WCAG A/AA automated checks after entrance transitions settle. No horizontal overflow.
- Continuous stepped pointer travel across all five panels, into each panel and outside-dismissal passes. Separate recording retained.
- Existing enquiry hydration regression: 16 delayed-hydration cases and four no-JavaScript cases pass; typing, replacement, deliberate clearing and native reset preserved; all POSTs blocked.
- Manufacturer photographs, specialist-service content, official logo, hero renderer, auth/session code, notification providers, action validation, schema and dependency lockfile remain unchanged.
- Actual phone heat/battery testing is unavailable. Desktop browser viewport tests are not physical-device evidence. Automated accessibility checks do not replace a full assistive-technology audit.

Final hashes, runtime archive validation, animation cost and bounded first/concurrent/post-idle results are in the external release evidence directory. This is a local candidate for owner visual review, not authorization to deploy or promote. The known intermittent database transport/acquisition problem is not claimed repaired at its infrastructure source; the narrow publication fallback prevents this observed read error from exposing service status or crashing the shared navigation.
