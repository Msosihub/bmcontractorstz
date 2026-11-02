# ZKTeco 04B — commercial review

3 November 2026. Owner review required; no hosted Preview requested, deployment, merge or Production change.

## What is implemented

- Six intent-led hub paths: attendance machine, complete attendance software, fingerprint/PIN door, multiple doors, hotel/smart locks and repair/support. Existing hub, attendance, smart-lock and all thirteen original model URLs remain.
- Near-top catalogue invitation on hub and both subpages. Nine customer categories, search, category counts, three-way comparison including specifications, and model/scope-specific quotation, WhatsApp and survey context.
- 29 manufacturer references: the original 13 plus MB360, MB1000, K40, K40 Pro, MB10, MB20, SC105, KR600, FR1200, AL-280 LED, EB104, EX-802, BioTime 9.5, BioTime Cloud, CVAccess and HLMS. No BM price, stock quantity, warranty or dealer-status claim.
- Dedicated BioTime presentation on the attendance page and visual hub invitation. Fictional Tanzanian HR office photograph with an HTML/CSS composite of unchanged official software marketing media; the complete manufacturer media remains visible with its source attribution. No real staff records or demo login is used. Ten supported benefit explanations; optional/licensed modules explicitly qualified.
- Original, clearly labelled fictional report, five configurable complete-solution examples, device/application comparison and software/licensing matrix. LAN, cloud and USB behavior explained without promising automatic payroll or unlimited offline storage.
- One finite opt-in attendance workflow near the end, with manual controls, reduced-motion behavior, offscreen/hidden-tab stop and complete static/no-JavaScript text. Existing hub door explanation preserved.
- Essential door scope guide covers brackets, strikes, exit and emergency releases, sensors, suitable 12V/5V power, battery/charger, RFID cards/fobs and enrolment. Specific unverified accessory SKUs are not invented.
- Static reference catalogue and offline draft handoff remain independent of the isolated Payload prototype.

## Accuracy decisions

| Reference | Verified distinction / remaining condition |
| --- | --- |
| MB360 | India current reference: 1,500 faces / 2,000 fingerprints / 100,000 records; older regional sources differ. Wi-Fi, backup battery, card and ADMS must match the supplied revision. Indoor/NIR placement assessment required. |
| MB1000 | Separate manufacturer model, verified against Saudi regional product page and East African PUSH list. Not an alias of MB100. |
| MB100 | Reseller listing found, but no sufficiently established primary manufacturer identity/specification/photo set. Withheld; owner should supply exact label and current supplier datasheet. |
| K40 | Separate from Pro. East African leaflet differs from older regional leaflets; global FAQ distinguishes its attendance software path. Do not assume BioTime 9.5 or managed access compatibility. |
| K40 Pro | TCP/IP/USB and battery verified. Manufacturer page has conflicting capacity fields; quotation must confirm exact SKU/current datasheet rather than publish one universal record/card capacity. |
| MB10 / MB20 | Separate from MB10-VL / MB20-VL. Base regional references recorded; actual firmware, software and UPS options require confirmation. |
| BioTime list | Dated 27 August 2024. Conditional platform/PUSH reference, not blanket certification for every 2026 build. |
| AL-280 LED | Regional product page explicitly identifies the model but retains an AL180 image filename. Supplied physical label, mounting, voltage/current and emergency interfaces must be confirmed. |
| FR1200 | Verification reader, not a USB enrolment scanner. Controller generation, algorithm and power assessed separately. |
| Software | Exact patched build, licence limits, supported OS/server, module entitlements, API, mobile, cloud region, maintenance and recurring fees confirmed before an offer. Existing security notices retained. |

## Owner commercial confirmations

1. Which exact models/revisions BM will offer, supplier availability, lead times, warranty terms and approved current retail/installed prices.
2. MB100 identity and any additional MB-series or accessory SKUs to list publicly.
3. Exact BioTime licence tiers and Tanzania supplier entitlements; optional modules, deployment/support scope and any recurring charges.
4. Current written media-permission evidence where available. Use follows the owner's reported dealer permission; no manufacturer partnership is claimed.

## Evidence and review

Local review: http://127.0.0.1:3022/services/access-control?lang=en ; attendance at /services/access-control/time-attendance?lang=en ; catalogue at /catalogue/zkteco?lang=en. Replace lang=en with lang=sw.

Evidence directory: outputs/access-control-04b-20261103/ in the task workspace. Includes EN/SW desktop/mobile captures, software/report/workflow detail captures, test logs and masked release-safeguard checks. Original 04A screenshots remain in outputs/access-control-20261102/ for comparison.

Verification: guarded build/TypeScript passed; 228 tests passed; 20 EN/SW desktop/mobile axe views had zero violations; all 58 model-language routes, category/search/specification comparison, contextual quotations, motion controls and no-JavaScript content passed. Synthetic EN/SW contact and survey persistence/deduplication passed; exact four records and four receipts removed. Admin save/withdraw/publish and protected modules passed; exact product/category/session fixtures removed. Runtime audit: zero vulnerabilities. Full lint: zero errors, sixteen pre-existing warnings. See VERIFICATION-04B.json. The exact GitHub candidate is recorded in the task handover. A commit identifies reviewable source; it is not a frozen or deployment-approved release package. No new deployment archive is prepared.

## Preserved boundaries

Production main and live deployment, Neon resources/permissions, credentials, notification providers, Prisma schema, migrations, authentication and fail-closed database protections remain unchanged. Local synthetic checks use the existing restricted Preview database with notifications disabled and provider-deny enforcement. No live OTP/SMS tests.

Before any future release: owner commercial review, separate hosted Preview authorization, hosted cold/idle database and performance checks, effective branch protections and resolution/owner handling of the GitHub Actions billing lock. No required checks may be bypassed.
