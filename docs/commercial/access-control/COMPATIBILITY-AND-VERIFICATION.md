# ZKTeco equipment, software & compatibility verification

Reviewed 2–3 November 2026. Manufacturer documentation is technical authority; this is a quotation-first reference catalogue, not inventory. No model is yet classified as BM-confirmed saleable stock.

| Reference / URL | Status | Verified distinction / compatibility boundary |
|---|---|---|
| [F18](https://www.zkteco.com/en/FSeries/F18) | Existing-system service | AC PUSH and TA PUSH firmware have different software paths. Verify the installed firmware before selecting attendance software. |
| [F18 Pro](https://www.zkteco.com/en/FSeries/F18_Pro) | Manufacturer reference | Confirm firmware, software and optional video/intercom service. Camera presence does not establish CCTV recording capability. |
| [SenseFace 4 Series](https://www.zkteco.com/en/SenseFaceSeries/SenseFace_4_Series) | Manufacturer reference | AC PUSH, TA PUSH and BEST modes serve different platforms. Optional battery and capacities depend on the purchased configuration. Photo: 4A. |
| [SpeedFace-V5L Series](https://www.zkteco.com/en/SpeedFaceSeries/SpeedFace-V5L-Series) | Manufacturer reference | Current ZAM230 family reference. Do not apply old same-name model capacities. Confirm firmware and AC PUSH/TA PUSH software compatibility. Photo: V5L. |
| [InBio Pro Plus Series](https://www.zkteco.com/en/InBioProPlusSeries/InBio_Pro_Plus_Series) | Manufacturer reference | Verify reader protocol, firmware, lock power and licensed CVAccess/CVSecurity support. Photo shows InBio460 Pro Plus, not the complete door kit. |
| [InBio160 / 260 / 460](https://www.zkteco.com/en/comparison?pid=145) | Existing-system service | Not interchangeable with Pro Plus by name alone. Assess supported software and firmware; do not install unsupported legacy software. Photo: InBio160. |
| [C3 Plus Series](https://www.zkteco.com/en/C3PlusSeries/C3_Plus_Series) | Manufacturer reference | Verify door count, reader format and software licence for the exact board. This is the Plus family, not the older C3. Photo: C3-400 Plus. |
| [ML100](https://www.zkteco.com/en/comparison?pid=586) | Manufacturer reference | ZSmart / 2.4GHz Wi-Fi. Not automatically compatible with HLMS or hotel PMS. Confirm battery supply and emergency access procedure at handover. |
| [SL01-T430H](https://www.zkteco.com/en/comparison?pid=799) | Manufacturer reference | 2.4GHz Wi-Fi; Bluetooth is for network configuration. Confirm mortise, handing, batteries and connectivity; do not assume hotel software support. |
| [LH4000](https://www.zkteco.com/en/LH4000) | Manufacturer reference | Verify HLMS / SmartLock version, lock firmware and encoder compatibility. PMS integration needs a separately confirmed interface and licence. |
| [TS2000 Plus Series](https://www.zkteco.com/en/TripodTurnstile/TS2000_Plus_Series) | Manufacturer reference | Readers, controller and software are selected separately. Ticketing, gym subscriptions and visitor systems require an integration assessment. |
| [C2-260](https://www.zkteco.com/en/C2Series/C2-260) | Manufacturer reference | RS485 readers; supported Wiegand readers need the specified WR485 bridge. Confirm exact software/version support. |
| [KR500 Series](https://www.zkteco.com/en/KR500Series/KR500-Series) | Manufacturer reference | Confirm suffix, card frequency/format, output protocol and controller support. A reader alone is not a complete door-access system. |

## Software decisions

| Platform | Architecture / purpose | Acceptance before supply |
|---|---|---|
| ZKBio Time 9.5 | Locally hosted attendance, regional 9.5 track | Exact build, TA PUSH/device compatibility, licence limits, backup, supported OS/server, payroll export/API scope. Do not substitute the global 9.0 version track. |
| ZKBioTime Cloud | Cloud attendance subscription | Tanzania service, device list/firmware, hosting region, data agreement, plan/mobile/geofencing features, recurring costs and connectivity. |
| CVAccess | Locally hosted access/security modules for suitable small/medium systems | AC PUSH/controller support, licence/modules and secure supported build. |
| CVSecurity | Locally hosted integrated physical security | Controller/reader/firmware matrix, server sizing, licensed modules and separately tested APIs/integrations. |
| HLMS / CVSecurity SmartLock | Matched hotel lock/card/encoder ecosystem | Exact platform generation; lock firmware, encoder and card compatibility; PMS interface/licence. ZSmart home locks are separate. |

Sources: [ZKBio Time](https://www.zkteco.com/en/ZKBio_Time/ZKBioTime), [regional 9.5](https://www.zkteco-ea.com/biotime9-5/), [Cloud](https://www.zkteco.com/en/ZKBioTimeCloud/ZKBio_Time_Cloud), [CVAccess](https://www.zkteco.com/en/ZKBio_CVAccess/ZKBio_CVAccess), [CVSecurity](https://www.zkteco.com/en/ZKBio_CVSecurity/ZKBio_CVSecurity), [HLMS regional](https://www.zkteco-ea.com/zkbio-hlms/), [CVSecurity SmartLock](https://www.zkteco.com/en/ZKBioCVSecuritySmartLock/ZKBio_CVSecurity_SmartLock).

## Security review — current at research date

- [1 September 2026 CVAccess/CVSecurity bulletin](https://www.zkteco.com/en/Security_Bulletinsibs/26): affected CVAccess 4.4.1 and earlier, CVSecurity 6.8.1 and earlier. Patched minimums: CVAccess 4.4.2 / CVSecurity 6.8.2. These are patched minimums, **not a claim of latest available release**. Manufacturer release-note index also lists CVSecurity 6.9.0 in late October; verify the supported current build for the customer.
- [16 October 2026 BioTime bulletin](https://www.zkteco.com/en/Security_Bulletinsibs/27): affected 9.5.0–9.5.6 Build20260130.3206; fixed build 9.5.6 Build3623 (8 October). Follow the official backup, upgrade, encryption-key and password-remediation procedure. Do not promise a universal upgrade path.
- No executable installers hosted, downloaded, installed or served by this milestone. The website does not operate a ZKTeco server or ingest biometrics.

## Commercial confirmations before a binding offer

- BM-supplied exact models/revisions, current TZS retail/trade price, availability, accessories and warranty terms.
- Software licences, capacity/module limits, renewal/subscription fees, implementation/support scope and regional service eligibility.
- Any PMS/payroll/API/visitor/ticketing integration must be individually scoped and proven.
- Owner-reported image permission is recorded; supplier identities/written evidence can strengthen the asset register. It does not establish BM certification or official distributorship.

## Curated scope / deliberate omissions

- C2-260 and KR500 are included with protocol/suffix checks. Older F18 and classic InBio are service references.
- Other reader/lock/exit-button SKUs and swing/flap barrier models are selected during assessment, not bulk-imported without verification.
- No Hikvision series, real client references, stock, prices, universal safety claims or fabricated integrations added.
