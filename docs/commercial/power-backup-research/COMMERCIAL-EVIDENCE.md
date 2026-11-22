# Power Backup & Critical Power — local evidence and boundaries

Reviewed 22 November 2026. Local milestone based on the live Solar merge 07f2823eeba1d5ed3312d7600e92766775ebf422. Solar public deployment dpl_CaXqQGffchWQ3UDc92JuFMuWKLP2 remains unchanged. No new integrations, schemas, credentials, providers, production writes or deployment.

## Actual Tanzanian demand evidence

[UNICEF Tanzania electrical procurement, UNGM 255568](https://www.ungm.org/Public/Notice/255568), reference LITB-2024-9194744, published 13 December 2024 and closed 26 December 2024, includes UPS, inverters and PDUs in its published classification. It supports a real institutional purchasing category, not an open opportunity, quantified sales forecast, award to BM or proof that any particular model was procured. No tender is portrayed as open and no UNICEF relationship is claimed. The [UNICEF Tanzania supplier category form](https://www.unicef.org/tanzania/sites/unicef.org.tanzania/files/2018-11/UNICEF-Tanzania-Supplier-Profile-Form.pdf) is older supporting category evidence, not current demand volume.

The page applies practical requirements to Tanzanian offices, tour businesses, hotels, institutions, remote security and industry. These are use cases, not completed BM projects or market-share claims. Scope is load continuity, autonomy, UPS topology, distribution and maintenance; solar generation links to the published Solar page instead of repeating it.

## Manufacturer verification

- [Schneider SRV2KI](https://www.se.com/sg/en/product/SRV2KI/): discontinued 31 March 2026; do not list as the current 1800 W successor. [SRV2KI-E](https://www.se.com/sg/en/product/SRV2KI-E/) is the reviewed 2000 VA/1800 W, 230 V reference. Preserve exact suffix, no invented stock or runtime. Mode/accessories confirmed per quotation.
- [Eaton 9SX2000I](https://www.eaton.com/in/en-us/skuPage.9SX2000I.html): 2000 VA/1800 W, online double-conversion, 230 V reference, eight C13 outputs. The US 9SX2000 and AU variants are different records; do not mix specifications. External battery/network cards are not assumed included. Published runtime figures are not promised for unknown customer loads.
- [Eaton UPS types](https://www.eaton.com/us/en-us/products/backup-power-ups-surge-it-power-distribution/backup-power-ups/types-of-ups-systems.html): distinguish standby/line-interactive/online. The actual load, operating mode, bypass and transfer architecture must be specified; no universal zero-break guarantee.
- [Victron MultiPlus-II 230 V description](https://www.victronenergy.com/media/pg/MultiPlus-II_230V/en/description.html): inverter/charger/transfer operation is distinct from online double-conversion. Generator AC acceptance, exact variants and settings require assessment. Do not translate manufacturer UPS functionality into a universal no-break promise for all medical/server loads.
- Ritar DG reference and original approved source are preserved from data/solar-engineering.json and its manufacturer provenance. It is a battery-family illustration, not a complete bank or a drop-in replacement for an arbitrary UPS.
- [EIA transformer basics](https://www.eia.gov/energyexplained/electricity/batteries-circuits-and-transformers.php): transformers change voltage; higher-voltage distribution can be relevant to assessed distance/loss tradeoffs. They do not create energy or belong automatically in every large inverter design.

## Confirmations and commerce boundaries

Owner confirmed APC/Eaton sourcing and permission to use official marketing images on 22 November 2026. Existing Victron/Ritar approved assets are reused. No official dealership, certification, partnership, stocked quantity, price, warranty, fleet, medical approval or customer project is inferred. All four product actions request current price or a specified installation quotation. Exact regional model, accessory bundle, availability, current TZS price and installation scope remain per-quotation business confirmations.

The four reference products are a curated local JSON guide, not inventory and not new Product database records. Existing secure admin/products/enquiries continue unchanged. Payload remains a future separate content/catalogue milestone; this page does not depend on it.

## Technical safeguards

- Complete security chain includes recorder/storage, PoE, network, access and approved fence supply; small UPS and complete off-grid networks are different designs.
- Camera count is not a sizing formula. Off-grid duty includes night/PTZ/IR, recording, communications, low-sun periods and autonomy.
- ATS selects a source and does not itself bridge generator start/transfer. Online UPS illustration has one selected AC source, a matched DC battery stage, protected output and an optional separately engineered maintenance bypass. In bypass, conditioning/battery protection may be absent. This is a concept, not wiring instructions.
- Redundancy, extended batteries, three-phase systems, industrial isolation, protection/earthing and medical/life-safety continuity require a defined project design. No generic zero-interruption or fixed-runtime promise.
- Transformer integration is optional and must satisfy voltage, distance/loss, equipment, protection and utility requirements.
- New journal is one original short EN/SW planning guide, not copied manufacturer text. No backend publication or media-upload workflow is added.

Image originals, final prompt, owner permission and source paths are recorded in MEDIA-PROVENANCE.json. Python's local certificate-store error was not bypassed; downloads used the system curl client with normal TLS verification. No product photo was generated or logo altered.
