# CMS ownership and secure media milestone

26 October 2026. **Proposal only for backend changes.** No storage provider, upload endpoint, schema migration, new staff permission or publication workflow has been activated. Existing admin authentication/session checks and publication defaults remain unchanged.

## Current ownership, made explicit

| Field | Ten premium service pages | Six additional service pages | Future authoritative owner |
|---|---|---|---|
| Main title and introduction | `data/premium-services.json`; admin values do not replace these | Published `Service` record, then existing reviewed fallback only if no record exists | Typed bilingual service content revision |
| Technical sections | Reviewed premium/secondary JSON plus `specialist-technical-content.json`; `Service.contentEn/Sw` supplements | Existing CMS body/features plus reviewed technical guidance | Same revision, with bounded named sections |
| FAQs | Reviewed service JSON | Reviewed secondary/technical JSON | Same revision, typed question/answer rows |
| Image | Approved record-specific media if available; otherwise labelled service illustration | Same, with illustrations on access-control/HVAC | Approved media assignment in the revision |
| Related services | `data/service-relations.json` | Same | Validated links to existing service slugs |
| SEO title/description | Now generated from the same reviewed title/intro displayed on the page | CMS title/intro, matching visible text | Derived from revision by default; bounded explicit override only after review |
| Publication | `Service.isPublished` is authoritative; withdrawn records do not reappear through fallback | Same | Explicit publication of a reviewed revision |

Current field ownership is stated inside the protected existing service editor. This is a transitional explicit mapping, not a claim that all fields are staff-editable today. `lib/service-presentation.ts` removes metadata/visible-introduction drift and avoids advertising a complete SW translation when an English CMS supplement has no SW version.

## Small service editing transition

1. Snapshot/hash the existing reviewed EN/SW JSON for all 16 slugs. Preserve the original source and previous public revision for rollback.
2. Import those exact reviewed values into a typed `ServiceContentRevision` (proposed, not created). Named fields: plain service title, editorial headline, intro, applications, technical sections, equipment, delivery, maintenance, FAQs, related slugs, media assignment and SEO override. No arbitrary layout JSON, HTML scripts or page builder.
3. Add revision validation: bounded lengths/counts, escaped plain text, known related slugs, language completeness, image rights, owner-reviewed scope. Reconcile existing CMS supplements explicitly rather than replacing either copy silently.
4. Review every EN/SW imported page against the current rendered version. Switch the renderer to one approved revision source only after parity checks. Keep JSON as a versioned rollback fixture, not a competing editable source.
5. Add editing to existing `/admin/services/[id]/edit`; use the established server authorization and CSRF/origin controls. Publication remains separate from Save draft.

## Existing storage investigation

Evidence: `package.json`, `prisma/schema.prisma`, `lib/admin-validation.ts`, `next.config.ts`, `public/assets`, and current public image consumers. The repository has image URL fields, static versioned assets and Neon relational records. No Blob/S3/Cloudinary SDK, upload API or configured object-store integration was found in source. Admin file inputs are currently rejected. Neon database availability does not establish an available object-storage bucket. The cloud account's unlinked stores were not independently enumerated; **do not conclude no store exists**.

Before provisioning anything, inspect the existing Vercel project's Storage/connected integrations read-only with the owner and record store ID, access model, region, cost and environment attachment. Reuse an appropriate existing store if it meets isolation and access requirements. Do not attach a production store to Preview or pull production secrets.

