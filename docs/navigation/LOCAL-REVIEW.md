# Premium mega navigation — local review, 22 November 2026

Power Backup is published. Navigation is a separate local-only milestone based on released main c83f4f1f9883d6f0cb5fdfe0daf9b5dd47fa83c8. No navigation push, merge or deployment has been performed.

## Delivered

Five bilingual discovery groups: Services, Solutions, Equipment, Industries and Company. Security services remain first. The typed registry contains 47 destinations; two planned catalogue capabilities have no public link. Existing service relationships remain authoritative. No new product inventory or service routes were created.

Desktop navigation supports explicit opening, keyboard movement, Escape, focus return and outside dismissal. Mobile uses large native disclosure controls, Back navigation, scroll locking and enhanced focus containment. Useful native navigation works without JavaScript. Reduced motion removes menu transitions. The official logo and existing homepage remain intact; there is no header scroll animation.

Publication filtering happens on the server. A conservative transient-read fallback hides all service-dependent links and shows independent directory/contact navigation; it does not bypass database startup guards. See LOCAL-RELIABILITY.md for the actual observed timeout and remaining uncertainty.

Shared breadcrumbs connect manufacturer model pages and catalogue discovery to Equipment. Canonical model routes and existing specialist URLs are preserved. The generated WEBSITE-MAP.html and ROUTE-INVENTORY.json describe the same registry.

## Verification

- Guarded Next.js production-mode build and TypeScript passed against the restricted synthetic database.
- 275 automated tests passed; targeted ESLint passed.
- Real Chrome: EN/SW at 1920, 1440, 820, 390, 375 and 320 px; all five groups (60 group/layout checks), no overflow, loaded imagery, keyboard/touch and focus behavior passed.
- Eight no-JavaScript/reduced-motion browser combinations passed. Navigation accessibility/contrast checks passed; these do not constitute a full-site accessibility certification.
- EN/SW editable enquiry text and language context survived navigation interactions. No form was submitted and no provider request was made.
- 84 menu-link cases and 142 bilingual model-route cases passed, including anchors and single breadcrumb markup. This route run preceded the transport fallback; destination paths did not change afterward.
- The final browser rerun after the correction reported zero console errors, failed network requests or submissions. Desktop/mobile recordings and screenshots were captured from the final local production-mode application.

## Release boundary

Ready for owner review and one separately authorized protected Preview, not Production publication. Fresh Vercel metadata/isolation checks, extracted-source validation and restricted database guards are mandatory immediately before deployment. Keep Preview tracking and automatic Production domain assignment OFF, Authentication ON, synthetic database only and notifications suppressed. No secret export is required or permitted.

Hosted acceptance must repeat visual, native/no-JavaScript, publication, first/post-idle, bounded concurrent-read and existing-route checks. Intermittent database transport remains a documented uncertainty. No migration, provider activation, schema change, Payload dependency or live write is part of this milestone.
