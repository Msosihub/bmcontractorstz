# Focused navigation corrections — 22 November 2026

The previous hosted candidate remains preserved. This revision does not redesign the navigation or alter publication, authentication, database, provider or deployment configuration.

## Corrections

- Only the shared mega-menu feature photograph uses Next Image `unoptimized`. Existing local WebPs are served directly, retaining dimensions, alt text, lazy loading and responsive CSS. Global optimization and the official logo remain unchanged. Original file sizes are 36,898, 168,442 and 64,658 bytes.
- The mobile toggle is icon-only in EN/SW with accessible labels, native details state, a 44 px minimum target and a legible opening icon. Back, Close and quotation behavior are preserved.
- No products, routes, catalogue records, packages, schema or services were added.

## Verified locally

- Complete guarded production-mode build and TypeScript passed against the restricted synthetic database; 276 automated tests passed. Targeted ESLint passed.
- Actual Next development application: 12 EN/SW layouts (1920, 1440, 820, 390, 375, 320 px), all five groups, accessibility, all three directly served photographs, native no-JavaScript navigation and reduced motion passed. Eight no-JavaScript/reduced-motion combinations passed. These are real Next application checks, not a static visual harness.
- Six additional long mobile menu cases passed, including sticky Back, Close and quotation access in Kiswahili.
- 84 menu link/anchor cases and 142 EN/SW manufacturer model routes passed with correct single breadcrumbs. Existing-service checks encountered a 30-second client read timeout on PA; the remaining read-only checks completed with a finite 45-second client deadline. No application/database budget changed.
- EN/SW contact and survey context checks passed with zero submissions. No fixture cleanup is required because no records were created.

## Reliability limits must remain explicit

An actual ETIMEDOUT on the navigation publication query returned HTTP 200 with a visible bilingual notice and independent Services, Equipment, Company, Contact and quotation access. Service-dependent header links were omitted. No write or automatic query retry occurred. Later bounded reads, including groups of three concurrent requests, passed.

The guarded build and standalone compiled instrumentation succeeded, but several normal local production-server starts failed their enforced database startup check. Non-disclosing local driver diagnostics observed connection and identity-query timeouts. One sample resolved DNS in 5 ms, established TCP in 348 ms and TLS in 721 ms, then took 10,076 ms to finish connection/authentication and timed out the identity query after 10,002 ms. This is separate from the old hosted test-driver ECONNRESET and cannot be honestly declared fixed or attributed to DNS alone.

The full browser matrix therefore ran in guarded Next development mode, not a successful standard production server. No startup guard, connection budget, database setting or credential was changed. Diagnostic preloads and runners live outside the source/runtime archive. The final quiet-window evidence and any existing-hosted-Preview control are in the external review output, not claimed here as a permanent reliability fix.

## Boundary

The focused visual fixes are ready for owner review and a separately authorized corrected protected Preview. Production remains NO-GO until hosted acceptance confirms successful guarded startup, direct image loading, post-idle behavior and functional regressions. Any Preview must stop on a guard/build failure without retrying or bypassing it. No push, merge, deployment or promotion is authorized by this local preparation.
