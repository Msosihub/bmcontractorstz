# Integration and admin preservation backlog

25 October 2026. Baseline `abae7f8779f101848309b1ce12090da3da1e8742` → Phase 1B `c58745ac40bc370042d5746d88ccb711a1cdb0f8`. **Inventory and recommendations only.** No integration, provider, schema, setting, Production database or deployment was changed. Preserve the current premium public design and operational admin separation.

Status describes implementation found in source, not a live-service availability guarantee. “Fully implemented” means the stated narrow function has code, a consumer and persistence/transport where applicable; it does not mean a complete business platform or production release approval.

## Integration and workflow status

| Feature | Status from actual code | Evidence / actual dependency | Value and privacy/security treatment | Decision / confirmation |
|---|---|---|---|---|
| Public contact intake | Implemented | `app/contact/actions.ts`, `lib/enquiries/validation.ts`, `store.ts`; ContactMessage | Saves before alert; contactable sender, bounded fields, honeypot, transaction/receipt dedupe; customer details stay in private admin rather than SMS body | Preserve; human lead follow-up owner needed |
| Site-survey intake | Implemented, with optional-budget UX gap | `app/request-site-survey`, `components/premium/Enquiry.tsx`; SiteSurveyRequest | Location, requirements, property, urgency, preferred method and selected equipment context; no confirmed appointment | Preserve; decide optional budget field |
| Africa's Talking office SMS | Implemented transport hook; delivery operations partial | `lib/africasTalking.ts`, contact/survey consumers; AT_USERNAME, AT_API_KEY, optional AT_SENDER_ID, BM_NOTIFY_NUMBERS | Ten-second request timeout; sender fallback remains BM SECURITY if AT_SENDER_ID is absent (registration/approval not verified here); reference-only office alert; failed alert does not undo saved enquiry. HTTP acceptance is not end-to-end delivery proof; no callback/retry/outbox delivery workflow exists | Preserve guarded hook; provider/recipient/sender and billing checks only in separately approved release process |
| Admin OTP via SMS | Implemented | `app/admin/login/actions.ts`, `lib/auth/admin-auth.ts`; AdminOtp/AdminSession | Allowed-phone policy, hashed OTP/session, five-minute OTP, attempts/atomic consume, secure production cookie, expiry/logout; no credential reporting | Preserve. Preview suppresses transport, so synthetic login needs its existing approved fixture procedure, not disabled authentication |
| WhatsApp customer contact | Implemented manual link, **not an API integration** | `data/site.ts`, `next.config.ts`, office contact link; wa.me | Approved Moshi destination; Preview goes to internal disabled notice. No automatic WhatsApp message, webhook, template approval or provider account connection found | Preserve; do not enable Arusha/national WhatsApp without confirmation |
| Sales email | Implemented mailto link only | central sales email, enquiry/footer | Opens customer's mail client; no SMTP/API mailer or automatic email replies found | Preserve link; defer outbound-mail service |
| Appointments | Placeholder model; public bridge partially improved | P `/appointments` future text; B survey bridge; AppointmentRequest schema but no consumer/action/admin module | No slot availability, reservation, calendar, confirmation or reminder flow. Existing model does not imply operational booking | Defer scheduling; owner must define staffing, confirmations, cancellations and privacy before approval |
| Maintenance operations | Service/enquiry implemented; service management a future plan | `/services/maintenance-support`, support guide, survey status | No contracts, recurring jobs, technician scheduling, asset history, automated reminders or response SLA engine | Preserve enquiry; defer operations module until demonstrated demand |
| Settings editing | Read-only UI + documented plan | `data/site.ts`, `/admin/settings`; SiteSetting model has no application reader/writer | Current page displays source config; subtitle is not evidence of editing. Future writes require guarded allowlist/validation/audit; keep secrets out of public settings | Defer editor to small approved backend milestone |
| Support CMS | Implemented create/edit/publish | `/admin/support`, public `/support`, `lib/support.ts` | Explicit draft prevents static resurrection; six legacy guide slugs retained | Preserve; search/filtering/uploads are future work, not already implemented |
| “BM Assistant” popup | Legacy quick-link widget, currently unused | `components/site/BmAssistantPopup.tsx`; sessionStorage/delayed display | No LLM, AI API or conversational backend; quick links only. No external chat data transport found | Defer widget; retire misleading AI interpretation, not useful support links |
| Brand/partner management | Schema-only for BrandPartner; old static public trust presentation | `prisma/schema.prisma`, legacy brand sections; no BrandPartner app query/admin module found | Logos/trust labels are not evidence of authorisation, stock or a manufacturer contract | Defer registry/workflow; never auto-restore unverified partner claims |
| Generic pages CMS | Schema-only / unused | Page model; no prisma.page application call | About/legal pages remain source-driven; no generic page editor found | Defer; no need for a second CMS |
| n8n / EspoCRM / CRM | Documented future plan, no active integration found | `docs/website-modernization/FINAL-EXECUTION-INSTRUCTION.md` future sections; no corresponding app transport, webhook/route or package | No customer export or webhook should be inferred from a roadmap | Defer; separate explicit integration/privacy approval |
| Payments / cart / accounting / ERP / stock | Future plan, not implemented | old product comments and modernization roadmap; no matching app integration found | Prices/enquiry paths are not checkout, inventory reservations, invoices or accounting synchronisation | Defer; none activated |

