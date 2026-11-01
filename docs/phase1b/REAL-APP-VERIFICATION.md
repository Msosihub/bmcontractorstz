# Phase 1B — Real application verification

26 October 2026. Local development only. Production and the accepted hosted Phase 1A Preview remain unchanged. No push, merge, deployment, Production query/migration, provider activation, storage/role/schema change or new publication workflow.

## Result

The guarded **production-mode Next.js build passed**. The actual React/Next app runs at `http://127.0.0.1:3007`, using only the approved restricted synthetic database. This is no longer static-harness evidence. Desktop 1440×1000 and mobile 390×844 were exercised in installed Chrome through explicitly authorized local Playwright.

The local source correction addresses a reproducible Node per-address connection timing problem; it does not establish universal Neon reliability. Database CONNECT permission on the inherited database copy remains a separate security-review item. Production release remains on HOLD.

## Changes kept deliberately small

- Preview pg sockets allow 1,000 ms per address attempt and 15 seconds for connection/acquisition; max 1, TLS, approved identity and notification guards remain. Shared build/start checks use the same options. Production receives no new pg options. See `NEON-TIMEOUT-INVESTIGATION.md`.
- Services uses compact numbered links to its existing five divisions, with return links. Desktop shortcuts stay visible within their section; mobile uses a static two-column layout. Security remains first, with CCTV, electric fencing and gate automation unchanged.
- About's four Kiswahili steps now explain requirements, assessment, installation/testing/handover and maintenance in more natural practical language; BOQ is explained.
- Existing belts, illustrations, official logo, palette, footer, service routes, admin foundation and CMS/media roadmap are preserved. All **147 tracked public files** match their pre-task contents. No new dependencies or visual features.

## Verification results

| Area | Result and evidence |
|---|---|
| Complete restricted build | PASS: cleared environment → strict URL/identity checks → npm build preflight → Prisma generation → Next webpack build and route generation. No migration or seed. |
| TypeScript | PASS, no errors. |
| ESLint | PASS, zero errors; 15 existing warnings remain, chiefly image elements and an anonymous config export. |
| Automated regression suite | **128/128 PASS**, including two new Preview connection-option tests; identity rejection, notification suppression, enquiry behavior, language SEO, legacy routes, content and motion coverage retained. |
| Real homepage hydration | Accordion state changes in React; actual belt transforms change in opposite directions. |
| Belt controls and keyboard | Home and Services native pause/resume work; keyboard reaches original service links, duplicated belt lists stay inert. |
| Reduced motion | Actual emulated `prefers-reduced-motion: reduce`: animations none, duplicate lists hidden, mobile has no horizontal overflow. |
| Services navigation | Five anchors and five return links work, EN→SW switching works; security-first order retained. |
| Mobile and shared footer | Hydrated menu opens/closes; home/Services/About have no measured horizontal overflow. Footer telephone labels match links, Mianzini and Moshi contacts are correct, `/huduma` and `/whatsapp` retained; measured footer targets at least 44 px. |
| Images and disclosure | Final screenshots wait for lazy images to decode; all rendered images loaded in desktop/mobile Services/About. AI captions remain; fictional people are explicitly distinguished from actual BM staff/clients. |
| Language, routes and SEO | Critical CCTV/electric-fence/gate URLs plus contact/survey/generator/telephone pages return usable EN/SW output with expected HTML language, canonical and noindex protections. `/huduma` remains the SW shortcut; local `/whatsapp` remains suppressed in Preview. Robots disallows crawling and Preview sitemap is empty. |
| Actual forms and database | Contact EN/SW and survey EN/SW each saved once. Four deliberate repeated identical submissions left **2 contact + 2 survey records and 4 receipts**. Survey service/product/package context survived. Correct localized success pages reached. |
| Admin authorization | Signed-out request redirects to login; actual request/verify/session journey passed using the allowlisted synthetic phone. Test-only OTP fixture supplied in the synthetic DB because live SMS is disabled. Session cookie HttpOnly, Secure, SameSite=Lax. No auth bypass added to source. |
| Product admin | Real UI create/edit/save, specifications rendering, hide/publish and public availability passed. Save buttons returned enabled; unresolved Saving state was **not reproduced** in these successful paths. No new Saving-state patch was needed. |
| Dynamic services | Existing admin hide/publish controls remove the synthetic networking entry from directory/belt and render not-found at its detail URL; republishing restores discovery/detail. Temporary fixture removed. |
| Admin enquiries | Actual messages and survey administration displayed test submissions. |
| Notification/JS evidence | External test-only Node preload instrumented fetch/http/https provider transports before app import: **zero provider transport attempts**. Browser external-request attempts zero, captured page JavaScript errors zero. No account-side telemetry was obtained. |
| Cleanup | Run-specific products/categories, enquiries/receipts, sessions/OTPs and temporary service fixture removed or original service publication restored. Three earlier test-only OTP fixtures also removed by exact IDs. Follow-up counts: zero VERIFY-20261026 contact, survey or product records. |

