import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { bundle } from "./helpers.mjs";
const products = JSON.parse(
  await readFile("lib/catalogue/zkteco/products.json", "utf8"),
);
test("screening, vehicle and data-capture references remain distinct rather than implying attendance compatibility", () => {
  for (const [slug, category] of Object.entries({
    "zk-d180": "inspection",
    "zk-m3": "inspection",
    zkx6040: "inspection",
    "uhf5-pro": "vehicle",
    probg3100: "vehicle",
    zk8500r: "enrolment",
    zkb201: "barcode",
    "ll-03": "accessory",
    fht2400: "entrance",
    fr1500s: "reader",
  }))
    assert.equal(products.find((p) => p.slug === slug)?.category, category);
  assert.match(
    products.find((p) => p.slug === "zk-d180").compatibility.en,
    /not a detector for all/,
  );
  assert.match(
    products.find((p) => p.slug === "zk-m3").compatibility.en,
    /manual visual aid/,
  );
  assert.match(
    products.find((p) => p.slug === "zkx6040").compatibility.en,
    /approvals/,
  );
  assert.match(
    products.find((p) => p.slug === "zk8500r").compatibility.en,
    /not a standalone attendance/,
  );
  assert.match(
    products.find((p) => p.slug === "ll-03").compatibility.en,
    /parameter table disagree/,
  );
  assert.match(
    products.find((p) => p.slug === "fr1500s").compatibility.en,
    /Newer FR1500S revisions/,
  );
});
test("journal exposes reviewed published articles only, with bilingual copy, local media and contextual service links", async () => {
  const { blogArticles, getBlogArticle } = await bundle("lib/blog.ts");
  assert.equal(getBlogArticle("not-a-real-article"), undefined);
  assert(blogArticles.length >= 3);
  for (const a of blogArticles) {
    assert.equal(a.published, true);
    assert.equal(getBlogArticle(a.slug).slug, a.slug);
    for (const lang of ["en", "sw"]) {
      assert(a.title[lang] && a.summary[lang] && a.alt[lang] && a.cta[lang]);
      assert(a.sections.every((s) => s.title[lang] && s.text[lang]));
    }
    assert((await readFile("public" + a.image)).length > 1000);
    assert(["access-control", "hikvision"].includes(a.service));
    assert(!/localhost|api\/media/.test(JSON.stringify(a)));
  }
});
test("new article metadata preserves self canonical, reciprocal languages and Preview noindex", async () => {
  const mocks = {
    "./preview-safety.mjs": "export const isPreview=()=>true;",
  };
  const { pageMetadata } = await bundle("lib/seo.ts", mocks);
  for (const lang of ["en", "sw"]) {
    const m = pageMetadata(
      "/blog/staff-attendance-for-tanzanian-businesses",
      lang,
      ["Staff attendance", "Practical guide"],
    );
    assert.equal(m.robots.index, false);
    assert.equal(
      m.alternates.canonical,
      "https://www.bmcontractorstz.com/blog/staff-attendance-for-tanzanian-businesses" +
        (lang === "sw" ? "?lang=sw" : ""),
    );
    assert(m.alternates.languages.en && m.alternates.languages.sw);
  }
});
