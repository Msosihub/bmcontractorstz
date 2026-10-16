# Technical/local SEO
## Source findings
- SEO-01/P1: root canonical and language alternates in app/layout.tsx target homepage. Inspected service/product metadata omit page-specific alternates. Define per-route canonical/alternates and verify rendered tags.
- SEO-02/P2: live apex redirects 308 to www; source metadataBase, sitemap and JSON-LD use apex. Choose intended deployed host and align references while retaining paths.
- SEO-03/P2: root html lang=en regardless of query-selected Swahili. Define document language and coherent indexing strategy without an unnecessary route migration.
- SEO-04/P2: static sitemap dates use new Date on every request. Use truthful change dates or omit unknown dates. Validate route publication/fallback policy.
- LOCAL-01/P2: data/site.ts city/address empty; LocalBusinessJsonLd puts Tanzania in locality. Confirm real Engineering addresses. Two separate businesses do not establish two Engineering branches.
- robots excludes /admin but root metadata is indexable. Add admin noindex later; robots is not access control.

Pending: rendered crawl, Search Console coverage/query exports, sitemap/robots body validation, structured data, social preview, screenshots and field metrics. No search demand/rankings are measured.

Generator page candidates: /services/generators, generator-installation, generator-maintenance, /products/generators. Create only distinct useful content with verified capability. Current flat catalogue has no category route; design that deliberately. Validate commercial demand for suppliers/diesel/maintenance/ATS/Moshi/Arusha terms before prioritizing.

Dependencies: canonical host decision, actual locations, evidence/access. Risk: wrong canonicals reduce indexing. Acceptance: per-route intended URL, reciprocal indexed language alternates, consistent redirect host, valid sitemap and intact security paths. Management approves coverage/claims.
