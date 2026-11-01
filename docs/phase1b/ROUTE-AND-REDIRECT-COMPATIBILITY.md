# Route and redirect compatibility

25 October 2026. Baseline: `main` commit **abae7f8779f101848309b1ce12090da3da1e8742**. Audited Phase 1B source: **c58745ac40bc370042d5746d88ccb711a1cdb0f8** on `codex/phase-1b-premium-corporate`.

This is a source comparison against the pinned production baseline, plus isolated localhost observations. It does not claim that GitHub source proves the exact current deployed build, historical indexing, Vercel dashboard redirects or every URL ever printed by BM. No Production requests, data changes, pushes, deployments or provider activation were needed.

## Short URLs: verified and retained

| URL | Baseline source behavior | Phase 1B future Production behavior | Isolated Preview behavior | Decision / test |
|---|---|---|---|---|
| `/huduma` | Permanent redirect to `/services?lang=sw` | Same, one configured hop | Same; destination is noindex | **Preserve**; assert exact destination and language |
| `/whatsapp` | Permanent redirect to `https://wa.me/255760111880` | Permanent redirect directly to approved `https://wa.me/255745778821` | Temporary redirect to `/preview-notifications-disabled`; no live WhatsApp destination | **Preserve shortcut / improve wrong number**; assert both environment branches against central configuration |
| `/preview-notifications-disabled` | Absent | Testing notice route exists; not a live contact entry or sitemap item | Bilingual notice, no enquiry action/provider dispatch | **Preserve isolation utility** |

Evidence: `next.config.ts`, `data/site.ts`, `app/preview-notifications-disabled/page.tsx`; tests in `tests/legacy-compatibility.test.mjs`. The owner already confirmed Moshi +255 745 778 821 for WhatsApp. National sales and Arusha have click-to-call links; neither is newly declared WhatsApp-enabled.

Local HTTP requests (manual redirect handling, never followed to a provider):

| Request | Status / Location observed |
|---|---|
| `/huduma` | 308 → `/services?lang=sw` |
| `/huduma?lang=en` | 308 → `/services?lang=sw` (explicit SW wins) |
| `/huduma?utm_source=synthetic-audit` | 308 → `/services?utm_source=synthetic-audit&lang=sw` |
| `/whatsapp` | 307 → `/preview-notifications-disabled` |
| `/whatsapp?text=SYNTHETIC-AUDIT` | 307 → `/preview-notifications-disabled?text=SYNTHETIC-AUDIT` |
| `/huduma/` | 308 → `/huduma`, then the shortcut redirect |
| `/whatsapp/` | 308 → `/whatsapp`, then the shortcut redirect |

Canonical shortcut paths have one configured hop. Trailing-slash variants have a framework normalisation hop; do not change global slash policy in this audit merely to eliminate it. Use slash-free forms in future printed communications. Incoming query values are passed through; do not put sensitive customer details into campaign or prefilled message URLs. Redirect responses in this local build did not include X-Robots-Tag; the destination application pages carry noindex, Preview robots disallows `/`, and the Preview sitemap is empty.

The old permanent WhatsApp redirect may remain cached in some clients. Source correction cannot prove old caches have expired. Before cutover, test clean clients and known campaign links; do not rotate numbers or change global redirect policy here. Already printed QR codes that encode the old external wa.me number directly cannot be repaired by changing `/whatsapp`.

## Rewrites and framework configuration

- Baseline and Phase 1B `next.config.ts` each define exactly these two custom redirects. Neither defines rewrites, basePath, an i18n locale-prefix router, custom image remote patterns or a custom trailingSlash policy. No application API route handlers or catch-all legacy aliases were found.
- Phase 1B adds isolation assertion, a derived public Preview flag and Preview noindex headers. `proxy.ts` derives locale/path request headers for metadata and HTML lang; it does not rewrite routes. There was no baseline middleware/proxy file.
- The baseline mixed `module.exports` with a default export; current configuration has one typed default export. No baseline build was run. Its duplicate `/admin` page files were consolidated in Phase 1A; the `/admin` URL survives through the protected route group. Do not recreate obsolete files just to match the old tree.
- Vercel domain/host redirects, deployment protection and dashboard-only rules were not independently re-audited here. `SITE_URL` now uses the previously approved `https://www.bmcontractorstz.com`; no host or language URL migration was undertaken. Validate actual host aliases/redirects in the separately approved release preflight.

## Existing URL patterns

**46 unique baseline page patterns → all retained; 51 current patterns.** Dynamic entries describe supported URL shapes, not proof that every historic slug has a published record. Route groups do not form part of the public URL.

