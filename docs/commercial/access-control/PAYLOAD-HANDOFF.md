# Offline Payload handoff — engineering tenant only

The public website imports `lib/catalogue/zkteco/products.json`. It does not read an environment switch, call a CMS, connect to local SQLite or expose prototype media. Prisma remains responsible for existing enquiries and customer administration. The existing multi-tenant Payload prototype is preserved unchanged in its separate worktree/branch.

`scripts/export-zkteco-payload-draft.mjs <explicit-local-output.json>` creates an **offline draft mapping**, not a seed/import script. It reuses the prototype's name/model/brandLabel/categoryKey/generation/description/variants/specifications/brochures/reference fields, localizes EN/SW, records compatibility in specifications and preserves original reference metadata. It also prepares three engineering service drafts and equipment/installation/support packages. Prices are absent; availability is unconfirmed and price approval is false. No CMS account, credentials or network call is involved.

Before any controlled import:

1. Extend the existing category select with the six ZKTeco category keys. Reuse current/legacy generation values.
2. Review the current CENTURION-only manufacturer/document/media validators and public DTO projection. Add explicit ZKTeco allowlists, not arbitrary URLs. This has **not** been changed or activated here.
3. Resolve the engineering tenant, brand, categories and approved media to real relationship IDs on the server. Slugs in this bundle are references, not authorization. Verify cross-tenant reads/writes and localized array IDs.
4. Review media rights and publication flags, exact licensing information and any stock/price approvals. Images remain unpublished CMS drafts until reviewed, even though the approved reference website may use the local copies.
5. Validate durable storage, authentication, backups and publication controls in the separate Payload milestone. Do not connect this public website to the prototype.
6. Make one explicit catalogue-authority cutover after matching the public reference content, rather than maintaining two live inventories/prices. Keep current Prisma enquiry routes until a replacement is separately accepted.

Software licensing, supplier availability, inventory, payroll/PMS interfaces and subscription billing are not implemented by this handoff. Installation packages describe quotation scope, not fixed-price bundles or stock reservations. BM Car Accessories receives no records or shared inventory from this export.
