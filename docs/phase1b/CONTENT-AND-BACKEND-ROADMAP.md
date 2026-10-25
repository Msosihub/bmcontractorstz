# Specialist content, equipment research and backend roadmap

25 October 2026. Local Phase 1B only. Production main and the accepted hosted Phase 1A Preview are unchanged. No schema migration, dependency change, new backend, external integration, push or deployment.

## What is implemented

All 16 existing service routes now render additional EN/SW technical comparisons, application-specific assessment guidance, maintenance considerations and a specific FAQ. The original premium layouts, hero imagery, brand assets, service headings, metadata and route hierarchy remain. Security remains the first division, with CCTV, electric fence and gate automation first.

Editorial source: `data/specialist-technical-content.json`; reusable server component: `components/premium/SpecialistDetail.tsx`. This is guidance for a quotation, not a construction specification, stock record or evidence of BM's previous projects. The existing CMS publication decision remains authoritative. The service CMS does not yet edit these richer structured sections; consolidation is a proposed next milestone.

### Route-to-content and equipment matrix

| Existing route | Added decision-making content in both languages | Reference families / catalogue direction |
|---|---|---|
| /services/cctv | IP/NVR vs analogue/DVR; lens/PTZ choices; retention calculation; night acceptance | Hikvision, Dahua, Tiandy; cameras, recorders, PoE, storage |
| /services/electric-fence | Separate security, farm/agricultural and game/wildlife briefs; energizer application limits; solar balance; fault/vegetation care | Nemtek security vs Agri; conductors, insulators, earth, monitoring |
| /services/gate-motors | Sliding vs swing vs high-duty entrances; mechanical assessment; safety and release; compatible intercom input | CENTURION D5-Evo SMART reference; operators, beams, backup |
| /services/electrical-contracting | Distribution, MCB/MCCB vs residual-current protection; circuit testing/handover; BOQ alternatives | Schneider Acti9, ABB System pro M compact, Siemens SENTRON |
| /services/solar-panel-systems | PV module/string selection; grid-tied vs hybrid/off-grid; usable storage; generator interface | Sunova modules, Ritar batteries, Chloride Exide supplier references |
| /services/power-backup | UPS vs inverter; VA/watts vs runtime; generator bridging; load-specific acceptance | Batteries, UPS and compatible inverter/chargers; no invented UPS model |
| /services/generators | kW/kVA; standby/prime; ATS vs AMF; exact service-part identity; commissioning | Cummins genset families; DSE7320 MKII controller, not an ATS assembly |
| /services/networking | Copper/fibre backbone; Wi-Fi capacity vs signal; PoE/VLAN; backup and ownership | Omada, Cudy, MikroTik, Ubiquiti; switches/APs/routers/racks |
| /services/telephone-systems | Analogue/FXS vs IP/SIP; concurrent calls vs extensions; office/hotel routing; licensing | Yeastar P-Series, Grandstream UCM630x; IP phones/gateways/PoE |
| /services/institutional-procurement | Supply-only vs installed BOQ; equivalent-item review; quantities/trade terms; acceptance | Matching service equipment; written RFQ, no assumed accreditation |
| /services/access-control | Door security vs attendance vs payroll; credentials, safe exit, record ownership | ZKTeco/Hikvision; readers/controllers/locks, approved software |
| /services/air-conditioners | Wall split vs cassette/ducted; inverter vs fixed-speed; heat load; exact indoor/outdoor pairing | Gree U-Match, Hisense HVAC, LG regional families |
| /services/fire-alarm-systems | Conventional vs addressable vs intrusion; compatibility; site review and commissioning responsibilities | Equipment-category guidance only; selected panel/device documentation still required |
| /services/maintenance-support | Preventive vs fault diagnosis vs replacement; model identification; secure handover | Installed-equipment register and compatible parts, no SLA invented |
| /services/solar-street-lights | Integrated vs separate system; photometry/poles; battery balance; low-sun/night checks | Luminaire-specific data required; PV/battery references do not prove a complete luminaire |
| /services/video-intercom | IP vs two-wire; relay/lock power; apartment routing; internet failure behaviour | Hikvision intercom references; exact SIP/PBX compatibility unverified |

No new service routes are justified at this stage. Agricultural/game content belongs within the existing electric-fence route. Wildlife delivery, specialist engineering involvement and any required approvals must be verified before BM commits to a project. Manufacturer applications do not establish BM experience.

## Research register and rights

`data/manufacturer-research.json` contains 28 entries: 23 primary-source identities/families and five holds. Each entry records identity type, specialty, family/model scope, official/reference URLs, check date, selection caveats, BM supply/install verification, draft approval status and image rights. Public references are selected by ID and require primary-source status; held entries cannot appear through the component.