The only external HTTP transport found in active application code is the Africa's Talking SMS helper. Prisma/pg supplies PostgreSQL connectivity; external browser links and existing asset URLs are different from backend integrations. Local fonts replaced build-time Google font fetching. No new telemetry or external script was introduced by this audit. Source inspection cannot enumerate out-of-repository SaaS accounts, Vercel dashboard hooks or campaigns; those require their own explicit inventory before release.

## Admin modules: what really works

All listed Phase 1B protected pages and mutation actions use the current session/allowlist boundaries (`requireAdminPage`/`requireAdmin`, protected layout, validation). The baseline had protected layouts but also a duplicate root dashboard and mutation gaps addressed in Phase 1A; do not restore those weaker paths.

| Module | Implemented operations | Not implemented / meaningful gap | Decision and regression |
|---|---|---|---|
| `/admin` | Private dashboard counts/links | Not a CRM analytics or assignment system | Preserve auth/counts; consolidate route, no duplicate root page |
| `/admin/products` + `[id]/edit` | Create, update, publish toggle, category resolution, price/specification/image URL fields | No delete action, upload handler, inventory/SKU workflow or review lifecycle; premium list/detail don't render imageUrl; list specification preview still expects an object while admin writes label/value rows | Preserve; test mutations/price/spec/publication. Improve verified image/spec preview before presentation parity, not during audit |
| `/admin/projects` + `[id]/edit` | Create, update, publish toggle, title/description/category/location/image URL | No gallery, evidence-permission/review workflow or case-study detail route. Premium public records omit existing image/location/category | Preserve data; improve verified display. Owner must approve project evidence before publication |
| `/admin/services` + `[id]/edit` | Create, update, publish toggle; bilingual content/features/image URL | Core premium titles/intro/features/imagery also remain source-managed rather than reflecting all CMS edits; CMS content is supplemental and metadata can use CMS descriptions. Secondary pages use CMS text but omit its image. No rich-section editor or formal review roles | Preserve withdrawal authority; improve/clarify CMS field ownership before admin parity; defer structured editor |
| `/admin/packages` + `[id]/edit` | Create, update, publish toggle; camera count, priceFrom, shared includedItems | No builder/cart, secure uploads, related-products workflow or bilingual includedItems. CctvPackageItem relation has no separate application consumer found | Preserve simple records and enquiry context; defer builder |
| `/admin/support` + `[id]/edit` | Create, update, publish toggle for bilingual articles | No delete, uploads, advanced public search or article workflow | Preserve, test withdrawn guide suppression |
| `/admin/messages` | Private list/details; NEW / CONTACTED / CLOSED status | No in-app reply, notes, assignment, CRM conversion or automated follow-up | Preserve; future sales workflow requires audit/access controls |
| `/admin/site-surveys` | Private requirements/context list; NEW / CONTACTED / QUOTED / COMPLETED / CANCELLED status | No quotation creation, staff dispatch, customer message sender or appointment engine | Preserve; status values do not prove those downstream systems exist |
| `/admin/settings` | Displays central company/contact/recipient values | No form/action saving SiteSetting; no secret editor | Preserve truthful read-only behavior; defer public-settings editor |
| Login / verify / logout | OTP, session creation and clearing | AdminUser.role/isActive model is not consulted by active phone/session policy; no fine-grained editor/sales/publisher roles | Preserve guards; define roles and recovery before enforcement changes |

Create actions for products/projects/services/packages/support currently publish new records (`isPublished: true`); schema defaults also commonly publish. A toggle is not Draft → Review → Approved → Published. This is a real workflow limitation to review before enabling broader staff content publishing, not functionality secretly completed by the redesign. No defaults or records changed here.

