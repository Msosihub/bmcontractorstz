# Performance/accessibility
Measured: TypeScript passed; ESLint 0 errors/33 warnings. HEAD availability is not a performance benchmark.

Source observations:
- Plain img in hero/catalogue/projects/detail/cards: inspect dimensions, responsive sizing and eager/lazy choices; reuse Next Image where appropriate and verify remote-host policy.
- Homepage fetches support data not rendered; prepares product data then passes packages. Resolve intent before removing reads.
- Product categories fetch all published products alongside listing capped at 50. Measure realistic preview query cost before indexes/caching.
- Automatic marquee exists; scoped globals/Header scan found no reduced-motion rule. Inspect globally and provide reduced-motion behavior.
- Header has aria-expanded. LoadingLink ignores callback. Catalogue icon links need rendered accessible-name checks.
- No app error boundary found in inventory. DB errors occur before empty-result fallbacks; plan controlled error UI/monitoring.

Priority P2 navigation/forms and bounded queries; P3 polish. Dependencies: safe preview fixtures/browser checks. Risks: mobile bandwidth/layout shifts/inaccessible controls.
Acceptance: keyboard/focus/form errors/menu/reduced-motion/names verified; measure baseline Lighthouse/field metrics before asserting gains. No screenshots, bundle analysis or CWV completed.
Build pending: use isolated preview database and disabled notification adapters; do not run against production config.
