# Premium mega-navigation — local implementation

Base: public Power Backup main c83f4f1f9883d6f0cb5fdfe0daf9b5dd47fa83c8. Dedicated branch codex/premium-mega-navigation-01. No new backend, integrations, schemas, inventory or public routes.

## Reference study and original BM decisions

Reviewed [Navbar Gallery mega menus](https://www.navbar.gallery/type/mega-menu), [browse](https://www.navbar.gallery/browse), [breadcrumbs](https://www.navbar.gallery/type/breadcrumbs), [Astra examples](https://wpastra.com/resources/mega-menu-examples/) and [Webflow mega-menu examples](https://webflow.com/made-in-webflow/megamenu). Actual browser inspection included [Cloudflare](https://www.cloudflare.com/) mobile Products and Back hierarchy, [Stripe](https://stripe.com/) desktop Products panel and [Asana](https://asana.com/) Solutions category structure. Reference viewport was reset and temporary tab closed.

Adopted clear technical families and a mobile Back path; compact headings and restrained featured imagery; separate customer-problem/industry discovery rather than one undifferentiated list. BM implementation is original, using its existing palette, official logo and approved local images. No competitor code, images, logos, text or template was imported. Lightweight CSS transitions replace any framework-specific reference animation. No scroll animation is attached to the header.

## Authority and ownership

- lib/navigation/registry.ts: stable bilingual destination IDs, existing paths/anchors, parent relationships, service-publication dependencies, equipment tags, related service IDs derived from the existing service-relations data, published/planned route status, visibility and optional approved feature imagery. Five discovery groups refer to those IDs. Navigation metadata is not service or inventory content.
- lib/navigation/server.ts: request-scoped React cache; same explicit-withdrawal rule as the existing service directory. Selects only unpublished service slugs. A recognized publication-transport timeout omits every service-dependent link and displays only independent directories/company/contact navigation with a visible notice. No automatic retry, permissive service fallback or global publication cache. Unknown/permission errors propagate; database identity/startup guards are unchanged.
- The server Header passes only resolved public groups to a small client enhancement. Hidden service destinations, features and aliases are removed before HTML/RSC output. Known static service fallbacks remain eligible when no overriding database record exists, matching existing routes. Planned items have no live href and are only shown on the internal roadmap.
- Existing service content/division data, product records and manufacturer catalogues retain ownership of their content. Nav does not duplicate their products. /products remains the principal discovery route and links to the three existing manufacturer catalogues.
- Future canonical product records and unified category/manufacturer filters are planned map entries only. Payload, checkout, payments, stock management and new databases remain out of scope.

## Interaction and accessibility

Native details/summary disclosures remain crawlable and operable without JavaScript. Desktop is click-to-open with hover/focus feedback, one open panel, Escape/focus return, arrow/Home/End trigger navigation and outside/focus dismissal. Pointer travel into the panel cannot accidentally close it.

Mobile has five parent choices, one expanded group, a sticky Back summary, persistent close in the header, native links and quotation/call access. Enhancement locks background scrolling, inerts main/footer, traps Tab within the open drawer and restores prior state on close/unmount. Native disclosure navigation remains usable without the enhancement. Reduced motion disables transitions; the header itself never animates on scroll. The homepage floating header is preserved, with its backdrop containment corrected so it cannot collapse a fixed drawer.

## Breadcrumbs and connected discovery

Manufacturer model pages now use one shared Home → Equipment → Manufacturer → Model trail with real links and one localized BreadcrumbList. The former ZKTeco breadcrumb JSON block is removed to avoid duplicate structured data. Generic product pages and service/equipment directories use the shared component; existing specialist-page breadcrumbs are preserved without duplication. /products gains publication-aware links to Hikvision, ZKTeco and CENTURION. Canonical routes, product identities and enquiry actions remain unchanged.

## Maintained visual map

Run `node --import tsx scripts/render-navigation-map.ts` to regenerate WEBSITE-MAP.html and ROUTE-INVENTORY.json. Both derive from the same registry, with a registry digest. The map distinguishes existing discovery destinations and planned structures; actual publication is resolved at runtime. Manufacturer catalogues continue to generate their existing model routes from their own records, not from header entries.

Supplier and channel planning remains internal and is not advertised in the header. No cross-platform commerce or business-identity change is introduced.