Existing image handling accepts local/HTTPS URLs but explicitly rejects form File uploads (`lib/admin-validation.ts`). That is not a secure media-upload system. Future handling needs permissions, file/type/size validation, provenance, approved storage/renditions and safe URL policy; do not add a storage integration under this audit.

## Environment-dependent behavior to retain

| Inputs / source | Effective role | Preservation requirement |
|---|---|---|
| DATABASE_URL, PrismaPg/pg; `lib/prisma.ts` | Database connection; isolated Preview pool max 1 | Use approved restricted identity; timeouts remain unresolved; no production-bearing root commands |
| VERCEL_ENV / BM_ISOLATED_PREVIEW | Detect Preview in guard, config, robots/sitemap and helpers | Fail-closed flags/identity required; never turn off to make tests pass |
| BM_DISABLE_NOTIFICATIONS | Independent SMS/office helper early return | Keep all three suppression paths; 204/empty result indicates suppression, not delivered SMS |
| BM_PREVIEW_DB_HOST / NAME / ROLE and alternate database URL guards | Explicit allowlisted synthetic identity; rejects forbidden targets/identity overrides | Preserve startup/build verification and least privileges; no new database/limit changes |
| NEXT_PUBLIC_BM_PREVIEW | Derived at build time for browser/public WhatsApp link | Non-secret policy only; must match the deployed environment. A browser build flag does not replace server suppression |
| AT_* / BM_NOTIFY_NUMBERS | Production SMS credentials/sender/recipients | Server-only; env override precedes existing fallback; not tied automatically to public contact edits |
| ADMIN_ALLOWED_PHONES / ADMIN_SESSION_DAYS / NODE_ENV | Staff allowlist, session duration, secure-cookie behavior | Keep Preview synthetic identity; do not expose or repurpose staff credentials |
| NEXT_RUNTIME / instrumentation register | Node startup awaits identity preflight | Preserve fail-closed gate; no skip for an unavailable database |
| BM_RECEIPT_CLEANUP_DATABASE_URL | Dedicated cleanup command; default dry-run, explicit --apply for bounded expiry | Scheduler/owner not configured in app; only receipts expire, not enquiries |
| CI / VERCEL and safe-checks workflow | Narrow isolated localhost CI exception; disposable Postgres, no live provider credentials | contents:read, pinned actions, no deploy step; never broaden identity bypass |

`package.json` build runs preflight → Prisma client generation → Next build; it does not migrate or seed. The explicit seed scripts and old `scripts/preview.mjs` fixture-preparation helper are not ordinary safe development commands. The latter predates current identity requirements and lacks the full current identity configuration; do not use it as a general environment launcher. Retain historical reference pending deliberate retirement; use the established restricted runner instead. `.vercelignore` excludes environment files, seeds, migration files, docs/tests and legacy local preparation helpers from the reviewed upload path. Do not infer that this alone proves future deployment safety.

Sender/fingerprint hashes are private abuse-control identifiers, not proof of anonymisation. Customer enquiry retention and access responsibilities remain distinct from receipt expiry.

Receipt retention is 24 hours with bounded opportunistic cleanup in `lib/enquiries/store.ts`; `scripts/cleanup-enquiry-receipts.mjs` supports a separate scheduler but no scheduled job was found. A responsible owner/schedule, monitoring and least-privilege cleanup access remain release tasks; no cron/integration was created or executed.

## Prioritised practical backlog

**Before replacing Production:** reconcile real published/campaign URLs read-only under release approval; retain both shortcuts/contact policy; resolve Neon reliability; preserve all security/auth/notification gates. Review core service CMS-versus-editorial field ownership and metadata consistency, verified product images/card specification previews and project photo/location/category display within the approved design. Decide whether the survey budget omission is intentional. These findings do not authorise publishing unverified content.

**Next small backend milestone, separately reviewed:** source of truth for public settings; draft-first/revision workflow and roles without locking out the owner; structured product/service content and verified media handling. Build on the existing models/admin/actions, module by module. The current `CONTENT-AND-BACKEND-ROADMAP.md` remains the roadmap; this audit adds evidence, not a parallel backend plan.

**Defer until business need and explicit approval:** appointments/calendar, maintenance dispatch/reminders, staff assignment/history, outbound email/WhatsApp, CRM/n8n, stock/multi-store, checkout/payments/accounting. No unfinished integration was completed or enabled. Retire only misleading demo/trust presentations and obsolete duplicate route files, not useful customer URLs or genuine records.
