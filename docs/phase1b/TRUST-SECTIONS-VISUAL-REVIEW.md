# Phase 1B belts, working approach and footer

26 October 2026. Local development only on `codex/phase-1b-premium-corporate`. Production main, the accepted hosted Phase 1A Preview, database settings, credentials and notification behavior remain unchanged. No push, merge, deployment, seed or migration.

## Delivered

1. **Two reusable moving belts** on Homepage and Services. Systems has ten service categories with real specialist links; sectors has ten planning contexts with restrained illustrative thumbnails. Opposite directions, 90/100-second transform loops, hover pause, persistent native-checkbox pause/resume, static keyboard discovery and a reduced-motion wrapped layout. Duplicates are `aria-hidden` and `inert`; only original links enter keyboard/accessibility navigation. The Services belt filters the same withdrawn records as its directory.
2. **Services** retains its ten service image families, five business divisions and all 16 specialist URLs, with CCTV/fencing/gates first. Belts supplement the existing editorial directory; no generic replacement layout or new service routes.
3. **About/People** retains the explicitly fictional team image and gains an illustrated four-stage working approach: requirements, assessment/scope, installation/testing/handover, maintenance/support. A repeated general process paragraph was replaced by this more useful sequence. No staff names, credentials, headcounts, clients or completed-work claims.
4. **Shared footer** replaces the separate homepage footer and now serves public pages consistently. Company summary, core services, specialists, catalogue enquiry filters, useful resources, confirmed national/Moshi/Arusha contacts, `/whatsapp`, `/huduma`, privacy and terms. It uses the official logo unchanged and the established graphite/ivory/bronze palette. No invented hours or addresses.
5. **Future ownership** is documented in `TRUST-SECTIONS-CONTENT-OWNERSHIP.md`, extending the existing secure-media/CMS plan. No uploads, CMS migrations, new roles or publication changes.

No new bitmap assets or dependencies were added. Existing coordinated AI imagery is reused with clear disclosure. Sector imagery is contextual and decorative beside its label, never client/project evidence. No client logos, manufacturer logos, stock claims or distributor claims were invented. Manufacturer names were not added to the moving belt: the existing research does not establish brand-specific BM delivery or authorization. A truthful system-category belt meets the current discovery need.

## Review environment and important limitation

The real application build/start remains blocked by the restricted Neon database preflight (`connection-timeout`), reproduced during this milestone. Guards were retained. This milestone **does not have a new successful production-mode build or database-backed end-to-end pass**.

To keep visual review available independently, `design-preview/trust-sections/render.mjs` renders the actual edited Services/About/Home components into six EN/SW static HTML samples. It replaces database access with an empty synthetic withdrawal fixture, and substitutes the Next image/navigation adapters only for the layout harness. It does not read credentials, connect to a database or call providers. This is visual evidence, not proof of current database publication state or runtime behavior.

The read-only loopback harness (`serve.mjs`) is at **http://127.0.0.1:3008/services?lang=en**, About `/about?lang=en`, Home `/?lang=en`. Both languages are available through their links. The banner clearly says static layout review; JavaScript menus/forms are inactive. Native belt controls and motion work. Unimplemented journeys return a static 404, writes return 405, CSP disallows scripts/form submission, and all responses are noindex. It is not a deployment and is excluded by the existing `design-preview` Vercel ignore rule. Never use it as hosted acceptance or release evidence.

Reproduce from the isolated Phase 1B worktree with the existing Node runtime: run `node design-preview/trust-sections/render.mjs`, then `node design-preview/trust-sections/serve.mjs`. It requires the prior local compiled base CSS in `.next/static/css`; the current source premium CSS is appended. No build guard is disabled. Stop only this loopback server to close the visual harness.

## Verification

- **126 automated tests pass** with mocked providers/Prisma and disposable PGlite. Existing admin/publication, enquiry/survey, `/huduma`, environment-specific `/whatsapp`, context and suppression regressions remain. New tests cover both belts, bilingual disclaimers, native pause controls, inert duplicates, motion rules, service links, confirmed footer contacts and four process stages.
- TypeScript passes; ESLint has 0 errors and 15 pre-existing warnings. SSR/esbuild rendering passes for all six visual samples. React checklist applied: no new state/effects/timer/dependency, semantic lists/sections, stable keys, bounded source data, meaningful/decorative alt as appropriate, keyboard controls, no new auth or server-action path.
- Browser review at 1440px desktop and 390px mobile: EN desktop and SW mobile Services, About and shared footer. Native pause/resume changes checked state; keyboard focus displays all ten system links statically with no mobile horizontal overflow. Computed CSS confirms opposite directions and 90/100s loops. Reduced-motion rules are covered structurally; OS/browser media emulation was not used. No Lighthouse or field Core Web Vitals score is claimed.
- Existing imagery uses reserved aspect ratios and lazy loading. Miniatures reserve 112×84 dimensions and use Next Image sizing in the application; harness images are plain static images, so its transfer size is **not** a measurement of Next image optimization. Systems belt adds no bitmap. Duplicate images reuse URLs; animation uses CSS transforms without JS animation timers. Persistent pause and reduced motion remain available.
- The offline harness demonstrates layouts and native motion only. Retest actual Next hydration, image optimization, dynamic publication filtering and customer/admin journeys when the approved restricted database is reachable, then rerun the guarded production-mode build before any hosted approval.

Evidence: `../../outputs/trust-sections-20261026/` from worktree root. Representative captures: `services-desktop-systems.png`, `sectors-and-footer-desktop.png`, `footer-desktop.png`, `services-mobile-systems-sw.png`, `about-working-approach-desktop.png`, `about-mobile-working-sw.png`, `footer-mobile-links-sw.png`, `footer-mobile-contacts-sw.png`. Masked build failure, transport probe, tests/lint/types and DOM/motion evidence are alongside them.

## Neon follow-up and remaining approvals

A guarded preflight timed out before application build. The separate bounded DNS/TCP probe and comparison with earlier successful connections are recorded in `NEON-TIMEOUT-INVESTIGATION.md`; no connection, network, compute, pooling, credential or retry changes. This remains a release blocker, not an editorial blocker. No automatic write retry was introduced.

Owner review: belt placement/motion/sector wording, shared footer and working-approach copy. Real client/project/team evidence and manufacturer/logo permissions are needed before replacing illustrative contexts with proof. Uploads, storage, CMS draft revisions and staff roles need separate milestone approval. Production remains on HOLD.

Read-only connector follow-up: the validation-branch compute metadata call returned an error in this session. No current compute/resume-state conclusion is claimed. The transport probe itself required no credential and performed no SQL.

Final preservation/static checks: all 49 existing public asset hashes match their prior manifests, including the official logo and four generated families. Six static sample URLs returned 200 with the noindex header and explicit review notice; a synthetic POST returned 405. These checks do not replace the blocked application build or database-backed acceptance tests.
