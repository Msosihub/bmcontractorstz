# BM Contractors — luxury homepage review

17 October 2026. Homepage only. Owner creative brief supersedes the previous blue-dominant visual proposal; original logo colour and proportions remain protected. Phase 1A release restrictions remain in force.

## Recommended palette

| Token | Hex | Purpose |
|---|---|---|
| Paper | #FFFEFA | Warm, quiet page surface; avoids harsh white |
| Ivory | #F5F2EB | Alternating editorial sections and primary light buttons |
| Graphite | #242B29 | Main text, structural dark sections and enquiry buttons |
| Architectural green | #303D36 | Power section and a complementary technical tone |
| Bronze | #AA8C60 | Restrained accents, selected details and visual warmth |
| Muted text | #656C66 | Supporting copy on light surfaces |
| Rules | #D9D9CF | Fine dividers and restrained technical organization |

The original blue shield remains unchanged. Warm neutrals and graphite give it a deliberate identity accent instead of recolouring it. Body text uses higher-contrast graphite/muted green; bronze is decorative rather than the default small-text colour.

## Typography and spacing

- Display: Georgia with Times New Roman/serif fallback, regular weight, restrained italic emphasis. System families only; no font files are redistributed or fetched from a third party.
- Interface/body: Arial, Helvetica, sans-serif. Technical labels use restrained letter spacing; readable sentence case in supporting content.
- Desktop hero display: fluid 58–86px; mobile 58px. Section headings: 39px mobile, up to 57px desktop. Hero and headings use 1.08–1.13 line height, body approximately 1.65–1.8.
- Content gutters: 7% desktop, 6% mobile. Section spacing: approximately 105px desktop, 64px mobile. Dividers: 1px. Corners predominantly square. Buttons approximately 49px high; mobile primary actions at least 44px high.
- No animation is required to understand the page. Reduced-motion preferences disable smooth scrolling and transitions.

## Homepage composition

One architectural hero with a controlled contrast overlay, editorial serif headline and a single expertise CTA. Security services lead the interactive service list: CCTV, electric fencing and gates. It includes electrical, solar, generators, networking, business telephones/IP-PBX and procurement without inventing credentials.

Alternating engineering, power, equipment-category, process and contact sections create a deliberate rhythm. The equipment treatment presents categories, not fictitious models, prices, stock or brand associations. Retail and wholesale buttons preselect their enquiry context.

This replaces v2's wireframe photo boxes with nine coordinated generated assets, a full photographic composition, carefully controlled typography and asymmetric section layouts. It establishes a homepage design language before any other page is redesigned.

## Generated asset brief and rights record

Nine assets: flagship building, CCTV detail, electric fence/gate, enclosed electrical distribution, solar/inverter/battery, outdoor standby generator, structured networking cabinet, business IP telephone and a generic engineering atrium.

Common direction: photorealistic architectural editorial photography, pale limestone, charcoal metal, muted tropical planting and warm natural light. No people, employee identities, client marks, text, competitor photographs, watermarks or specific product models. Installations are conceptual; images are not engineering specifications or verified project evidence.

Tool: built-in image_gen, not the API/CLI fallback. Complete per-asset prompts, source paths, selection status, derivative sizes and usage restrictions are recorded in public/images/luxury-concepts/asset-manifest.json. Original generated PNGs are retained in originals/. WebP variants at 640, 960, 1440 and 1920 target widths are saved beside the originals; no upscaling occurs above source resolution. The review app has its own local copies. Next Image delivers responsive optimized AVIF/WebP and lazy-loads below-fold images; only the hero is preloaded.

Generated assets were commissioned in this conversation and selected for review. Owner publication approval is pending. Applicable [OpenAI Terms of Use](https://openai.com/policies/row-terms-of-use/) govern output rights; as between the user and OpenAI, output ownership is assigned to the user to the extent permitted by law. Output may not be unique. This is not a guarantee of exclusivity or a substitute for review of recognizable third-party rights. No stock licence or manufacturer-image permission is claimed.

Every image carries a conceptual AI label, with a fuller footer disclosure. There is no project gallery, fabricated testimonial, case-study location, employee or client badge. The owner explicitly authorized concept imagery; it remains separate from real BM evidence.

## Isolated implementation

Source: design-preview/luxury-homepage. Next.js 16.2.10, React, TypeScript and Tailwind 4, reusing installed repository dependencies; no new production dependency. The review app starts with a sanitized environment, no database URL, no messaging credentials and no API routes. It is noindex and its robots route disallows crawling. EN is default, SW is server-rendered via ?lang=sw with correct HTML language.

Navigation anchors, service choices, language links, native accessible enquiry dialog, retail/wholesale context and mobile menu are functional. The dialog clearly states it only prepares a preview enquiry: no messages are sent and no customer data is saved. Phone/mail links use existing approved public contacts; testing does not activate external calling or email.

Production TypeScript excludes design-preview; generated nested build files are excluded from lint/Git. Production routes, security URLs, backend actions and customer data were not changed for this design. Existing Phase 1A local work is retained separately.

## Still requiring confirmation before public implementation

1. Genuine consented BM project photographs, completion details and customer approvals for case studies.
2. Actual product records and manufacturer images with legitimate reuse permission for exact models. The homepage currently uses category illustrations, so no specific-product manufacturer image has been copied or fabricated.
3. Direct/partner/sourcing delivery scope, qualifications, servicing and warranty wording for electrical, generator, IP-PBX and procurement work.
4. Company address, approved company profile, technical credentials, service coverage and any future client/testimonial material.
5. Owner review of both language versions and the chosen visual direction. No public rollout is authorized by this review.

Run from the review directory using the existing ../../node_modules/.bin/next build --webpack and next start --hostname 127.0.0.1 --port 3004. Do not use --prod, connect a production database or copy .env files into this app.


## Approved direction and homepage refinement — 17 October 2026
Owner approved architectural imagery, warm ivory, graphite, restrained bronze, refined typography and the preserved official blue BM logo. This is the continuing design standard; do not revert to the bright-blue concept. Extending to other pages awaits approval of this refined homepage.

The hero now explicitly names CCTV installation, electric fencing, gate automation and electrical contracting. Those service names are also clear in the existing accordion. The primary hero action opens the local enquiry dialog; the quieter secondary link explores services. No sections, badges or animations were added.

Kiswahili marketing copy was revised throughout, including “Usalama. Umeme. Kwa uhakika.”, “Tuzungumzie mradi wako” and “Jiandae kwa umeme unapokatika.” Product terms such as CCTV, IP-PBX and UPS remain accurate. Owner review of final wording remains part of homepage approval.

Mobile type scales from 43–53px in English and 42–51px in Kiswahili. The hero enquiry remains visible above the fixed mobile contact bar. A narrow Kiswahili header overflow was identified and corrected. EN/SW browser checks covered 320, 390, 768 and 1440px; final SW 320px document width equals viewport width. The hero enquiry opens the localized preview-only dialog and its close button works. Browser console warnings/errors: none captured. Build, TypeScript and targeted ESLint passed.

Imagery and original logo assets are unchanged. AI imagery remains explicitly identified as illustrative. No production deployment, database writes or notifications; Phase 1A release restrictions remain active.