Manufacturer references are educational, not dealership, certification or stock claims. Chloride Exide is represented as a battery/solar supplier and brand; its third-party catalogue is not treated as equipment it manufactures. Deep Sea Electronics makes controllers, not complete Cummins gensets or ATS power assemblies. TP-Link/Omada is a manufacturer/product-brand relationship. BM-specific brand delivery remains unverified per model.

Held: Lanster/Lanstar (official identity not settled), Starfix (must not silently become STAFIX), Lux, Sundar, and proposed Hikvision gate-operator/PBX-specific claims. Obtain exact nameplate/model, official manufacturer URL and revision-specific datasheet before releasing those claims. Hikvision barrier gates, door intercoms and SIP endpoints are not automatically sliding/swing operators or full PBX systems.

No manufacturer or competitor image was downloaded or copied. Public links do not grant reproduction rights. Existing approved generated images remain labelled illustrative and original logo files remain preserved. A future manufacturer image needs an explicit licence/permission record tied to the exact asset, permitted channels, attribution and expiry; no assumption that a publicly downloadable brochure permits republishing its photography.

### More useful technical presentation

Implemented: semantic two-column comparisons; short, route-specific practical notes; native FAQ/reference disclosures; narrow mobile typography and wrapping. Existing diagrams/photos are retained. Later, use original, accessible schematic illustrations for CCTV recording paths, power transfer and PBX/network relationships. They must omit site-specific settings, security layouts and unsupported product capabilities. No new animation or decorative badge system.

## Project portfolio architecture and evidence gate

