# Electrical equipment guide — focused addition

20 November 2026. Local continuation of the electrical-contracting branch; no Production changes.

Adopts customer-journey ideas from Neutron's public service/catalogue structure, without copying its copy, images, product records, prices or credentials. Adds six equipment families to the existing stable electrical route: panels/distribution; switchgear/breakers; motor controls; transformers/substation equipment; cables/termination accessories; earthing/surge protection.

Each family has an original bilingual description, expandable selection brief, a related technical service anchor and two quotation actions: equipment only / supply and installation. Both carry the exact family and intent into the existing editable contact brief. No new endpoints, schema, integrations, product records, stock, prices, model compatibility claims or brand authorization.

Three-column desktop/two-column tablet arrangement; native horizontal browsing on mobile with visible guidance, keyboard-focusable region and no carousel JavaScript. Existing technical animation and reduced-motion behaviour retained. Images are locally optimized and lazy-loaded. Specific verified models, supplier-approved prices and manufacturer brochures can be added later when actual approved BM equipment records exist; no empty product pages have been created.

Four new original unbranded equipment-family images use built-in image generation, with source PNGs retained and optimized WebP derivatives. Existing panel/substation editorial images are reused. These visuals are not manufacturer photographs or evidence of BM inventory or projects. Exact prompts, rights/provenance, source files and output hashes are in `docs/commercial/ELECTRICAL-EQUIPMENT-ASSETS.json`.

Technical selection background (original copy; no manufacturer images or marks reused):
- Schneider Electric motor-protection selection: https://productinfo.se.com/nadigest/5c51d645347bdf0001f1f280/Master/17707_MAIN%20%28bookmap%29_0000054602.xml/%24/MotorCircuitProtectionSelection-F263AAFD
- Altivar installation-manual reference (not a BM model listing): https://download.se.com/files?filename=User+guide&p_Doc_Ref=NVE41289
- Power-factor correction selection: https://productinfo.se.com/nadigest/5c51d645347bdf0001f1f280/Master/17704_MAIN%20%28bookmap%29_0000041932.xml/%24/LowVoltageStandardAutomaticCapacitorBanksCPT_0000085054

Selection remains project-specific. No breaker/cable/transformer sizing formula, installation recipe, licence scope extension or universal interoperability promise is given.

Previous candidate `3289ad14a151939d8f47d6754b19748c0b4b5d83` and its archive remain intact as the earlier review baseline. They do not include this addition. Any future protected Preview requires a newly frozen source/archive and separate approval; the earlier candidate must not be silently substituted.

## Verification completed

- Guarded production-mode build including TypeScript: PASS, restricted synthetic identity verified, live providers denied.
- Focused ESLint: PASS. Automated suite: 243/243 PASS.
- Real Chrome: EN/SW at 320/390/820/1440 px, six families and twelve actions per language, no document overflow, broken images or page errors; zero automated WCAG A/AA findings in tested states.
- Mobile keyboard arrows scroll the native equipment list. Enter opens/closes each tested native disclosure. Reduced-motion state tested throughout the matrix; no new client-side carousel/animation code.
- Real JavaScript-disabled Chrome: all 24 family × purchase-intent × language quotation paths preserve exact subject and editable brief. No form submitted and no provider request made. The runner's first scroll-into-view action timed out; replacing that test action with native focus navigation completed all checks without changing application code.
- Four optimized new images total 125,108 bytes. Existing hero, seven chapters, SEO/EN-SW alternates and related services are retained. No changes to auth, database guards, forms/actions, schema, homepage, other services or environment settings.

This addition is committed locally for review; it has not been pushed, merged or deployed. Draft PR #8 and the previously packaged source still represent the earlier electrical candidate until a separately reviewed update. Exact local source/archive identifiers are recorded in the accompanying workspace release manifest and review report.
