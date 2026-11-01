# Catalogue design — extend existing foundation
Confirmed Product supports id/slug/name/brand/category/description/nullable integer price/specifications/image/publication; listing/detail/admin CRUD exist. Seed prices are null, not verified selling prices.

Sequence:
1. Correct homepage mapping and type catalogue view models.
2. Add bounded search, filters and pagination.
3. After requirements review, add SKU/model/unit/subcategory, bilingual summaries/descriptions, datasheet, MOQ/pack quantity and availability/lead time.
4. Pricing modes: approved public retail, request price, wholesale RFQ, unavailable, on order. Define tax/currency. Keep cost/margin private.
5. Quantity enquiry then small quotation basket when follow-up is ready. No mandatory account, no stock deduction, server-rechecked data.
6. Wholesale tiers only from approved records; no full checkout initially.

Generators: manufacturer-verified brand/model, rated/standby kW/kVA, phases, voltage/frequency, fuel/start method, ATS compatibility, tank, consumption/noise, warranty, owned stock or sourcing availability and approved price/RFQ state. Never invent specs or compatibility.

Priority P2 after P1 repairs. Dependencies: authoritative product source, owners, units/currency and media rights. Risks: stale commercial claims/duplication. Acceptance: bounded search/pagination, truthful availability, request-price states, valid links and unpublished records hidden. Management approves products/prices; additive preview migrations first.