Reviewed [Kitotech's public projects section](https://kitotechgroup.com/#projects) in the browser on 25 October (web fetch returned 403). Observed solution filters, industry/location/year on project tiles, a photo modal, scope summary, support field and a related-project enquiry. These are interaction benchmarks only; no claims, clients, photos, brand treatment or copy are reused.

BM should retain the existing /projects URL and published-record query. With sufficient verified projects, use simple service filters first, then industry and region only when the data supports them. Do not show empty decorative filters or an invented project count. Prefer crawlable dedicated case studies when genuine original content warrants them, not a modal-only portfolio.

Case-study draft structure: approved public title; delivery status; service category; industry; permitted general location/date; customer's problem; BM's exact supplied/installed scope; equipment/model list with provenance; assessment/commissioning/handover; substantiated outcome; support scope; genuine approved photographs with captions/rights; related service/equipment and enquiry. Keep completed, ongoing, proposed/tender and illustrative records distinct. Proposed work must not become a completed case study. Never disclose camera positions, blind spots, access codes or sensitive infrastructure layouts.

Evidence gate: delivery owner verifies contract/work order and BM role; reviewer checks models/quantities, completion or current status and outcome; customer approves public naming/location/photos; publisher checks EN/SW, rights and sensitive details. Only then can an approved draft be published. Do not use generated photography in a case-study evidence gallery.

Two owner-reported CCTV management leads remain unverified. Their names and reported quantities are retained only in the owner brief/private evidence note outside this repository. Required: legal/public client naming permission, BM work scope and role, model/quantity evidence, dates/status, commissioning/acceptance, genuine approved photos and outcome/support evidence. Neither lead is included in public data, rendered pages, fixtures or structured data.

## Existing backend inventory — inspected source

The application already has a Next.js/Prisma/PostgreSQL backend, authenticated admin and Server Actions. Reuse it; no second API service, database or parallel administration system.

| Module | Present in models / actions / UI | Gap / proposed refinement |
|---|---|---|
| Products | Product; unique slug, name, brand string, category relation, description, optional price/specifications/image URL, featured/published; protected create/update/publication actions | Explicit model/SKU; bilingual rich content; normalized verified brand; typed specs; multiple images/datasheets; provenance. No stock promises. Current schema defaults publication true: future draft-first migration needs review |
| Categories | ProductCategory with unique slug, EN/SW name and optional description | No parent/subcategory model; add hierarchy only if real catalogue depth requires it |
| Brands | BrandPartner has name/logo/website/description/publication/order; Product.brand is free text | Do not use BrandPartner as proof of partnership or silently equate it with product manufacturers. Review semantics and verified manufacturer relationships first |
| Services | Service bilingual title/description/content/features/image/publication; protected create/update/toggle | Rich technical sections/FAQ/equipment links currently local JSON; future validated bilingual editor in existing admin |
| Projects | Project bilingual title/description, category, location, image URL, publication; protected create/update/toggle | No evidence permissions, delivery status, gallery, industry, structured equipment or review lifecycle. Existing schema publication default true needs a separately reviewed draft-first change |
| Media | Image URL fields and existing public assets | No dedicated secure upload/media provenance subsystem. Next phase: validated image/PDF uploads, permission checks, size/type checks, private quarantine/review and approved rendition URLs; storage choice separately reviewed |
| Enquiries | ContactMessage, SiteSurveyRequest, AppointmentRequest; protected message/survey status actions; cross-instance receipt dedupe/rate limiting | Structured retail/trade/RFQ intent, assignment, follow-up history and activity audit; do not promise CRM integration now |
| Authentication / staff | AdminUser, OTP/session models, allowlist/expiry policy and requireAdmin + validateAdminForm on mutations | AdminUser.role exists, but the active OTP allowlist/session path does not consult it for per-module sales/editor/reviewer/publisher permissions. Current allowlisted admins share administration authority; enforce future roles server-side, not just hide UI |
| Other existing content | CctvPackage/items, SupportArticle, Page/SiteSetting models; protected package/support actions | Preserve existing workflows; do not duplicate them in new modules. Settings UI currently shows configured contact values rather than a general contact CMS |

Found and corrected now: admin product specifications are saved as `[{label,value}]`, while public detail accepted only object-map specifications. The public reader now supports both formats, preserves zero/false values and ignores malformed rows. No records were rewritten and no model fields added. Mobile review also found two untranslated survey contact-method labels; Simu / Barua pepe now display in SW while retaining the existing Phone / Email form values.

## Publication and staff workflow proposal

Draft → Review → Approved → Published is a **proposal**, not a claim that the current published boolean implements it. Keep source/evidence and EN/SW completion alongside each draft. Review actions should record actor, time, revision and rejection reason; approval binds to a revision so later edits require review again. Publisher alone transitions an approved revision to public. Withdrawal removes public access and metadata/sitemap eligibility. Tests must cover each role's forbidden actions and direct Server Action calls.

Suggested roles: administrator manages staff/configuration; sales handles enquiry status/follow-up; editor drafts content/media; reviewer verifies technical facts/evidence; publisher releases approved revisions. The owner must retain a practical recovery path. Detailed capability and migration proposals come before implementation, not an unreviewed role switch that locks out the owner.

Admin UX: compact searchable lists, filters, draft status, useful validation, save feedback, changes preview and keyboard-friendly forms. Keep the public luxury editorial layout out of operational screens. Preserve the Phase 1A Saving-state completion fixes.

## Phased implementation and next milestone

1. **Current local phase:** substantive bilingual service content, primary-source research register, catalogue display correction, project evidence architecture and reliability diagnosis. No DB schema change.
2. **Next reviewable milestone:** a small product-content workflow in the existing admin: draft-first proposal, SKU/model and bilingual specifications schema, reference/datasheet provenance, validation and source/preview compatibility. Include a documented migration/rollback plan before approval. Start with owner-verified equipment records, not generated catalogue stock.
3. **Following milestone:** service technical-content editor and approved-media workflow; then project evidence/review publishing and enquiry assignment/history. Implement module by module with authorization tests and a separately approved isolated preview.
4. **Later only:** inventory/stock movements and multiple stores, wholesale pricing rules, ordering, EspoCRM/accounting/ERP/payment integration. None built or connected now.

Dependencies: exact model/availability/pricing and warranty evidence, verified delivery scope, brand permissions, project naming/photo consent, staff responsibility matrix, media retention/storage decisions and sustained database reliability. Do not represent these dependencies as completed functionality.

## Ranked SEO opportunities

1. Preserve and enrich /services/cctv, /services/electric-fence and /services/gate-motors: explicit service titles, meaningful comparisons, related equipment and local contact context. Highest priority because these define BM's existing security identity; no ranking promise.
2. Electrical / generators / backup / telephony: distinguish overlapping search intents (installation vs equipment; ATS vs controller; office PBX vs intercom) on the existing URLs, with internal links rather than near-duplicate new routes.
3. Verified model pages: exact SKU/specification/datasheet, clear quotation and retail/trade paths after owner evidence. No fictional products or keyword-stuffed brand lists.
4. Genuine case studies once approved: original scope, evidence and useful results, linked to services. No client schema or project quantities from management leads.
5. Genuine national enquiry relevance: Moshi/Kilimanjaro and Mianzini, Arusha office facts; national RFQs including Dar es Salaam/Dodoma where requested. No invented offices, repeated city pages or guaranteed local rankings.

Canonicals, EN/SW alternate links, existing security metadata intent and URLs are preserved. Product SW content gaps remain explicit because the existing model has a single description; do not manufacture a translation or advertise a fully translated model page prematurely.
