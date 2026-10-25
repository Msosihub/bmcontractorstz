import { test } from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import { bundle } from "./helpers.mjs";
const shell = {
  "@/components/site/Header": "export function Header(){return null}",
  "@/components/site/Footer": "export function Footer(){return null}",
  "next/image":
    "import React from 'react';export default function Image({fill,preload,...props}){return React.createElement('img',props)}",
};
let products = [];
let product = null;
globalThis.__bmTest = {
  prisma: {
    product: { findMany: async () => products, findFirst: async () => product },
    service: { findUnique: async () => ({ isPublished: false }) },
  },
};
const catalogue = await bundle("app/products/page.tsx", shell);
test("premium catalogue renders supplied model without inventing prices or stock", async () => {
  products = [
    {
      id: "fixture",
      slug: "synthetic-model",
      name: "PREVIEW ONLY Synthetic Model",
      brand: null,
      category: null,
      description: "Synthetic specification enquiry",
      price: null,
    },
  ];
  const html = renderToStaticMarkup(
    await catalogue.default({ searchParams: Promise.resolve({ lang: "sw" }) }),
  );
  assert.match(html, /PREVIEW ONLY Synthetic Model/);
  assert.match(html, /Maelezo ya bidhaa hii bado yako kwa Kiingereza/);
  assert.match(html, /\/products\/synthetic-model/);
  assert.doesNotMatch(html, /TZS 0|In stock|Hikvision/);
  assert.match(html, /Wholesale|jumla/);
});
const detail = await bundle("app/products/[slug]/page.tsx", {
  ...shell,
  "next/navigation": "export function notFound(){throw Error('NOT_FOUND')} export function usePathname(){return '/fixture'}",
});
test("premium product detail shows stored specifications and a translation gap", async () => {
  product = {
    slug: "synthetic-model",
    name: "PREVIEW ONLY Synthetic Model",
    brand: null,
    category: null,
    description: "English fixture",
    price: null,
    specifications: { "Fixture attribute": "Synthetic value" },
  };
  const html = renderToStaticMarkup(
    await detail.default({
      params: Promise.resolve({ slug: product.slug }),
      searchParams: Promise.resolve({ lang: "sw" }),
    }),
  );
  assert.match(html, /Fixture attribute/);
  assert.match(html, /Synthetic value/);
  assert.match(html, /bado yako kwa Kiingereza/);
  assert.doesNotMatch(html, /TZS 0/);
});
const service = await bundle("components/site/ServiceDetailPage.tsx", {
  ...shell,
  "next/navigation": "export function notFound(){throw Error('NOT_FOUND')} export function usePathname(){return '/fixture'}",
});
test("unpublished CMS service cannot reappear through premium editorial fallback", async () => {
  await assert.rejects(
    () => service.ServiceDetailPage({ slug: "cctv", lang: "en" }),
    /NOT_FOUND/,
  );
});
const seo = await bundle("lib/seo.ts");
test("new premium service routes retain reciprocal localized SEO without URL migration", () => {
  for (const slug of [
    "electrical-contracting",
    "generators",
    "telephone-systems",
    "institutional-procurement",
  ]) {
    const path = "/services/" + slug;
    const en = seo.pageMetadata(path, "en");
    const sw = seo.pageMetadata(path, "sw");
    assert.equal(
      en.alternates.canonical,
      "https://www.bmcontractorstz.com" + path,
    );
    assert.equal(sw.alternates.canonical, en.alternates.canonical + "?lang=sw");
    assert.deepEqual(en.alternates.languages, sw.alternates.languages);
    assert.notEqual(en.description, sw.description);
  }
});
