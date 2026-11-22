# Power Backup versus Solar — focused content and navigation review

22 November 2026. Compared accepted Power Backup candidate d3b3b82 with released Solar source 07f2823. Source review only; no Production or hosted configuration changes.

| Customer intent | Solar owns | Power Backup owns / decision |
| --- | --- | --- |
| Generate energy | PV sizing, shading, charging, generation and solar pumping | No PV sizing, pumping or generation chapter added |
| Keep essential work running | Links to UPS/backup for continuity | UPS selection, interruption tolerance, battery autonomy, transfer, bypass, redundancy, monitoring and maintenance |
| Off-grid CCTV | Array, charging, hybrid generation and energy balance | Complete camera, NVR/disks, PoE and communication duty; night loads, usable autonomy and low-battery alerts. Removed repeated PV/charging inventory and replaced it with an explicit Solar handoff |
| Industrial inverter/BESS | Solar/hybrid production and source integration | Protected circuits, interruption limits, battery reserve, isolation, maintenance access and engineered distribution; optional transformers remain conditional |
| Equipment | Generation-oriented panel/inverter/storage/pumping references | APC and Eaton for online UPS; Victron for assessed inverter/charger transfer duty; Ritar for matched battery autonomy/replacement. Shared brands serve different requirements, not duplicate inventory records |
| Enquiries | Solar assessment, energy demand, panels, pumping and hybrid production | Existing UPS/Backup-prefixed enquiries now explicitly request duration, permitted interruption, redundancy/bypass/monitoring and existing equipment |

## Focused adjustments

- Retained the unique editorial headline “Keep the essentials. Protect the work.” and its Kiswahili equivalent. The plain-language UPS/Power Backup eyebrow stays visible.
- Rewrote the opening in EN/SW around recording, communications, outages, UPS selection and battery autonomy; primary CTA now asks customers to plan power continuity.
- English title now explicitly targets UPS and critical-power continuity; both descriptions emphasize UPS selection, battery autonomy, monitoring and maintenance. Solar titles/descriptions remain unchanged and different.
- Off-grid disclosure now describes the complete operational chain and autonomy. The existing link is clearly labelled “PV & charging design → Solar Engineering”, with natural Kiswahili. No new card or section.
- Industrial disclosure begins with protected loads and operational requirements rather than source generation. Existing optional-transformer safety caveats retained.
- Existing Solar links back to Power Backup in its critical-power applications and related-services navigation; Power Backup links to Solar locally and at the end. Both preserve lang=en/sw. No published Solar source edited.

## Preservation and readiness

All images, four equipment records, CSS, animation components, native disclosures, route, shared forms, guards, schema and published services remain unchanged. No extra application cards or sections. Deeper engineering detail remains expandable.

The review includes a regression test comparing both pages’ metadata, reciprocal language links and enquiry intent. Local browser verification checks both languages, mobile wrapping, quotation editing, animation and no-JavaScript behavior. Exact final test results and revised source/archive identifiers are recorded in the output review report.

GO for one separately approved protected Preview after fresh environment/isolation preflight. No approval is inferred for a deployment, push, merge or Production release. The previous candidate/archive is superseded for future approval because this focused copy correction changes runtime source. Existing Preview transport-reset uncertainty and hosted functional acceptance requirements remain open; no reliability claim or infrastructure change is made by this editorial review.
