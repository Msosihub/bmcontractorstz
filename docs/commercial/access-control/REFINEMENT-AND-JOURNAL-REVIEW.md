# Attendance refinement, curated equipment and BM journal

Reviewed locally: 4 November 2026. Branch: `codex/commercial-access-control-01`, based on `fd7407e7185c71c3ac286b39cc4c3b432fd143a6`. These changes remain local and uncommitted; existing draft PR #5 has not been updated or deployed.

## Customer-facing result

- Attendance headline uses bronze for the first phrase and deep green for the second. The unmodified ZKTeco logo identifies the referenced technology, with its original SVG green `#7ebb47` used sparingly on graphite and navigation borders. BM identity remains authoritative; no dealership relationship is implied.
- Removed the three requested visible captions in EN/SW. The report retains a concise fictional-data label and semantic table caption. Image provenance remains in MEDIA-MANIFEST.json.
- Expanded the independent reference catalogue from 29 to 40 models/families in 13 categories. No live Payload dependency, prices, stock, warranties, integrations or manufacturer partnerships were invented.
- `/blog` and three original EN/SW articles now provide brief explanations for Tanzanian businesses. Related guides appear on the access-control hub and attendance page; the footer links to the journal. Existing `/support` and its administration remain untouched.
- Article topics: choosing attendance equipment; planning a complete office door-access system; distinguishing handheld metal detection, vehicle mirrors and baggage X-ray. Articles link to service, catalogue, quotation and site-survey routes with language/context preserved.
- Self canonicals, reciprocal EN/SW alternates, article and breadcrumb structured data, social images and Production sitemap entries are provided. Preview still returns noindex and an empty sitemap. No Search Console or ranking claim is made.

## New equipment and verification limits

All entries show Request Current Price; BM availability and supplied revision require confirmation.

| Reference | Category | Primary/reference source and important check |
| --- | --- | --- |
| LL-03 | Door accessories | https://zkteco.technology/en/product/ll-03-2/ — regional headline and table disagree on current, sensor and RFID. Source reuses an LL Series photograph named ll-02.jpg; the image is explicitly identified as family photography. Confirm exact supplied LL-03 datasheet/photo before treating it as an exact SKU. |
| FHT2400 / FHT2411 / FHT2422 | Full-height turnstiles | https://www.zkteco.com/en/FHTSeries/FHT2400 — distinguish base/RFID/fingerprint variants. Regional throughput/lifecycle figures differ; no universal lifecycle/throughput promise made. Plan accessible alternate entrance and emergency egress. |
| UHF5 Pro | Vehicle access | https://www.zkteco.com/en/UHF5ProUHF10Pro/UHF5-UHF10 — 2–8m handheld test, around 4m scenario example, not guaranteed range. Confirm frequency, tag and interface. |
| UHF10 Pro | Vehicle access | Same manufacturer family source — 10–20m handheld test, around 8m scenario example, not guaranteed range. Shared family photograph accurately labelled. |
| ZK8500R | Fingerprint enrolment | https://zkteco.technology/en/product/reader/ — USB enrolment/card issuance peripheral, not standalone attendance. Software/driver/card compatibility must be confirmed. |
| FR1500S | Outdoor fingerprint reader | https://zkteco.technology/en/product/fr1500s/ — regional Silk ID generation reference. Current global Z-ID revision differs: https://www.zkteco.com/en/BiometricReader/FR1500S . Do not mix protocols, power or sensor specifications. |
| ZKB201 | Barcode/QR scanning | https://www.zkteco.com/en/comparison?pid=271 — wired USB 1D/2D scanner. No POS/ERP integration assumed. |
| ZK-M3 | Security screening | https://zkteco.technology/en/product/zk-m3/ — manual under-vehicle mirror, not automatic threat detection. |
| ZKX6040 | Security screening | https://zkteco.technology/en/product/zkx6040/ — baggage X-ray, 600 × 400mm tunnel. Availability, specialist delivery/support and applicable approvals require assessment; no BM radiation licence/certification claimed. |
| ProBG3100 | Vehicle barriers | https://zkteco.technology/en/product/probg3100/ — folding boom. Confirm dimensions, sensors, controller, vehicle detection and site clearance. |
| ZK-D180 | Security screening | https://zkteco.technology/en/product/zk-d180/ and owner-linked demonstration https://zkteco.technology/en/video/zkteco-zk-d180/ — handheld metal detector. Not a magnetic-stripe card reader or detector for every prohibited item. |

