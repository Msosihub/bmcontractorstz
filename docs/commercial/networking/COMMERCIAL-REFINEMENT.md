# Networking commercial refinement — 26 November 2026

Approved starting source: 423595fd42a6740924b77d03f71561f1e7b2e6d9 / c05ca49969b25875f1b4218b50403cf56f491166. Original archive SHA-256 ecbbd3e1c2416c5575752daa8d01f718455a33f29a1653234a3973f13fcb6cb0 was rechecked before editing. Work stays on the existing local networking branch. No push, PR, deployment or external setting change.

## Scope and ownership

The original five scenes, six manufacturer model records, engineering chapters and signal-path geometry are preserved. Owner-requested hero pause button removed; visibility, offscreen and reduced-motion lifecycle remain. Scoped CSS adds restrained card/CTA/focus feedback; no dependencies or recurring card animation.

Four crawlable family guides at `/catalogue/networking/families/{data-cabinets,cat6-cabling,fibre-cables,fibre-accessories}` are category/quotation content, not inventory or manufactured SKUs. Stable mappings are `networking-family:<slug>` alongside the existing `networking:<model-slug>`. The future unified Shop/Payload must consume these identities and migrate canonical URLs only through a reviewed plan. No new Product records, prices, availability, cart, payment or CMS runtime.

Eleven U-height choices are **enquiry options subject to sourcing**, not verified cabinet SKUs. Cabinet width/depth/load/accessories must be specified. CAT6 colour never proves conductor, jacket, shield or environmental rating. Fibre core count, construction, optical type, ports, polish, wavelength, optical budget and host support require exact selection. ADP is an ambiguous BOQ label: confirm the intended panel/box, rather than inventing a standard definition.

Seven application paths map only to the six reviewed models: office internet, multi-building, hotel/lodge guest Wi-Fi, outdoor Wi-Fi, CCTV backbone, segmentation, managed wireless. They explicitly distinguish RouterOS from Omada management, non-PoE unmanaged switches, incompatible optics assumptions, and access points from dedicated point-to-point bridges.

Existing Equipment mega-menu entry already points to the specialist catalogue; Services retains `/services/networking`. The Equipment directory now includes a publication-filtered contextual catalogue link. Catalogue/model/family views enforce the existing service publication guard. Families use the typed registry's Equipment > Networking hierarchy and server-generated breadcrumb leaf, matching the model-page convention. Family sitemap URLs are gated by networking publication; Preview remains empty/noindex.

## Technical references, reviewed 26 November

- Rack height is only one selection parameter; mounting depth, external dimensions, usable depth and load differ: [APC rack selection guide](https://download.se.com/files?p_Doc_Ref=SP_RacksPocketGuide_230V&p_File_name=1014w-APC_RackSystems_eGuide2026_v050126.pdf). This is engineering reference, not a claim BM stocks APC cabinets.
- UPC/APC cannot be directly intermated: [NASA fibre connector guidance](https://standards.nasa.gov/sites/default/files/standards/KSC/B/1/KSC-GP-864-VOLUME-2AB-Chg1.pdf) and [Fluke APC connector guidance](https://regression.flukenetworks.com/knowledge-base/certifiber-pro/apc-connectors-and-certifiber-pro). Connector family and polish are separate checks.
- Exact Omada regional hardware and controller compatibility must be checked: [official compatibility list](https://www.omadanetworks.com/ph/omada-sdn/product-list/) and [official regional documents](https://support.omadanetworks.com/sg/document/?app=&documentResourceTypeIdList=1131). No universal cross-version compatibility promise is made.
- Existing six manufacturer sources and photos remain in REFERENCE-AND-OWNERSHIP.md / MANUFACTURER-ASSETS.json. No new exact hardware claim was added.

## New family photography

Three original built-in image_gen still lifes: generic wall/floor cabinets, copper cabling accessories and fibre patching/distribution accessories. Prompts requested realistic dimensions/proportions, no brands/models/text, ivory/graphite/mineral-teal setting and no BM-project/stock implication. All are described as family illustrations on detail pages; exact device cards retain genuine manufacturer photographs. Images are illustrative, not detailed connector-selection diagrams. Confirm actual ports and product datasheets when ordering.

Originals preserved in Codex generated_images; original SHA-256 and paths in FAMILY-IMAGE-ASSETS.json. Local responsive 384/640/960/1280/native WebP renditions use exact-source static delivery. No third-party hosting or global optimizer change.

## Small future guide plan — no new articles published

1. Choosing 6U/9U/12U/42U: equipment depth/load/space checklist, linked to Data Cabinets.
2. Hotel Wi-Fi with Omada: room/floor/capacity assessment, controller and power scope.
3. MikroTik for offices: actual throughput/rules/connections, not port-count shopping.
4. LC/SC and UPC/APC: exact port-photo checklist and safe compatibility checks.
5. Indoor/outdoor CAT6: datasheet, route and termination specification.
6. Fibre versus copper between buildings: route/power/protection/optical assessment.

Keep these future guides concise, original, bilingual and technically reviewed. The existing office/fibre planning article remains available; no thin per-size/per-colour SEO pages were added.

## SEO and crawler boundary

Families have unique bilingual titles/descriptions, own canonicals and reciprocal en/sw alternates, CollectionPage and BreadcrumbList data. Existing verified models retain factual Product data with no fabricated offers/ratings. Service metadata and security search URLs unchanged. Production robots' wildcard allowance includes Googlebot and OAI-SearchBot, with admin disallowed; Preview wildcard disallow/noindex remains. Production infrastructure/firewall/crawler behavior and final sitemap require eventual hosted/release verification. No search or AI-answer visibility guarantee.

## Local verification summary

Guarded production-mode build and TypeScript passed; targeted lint passed. Complete suite: 314 passing tests, including four focused material/application/sitemap/crawler tests and server-side withdrawal/identity rejection coverage for the new family route. Chrome: 49 functional/responsive cases, ten accessibility scans with zero WCAG A/AA violations, plus ten final phone/tablet/desktop family-layout checks. Final motion recordings verify actually changing signal-path offsets, hero button absence, automatic offscreen stop, desktop hover/focus and mobile touch/enquiry context. No submissions or database writes were made during this refinement.

The first motion probe caught a leftover selector from pause-control removal; it was corrected to restore the original signal animation before freeze. Narrow-phone material cards were adjusted to one column to avoid cramped titles. Final evidence and performance comparison are outside the runtime archive in `outputs/networking-refinement-20261126`.

A comparable initial mobile viewport with the same axe-injection measurement transferred ~1,207 KB versus ~1,206 KB for the approved local baseline. Timing varies with cold/idle/network conditions and is not a field CWV or battery benchmark. Actual phone heat/battery and native hidden-tab behavior remain device/hosted acceptance checks; reduced-motion, offscreen, no-JavaScript and keyboard behavior are verified locally. No live Production release is implied by these results.
