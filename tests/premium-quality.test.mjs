import { test } from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import { bundle } from "./helpers.mjs";
const shell = {
  "@/components/site/Header": "export function Header(){return null}",
  "@/components/site/Footer": "export function Footer(){return null}",
  "next/image":
    "import React from 'react';export default function Image({fill,preload,...p}){return React.createElement('img',p)}",
  "next/navigation": "export function notFound(){throw Error('NOT_FOUND')}",
};
let support = [],
  packages = [],
  record = null,
  queries = [];
globalThis.__bmTest = {
  prisma: {
    supportArticle: {
      findMany: async () => support,
      findFirst: async () => record,
    },
    cctvPackage: { findMany: async () => packages },
    productCategory: { findMany: async () => [] },
    product: {
      findMany: async (q) => {
        queries.push(q);
        return Array.from({ length: 51 }, (_, i) => ({
          id: String(i),
          slug: "fixture-" + i,
          name: "Synthetic " + i,
          price: null,
        }));
      },
    },
  },
};
const service = await bundle("components/premium/Service.tsx", shell);
test("bilingual service rendering exposes assessment, maintenance and usable FAQ controls", () => {
  for (const slug of [
    "cctv",
    "electric-fence",
    "gate-motors",
    "electrical-contracting",
    "solar-panel-systems",
    "power-backup",
    "generators",
    "networking",
    "telephone-systems",
    "institutional-procurement",
  ])
    for (const lang of ["en", "sw"]) {
      const html = renderToStaticMarkup(service.PremiumService({ slug, lang }));
      assert.equal((html.match(/<h1/g) || []).length, 1);
      // Existing FAQs plus the deeper technical question remain native, usable disclosures.
      assert.ok((html.match(/<summary>/g) || []).length >= 3);
      assert.match(html, /<table class="specialist-comparison"/);
      assert.match(
        html,
        lang === "sw"
          ? /Tathmini, ufungaji na makabidhiano/
          : /Assessment, installation &amp; handover/,
      );
      assert.match(
        html,
        lang === "sw"
          ? /Matengenezo na huduma/
          : /Maintenance &amp; ongoing care/,
      );
      assert.match(html, /\/products\?lang=/);
      assert.match(html, /service=/);
      assert.match(html, lang === "sw" ? /Si mradi wa BM/ : /Not a BM project/);
    }
});
const article = await bundle("app/support/[slug]/page.tsx", shell);
const list = await bundle("app/support/page.tsx", shell);
test("a withdrawn support article cannot reappear from static fallback or its index", async () => {
  record = { slug: "electric-fence-basics", isPublished: false };
  support = [record];
  await assert.rejects(
    () =>
      article.default({
        params: Promise.resolve({ slug: record.slug }),
        searchParams: Promise.resolve({ lang: "sw" }),
      }),
    /NOT_FOUND/,
  );
  const html = renderToStaticMarkup(
    await list.default({ searchParams: Promise.resolve({ lang: "en" }) }),
  );
  assert.doesNotMatch(html, /href="\/support\/electric-fence-basics/);
});
const packageList = await bundle("app/cctv-packages/page.tsx", shell);
test("empty package catalogue does not invent package offers or dead detail links", async () => {
  const html = renderToStaticMarkup(
    await packageList.default({
      searchParams: Promise.resolve({ lang: "en" }),
    }),
  );
  assert.match(html, /No package is currently published/);
  assert.doesNotMatch(html, /href="\/cctv-packages\//);
});
const catalogue = await bundle("app/products/page.tsx", shell);
test("category search and pagination enforce publication, preserve language and cap page size", async () => {
  queries = [];
  const html = renderToStaticMarkup(
    await catalogue.default({
      searchParams: Promise.resolve({
        lang: "sw",
        q: "fixture",
        category: "security",
        page: "2",
      }),
    }),
  );
  assert.equal(queries[0].where.isPublished, true);
  assert.equal(queries[0].where.category.slug, "security");
  assert.equal(queries[0].skip, 50);
  assert.equal(queries[0].take, 51);
  assert.match(html, /page=3/);
  assert.match(html, /category=security/);
  assert.match(html, /lang=sw/);
  assert.doesNotMatch(html, /Synthetic 50/);
});
const frame = await bundle("components/premium/Frame.tsx", shell);
test("product and package enquiries preserve context without a live messaging link", () => {
  const html = renderToStaticMarkup(
    frame.EnquiryLink({
      lang: "sw",
      subject: "Synthetic equipment",
      product: "fixture-one",
      packageSlug: "fixture-package",
      trade: true,
    }),
  );
  assert.match(html, /product=fixture-one/);
  assert.match(html, /package=fixture-package/);
  assert.match(html, /Jumla/);
  assert.doesNotMatch(html, /wa.me|sms:/);
});