“Magnetic scanner” has not been silently turned into a separate invented product. The verified handheld metal-detector category is included; a magnetic-stripe reader would require a separate exact-model request.

Original manufacturer files, optimized WebP derivatives, URLs, hashes, family/revision caveats and logo provenance are recorded in MEDIA-MANIFEST.json. Existing owner-reported supplier permission is documented; independent written manufacturer/dealer confirmation is still not held locally.

## Blog ownership and future services

The owner's reference blog was used for format inspiration and product research, not copied articles, translated manufacturer posts, customer cases or testimonials. Three short original guides are maintained in `data/blog.json`, exposed through a published-only selector in `lib/blog.ts`. This is reviewed static editorial content, not a new CMS/admin, upload system or database schema. It is suitable for later migration to the separately controlled Payload publication milestone.

The related-guide component accepts a service key for upcoming service milestones. Add a useful guide when improving that service; do not automatically generate thin articles for every route. Existing CCTV, fencing and gate page bodies were not changed in this task.

Existing office/workplace imagery is reused with provenance identifying fictional illustrative scenes; actual equipment images are locally optimized manufacturer references. No staff identities, projects or customer evidence invented.

## Verification and evidence

Evidence directory: `outputs/access-control-refinement-20261103/` at the workspace root.

- Complete restricted synthetic-database production-mode build passed; final build passed compilation, TypeScript, prerender and trace generation. No migration or seed.
- Scoped ESLint passed for access-control, catalogue, blog and sitemap code; final blog lint also passed.
- Automated suite: 231 passed. Final focused tests: 10 passed, including catalogue distinctions, bilingual content, published-only journal selection, Preview noindex and Production sitemap inclusion for both article languages.
- All 40 model pages checked in EN/SW (80 read-only route checks). Existing CCTV, electric fencing, CENTURION and product routes also returned 200. Product structured data does not invent Offer/price/availability values.
- Attendance: EN/SW at 1440 × 1000 and 390 × 844, with zero WCAG A/AA scan violations in default and expanded-detail states. Verified distinct headline colours, logo, requested caption removal, contextual links, keyboard disclosure controls and manual reduced-motion interaction. Images loaded and no horizontal overflow.
- Journal index, all three articles and catalogue: EN/SW desktop/mobile checks, zero WCAG A/AA scan violations, valid canonicals/alternates, article JSON-LD, loaded images and no overflow. New category filters and ZK-D180 search verified.
- No new dependencies, external scripts or live provider requests. Browser checks restricted network access to localhost; server uses provider-denial preload and notification-disabled isolated settings.
- No contact writes, admin OTPs or provider delivery tests performed in this task. Existing secure form handlers unchanged; contextual links and prefilled parameters checked, not a claim of renewed live-delivery verification.

### Remaining limitations

The extra JavaScript-disabled initial-load/disclosure check did **not** pass; do not infer no-JavaScript usability from server-rendered markup or element counts. A focused JavaScript-disabled request returned HTTP 200 with the translated heading and three disclosure summaries in the HTML, but the main content remained in a hidden Next.js streaming container while only “LOADING BM CONTRACTORS” was visible. Independently, intermittent restricted Preview `Service.findUnique()` ETIMEDOUT errors were recorded during supplementary checks. These are separate from the successful normal-browser EN/SW acceptance; root cause and reliable JavaScript-disabled navigation remain unresolved. No database settings, connection limits or safeguards were changed to hide the failures.

Local timings are unthrottled Chrome lab observations, not Lighthouse/field Core Web Vitals scores. A clean production-mode local build is not a GitHub CI or hosted acceptance claim. Production and current protected hosted Previews remain unchanged. No push, merge, deployment, provider activation, credential/configuration change or Payload publication occurred.
