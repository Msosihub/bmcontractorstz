# Architecture and feature inventory
See 00 for baseline, scope and limits. Findings are source-confirmed unless marked otherwise.

App Router server pages query Prisma; Server Actions perform writes; client components provide navigation/loading/help popup. lib/prisma.ts constructs PrismaPg from DATABASE_URL. Static data lives in data/. Inspected public pages query the database before applying empty-result fallbacks; a database exception therefore prevents those fallbacks.

| Feature | Evidence | State |
|---|---|---|
| Services | app/services/*; components/site/ServiceDetailPage.tsx | Fixed routes; DB records and static fallback |
| Catalogue | app/products/page.tsx; app/products/[slug]/page.tsx | Listing/details/related products; listing capped at 50 without pagination |
| Administration | app/admin/(protected)/* | Create/update/publish products, services, packages, projects and support; enquiry status changes |
| Enquiries | app/contact/actions.ts; app/request-site-survey/actions.ts | Persistence and office SMS |
| Authentication | lib/auth/admin-auth.ts; app/admin/login/actions.ts | Allowlisted phones, hashed OTP/session, HTTP-only cookies |
| Appointments | app/appointments/page.tsx | Placeholder; model exists but booking is not implemented |
| Settings | app/admin/(protected)/settings/page.tsx | Static config display, not editing workflow |
| SEO | app/layout.tsx; app/sitemap.ts; app/robots.ts; components/seo/* | Metadata/sitemap/LocalBusiness/FAQ foundation |

Schema models: AdminUser, SiteSetting, Page, Service, ProductCategory, Product, CctvPackage, CctvPackageItem, Project, BrandPartner, SupportArticle, SiteSurveyRequest, AdminOtp, AdminSession, AppointmentRequest and ContactMessage. Slug uniqueness and category/package relations exist. No stock movements, balances, wholesale tiers or quote lines. AdminUser roles/passwords are not connected to the actual phone-session workflow.

## DATA-01 — P1
Evidence: schema defines AdminOtp/AdminSession; prisma/migrations/20260704193720_init/migration.sql does not create them.
Impact: schema is not reproducible from committed migrations.
Recommendation: compare actual migration history/schema using approved read-only access, then prepare a non-destructive migration on an isolated DB. Do not infer production lacks tables.
Dependencies: database owner, schema/history evidence and backup plan.
Risk: blind migration conflicts with manually created tables.
Acceptance: fresh preview setup supports authentication from committed migrations and preserves existing preview data.
Management: confirm environment and release owner.

Live headers identify Vercel. Neon is described in source comments but provider console and deployed commit remain unverified. README is boilerplate. No tracked env/test/CI files were returned by scoped inventory; external checks may exist. .gitignore excludes env/.vercel. next.config.ts mixes CommonJS and ESM exports; validate execution in isolated build before claiming a failure. Do not expose environment values.
