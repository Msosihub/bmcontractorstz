# Trust sections and future content ownership

26 October 2026. This extends `CMS-OWNERSHIP-AND-MEDIA-PLAN.md`. It is a field-ownership proposal, not an implemented backend milestone. No upload handler, migration, new staff permission, publication/default change, external integration or storage provisioning.

## One owner per public field

| Section | Current authoritative source | Proposed limited admin fields | Review and evidence gate |
|---|---|---|---|
| Service directory images | `data/service-imagery.json` for labelled illustrations; exact approved record/media assignments in `data/approved-record-media.json` for detail images | Approved media ID per existing service; EN/SW alt/caption, focal point | Existing media plan; preserve stable slugs/publication withdrawals; generated material keeps its disclosure |
| Sector belt | `data/trust-belts.json` → `sectors` | Stable ID, EN/SW label, optional approved illustration ID, order, enabled | Describe service-planning contexts. No conversion to a customer/testimonial claim; no invented completed work |
| Systems belt | Same file → `systems` | Existing service slug, concise EN/SW label, order, enabled | Links must resolve to known published services; Services page already filters withdrawn records. Preserve CCTV/fence/gate order. No arbitrary external URLs or scripts |
| Actual project cards | Existing `Project` record plus image approval registry | Existing title/category/location/descriptions; approved media assignment; draft revision | Scope/photo/client consent and factual review. An illustration cannot stand in for a completed-project photograph |
| Customer/client logo belt | **Not implemented: no approved customer evidence supplied** | Future client name, consent evidence, approved logo/media ID, optional approved project reference, publication term | Written permission and verified relationship; expiry/withdrawal workflow. Empty state remains sectors, not fabricated logos |
| People/team imagery | Labelled generated `team` asset on About | Approved image assignment, bilingual alt/caption, image kind | Authentic images require consent. No inferred names, staff counts, qualifications or client identity; generated people keep the explicit fictional-person disclosure |
| Working approach | Four reviewed bilingual stages in `components/premium/WorkingApproach.tsx` | Bounded title/body fields for those named stages | Owner reviews actual operational scope. No response-time or certification promises without evidence |
| Footer public contacts | `data/site.ts` (`sales`, `email`, `offices`, approved WhatsApp number); shared `FooterContacts` | Public display name, phone label/raw, address/locality, email; separately confirmed WhatsApp capability | Confirm phone/destination match, public address evidence and both languages. No invented hours, coordinates, social accounts or branches |
| Footer link groups | `data/footer-navigation.json`; one shared `Footer` on homepage and public pages | Known internal route/service/category references, EN/SW labels, bounded order/visibility | Validate references and publication. Equipment entries currently use real catalogue search parameters, not fabricated stock/category pages |
| Selected introductions and brand/manufacturer lists | Reviewed service content / existing `data/manufacturer-research.json` | Typed EN/SW revision fields; manufacturer name, official source, verified date, permitted relationship wording, logo-rights evidence if used | Manufacturer research is educational evidence, not proof of BM distributorship, authorization, stock or model-specific delivery. No manufacturer logo strip added in this milestone |

The `data-content-owner` attributes in the belt, working-approach and shared footer identify current source ownership without showing implementation detail in the customer copy. The reviewed service ownership/revision transition remains as proposed in the existing CMS plan. No generic page builder.

## Publication and security boundaries

Public contact settings must stay separate from notification recipients, SMS credentials, admin allowlists, database connection configuration and permissions. Editing a footer number must never grant login access or redirect private enquiries/provider delivery. `/whatsapp` remains the environment-aware route: internal suppression notice in Preview, confirmed Moshi destination in separately approved Production. `/huduma` remains the Kiswahili service-directory shortcut.

Store future section edits as typed draft revisions with owner review and prior-version rollback. Save draft must not replace published content. Validate internal IDs, lengths, order and language coverage on the server. Reuse the existing protected admin/session checks; add granular editor/reviewer authorization only in the separately approved milestone. Preserve existing published records and current schema defaults until the explicit transition is reviewed.

Motion settings remain design/accessibility policy rather than arbitrary CMS markup: reduced-motion static layout, accessible originals, inert/hidden duplicates, pause/resume controls and keyboard-safe system discovery cannot be removed by a content edit. Asset replacement uses the approved media workflow, with provenance and EN/SW alt. No customer-supplied CSS/JavaScript or arbitrary HTML.

## Owner decisions before the next backend milestone

Approve section fields and editing/review responsibilities; review the sector labels against actual delivery scope; supply real team/project/client evidence if those sections are wanted; review manufacturer relationship wording and image/logo rights before adding a brand strip. Confirm the existing storage inventory, environment isolation, spend, retention and restore ownership from the media plan before provisioning uploads. None of these decisions authorizes production migration, deployment or notifications.

## 1 November 2026 — limited CCTV customer implementation

The owner approved seven named customer references and a local-only CCTV belt/editor. `docs/commercial/cctv/REVIEW.md` records the exact names, source defaults, fixed SiteSetting key, permission gates and test evidence. `/admin/customers` manages names, order, visibility and prepared local logo/image references. Secure uploads/storage, other public belts and broader CMS ownership remain outside this change. No migration, Production write or deployment occurred.
