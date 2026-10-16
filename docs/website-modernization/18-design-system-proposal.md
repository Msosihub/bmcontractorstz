# Phase 1B design system proposal — review required
Prototype: phase-1b-design-proposal.html. No complete redesign has been applied to application code.

## Official identity
Six owner-supplied originals are preserved byte-for-byte in brand-originals/ with SHA-256 provenance in manifest.json. Two files named .jpeg were actually PNGs; copies use the detected format. Source 2 is a 1254×1254 PNG with alpha; source 1 is opaque. Sources 3–6 are JPEG wordmark variants; black backgrounds in these JPEGs are not transparency.

Use original shield 2 in compact header/favicon proposals and approved full wordmark in appropriate larger contexts. Preserve aspect ratio with object-fit:contain; never redraw the shield or invent a logo. Original files remain unchanged.

Working blue token #000DFC is sampled from the supplied opaque shield (dominant blue pixel 0,13,252). It is a source-derived proposal, not an assertion of a formal Pantone/brand standard. Confirm the preferred supplied variant or vector source before final design sign-off. Neutral ink #10192B, muted text #526175, surfaces #F3F6FA and white support readability rather than replacing the brand.

## Component rules
- Reuse Geist/system typography; headings 36–60px responsive, section headings 28–36px, body 16–18px; avoid tiny technical text.
- Maximum content width around 1200px; mobile padding 20px; consistent 8px spacing rhythm.
- Blue primary CTA, outlined secondary; minimum 44px target and visible keyboard focus.
- Restrained 8–16px corners; no decorative blur or mandatory animation.
- Cards show accurate name/model/category, useful specification summary and truthful request-price/availability state.
- Form controls have persistent labels, required indicators, preserved context and localized errors.
- Photos use consistent aspect ratios and rights/consent records.
- Header supports both visible languages; English default. Mobile menu is clear and accessible.
- Reduced motion respected; loading feedback must preserve ordinary link behavior.

## Asset delivery plan
Phase 1B: create size-appropriate optimized derivatives of the approved original, with original hashes retained; use lossless/transparency-preserving PNG/WebP where suitable. Favicon set should use the shield at 16/32/48/180px and be visually checked at actual sizes. No derivative/final favicon was installed in Phase 1A; this keeps the approval boundary intact.
