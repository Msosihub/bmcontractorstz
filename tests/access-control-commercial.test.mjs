import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { bundle } from "./helpers.mjs";
const products = JSON.parse(
    await readFile("lib/catalogue/zkteco/products.json", "utf8"),
  ),
  manifest = JSON.parse(
    await readFile(
      "docs/commercial/access-control/MEDIA-MANIFEST.json",
      "utf8",
    ),
  );
const { solutionLinks } = await bundle("components/catalogue/links.ts");
test("ZKTeco references have verified local photos, complete bilingual fields and no price/stock claims", async () => {
  assert(products.length >= 29);
  assert.equal(new Set(products.map((p) => p.slug)).size, products.length);
  for (const p of products) {
    assert.equal(p.brand, "ZKTeco");
    assert.equal(p.price, null);
    assert.equal(p.availability, "request-confirmation");
    assert(["current", "existing"].includes(p.classification));
    assert(
      p.summary.en && p.summary.sw && p.compatibility.en && p.compatibility.sw,
    );
    assert(
      [
        "www.zkteco.com",
        "www.zkteco-ea.com",
        "www.zkteco.in",
        "zkteco.sa",
        "zkteco.technology",
      ].includes(new URL(p.source).hostname),
    );
    assert(manifest.manufacturer.some((m) => m.id === p.slug));
    for (const s of p.specs)
      assert(s.label.en && s.label.sw && s.value.en && s.value.sw);
    for (const i of p.images) {
      assert.match(i.src, /^\/images\/access-control\/[a-z0-9-]+\.webp$/);
      assert((await readFile("public" + i.src)).length > 1000);
    }
    for (const id of p.related) assert(products.some((p) => p.slug === id));
    assert(
      !/localhost|127\.0\.0\.1|bm\.local|car-accessories|api\/media/.test(
        JSON.stringify(p),
      ),
    );
  }
});
test("variant and generation distinctions are retained instead of universal biometric/software claims", () => {
  assert.equal(
    products.find((p) => p.slug === "f18").classification,
    "existing",
  );
  assert.equal(
    products.find((p) => p.slug === "inbio-classic").classification,
    "existing",
  );
  assert.match(
    products.find((p) => p.slug === "senseface-4a").specs[1].value.en,
    /4B: face, no fingerprint/,
  );
  assert.match(
    products.find((p) => p.slug === "speedface-v5l").specs[1].value.en,
    /RFID model omits fingerprint/,
  );
  assert.match(
    products.find((p) => p.slug === "ml100").compatibility.en,
    /Not automatically compatible/,
  );
  assert.match(
    products.find((p) => p.slug === "sl01-t430h").specs[2].value.en,
    /USB-C/,
  );
  assert.match(
    products.find((p) => p.slug === "c2-260").compatibility.en,
    /WR485/,
  );
});
test("model/scope quotation and survey links preserve language and bounded context without provider calls", () => {
  for (const lang of ["en", "sw"])
    for (const text of [
      "ZKTeco SenseFace 4B — equipment only",
      "ZKTeco SL01-T430H — mfumo uliofungwa",
    ]) {
      const links = solutionLinks(lang, text);
      assert.equal(
        new URL(links.quote, "https://test.invalid").searchParams.get(
          "subject",
        ),
        text,
      );
      assert.equal(
        new URL(links.survey, "https://test.invalid").searchParams.get(
          "service",
        ),
        text,
      );
      assert.equal(
        new URL(links.quote, "https://test.invalid").searchParams.get("lang"),
        lang,
      );
      assert(
        new URL(links.whatsapp, "https://test.invalid").searchParams
          .get("text")
          .includes(text),
      );
      assert.equal(links.call, "tel:+255760111880");
    }
  assert.equal(
    new URL(
      solutionLinks("en", "a".repeat(150)).quote,
      "https://test.invalid",
    ).searchParams.get("subject").length,
    100,
  );
});
test("hub and child routes honour parent withdrawal and reciprocal canonical URLs", async () => {
  globalThis.__bmTest = {
    prisma: { service: { findUnique: async () => globalThis.__accessRecord } },
  };
  const mock = {
    "@/components/premium/access-control/Page":
      "export function AccessPage(props){return props}",
    "@/components/premium/access-control/SolutionPage":
      "export function SolutionPage(props){return props}; export const solutionContent={'time-attendance':{title:{en:'Attendance',sw:'Mahudhurio'},intro:{en:'Staff records',sw:'Taarifa za staff'}},'smart-locks':{title:{en:'Locks',sw:'Makufuli'},intro:{en:'Door locks',sw:'Makufuli'}}}",
    "next/navigation": "export function notFound(){throw Error('NOT_FOUND')}",
  };
  for (const tail of ["", "/time-attendance", "/smart-locks"]) {
    const r = await bundle(
      "app/services/access-control" + tail + "/page.tsx",
      mock,
    );
    for (const lang of ["en", "sw"]) {
      globalThis.__accessRecord = null;
      const m = await r.generateMetadata({
        searchParams: Promise.resolve({ lang }),
      });
      assert.equal(
        m.alternates.canonical,
        "https://www.bmcontractorstz.com/services/access-control" +
          tail +
          (lang === "sw" ? "?lang=sw" : ""),
      );
      assert(m.alternates.languages.en && m.alternates.languages.sw);
      globalThis.__accessRecord = { isPublished: false };
      assert.deepEqual(
        (await r.generateMetadata({ searchParams: Promise.resolve({ lang }) }))
          .robots,
        { index: false, follow: false },
      );
      await assert.rejects(
        () => r.default({ searchParams: Promise.resolve({ lang }) }),
        /NOT_FOUND/,
      );
    }
  }
  delete globalThis.__accessRecord;
});
test("ZKTeco bilingual sitemap includes curated models and excludes withdrawn service children and Preview", async () => {
  let withdrawn = false;
  globalThis.__zkSitemap = {
    product: { findMany: async () => [] },
    cctvPackage: { findMany: async () => [] },
    supportArticle: { findMany: async () => [] },
    service: {
      findMany: async () =>
        withdrawn ? [{ slug: "access-control", isPublished: false }] : [],
    },
  };
  const mocks = {
    "@/lib/prisma": "export const prisma=globalThis.__zkSitemap",
    "@/lib/catalogue/provider":
      "export async function centurionProducts(){return []}",
  };
  const { default: sitemap } = await bundle("app/sitemap.ts", {
    ...mocks,
    "@/lib/preview-safety.mjs": "export const isPreview=()=>false;",
  });
  let map = await sitemap();
  for (const p of products)
    for (const suffix of ["", "?lang=sw"])
      assert(
        map.some((x) => x.url.endsWith("/catalogue/zkteco/" + p.slug + suffix)),
      );
  assert(
    map.some((x) =>
      x.url.endsWith("/services/access-control/time-attendance?lang=sw"),
    ),
  );
  const guides = JSON.parse(await readFile("data/blog.json", "utf8")).filter(
    (a) => a.published,
  );
  for (const article of guides)
    for (const suffix of ["", "?lang=sw"])
      assert(map.some((x) => x.url.endsWith("/blog/" + article.slug + suffix)));
  withdrawn = true;
  map = await sitemap();
  assert(!map.some((x) => x.url.includes("/services/access-control")));
  const preview = await bundle("app/sitemap.ts", {
    ...mocks,
    "@/lib/preview-safety.mjs": "export const isPreview=()=>true;",
  });
  assert.deepEqual(await preview.default(), []);
});
test("software guidance covers distinct platforms, licensing and both official security notices", async () => {
  const { software } = await bundle(
    "components/premium/access-control/content.ts",
  );
  assert.equal(software.length, 5);
  for (const s of software) {
    assert(s.mode.en && s.mode.sw && s.checks.en && s.checks.sw);
    assert(s.source.startsWith("https://www.zkteco"));
  }
  const page = await readFile(
    "components/premium/access-control/Page.tsx",
    "utf8",
  );
  assert(page.includes("/Security_Bulletinsibs/26"));
  assert(page.includes("/Security_Bulletinsibs/27"));
  assert(!/fetch\(|localhost|127\.0\.0\.1/.test(page));
});

test("04B preserves distinct attendance identities, conditional licensing and complete door components", async () => {
  const get = (id) => products.find((p) => p.slug === id);
  for (const id of [
    "k40",
    "k40-pro",
    "mb360",
    "mb1000",
    "mb10",
    "mb20",
    "kr600",
    "sc105",
    "fr1200",
    "al-280-led",
    "eb104",
    "ex-802",
    "biotime-9-5",
    "biotime-cloud",
    "zkbio-cvaccess",
    "zkbio-hlms",
  ])
    assert(get(id), id);
  assert.match(get("k40").compatibility.en, /do not assume BioTime 9.5/);
  assert.match(get("mb1000").summary.en, /not MB100/);
  assert(!get("mb100"), "Unverified MB100 must not be silently aliased");
  assert.match(get("mb360").compatibility.en, /firmware\/ADMS/);
  assert.match(get("mb20").specs[2].value.en, /distinct from MB20-VL/);
  assert.match(get("fr1200").specs[1].value.en, /not a USB enrolment/);
  assert.match(get("biotime-9-5").compatibility.en, /not universal inclusions/);
  const source = await readFile(
    "components/premium/access-control/CommercialSections.tsx",
    "utf8",
  );
  assert.match(source, /SAMPLE REPORT · FICTIONAL DATA/);
  assert.match(source, /Demo 001/);
  assert.match(source, /not a software screenshot/);
  const guide = await readFile(
    "components/premium/access-control/EquipmentGuide.tsx",
    "utf8",
  );
  for (const term of [
    "electric strike",
    "emergency-release",
    "door sensor",
    "12V",
    "5V",
    "key fobs",
    "ZK9500",
  ])
    assert(guide.includes(term), term);
});