The 13 real-application check groups passed across focused runs after correcting test-harness assumptions. Earlier raw logs are retained; they include superseded assertion failures, not additional unresolved app defects. Corrections included waiting for streamed auth redirects, matching survey success URLs containing an ID, selecting a textarea rather than the description meta tag, using UTC ISO parameters for timestamp-without-time-zone fixtures, avoiding accidental belt hover pause and waiting for lazy image decoding.

**Withdrawn content status nuance:** Next's streamed not-found response can retain HTTP 200 after headers are sent. The tests verify not-found rendering and absence of published product content rather than demand HTTP 404 in that case. The installed Next documentation confirms the behavior and its injected noindex metadata (`node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/not-found.md`). The older raw test-group label saying “detail 404” means application not-found semantics, not a claim that every response has HTTP 404. Preview additionally supplies its existing noindex header.

## Reviewable screenshots and evidence

From this worktree the evidence directory is `../../outputs/real-app-verification-20261026/`:

- `services-desktop-full-sw.png`, `services-mobile-full-sw.png`: complete real-app Services layouts, loaded imagery, five divisions and footer.
- `about-desktop-full-sw.png`, `about-mobile-full-sw.png`: complete About layouts and revised working approach.
- `homepage-desktop.png`, `homepage-mobile-sw.png`: preserved homepage.
- `services-desktop-sw.png`, `services-mobile-sw.png`, `about-desktop-sw.png`, `about-mobile-sw.png`: section viewport crops.
- `verification-summary.json`: passed check groups and preservation/cleanup summary. `visual-e2e-results.json`, `intake-e2e-results.json`, `admin-e2e-results.json`: original focused-run results, including superseded harness failures where present.
- `e2e.mjs`, `capture-real-app.mjs`: reproducible local test source; no credential values, recorded cookies, OTPs, HAR or browser storage exports.
- `build.log`, `typescript.log`, `lint.log`, `tests.log`, `provider-audit.json`, `image-render-verification.json`, `cleanup-verification.json`.

The local server was launched with a cleared environment, owner-only restricted credential file, synthetic allowlist and suppression flags. Its external transport audit is not shipped application code. It remains bound to loopback for review. Browser tabs for local Services and About have been requested in Codex.

## Remaining release requirements

1. **Inherited-copy ACL review:** restricted role has database CONNECT on inherited `neondb`; table privileges are unknown. No access to it was attempted. Owner-approved review/remediation must establish least privilege before a stronger isolation attestation. This is not evidence of access to the actual live Production database.
2. **Reliability scope:** repeat finite staged samples across sessions/idle periods and compare a separately authorized hosted candidate. No p95/p99, cold-start or hosted correction claim. Do not disable guards or retry writes blindly.
3. **Provider telemetry:** zero locally observed transport attempts, not an independent audit of SMS/WhatsApp provider accounts. Hosted notification telemetry remains unverified here.
4. **Controlled release:** existing backup/isolated restore, production migration preflight, rollback rehearsal, 24-hour rate-limit receipt cleanup ownership and production-specific checks still require closure/confirmation; this local verification does not replace them.
5. **Hosted review:** any Phase 1B hosted Preview needs separate approval, a new exact candidate, rechecked environment scopes/Authentication/branch tracking OFF, noindex and synthetic fixtures. Accepted Phase 1A Preview remains available and unchanged. Production release needs its own explicit approval.
6. **Business evidence:** product availability/specifications, genuine projects, credentials/manufacturer relationships and imagery claims remain subject to existing evidence rules. No invented evidence was added. Secure media/CMS roadmap remains a future milestone, unchanged.

## Preservation and rollback

Work remains on `codex/phase-1b-premium-corporate`; Production `main` and `origin/main` were verified at `abae7f8779f101848309b1ce12090da3da1e8742`. Pre-task Phase 1B commit: `3dc1b4b64447fa6fd70def2b01531d942f58f637`.

Rollback is local only: stop the loopback process and review/revert the new connection/navigation/copy patch in a subsequent local commit. No schema/data migration or cloud-setting rollback is needed. Do not reset history, discard other work or touch the accepted hosted Preview. No automatic write retries were introduced.
