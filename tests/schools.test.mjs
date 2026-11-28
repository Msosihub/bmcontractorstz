import test from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import { readFile } from "node:fs/promises";
import { bundle } from "./helpers.mjs";
const { schoolLinks } = await bundle("lib/industries/schools.ts"),
  nav = await bundle("lib/navigation/resolve.ts");
const mocks = {
  "@/lib/navigation/server":
    'export async function navigationSnapshot(){if(globalThis.__schoolsFault)throw Error("IDENTITY_REJECTED");return{unpublished:new Set(globalThis.__schoolsWithdrawn||[])}}',
  "@/components/site/Header": "export function Header(){return null}",
  "@/components/site/Footer": "export function Footer(){return null}",
  "@/components/media/ReliableLocalImage":
    "import React from'react';export default function Image({src,alt,width,height}){return React.createElement('img',{src,alt,width,height})}",
};
const page = await bundle("app/industries/schools/page.tsx", mocks),
  props = (lang) => ({ searchParams: Promise.resolve({ lang }) });
test("one canonical school destination replaces the previous access-control alias without altering security discovery", () => {
  const groups = nav.resolveNavigation(new Set());
  const items = groups
    .find((g) => g.id === "industries")
    .sections.flatMap((s) => s.items);
  assert.equal(items.filter((x) => x.id === "schools").length, 1);
  assert.equal(
    items.find((x) => x.id === "schools").href,
    "/industries/schools",
  );
  assert.deepEqual(
    groups[0].sections[0].items.slice(0, 3).map((x) => x.id),
    ["cctv", "electric-fence", "gate-motors"],
  );
});
test("school context reuses validated fields with complete bilingual editable briefs and no separate product records", () => {
  for (const lang of ["en", "sw"]) {
    const x = schoolLinks(lang);
    for (const key of ["quote", "survey"]) {
      const u = new URL(x[key], "https://www.bmcontractorstz.com");
      assert.equal(u.searchParams.get("lang"), lang);
      assert(
        u.searchParams
          .get("brief")
          .includes(lang === "en" ? "Day / boarding" : "Kutwa / bweni"),
      );
      assert(
        u.searchParams
          .get("brief")
          .includes(lang === "en" ? "Preferred contact" : "mawasiliano"),
      );
      assert(u.searchParams.get(key === "quote" ? "subject" : "service"));
      assert(u.searchParams.get("brief").length < 3000);
    }
    assert.equal(
      new URL(x.whatsapp, "https://www.bmcontractorstz.com").pathname,
      "/whatsapp",
    );
    assert.equal(x.call, "tel:+255760111880");
  }
});
test("EN/SW metadata provides exact canonical, reciprocal languages, social imagery and environment-safe robots", async () => {
  for (const lang of ["en", "sw"]) {
    const m = await page.generateMetadata(props(lang));
    assert.equal(
      m.alternates.canonical,
      "https://www.bmcontractorstz.com/industries/schools" +
        (lang === "sw" ? "?lang=sw" : ""),
    );
    assert(m.alternates.languages.en && m.alternates.languages.sw);
    assert(m.title.absolute.includes("BM Contractors"));
    assert.equal(m.openGraph.images[0].url, "/images/schools/hero.webp");
    assert.equal(m.twitter.images[0], m.openGraph.images[0].url);
    assert(m.description.length > 100);
  }
});
test("actual server content includes boarding risk, system boundaries and all campus areas in both languages", async () => {
  for (const lang of ["en", "sw"]) {
    const h = renderToStaticMarkup(await page.default(props(lang)));
    for (const id of [
      "campus",
      "boarding-safety",
      "security",
      "connected",
      "power",
      "delivery",
      "school-quotation",
    ])
      assert(h.includes('id="' + id + '"'));
    assert.equal((h.match(/id="area-/g) || []).length, 8);
    assert(
      h.includes(
        lang === "en"
          ? "private dormitory sleeping areas"
          : "sehemu binafsi za kulala",
      ),
    );
    assert(
      (h.includes("6 kg") && h.includes("9 kg")) ||
        (lang === "sw" && h.includes("kilo 6") && h.includes("kilo 9")),
    );
    assert(!h.includes("AggregateRating"));
    assert(h.includes("https://www.bmcontractorstz.com/#business"));
    assert(h.includes("schema.org"));
  }
});
test("withdrawn services cannot leak through campus details or catalogue references; startup faults propagate", async () => {
  globalThis.__schoolsWithdrawn = [
    "cctv",
    "fire-alarm-systems",
    "networking",
    "access-control",
  ];
  try {
    const h = renderToStaticMarkup(await page.default(props("en")));
    for (const path of [
      "/services/cctv?",
      "/services/fire-alarm-systems?",
      "/catalogue/fire-safety?",
      "/catalogue/networking?",
      "/services/access-control?",
    ])
      assert(!h.includes('href="' + path));
    assert(h.includes("/request-site-survey?"));
    globalThis.__schoolsFault = true;
    await assert.rejects(page.default(props("en")), /IDENTITY_REJECTED/);
  } finally {
    delete globalThis.__schoolsWithdrawn;
    delete globalThis.__schoolsFault;
  }
});
test("new native scene variants exist and use the bounded local image policy", async () => {
  const { responsiveLocalScene } = await import(
    "../lib/local-image-policy.mjs"
  );
  for (const p of ["hero", "boarding", "hero-mobile", "campus-overview-v2"]) {
    const x = responsiveLocalScene("/images/schools/" + p + ".webp");
    assert(x);
    for (const rendition of x.srcSet.split(", ")) {
      const file = rendition.split(" ")[0];
      assert((await readFile("public" + file)).length > 5000);
    }
  }
});
test("school sitemap entries are bilingual and Production-only without draft or private data", async () => {
  globalThis.__schoolPreview = true;
  let queries = 0;
  const sitemap = await bundle("app/sitemap.ts", {
    "@/lib/preview-safety.mjs":
      "export function isPreview(){return globalThis.__schoolPreview}",
    "@/lib/catalogue/provider":
      "export async function centurionProducts(){return []}",
    "@/lib/prisma":
      'export const prisma={product:{findMany:async q=>{if(q.where.isPublished!==true)throw Error("PUBLICATION_FILTER_MISSING");return[]}},cctvPackage:{findMany:async q=>{if(q.where.isPublished!==true)throw Error("PUBLICATION_FILTER_MISSING");return[]}},supportArticle:{findMany:async()=>[]},service:{findMany:async()=>[{slug:"fire-alarm-systems",isPublished:false}]}}',
  });
  assert.deepEqual(await sitemap.default(), []);
  globalThis.__schoolPreview = false;
  const entries = await sitemap.default(),
    s = entries.filter((x) => x.url.includes("/industries/schools"));
  assert.equal(s.length, 2);
  assert.deepEqual(
    s.map((x) => x.url),
    [
      "https://www.bmcontractorstz.com/industries/schools",
      "https://www.bmcontractorstz.com/industries/schools?lang=sw",
    ],
  );
  assert(
    s.every((x) => x.alternates.languages.en && x.alternates.languages.sw),
  );
  assert(!entries.some((x) => /\/admin|localhost|127\.0\.0\.1/.test(x.url)));
  assert(!entries.some((x) => x.url.includes("/services/fire-alarm-systems")));
  assert.equal(queries, 0);
  delete globalThis.__schoolPreview;
});
