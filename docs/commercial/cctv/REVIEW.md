# CCTV — final local review

1 November 2026. Isolated branch `codex/commercial-cctv-01`, based on accepted live source `04a984eeb65cade13ea235d8d34cf0763d3938cc`. No push, deployment, Production database access/change, environment change, provider activation or migration.

Review `/services/cctv?lang=en` and `?lang=sw` at `http://127.0.0.1:3016`. Only CCTV public content is changed. Shared public design/navigation and other service pages are preserved. The additional admin navigation/settings link supports the customer-management feature requested by the owner.

## Final experience

- Four installed-system enquiry options: 4, 8, 16 and larger systems, with warm sand/olive/bronze surfaces. No single-camera sales rows or invented package prices.
- Seven property types; package camera count/property context carried into existing quotation and WhatsApp routes. Separate site-survey action. Approved national sales and environment-aware WhatsApp routes preserved.
- Brief maintenance option for existing CCTV: cleaning, recording/image/HDD checks, cable faults, phone viewing and regular visits after assessment.
- Brief construction-preparation option: camera points, conduits, cable routes and recorder location before plastering/ceilings, coordinated with the builder for homes, offices and multi-storey buildings.
- Technical explanations, manufacturer references and FAQs remain available in native expandable sections. IP/PoE, analogue HD, Wi-Fi, SIM/4G, solar, discreet cameras, night recording, internet, storage and backup coverage retained.
- Three clear delivery stages, existing hero/hotel illustrations and one restrained imagery disclosure. Original BM logo retained.
- EN and natural Tanzanian SW, stable service URL, localized metadata/canonicals and reciprocal alternates retained. Preview remains noindex and notification-disabled. Withdrawn CMS services remain 404.

## Customer belt and admin

Owner explicitly approved these public customer names on 1 November: **Simba Lodges; ABC Metros; Kilimanjaro Busses Office; Mauli Tours; Royal Furnitures; Jankan Farmers; Sukeeko Garages.** Name spellings follow the supplied list, with the obvious “Gaarages” typing error normalized. No other suggested client name was added.

The belt says these are BM Contractors customers. It does not invent CCTV-specific work, installation quantities, testimonials, project photos or endorsements. Initials/name placeholders are not presented as official logos. Motion can be paused; reduced-motion users get a static list; duplicate animation content is inert and hidden from assistive technology.

Protected `/admin/customers`, linked from admin navigation and Settings:

- Add names; move entries up/down; show/hide; confirm naming/logo permissions.
- Assign a **prepared local** PNG/JPEG/WebP path under `/media/customer-logos/`, maximum 2 MB; blank means initials/name placeholder.
- No file upload, remote image fetching, arbitrary HTML, new role, storage integration or schema migration.
- Uses only fixed `SiteSetting` key `cctv_customers_v1`; no editable notification, login, database or contact configuration.
- Authorizes every page/action, validates publication and image paths/signatures, rejects symlinks/traversal and stale edits, and masks unexpected database errors.
- Seven owner-approved source defaults are used only when no setting exists. An explicitly saved empty list stays empty; hidden/deleted names are not resurrected.

**Media limit:** the editor manages prepared logo/image references, not file uploads. Actual logo files still need permission evidence, local preparation and inclusion/verification in any eventual deployment artifact. A future persistent upload workflow remains the separately reviewed secure-media milestone.

## Relevant ChatGPT history checked

Read the accessible conversations **“bmecl - Website improvement plan - using codex,” “Prepare Tiandy Price List,” and “Locate Mauli Tours Quote.”** This is conversation review, not unrestricted access to ChatGPT Saved Memory. The history reinforces Hikvision/Tiandy, 4MP IP, tour-office/hotel work, Wi-Fi/4G/solar and concise presentation. A quotation is not proof of a completed installation. The price-list attachment's contents were not supplied by the chat reader. Neither establishes a current installed-package price, so no amounts were copied onto this page.

## Verification

- Guarded Next.js production-mode build succeeded against restricted synthetic database only.
- TypeScript and ESLint passed for changed public/admin components and server logic.
- **207 automated tests passed**, including customer publication/validation, unauthenticated writes, stale edits, unsafe logo sources, raster signatures/symlinks/size, private error masking and existing enquiry/auth/security regressions.
- Actual production-mode browser checks passed EN/SW, 360/390/768/1440 widths, package context, keyboard operation, collapsed details, canonical/noindex, customer count, animation pause/resume and reduced motion.
- Actual admin test passed: unauthenticated denial, authorized save/persistence/public display, hiding/withdrawal, add/reorder controls and unsafe image rejection. Only the isolated synthetic database was used. Exact temporary setting and session were removed, restoring the seven approved defaults.
- The first standalone admin diagnostic used default pg socket options and timed out before writing. The test was corrected to reuse the application's existing bounded Preview socket configuration and passed; no application/database networking settings or write retry policy changed.

Evidence: parent workspace `outputs/cctv-final-20261101/` contains screenshots, `browser-results.json`, `admin-results.json`, build/type/lint/test logs. Older before/after evidence remains in `outputs/cctv-commercial-20261031/` and `outputs/cctv-packages-20261101/`.

## Remaining confirmation and release boundary

Official logos/images, exact supplied model variants, stock/warranty/support terms and current **installed package prices** remain to be verified before specific claims. Existing manufacturer references establish specifications only, not stock or dealership status.

Local review is complete. Future deployment must first resolve/review the existing project-wide Production database binding discrepancy, package the exact candidate/assets, reverify isolation/configuration and obtain separate explicit authorization. Current live site, providers, Production database and Git main remain untouched. Backup work remains paused at the owner's request.

## Final readability polish — 1 November

Clarified the quotation introduction and seven-property selector with simple icons, a clear question, selected state and an attached live coverage summary. Maintenance and construction preparation now use contrasting olive/sand panels. The system-options section uses a pale contrasting background, the existing explicitly illustrative consultation image, a contextual WhatsApp advice button and site-survey action. Package enquiries, customer management and all safety boundaries are unchanged. Current screenshots/checks are in `outputs/cctv-polish-20261101/` in the parent task workspace.
