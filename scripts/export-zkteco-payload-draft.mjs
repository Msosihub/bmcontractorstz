/** Offline export only. No Payload endpoint, environment credential or database access. */
import { readFile, writeFile } from "node:fs/promises";
const products = JSON.parse(
  await readFile(
    new URL("../lib/catalogue/zkteco/products.json", import.meta.url),
    "utf8",
  ),
);
const records = products.map((r) => ({
  tenantSlug: "engineering",
  brandSlug: "zkteco",
  categorySlug: r.category,
  media: r.images.map((i) => ({
    localPath: "public" + i.src,
    alt: i.alt,
    publicUseApproved: false,
    rightsSource:
      "See MEDIA-MANIFEST.json; review before CMS media publication",
  })),
  locales: Object.fromEntries(
    ["en", "sw"].map((l) => [
      l,
      {
        name: r.name,
        slug: r.slug,
        model: r.name,
        brandLabel: r.brand,
        categoryKey: r.category,
        generation: r.classification === "existing" ? "legacy" : "current",
        availability: "unconfirmed",
        priceApproved: false,
        description: r.summary[l],
        variants: r.variants.map((model) => ({ model })),
        specifications: [
          ...r.specs.map((s) => ({ label: s.label[l], value: s.value[l] })),
          {
            label: l === "en" ? "Compatibility" : "Ulinganifu",
            value: r.compatibility[l],
          },
        ],
        brochures: r.documents.map((d) => ({ label: d.label[l], url: d.url })),
        reference: r,
        _status: "draft",
      },
    ]),
  ),
}));
const target = process.argv[2];
if (!target || !/\.json$/.test(target))
  throw Error("Pass an explicit local JSON output path");
await writeFile(
  target,
  JSON.stringify(
    {
      schema: "bm-payload-prototype-draft-import/v1",
      tenant: "engineering",
      automaticImport: false,
      automaticPublication: false,
      requiredSchemaReview: [
        "Extend categoryKey choices for terminal, controller, reader, smart-lock, hotel and entrance",
        "Replace CENTURION-only brochure/source validators with explicit reviewed manufacturer allowlists",
        "Resolve engineering tenant, brand, categories and approved media to real tenant-scoped relationship IDs",
        "Validate localized array identities, publication access and public image projection before importing",
      ],
      records,
      serviceDrafts: [
        {
          slug: "access-control",
          name: {
            en: "Access Control & Time Attendance",
            sw: "Udhibiti wa Milango na Mahudhurio",
          },
        },
        {
          slug: "time-attendance",
          name: {
            en: "Staff Time Attendance",
            sw: "Mahudhurio ya Wafanyakazi",
          },
        },
        {
          slug: "smart-locks",
          name: {
            en: "Smart Locks & Hotel Access",
            sw: "Makufuli Janja na Mifumo ya Hoteli",
          },
        },
      ].map((s) => ({
        ...s,
        tenantSlug: "engineering",
        _status: "draft",
        packages: [
          {
            name: { en: "Equipment only", sw: "Vifaa pekee" },
            scope: {
              en: "Confirm exact model, accessories, licence and current price.",
              sw: "Thibitisha modeli, vifaa vya ziada, leseni na bei ya sasa.",
            },
          },
          {
            name: { en: "Complete installation", sw: "Mfumo uliofungwa" },
            scope: {
              en: "Assessment, equipment, cabling, power, configuration and training; quote-specific.",
              sw: "Tathmini, vifaa, nyaya, umeme, usanidi na mafunzo; kwa nukuu husika.",
            },
          },
          {
            name: {
              en: "Existing-system support",
              sw: "Huduma ya mfumo uliopo",
            },
            scope: {
              en: "Model/firmware assessment before repair or supported upgrade quotation.",
              sw: "Tathmini modeli/firmware kabla ya nukuu ya matengenezo au uboreshaji unaoungwa mkono.",
            },
          },
        ],
      })),
    },
    null,
    2,
  ),
);
console.log(
  "Offline engineering-tenant draft bundle written. No CMS/database contacted.",
);