| Existing pattern | Baseline file(s) | Phase 1B file(s) | Decision |
|---|---|---|---|
| `/` | `app/page.tsx` | `app/page.tsx` | Preserve URL |
| `/about` | `app/about/page.tsx` | `app/about/page.tsx` | Preserve URL |
| `/admin` | `app/admin/(protected)/page.tsx`, `app/admin/page.tsx` | `app/admin/(protected)/page.tsx` | Preserve URL |
| `/admin/login` | `app/admin/login/page.tsx` | `app/admin/login/page.tsx` | Preserve URL |
| `/admin/login/verify` | `app/admin/login/verify/page.tsx` | `app/admin/login/verify/page.tsx` | Preserve URL |
| `/admin/logout` | `app/admin/(protected)/logout/page.tsx` | `app/admin/(protected)/logout/page.tsx` | Preserve URL |
| `/admin/messages` | `app/admin/(protected)/messages/page.tsx` | `app/admin/(protected)/messages/page.tsx` | Preserve URL |
| `/admin/packages` | `app/admin/(protected)/packages/page.tsx` | `app/admin/(protected)/packages/page.tsx` | Preserve URL |
| `/admin/packages/[id]/edit` | `app/admin/(protected)/packages/[id]/edit/page.tsx` | `app/admin/(protected)/packages/[id]/edit/page.tsx` | Preserve URL |
| `/admin/products` | `app/admin/(protected)/products/page.tsx` | `app/admin/(protected)/products/page.tsx` | Preserve URL |
| `/admin/products/[id]/edit` | `app/admin/(protected)/products/[id]/edit/page.tsx` | `app/admin/(protected)/products/[id]/edit/page.tsx` | Preserve URL |
| `/admin/projects` | `app/admin/(protected)/projects/page.tsx` | `app/admin/(protected)/projects/page.tsx` | Preserve URL |
| `/admin/projects/[id]/edit` | `app/admin/(protected)/projects/[id]/edit/page.tsx` | `app/admin/(protected)/projects/[id]/edit/page.tsx` | Preserve URL |
| `/admin/services` | `app/admin/(protected)/services/page.tsx` | `app/admin/(protected)/services/page.tsx` | Preserve URL |
| `/admin/services/[id]/edit` | `app/admin/(protected)/services/[id]/edit/page.tsx` | `app/admin/(protected)/services/[id]/edit/page.tsx` | Preserve URL |
| `/admin/settings` | `app/admin/(protected)/settings/page.tsx` | `app/admin/(protected)/settings/page.tsx` | Preserve URL |
| `/admin/site-surveys` | `app/admin/(protected)/site-surveys/page.tsx` | `app/admin/(protected)/site-surveys/page.tsx` | Preserve URL |
| `/admin/support` | `app/admin/(protected)/support/page.tsx` | `app/admin/(protected)/support/page.tsx` | Preserve URL |
| `/admin/support/[id]/edit` | `app/admin/(protected)/support/[id]/edit/page.tsx` | `app/admin/(protected)/support/[id]/edit/page.tsx` | Preserve URL |
| `/appointments` | `app/appointments/page.tsx` | `app/appointments/page.tsx` | Preserve URL |
| `/cctv-packages` | `app/cctv-packages/page.tsx` | `app/cctv-packages/page.tsx` | Preserve URL |
| `/cctv-packages/[slug]` | `app/cctv-packages/[slug]/page.tsx` | `app/cctv-packages/[slug]/page.tsx` | Preserve URL |
| `/contact` | `app/contact/page.tsx` | `app/contact/page.tsx` | Preserve URL |
| `/contact/success` | `app/contact/success/page.tsx` | `app/contact/success/page.tsx` | Preserve URL |
| `/privacy-policy` | `app/privacy-policy/page.tsx` | `app/privacy-policy/page.tsx` | Preserve URL |
| `/products` | `app/products/page.tsx` | `app/products/page.tsx` | Preserve URL |
| `/products/[slug]` | `app/products/[slug]/page.tsx` | `app/products/[slug]/page.tsx` | Preserve URL |
| `/projects` | `app/projects/page.tsx` | `app/projects/page.tsx` | Preserve URL |
| `/request-site-survey` | `app/request-site-survey/page.tsx` | `app/request-site-survey/page.tsx` | Preserve URL |
| `/request-site-survey/success` | `app/request-site-survey/success/page.tsx` | `app/request-site-survey/success/page.tsx` | Preserve URL |
| `/services` | `app/services/page.tsx` | `app/services/page.tsx` | Preserve URL |
| `/services/access-control` | `app/services/access-control/page.tsx` | `app/services/access-control/page.tsx` | Preserve URL |
| `/services/air-conditioners` | `app/services/air-conditioners/page.tsx` | `app/services/air-conditioners/page.tsx` | Preserve URL |
| `/services/cctv` | `app/services/cctv/page.tsx` | `app/services/cctv/page.tsx` | Preserve URL |
| `/services/electric-fence` | `app/services/electric-fence/page.tsx` | `app/services/electric-fence/page.tsx` | Preserve URL |
| `/services/fire-alarm-systems` | `app/services/fire-alarm-systems/page.tsx` | `app/services/fire-alarm-systems/page.tsx` | Preserve URL |
| `/services/gate-motors` | `app/services/gate-motors/page.tsx` | `app/services/gate-motors/page.tsx` | Preserve URL |
| `/services/maintenance-support` | `app/services/maintenance-support/page.tsx` | `app/services/maintenance-support/page.tsx` | Preserve URL |
| `/services/networking` | `app/services/networking/page.tsx` | `app/services/networking/page.tsx` | Preserve URL |
| `/services/power-backup` | `app/services/power-backup/page.tsx` | `app/services/power-backup/page.tsx` | Preserve URL |
| `/services/solar-panel-systems` | `app/services/solar-panel-systems/page.tsx` | `app/services/solar-panel-systems/page.tsx` | Preserve URL |
| `/services/solar-street-lights` | `app/services/solar-street-lights/page.tsx` | `app/services/solar-street-lights/page.tsx` | Preserve URL |
| `/services/video-intercom` | `app/services/video-intercom/page.tsx` | `app/services/video-intercom/page.tsx` | Preserve URL |
| `/support` | `app/support/page.tsx` | `app/support/page.tsx` | Preserve URL |
| `/support/[slug]` | `app/support/[slug]/page.tsx` | `app/support/[slug]/page.tsx` | Preserve URL |
| `/terms` | `app/terms/page.tsx` | `app/terms/page.tsx` | Preserve URL |

