import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { bundle } from "./helpers.mjs";

test("Hikvision references are unique, bilingual, locally imaged and quote-only", async () => {
  const { hikvisionCategories, hikvisionProducts } = await bundle(
    "lib/catalogue/hikvision/index.ts",
  );
  const cctv = JSON.parse(
    await readFile("data/cctv-equipment-references.json", "utf8"),
  );
  const prior = cctv.products.find((item) => item.brand === "Hikvision");
  const media = JSON.parse(
    await readFile("lib/catalogue/hikvision/media.json", "utf8"),
  );
  const slugs = new Set(hikvisionProducts.map(({ slug }) => slug));
  assert.equal(slugs.size, hikvisionProducts.length);
  const linked = hikvisionProducts.filter(({ name }) => name === prior.model);
  assert.equal(linked.length, 1);
  assert(linked[0].documents.some(({ url }) => url === prior.source));
  for (const item of hikvisionProducts) {
    assert(item.category in hikvisionCategories);
    assert.equal(item.price, null);
    assert.equal(item.classification, "current");
    assert(item.related.every((id) => slugs.has(id) && id !== item.slug));
    assert.match(new URL(item.source).hostname, /(^|\.)hikvision\.com$/);
    assert(
      item.summary.en &&
        item.summary.sw &&
        item.compatibility.en &&
        item.compatibility.sw,
    );
    if (item.category !== "software") {
      assert.equal(item.images.length, 1);
      assert.equal(media[item.slug].src, item.images[0].src);
      assert((await readFile("public" + item.images[0].src)).length > 1000);
    }
  }
});
