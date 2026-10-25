# BM luxury homepage review

Homepage only, with English and Kiswahili. Original BM logo preserved. All photographic imagery is generated and visibly labelled conceptual. No real projects or exact product models are represented.

Uses the existing repository's dependencies through the local node_modules symlink. From this directory:

```sh
../../node_modules/.bin/next build --webpack
../../node_modules/.bin/next start --hostname 127.0.0.1 --port 3004
```

Review English at http://127.0.0.1:3004/ and Kiswahili at http://127.0.0.1:3004/?lang=sw.

Do not copy production environment files here. This app has no database, enquiry API, SMS or notification integration. The enquiry dialog only prepares a preview on screen. Robots and metadata prevent indexing. Do not deploy production.

Assets are in public/assets. Canonical generated PNGs, web variants and prompts/rights/hashes are in the parent repository's public/images/luxury-concepts. See docs/website-modernization/27-luxury-homepage-direction.md for palette, design tokens and approval dependencies.
