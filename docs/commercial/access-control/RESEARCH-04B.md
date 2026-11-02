# 04B source and compatibility notes

Reviewed 3 November 2026. Manufacturer reference details are recorded per model in `lib/catalogue/zkteco/products.json`; asset provenance/hashes and generated scene prompt are in `MEDIA-MANIFEST.json`.

## Tanzania relevance (not BM stock or pricing)

The following Tanzanian distributor/retailer listings were inspected solely to establish local market relevance:

- [Nordic ZKTeco collection](https://nordic.co.tz/collections/zkteco): MB360+BATTERY+WIFI, K40 PRO/ID, MB1000/ID.
- [Nordic MB1000/ID](https://nordic.co.tz/products/zkteco-mb1000-id).
- [Empire ZKTeco collection](https://empire.co.tz/collections/zkteco): MB360, MB1000 and K40 Pro.
- [Masumin K40 Pro](https://masumin.co.tz/products/attendance-terminal-zkteco-k40-pro-fingerprint).

No sales ranking, retail price, stock count, warranty or advertised free-licence entitlement was transferred to BM's catalogue.

## Primary technical sources

- [MB360 — manufacturer India](https://www.zkteco.in/MB_Series/40) and [manufacturer Vietnam](https://www.zkteco.vn/MB_Series/MB360). Older regional publications list smaller capacities: supplied revision must be checked.
- [MB1000 — manufacturer Saudi regional site](https://zkteco.sa/product-details/mb1000). The www hostname has a certificate-name mismatch; the correctly certified naked hostname was used. Certificate verification was never disabled.
- [K40 Pro — manufacturer India](https://www.zkteco.in/Classic/k40-pro). Conflicting record/card values on this source are intentionally not normalized into an unsupported guarantee.
- [K40 — East Africa](https://www.zkteco-ea.com/biometric-time-attendance-systems-in-kenya/k40-time-attendance-device/) and [2022 regional leaflet](https://www.zkteco-ea.com/wp-content/uploads/2023/04/K40_Leaflet_V20220808.pdf).
- [MB10](https://www.zkteco-ea.com/mb10/), [MB20](https://www.zkteco-ea.com/mb20/), [MB20 regional leaflet](https://www.zkteco-ea.com/wp-content/uploads/2023/01/MB20.pdf). These are not the -VL family.
- [East African BioTime supported-device list](https://www.zkteco-ea.com/wp-content/uploads/2024/10/BioTime-Supported-Device-List-EA.pdf), last updated 27 August 2024; lists MB1000/MB360/MB10/MB20 and K40 Pro, not plain K40, subject to named platform/PUSH requirements.
- [Global FAQ](https://www.zkteco.com/en/faq): plain K40 attendance software distinction, model/platform-dependent paid ADMS addition, FR1200 verification versus enrolment, and firmware-dependent behavior. Unsafe troubleshooting suggestions to disable security controls are not reproduced as installation guidance.
- [SC105](https://www.zkteco-ea.com/sc105/), [KR600](https://www.zkteco-ea.com/kr600-zkteco/), [FR1200](https://www.zkteco-ea.com/fr1200-zkteco/), [AL-280 LED](https://www.zkteco-ea.com/al180-1-zkteco-east-africa/), [EB104/EX-802 accessory category](https://www.zkteco-ea.com/accessories/).
- [ZK9500 regional manufacturer datasheet](https://www.zkteco-ea.com/wp-content/uploads/2025/08/ZK9500-ZKTeco-East-Africa.pdf), supporting the enrolment guide, not a newly confirmed BM stock record.
- [BioTime 9.5](https://www.zkteco-ea.com/biotime9-5/), [datasheet](https://www.zkteco-ea.com/wp-content/uploads/2024/08/BioTime-9.5-Datasheet-27.05.2024.pdf), [Cloud](https://www.zkteco-ea.com/biotime-cloud-kenya/), [CVAccess](https://www.zkteco-ea.com/zkbiocvaccess/) and [HLMS](https://www.zkteco-ea.com/zkbio-hlms/).
- [CVAccess/CVSecurity security notice](https://www.zkteco.com/en/Security_Bulletinsibs/26) and [BioTime 9.5 notice](https://www.zkteco.com/en/Security_Bulletinsibs/27) retained from 04A. Exact-build remediation is a deployment responsibility, not a claim that every installer/firmware is safe.

The actual official BioTime media shows marketing/demo screens without identifiable employee rows. No manufacturer demo login was used, no employee data collected, and no installer downloaded or hosted. The BM sample report is original HTML with Demo 001–004, explicitly fictional and not a claimed software screenshot.

## Deliberately withheld

MB100: a reseller listing exists, but primary model identity, current specifications and authentic media were not established sufficiently. No alias to MB1000 and no fabricated listing. Exact bracket/strike/emergency-release/sensor/power/battery/card SKUs remain site- and supplier-dependent; the complete-door guide explains scope without pretending those unspecified parts are verified inventory.
