import test from "node:test";
import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import { responsiveLocalScene } from "../lib/local-image-policy.mjs";
const json = async (name) =>
  JSON.parse(
    await readFile(
      new URL("../lib/catalogue/networking/" + name + ".json", import.meta.url),
    ),
  );
const families = await json("families"),
  apps = await json("applications"),
  products = await json("products");
test("material families are crawlable bilingual specification guides, never invented stock records", async () => {
  assert.equal(families.length, 4);
  assert.equal(new Set(families.map((f) => f.slug)).size, 4);
  for (const f of families) {
    assert(!("price" in f));
    assert(!("sku" in f));
    assert(!("stock" in f));
    for (const lang of ["en", "sw"]) {
      assert(f.title[lang]);
      assert(f.intro[lang].length > 60);
      assert(f.check[lang].length > 70);
      assert.equal(f.faq.length, 2);
      assert.equal(f.points.length, 4);
      for (const p of f.points) assert(p[lang].length > 80);
    }
    for (const slug of f.related) assert(families.some((x) => x.slug === slug));
    for (const slug of f.models) assert(products.some((x) => x.slug === slug));
    const image = responsiveLocalScene(
      "/images/networking/" + f.image + ".webp",
    );
    assert(image);
    for (const c of image.srcSet.split(", "))
      assert(
        (await stat(new URL("../public" + c.split(" ")[0], import.meta.url)))
          .size > 1000,
      );
  }
});
test("cabinet and fibre guidance preserves selection boundaries instead of false universal compatibility", () => {
  const c = families.find((f) => f.slug === "data-cabinets");
  for (const n of [4, 6, 9, 12, 15, 18, 22, 27, 32, 37, 42])
    assert(c.options.en.includes(n + "U"));
  const fibre = families.find((f) => f.slug === "fibre-accessories");
  assert(
    fibre.points.some((p) => p.en.includes("Do not directly mate UPC to APC")),
  );
  assert(fibre.options.en.includes("LC–SC"));
  assert(fibre.points.some((p) => p.en.includes("ADP")));
  assert(
    families
      .find((f) => f.slug === "cat6-cabling")
      .points.some((p) => p.en.includes("Colour alone does not prove")),
  );
});
test("application discovery links only authoritative reviewed models with important role limits", () => {
  assert.equal(apps.length, 7);
  assert.equal(products.length, 6);
  for (const a of apps) {
    for (const lang of ["en", "sw"]) assert(a.summary[lang].length > 100);
    assert(a.models.length >= 2);
    for (const slug of a.models) assert(products.some((p) => p.slug === slug));
  }
  assert(
    apps
      .find((a) => a.slug === "managed-wireless")
      .summary.en.includes("does not manage MikroTik RouterOS"),
  );
  assert(
    apps
      .find((a) => a.slug === "cctv-backbone")
      .summary.en.includes("does not power cameras"),
  );
  assert(
    apps
      .find((a) => a.slug === "multi-building")
      .summary.en.includes("not assumed"),
  );
});

test("family sitemap alternates follow publication and preview rules; crawler allowance excludes admin", async () => {
  const { bundle } = await import("./helpers.mjs");
  let withdrawn = false;
  globalThis.__nfSitemap = {
    product: { findMany: async () => [] },
    cctvPackage: { findMany: async () => [] },
    supportArticle: { findMany: async () => [] },
    service: {
      findMany: async () =>
        withdrawn ? [{ slug: "networking", isPublished: false }] : [],
    },
  };
  const mocks = {
    "@/lib/prisma": "export const prisma=globalThis.__nfSitemap",
    "@/lib/catalogue/provider":
      "export async function centurionProducts(){return []}",
  };
  const { default: sitemap } = await bundle("app/sitemap.ts", {
    ...mocks,
    "@/lib/preview-safety.mjs": "export const isPreview=()=>false",
  });
  const map = await sitemap();
  for (const f of families)
    for (const suffix of ["", "?lang=sw"]) {
      const entry = map.find((x) =>
        x.url.endsWith("/catalogue/networking/families/" + f.slug + suffix),
      );
      assert(entry);
      assert(entry.alternates.languages.en);
      assert(entry.alternates.languages.sw);
    }
  withdrawn = true;
  assert(
    !(await sitemap()).some((x) => x.url.includes("/catalogue/networking")),
  );
  const preview = await bundle("app/sitemap.ts", {
    ...mocks,
    "@/lib/preview-safety.mjs": "export const isPreview=()=>true",
  });
  assert.deepEqual(await preview.default(), []);
  const productionRobots = await bundle("app/robots.ts", {
      "@/lib/preview-safety.mjs": "export const isPreview=()=>false",
    }),
    robots = productionRobots.default();
  assert.equal(robots.rules.userAgent, "*");
  assert.equal(robots.rules.allow, "/");
  assert(robots.rules.disallow.includes("/admin"));
  delete globalThis.__nfSitemap;
});
