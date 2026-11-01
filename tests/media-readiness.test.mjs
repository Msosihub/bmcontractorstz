import test from "node:test";
import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import { renderToStaticMarkup } from "react-dom/server";
import { bundle } from "./helpers.mjs";
const imageMock =
  "import React from 'react';export default function Image({fill,...props}){return React.createElement('img',props)}";
const mocks = {
  "@/lib/prisma":
    "export const prisma = new Proxy({}, {get(_t,key){return globalThis.__bmTest.prisma[key]}});",
  "@/components/site/Header": "export function Header(){return null}",
  "@/components/site/Footer": "export function Footer(){return null}",
  "next/image": imageMock,
};
const { approvedRecordMedia } = await bundle("lib/approved-record-media.ts");
const approval = {
  kind: "product",
  recordId: "synthetic",
  imageUrl: "/media/example.webp",
  altEn: "Manufacturer product image",
  altSw: "Picha ya bidhaa kutoka kwa mtengenezaji",
  rightsEvidence: "Synthetic test evidence only",
  approvedBy: "Test reviewer",
  approvedAt: "2026-10-26",
  width: 960,
  height: 640,
};
const record = {
  id: "synthetic",
  imageUrl: approval.imageUrl,
  isPublished: true,
};
test("published records need exact record/media/rights approval; arbitrary URLs and withdrawn media fail closed", () => {
  assert.equal(approvedRecordMedia("product", record), null);
  assert.deepEqual(
    approvedRecordMedia("product", record, [approval]),
    approval,
  );
  for (const imageUrl of [
    "https://example.com/private.jpg",
    "//example.com/x.jpg",
    "/media/../secret.png",
    "/media/file.svg",
    "/media/a.webp?x=y",
    "/assets/hero-1440.webp",
  ])
    assert.equal(
      approvedRecordMedia("product", { ...record, imageUrl }, [
        { ...approval, imageUrl },
      ]),
      null,
    );
  for (const change of [
    { rightsEvidence: "" },
    { altSw: "" },
    { approvedBy: "" },
    { width: 0 },
    { approvedAt: "invalid" },
  ])
    assert.equal(
      approvedRecordMedia("product", record, [{ ...approval, ...change }]),
      null,
    );
  assert.equal(approvedRecordMedia("project", record, [approval]), null);
  assert.equal(
    approvedRecordMedia("product", { ...record, isPublished: false }, [
      approval,
    ]),
    null,
  );
  assert.equal(
    approvedRecordMedia("product", { ...record, id: "another" }, [approval]),
    null,
  );
});
test("directory imagery covers ten distinct services with bilingual alt and local optimized renditions", async () => {
  const mapping = JSON.parse(
    await readFile("data/service-imagery.json", "utf8"),
  );
  assert.equal(Object.keys(mapping).length, 10);
  for (const v of Object.values(mapping)) {
    assert.ok(v.en.length > 15 && v.sw.length > 15);
    for (const width of [640, 960, 1440])
      await access("public/assets/" + v.asset + "-" + width + ".webp");
  }
});
const about = await bundle("app/about/page.tsx", mocks);
test("About discloses fictional people in English and Kiswahili, with no invented staff identities", async () => {
  for (const lang of ["en", "sw"]) {
    const html = renderToStaticMarkup(
      await about.default({ searchParams: Promise.resolve({ lang }) }),
    );
    assert.match(html, /team-1440.webp/);
    assert.match(
      html,
      lang === "sw"
        ? /si wafanyakazi wala wateja halisi wa BM/
        : /fictional people, not BM employees or clients/,
    );
    assert.match(html, /sizes=/);
  }
});
const { servicePresentation } = await bundle("lib/service-presentation.ts");
test("service metadata follows visible editorial ownership and flags untranslated CMS supplements", () => {
  const cms = {
    titleEn: "Wrong title",
    descriptionEn: "Wrong intro",
    contentEn: "English supplement",
  };
  const result = servicePresentation("cctv", "sw", cms);
  assert.notEqual(result.title, cms.titleEn);
  assert.notEqual(result.description, cms.descriptionEn);
  assert.equal(result.translated, false);
  assert.equal(
    servicePresentation("cctv", "sw", { ...cms, contentSw: "Maelezo" })
      .translated,
    true,
  );
  assert.equal(
    servicePresentation("access-control", "en", cms).title,
    cms.titleEn,
  );
});
globalThis.__bmTest = {
  prisma: {
    project: {
      findMany: async () => [
        {
          id: "synthetic",
          titleEn: "Synthetic record",
          titleSw: "Mfano wa majaribio",
          descriptionEn: "Fixture only",
          descriptionSw: "Majaribio tu",
          category: "Synthetic category",
          location: "Synthetic location",
          imageUrl: "https://unverified.example/photo.jpg",
          isPublished: true,
        },
      ],
    },
  },
};
const projects = await bundle("app/projects/page.tsx", mocks);
test("projects display existing category/location but not an unapproved stored image", async () => {
  const html = renderToStaticMarkup(
    await projects.default({ searchParams: Promise.resolve({ lang: "en" }) }),
  );
  assert.match(html, /Synthetic category/);
  assert.match(html, /Location: Synthetic location/);
  assert.doesNotMatch(html, /unverified.example/);
});
const products = await bundle("app/products/[slug]/page.tsx", {
  ...mocks,
  "next/navigation": "export function notFound(){throw Error('404')}",
});
test("product related query is bounded, same-category, published-only and excludes current record", async () => {
  let query;
  globalThis.__bmTest = {
    prisma: {
      product: {
        findFirst: async () => ({
          id: "p1",
          slug: "fixture",
          name: "Synthetic product",
          categoryId: "c1",
          price: null,
          specifications: [{ label: "Model", value: "TEST" }],
          isPublished: true,
        }),
        findMany: async (q) => {
          query = q;
          return [
            {
              id: "p2",
              slug: "related-fixture",
              name: "Related synthetic product",
              isPublished: true,
            },
          ];
        },
      },
    },
  };
  const html = renderToStaticMarkup(
    await products.default({
      params: Promise.resolve({ slug: "fixture" }),
      searchParams: Promise.resolve({ lang: "sw" }),
    }),
  );
  assert.deepEqual(query.where, {
    isPublished: true,
    categoryId: "c1",
    id: { not: "p1" },
  });
  assert.equal(query.take, 3);
  assert.match(html, /\/products\/related-fixture\?lang=sw/);
  assert.match(html, /TEST/);
});
const approvedImage = await bundle("components/premium/RecordImage.tsx", {
  "next/image": imageMock,
  "@/data/approved-record-media.json":
    "export default " + JSON.stringify([approval]),
});
test("approved record image renders bilingual alt, dimensions and responsive sizes; withdrawn record renders nothing", () => {
  const html = renderToStaticMarkup(
    approvedImage.RecordImage({ kind: "product", record, lang: "sw" }),
  );
  assert.match(html, /src="\/media\/example.webp"/);
  assert.match(html, /width="960"/);
  assert.match(html, /height="640"/);
  assert.match(html, /Picha ya bidhaa/);
  assert.match(html, /sizes=/);
  assert.equal(
    renderToStaticMarkup(
      approvedImage.RecordImage({
        kind: "product",
        record: { ...record, isPublished: false },
        lang: "en",
      }),
    ),
    "",
  );
});