Only five page patterns were added: `/preview-notifications-disabled`, `/services/electrical-contracting`, `/services/generators`, `/services/telephone-systems`, `/services/institutional-procurement`. Security URLs were not renamed. Metadata endpoints `/robots.txt` and `/sitemap.xml`, icons and all original `public/` asset paths remain. Next-generated assets are build-specific, not permanent campaign URLs.

## Slugs and query contracts worth preserving

| Contract / source | Current equivalent | Dependency / decision | Regression / owner requirement |
|---|---|---|---|
| `?lang=en`, `?lang=sw`; old header/footer/language switcher | `lib/i18n/links.ts`, current header/footer and premium homepage | **Preserve** query-language approach; EN default; no locale-prefix migration | Current header preserves query context; test both languages. Homepage uses anchor navigation and its own language links; do not assume every old query survives there |
| `/request-site-survey?service=…&product=…&package=…&lang=…` | Same page; values become serviceType, selectedProduct, selectedPackage in form | **Preserve**, bounded to 100/200 characters | Render actual form with synthetic parameters; assert hidden values and language. Existing hand-built campaign links remain meaningful |
| `/contact/success?lang=…` | Same success page | **Preserve**; no customer data lookup | Noindex; successful page visit alone is not proof a message was persisted |
| `/request-site-survey/success?lang=…&id=…` | Same path and reference parameter | **Preserve**; no public record fetch | Do not expose full customer record by ID; preserve success-after-save behavior |
| `/products/[slug]` | Published DB product or 404 | **Preserve** exact published slugs | No static product replacement, no invented redirects. Owner must review a read-only published-slug inventory before release |
| `/cctv-packages/[slug]` | Published DB package or 404 | **Preserve** exact published slugs | Baseline detail was already DB-only. Old static lists alone did not guarantee a detail page existed |
| `/support/[slug]` | Published DB article or approved static fallback; explicit draft suppresses fallback | **Preserve / improve withdrawal safety** | Test six baseline guide slugs and withdrawal behavior; do not resurrect a deliberately unpublished article |
| `/projects` | Published records only; no `/projects/[slug]` existed | **Preserve** index; defer evidence-backed case-study routes | No invented redirect or portfolio detail slugs from static examples |
| `/appointments` | Bilingual assessment explanation and link to existing survey form | **Improve placeholder**; no booking engine | Must never imply confirmed time, availability or calendar integration |

Baseline static package candidates: `4-camera-package`, `8-camera-package`, `10-camera-package`, `16-camera-package`, `24-camera-package`, `32-camera-package`. Preserve any corresponding **verified published DB** records and campaign intent. Do not seed placeholders just to make those paths return 200.

Six baseline guide slugs retained in `data/support.ts`: `how-to-request-site-survey`, `what-is-included-in-cctv-package`, `ip-vs-analog-cctv`, `electric-fence-basics`, `gate-motor-service-guide`, `how-to-contact-bm-support`.

Baseline static project examples never defined dedicated detail routes; their names are not proof of BM work. Their removal from public fallback is intentional. Product category/query discovery improved to `q`, `category`, `page`; no legacy category API was found. The current homepage uses `#services`, `#equipment`, `#approach` and `#contact`. No source evidence establishes `#products` or `#projects` as legacy homepage fragment contracts; do not claim them as preserved anchors. Check externally circulated fragment links before adding compatibility aliases.

## Cutover requirements and limits

- Owner supplies any QR/quotation/SMS/poster links not discoverable in the repository. No claim is made that their external inventory is complete.
- Read-only production published-slug reconciliation is a separate release preflight; do not query production or modify records during this audit. If a genuine published URL must retire later, approve its specific relevant replacement and one-hop redirect; do not blanket redirect missing products to the homepage.
- No unnecessary URL migration, redirect chain or new alias was introduced. All app/configuration files remain unchanged in this audit.
- Focused regression tests are hermetic; Production redirect behavior is evaluated from configuration with the environment predicate mocked, not by contacting a live destination. Local HTTP observations are in `outputs/legacy-preservation-20261025/shortcut-http.json` outside the worktree.
