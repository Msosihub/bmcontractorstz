# Networking & Fibre — reference ownership and commercial boundaries

25 November 2026. Local feature branch based on released main b4ef46bba5f6c7e5434900a6ad6186699d47a04c. No push, hosted deployment, Production setting, schema, provider or customer-record change is part of this milestone.

## One reference source, several views

`lib/catalogue/networking/products.json` is the single read-only authority for six curated equipment references. The service page, `/catalogue/networking`, model pages and sitemap consume it. The stable mapping for later unified Shop/Payload ingestion is `networking:<slug>`; canonical public model routes stay `/catalogue/networking/<slug>` until a separately reviewed migration. No inventory, customer, price or order database was added. Existing Prisma catalogue/admin/enquiry functionality stays authoritative for its current records.

Eight material/equipment entry points are represented: routers, APs, switches, cabinets, patch panels, CAT6, fibre/accessories and networking accessories. Only the six actual manufacturer models become product-reference records. Cabinets/cable/termination families remain specification-led BOQ enquiries: no fictional SKU, generic product price or false stock record. The existing product catalogue and future unified Shop direction remain intact.

## Technical checks and sources

- MikroTik RB5009UG+S+IN: seven Gigabit copper ports, one 2.5G port, one 10G SFP+ cage. PoE **input**, not the PoE-output variant. No built-in Wi-Fi. https://mikrotik.com/product/rb5009ug_s_in
- MikroTik hEX refresh E50UG: five Gigabit ports, RouterOS v7, 512 MB RAM, DC/passive PoE input. No Wi-Fi or AP PoE output. https://mikrotik.com/product/hex_2024
- Omada EAP650: AX3000 dual-band Wi-Fi 6, Gigabit Ethernet. Photo reference corresponds to the EAP650 generation; delivered regional hardware revision/power/accessories must be quoted explicitly. https://www.omadanetworks.com/us/business-networking/omada-wifi-ceiling-mount/eap650/v1.20/
- Omada EAP225-Outdoor: AC1200 dual-band Wi-Fi 5 and Gigabit uplink; outdoor placement/power/protection are assessed. Current image identifies UN3.2; regional revisions are not assumed interchangeable. https://www.omadanetworks.com/en/business-networking/omada-wifi-outdoor/eap225-outdoor/
- Omada SG2210MP: eight Gigabit 802.3af/at PoE+ ports, two Gigabit SFP slots, reference 150 W total PoE budget (UN5.26 imagery). https://www.omadanetworks.com/us/business-networking/omada-switch-access/sg2210mp/
- TP-Link TL-SG1024D: 24 Gigabit ports, unmanaged, non-PoE; desktop/rack mounting. UN11 manufacturer imagery. https://www.tp-link.com/en/business-networking/unmanaged-switch/tl-sg1024d/

An EAP610 page's social-preview metadata linked an **EAP650** photograph. It was not relabelled as an EAP610. The catalogue instead uses the actual EAP650 identity, independently checked against the official EAP650 page. All six original manufacturer photos remain unretouched, with size/format optimisation only. Sources, originals and hashes are recorded in MANUFACTURER-ASSETS.json.

Regional availability, exact revisions, quotations, lead times, necessary accessories and any manufacturer-image marketing permission still require owner/supplier confirmation before publication. No official dealer, certification, partnership, stock, local warranty, coverage guarantee or TZS price is invented. Current pricing is always requested.

## Illustrative scenes

Five original built-in image_gen assets: workplace/rack hero, organised rack detail, fibre technician, hotel Wi-Fi environment and connected campus. They are generic illustrations, **not actual BM installations, employees or customer evidence**. No customer identities, logos or project claims are embedded. Originals remain in Codex generated_images, with prompt text in IMAGE-PROMPTS.md. Optimised originals and responsive 384/640/960/1280/native WebP renditions live under public/images/networking. These exact new sources use the proven bounded static image policy; the accepted 28 older failures are not patched.

## Delivery and safety

The page specifies assessment, installation and agreed functional/optical/cabling checks. It does not assert ownership of certification instruments, guaranteed test levels or universal link distances. Fibre does not carry endpoint power. CAT6 colour is not a performance specification. VLANs, router/AP roles, PoE standards and controller compatibility require assessment and configuration. MikroTik RouterOS is not represented as an Omada-managed device.

Quotation and survey links reuse existing server-validated fields and editable multiline brief; no new integration is activated. No passwords are requested through enquiry forms. Service withdrawal remains database-authoritative for the page, catalogue, model routes and navigation; Preview noindex and startup identity safeguards remain in place.
