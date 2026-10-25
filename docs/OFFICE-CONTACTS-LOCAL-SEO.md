# Confirmed office contacts and local SEO — Phase 1B

25 October 2026. Local branch: `codex/phase-1b-premium-corporate`.

## Implemented

| Contact | Confirmed public information | Website use |
|---|---|---|
| Main sales / national enquiries | +255 760 111 880; sales@bmcontractorstz.com | Primary commercial contact on Contact, survey and homepage enquiry sections; compact footer; national sales/RFQ structured-data contact |
| Moshi office | +255 745 778 821; 55 Market Road, Vijana Street, Moshi, Kilimanjaro, Tanzania | Contact office section, footer and business PostalAddress; Moshi customer-enquiry contact point |
| Arusha office | +255 799 660 068 | Office enquiry/site-visit coordination copy and call link; footer and Arusha structured-data contact point |

The Contact page has an office section below the secure form, with an early jump link. The national sales contact remains prominent beside the form. Footer contacts use three restrained columns on desktop and stacked rows on mobile. The existing single primary header enquiry action remains unchanged.

English and Kiswahili labels distinguish national sales, Moshi and Arusha. The homepage's general sales number now uses the national sales contact, while the Moshi number is identified by office role. Existing support contact guidance and bilingual Contact metadata were updated consistently.

WhatsApp is offered only for the previously confirmed Moshi number. No WhatsApp destination was added for national sales or Arusha. The isolated Preview build still routes the Moshi WhatsApp action to the localized notification-disabled page; no real calls or messages were initiated.

## Local SEO

- The business JSON-LD now uses the exact Moshi street address, Moshi locality, Kilimanjaro region and TZ country code. National sales is the primary telephone and a separate sales/RFQ contact point.
- Moshi and Arusha have distinct contact points. Arusha describes enquiry/site-visit coordination and has no fabricated street address, postal code, coordinates, opening hours or Google Business Profile.
- No city landing pages, new routes, Dar es Salaam/Dodoma office claims, redirects or security URL changes were introduced. CCTV, electric fence and gate automation metadata/canonical regressions pass.
- The schema mapping follows [Schema.org PostalAddress](https://schema.org/PostalAddress) and [ContactPoint](https://schema.org/ContactPoint). Unsupported `serviceType` on the LocalBusiness object was removed; existing security topics remain in `knowsAbout`.
- These changes are local and remain noindex in the isolated environment. No claim of live indexing, Google listing verification or ranking improvement is made.

## Verification

Evidence: `../../outputs/office-contacts-20261025/` from the worktree root.

- 101 automated tests pass, including four new office/contact/schema/SEO checks and existing enquiry, authorization, publication and notification-suppression regressions.
- Restricted-database production-mode build and TypeScript pass. ESLint: 0 errors, 15 existing warnings.
- Twelve actual rendered EN/SW responses checked: homepage, Contact, survey and the three security service routes. Telephone href/display values match; all three confirmed contacts appear in the footer; JSON-LD parses and contains the confirmed address/contact roles; security self-canonicals remain stable; Preview contains no live WhatsApp destination.
- Eight desktop/mobile browser cases (1440px and 390px, homepage/Contact, both languages) show no horizontal overflow and no unlabelled form inputs.
- One synthetic Kiswahili contact enquiry completed successfully through the unchanged form and success route, with notifications suppressed. Survey server-action regressions pass; no new survey record was needed for this contact-content change.
- Screenshots: `offices-desktop-en.png`, `offices-mobile-sw.png`, `contact-desktop-en.png` and `contact-success-sw.png`.

## Preservation and remaining items

No push, merge, deployment, Production database access, schema/migration, credentials, Vercel settings or notification-recipient changes. The existing notification fallback recipients remain exactly as before; Arusha was not silently added to them. The accepted Phase 1A hosted deployment was not changed. A synthetic enquiry test writes only to the approved restricted synthetic database.

The approved palette, imagery, official logo, secure forms and business service hierarchy are preserved. Existing Phase 1A release restrictions and previously documented intermittent database/startup reliability concern remain; this contact update does not resolve or waive them.

Await the confirmed Arusha public street address before adding it. WhatsApp support for the Arusha and national sales numbers remains unconfirmed. No operating hours or Google profile were inferred.

Local review: http://127.0.0.1:3007/contact?lang=en#offices and http://127.0.0.1:3007/contact?lang=sw#offices.
