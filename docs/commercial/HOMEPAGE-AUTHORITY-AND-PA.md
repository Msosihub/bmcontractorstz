# Homepage, business authority and PA review — 20 November 2026

The approved architectural design remains on the existing PR #7 branch. The seven service chapters, manufacturer belts, official BM logo and existing specialist routes are retained. The service selector uses coloured icon tiles and a swipe rail on mobile. The owner-requested removal of the visible pause checkbox is retained, with hover/focus, reduced-motion and offscreen behavior preserved.

The homepage now offers equipment purchase, trade/reseller supply, complete installation and site-survey journeys. The shared footer is shorter, with secondary links available in native expandable lists. Phone, address and enquiry data remain centralized in `data/site.ts`.

Moshi and Mianzini, Arusha are presented as two actual offices with separate phone numbers and equal visual treatment. Organization structured data references two LocalBusiness locations. Dar es Salaam and Dodoma appear as scheduled field-service coverage, never as physical offices. Tanga is included in northern supply/service coverage. No coordinates, hours, premises or business profiles were invented.

Exact Hikvision and Tiandy dealer/distributor designations remain pending examination of the actual certificates. No certificates were supplied with the instruction or found in the project/attachments inventory. The owner has been asked for their paths. The public text accurately describes equipment supply, retail, trade and installation without inventing certificate issuer, validity or territory. Hikvision catalogue and the CCTV brand introduction use that supply wording.

The stable `/services/pa-sound-systems` offering covers schools, meetings, hotels, worship and paging. Six official Ahuja reference photographs are local and optimized. Specifications and model variants were checked against the manufacturer pages. In particular, SCM-15 and SCM-15T have different connection types, and the UHC XT family is the 100 V version. Paging console operation is tied to the specific APM-202CU controller. Prices and stock remain enquiry-only. The existing service directory, publication checks, metadata, bilingual sitemap source and journal are used, with no new catalogue backend or schema. A short original PA planning guide follows the repository journal standard.

## Search discovery and external verification

Public robots requests returned HTTP 200 for ordinary, Googlebot, Bingbot and OAI-SearchBot user agents. The live wildcard rules allow public crawling and exclude `/admin`. That already allows search discovery, so no crawler-policy change was necessary. Preview continues to disallow all crawling, use noindex and expose an empty sitemap. A live robots response is evidence of crawl configuration, not evidence of indexing or AI recommendations.

- [Google LocalBusiness guidance](https://developers.google.com/search/docs/appearance/structured-data/local-business) supports separate business-location entities. Only confirmed address fields are used.
- [Official OpenAI crawler documentation](https://developers.openai.com/api/docs/bots) distinguishes OAI-SearchBot for ChatGPT Search from training crawlers. No training-policy change is part of this task.
- [Bing IndexNow](https://www.bing.com/indexnow) can notify participating search engines after publication. It is not appropriate for the protected Preview and has not been activated.

No Google or Bing verification meta tags were visible on the live homepage. DNS verification or existing property ownership cannot be inferred from that absence. No search account, listing or external profile was changed.

After the final production release, the owner should open the existing Search Console property for `bmcontractorstz.com`, confirm canonical host `https://www.bmcontractorstz.com/`, submit `https://www.bmcontractorstz.com/sitemap.xml` and inspect the homepage, PA route and key security routes in both languages. In Bing Webmaster Tools, confirm/import the same verified site and submit that sitemap. Record indexing issues, excluded routes and mobile field performance. A separately approved IndexNow setup would publish an owner-controlled key file on the canonical host, verify it and notify only actual published canonical URLs. Do not submit the Preview.

Official social URLs are still blank in the confirmed site configuration. Await owner-confirmed Facebook and other profile URLs before adding sameAs or linking profiles. For verified Facebook business information, use the legal BM company name, website, national sales number and email; list the Moshi and Arusha addresses as actual offices and Dar/Dodoma as service coverage. For the existing WhatsApp Business number +255 745 778 821, align the website and equipment/supply/installation description; retain +255 760 111 880 as national coordination. Do not add WhatsApp destinations for unconfirmed numbers, change the account number or invent opening hours.

## Release boundary

All work is local until the verified existing feature branch is updated. PR #7 must remain draft. Fresh Vercel/GitHub checks must show disabled Preview tracking, disabled automatic domain assignment, retained Authentication, separate synthetic Preview settings, no deployment hooks and authorized Msosihub write identity before that update. One corrected protected Preview requires separate explicit approval for the new exact archive. No merge, Production deployment, credential change, schema operation, Payload activation or messaging test is authorized.
