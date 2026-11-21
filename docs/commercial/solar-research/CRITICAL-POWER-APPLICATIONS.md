# Solar Engineering: critical-power application refinement

Scope: one server-rendered section on the existing Solar page. The seven existing journeys, six equipment references, original images, energy-flow animation, publication guard, journal and stable URL remain. No other service page, application backend, database field, credentials, deployment setting or dependency changes.

## Customer journeys

- Security backup: complete camera/recording/network/access chain, short-outage UPS versus extended battery, night loads and DC/PoE versus AC selection. Links to CCTV and Power Backup.
- Off-grid surveillance: standalone solar cameras distinguished from complete multi-camera networks. 16/32 are example camera counts, never preset system sizes. PV/controller/battery/protected distribution/recording/network/4G, 24-hour demand, low-sun periods, retention, PTZ/IR and autonomy are assessed.
- Critical ICT: small offices through server rooms and industrial critical loads; line-interactive versus online double-conversion, compatible extended batteries, generator support and suitable transfer architecture. No unconditional zero-interruption claim.
- Distributed power: three-phase hybrid/BESS, protected site distribution and optional step-up/step-down transformer pair. A native HTML/SVG directional schematic remains available without JavaScript or motion. Direct distribution at inverter-output voltage remains an alternative. Transformers do not increase energy. Medical no-break loads need their own UPS design.

Eight contextual actions use the existing contact/survey fields only. Each asks for location, grid availability, loads, duration, existing equipment and supply versus installation; only relevant extra questions are included. No instant sizing, prices, stock, new customer records or BM project claims.

## Technical evidence

- Axis, [Typical and maximum power consumption](https://whitepapers.axis.com/en-us/typical-and-maximum-power-consumption-in-axis-cameras): model, operation and night/IR conditions affect the power budget. Used as engineering guidance, not as a new BM equipment listing.
- Eaton, [Types of UPS systems](https://www.eaton.com/us/en-us/products/backup-power-ups-surge-it-power-distribution/backup-power-ups/types-of-ups-systems.html): topology distinctions. Final mode, transfer, bypass and load architecture still need project selection.
- EIA, [Batteries, circuits and transformers](https://www.eia.gov/energyexplained/electricity/batteries-circuits-and-transformers.php): voltage transformation and distribution principles. No universal distribution voltage or design specification is published.

## Media and rights

All four images are illustrative applications, not completed BM projects, customer sites or named personnel. No manufacturer product identity, certification or installation-performance evidence is inferred from generated scenes.

- Security: existing `public/images/luxury-concepts/cctv-960.webp`; approved generated architectural security scene. Original and generation provenance retained in the existing luxury-concepts collection.
- ICT: existing `public/images/home/network-practical.webp`; approved generated network scene; original provenance in `HOMEPAGE-REFINEMENT-ASSETS.json`.
- Distribution: existing `public/images/electrical-contracting/substation.webp`; generated industrial distribution scene; original provenance in `ELECTRICAL-ASSETS.json`.
- Off-grid CCTV: new built-in image_gen output, no external API/CLI. Original preserved at `docs/commercial/solar-originals/off-grid-cctv.png`; optimized 960px WebP at `public/images/solar-engineering/off-grid-cctv.webp`. No existing asset overwritten. Site-specific shading, mounting, protection, equipment ratings and energy sizing must be assessed independently; the image is not a construction drawing.

### Final image-generation prompt

Use case: photorealistic-natural. Asset type: landscape 3:2 editorial website application image for solar-powered remote surveillance in Tanzania. A professionally installed unbranded CCTV bullet camera on a sturdy short galvanized pole beside the entrance track of a spacious East African farm estate, a modest separate rack of two solar photovoltaic panels lower on the same secure fenced service area, a closed weatherproof battery and power cabinet at ground level, neat enclosed cable conduits, distant cultivated fields and acacia trees. Show a practical complete remote surveillance power setting, not a sales product shot and not a wiring tutorial. Warm natural afternoon light, premium understated architectural photography, muted olive, warm ivory and graphite tones, credible device scale and mechanically plausible installation, no exposed electrical connections. Wide framing suitable for desktop and portrait center crop with camera and solar panels retained. No labels, diagrams, logos, watermarks, brand markings, people or text. Fictional illustrative application, never imply a completed BM project or an actual client.

## Verification and boundaries

The updated local acceptance evidence and exact final source/archive identifiers are in the separate `outputs/solar-critical-applications-20261121` release report. The prior f44ac6b9c456 source/archive remains preserved but is superseded as the proposed Solar candidate. No push, merge or deployment is authorized by this refinement. Hosted Preview needs fresh isolation verification and separate owner approval. Existing intermittent database transport risk remains open; no blind write retries or safeguard changes are introduced.