Conditional candidate if none exists: Vercel Blob within the existing project/account, with private quarantine/originals and reviewed public derivatives. [Private Blob supports authenticated reads and project-scoped OIDC](https://vercel.com/changelog/vercel-private-blob-is-now-generally-available); [client uploads require a server-mediated token exchange](https://vercel.com/docs/vercel-blob/client-upload). Those capabilities do not implement BM's authorization, review or media processing. Verify current SDK/plan/runtime support and price before approval; no package/store was added. Do not treat an obscure public URL as private. If only one private store is used, serve published derivatives through a publication-checking route with appropriate cache invalidation; do not expose originals or signed draft URLs in public metadata.

## Proposed reusable Media Library

Use existing protected admin navigation: **Media → Upload → Review → Assign**. One modest subsystem for products, projects and services; no inventory or new CMS.

- **Authorization:** existing active session plus server-side permission for upload, review and publish on every handler, including token issuance/completion/assignment. Current OTP allowlist does not provide granular editor/reviewer enforcement merely because `AdminUser.role` exists. Design permissions first; never add staff to an allowlist as a substitute. Same-origin checks, rate limits, short-lived tokens, random object keys; never accept a caller-supplied destination bucket or filesystem path.
- **Limits (proposed):** JPEG/PNG/WebP only; 8 MiB maximum compressed upload, 24 megapixels decoded, one image at a time initially. Enforce byte and pixel limits server-side; verify magic bytes and successful full decoding, not just extension/MIME. Reject SVG, HTML, PDF, animation and malformed/polyglot files in milestone 1. Review resource/time limits in disposable tests before release.
- **Processing:** private quarantine → decode/orient → strip EXIF/GPS and embedded metadata → re-encode safe WebP renditions 480/960/1440, no upscaling. Store intrinsic dimensions, checksum, bytes and version. Bound concurrency/memory. Never write customer uploads into repository `public/` or deployment filesystem. Token completion is not proof of a safe image; publication waits for processing and review.
- **Metadata (proposed `MediaAsset`):** kind (`actual-product`, `actual-project`, `actual-team`, `generated-illustration`), uploader, source URL/creator, manufacturer/licence/consent evidence, usage restrictions/expiry, EN/SW alt, caption, processing state, review state, reviewer/time, checksum, original key, rendition keys/dimensions. Avoid storing consent documents in publicly readable fields.
- **Review:** accessible image preview with original/derivative dimensions and visible provenance. Verify actual model for products; client/photo consent and claims for projects; people consent for authentic team photographs. An AI service image cannot satisfy actual-product or actual-project evidence. AI people keep their illustrative label.
- **Assignment:** select an approved media ID in the existing product/project/service editor. Confirm intended record/model and crop; validate the asset on the server. Draft assignment does not mutate a published record. No arbitrary URL fetch (SSRF), no expiring signed URLs saved as permanent image URLs.
- **Replacement/removal:** immutable versions; preview the replacement, publish the new assignment atomically, retain prior approved rendition for rollback. Removing an assignment does not instantly delete shared media. Track references and block deletion while published references remain.
- **Isolation:** separate Preview store/bucket and scoped credentials/OIDC policy, synthetic media only; no production store grants at build/runtime. Keep DB identity safeguards, Vercel Authentication and noindex. Do not re-enable notifications or tracking.
- **Proposed retention:** uncompleted uploads 24 hours; rejected/unassigned drafts 30 days; replaced approved versions 90 days, extended for active rollback/legal requirements. Approved active originals retained while in use and backed up. Owner must approve schedule, recovery responsibility and budget. Daily scheduled report then bounded deletion with audit trail and dry run; no cleanup job created now.
- **Recovery:** back up media manifest and DB assignments consistently; test restoration into isolated storage and DB. A DB-only backup does not restore object files. Quota/billing alerts and documented owner before staff rollout.

## Draft-first publication proposal

New admin-created records should become drafts **after separately approved changes**, with Edit → Save draft → EN/SW preview → Request review → Publish. Existing published records remain on their current approved revision while a draft is edited. Reject missing provenance/alt or incomplete required content; translation gaps must remain visible rather than fabricated. All mutations recheck permission and optimistic revision version. Audit who approved what. Unpublish preserves historical slugs and agreed redirect policy.

Transition must review current `@default(true)` fields and action defaults explicitly, backfill current public records as published revisions without withdrawing them, preserve existing IDs/slugs/enquiry associations and test concurrent edits/rollback. Do not blindly change defaults. Product lacks translated description fields today; plan that addition rather than marking existing English product prose as Kiswahili.

## Separate implementation approval required

Owner decisions: storage inventory/provider and spend, Preview/Production storage isolation, retention/recovery owner, staff editing/review permissions, who can publish, consent/licence requirements, exact typed content/revision schema and migration plan, existing media approval list, translation review, and staging acceptance criteria. Then approve a local/isolated implementation milestone only; production migration/deployment remains separately authorized.

Acceptance tests: unauthorized/token replay/forged completion/cross-origin denial; invalid MIME/oversize/pixel bomb rejection; EXIF removal; private original denial; draft non-disclosure; assigned-record publication gate; safe replacement/rollback; unreferenced-only cleanup; EN/SW alt and responsive variants; concurrent draft conflict; DB/storage isolation and zero provider requests. Test timeout before/after commit without blind write retries.
