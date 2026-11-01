import { test } from "node:test";
import { createElement } from "react";
import assert from "node:assert/strict";
import { bundle } from "./helpers.mjs";
let record = null;
globalThis.__bmTest = {
  prisma: { service: { findUnique: async () => record } },
};
const route = await bundle("app/services/cctv/page.tsx", {
  "@/components/premium/cctv/Page":
    "export function CctvCommercialPage(props){return props}",
  "next/navigation": "export function notFound(){throw Error('NOT_FOUND')}",
  "@/lib/services":
    "export async function getServiceRecord(){return globalThis.__bmTest.prisma.service.findUnique()}",
});
const { cctvLinks } = await bundle("components/premium/cctv/links.ts");
test("CCTV editorial page respects withdrawn CMS service and does not index it", async () => {
  record = { isPublished: false };
  await assert.rejects(
    () => route.default({ searchParams: Promise.resolve({ lang: "sw" }) }),
    /NOT_FOUND/,
  );
  assert.deepEqual(
    (
      await route.generateMetadata({
        searchParams: Promise.resolve({ lang: "sw" }),
      })
    ).robots,
    { index: false, follow: false },
  );
  record = null;
});
test("CCTV localized metadata retains canonical service URL and reciprocal alternates", async () => {
  const en = await route.generateMetadata({
    searchParams: Promise.resolve({ lang: "en" }),
  });
  const sw = await route.generateMetadata({
    searchParams: Promise.resolve({ lang: "sw" }),
  });
  assert.equal(
    en.alternates.canonical,
    "https://www.bmcontractorstz.com/services/cctv",
  );
  assert.equal(sw.alternates.canonical, en.alternates.canonical + "?lang=sw");
  assert.deepEqual(en.alternates.languages, sw.alternates.languages);
  assert.notEqual(en.description, sw.description);
  assert.match(sw.description, /Moshi, Arusha/);
});
test("qualified CCTV brief survives established contact, survey and safe WhatsApp routes", () => {
  for (const lang of ["en", "sw"]) {
    const detail = "CCTV — 16 cameras — Hotel & lodge";
    const l = cctvLinks(lang, detail);
    const quote = new URL(l.quote, "http://local"),
      survey = new URL(l.survey, "http://local"),
      wa = new URL(l.whatsapp, "http://local");
    assert.equal(quote.pathname, "/contact");
    assert.equal(quote.searchParams.get("subject"), detail);
    assert.equal(survey.pathname, "/request-site-survey");
    assert.equal(survey.searchParams.get("service"), detail);
    assert.equal(quote.searchParams.get("lang"), lang);
    assert.equal(survey.searchParams.get("lang"), lang);
    assert.equal(wa.pathname, "/whatsapp");
    assert(wa.searchParams.get("text").includes(detail));
    assert.equal(l.call, "tel:+255760111880");
  }
  assert.equal(
    new URL(
      cctvLinks("en", "x".repeat(500)).survey,
      "http://local",
    ).searchParams.get("service").length,
    100,
  );
});

const { renderToStaticMarkup } = await import("react-dom/server");
const planner = await bundle("components/premium/cctv/Planner.tsx", {
  "next/image": "import React from 'react'; export default function Image({fill,sizes,...props}){return React.createElement('img',props)}",
  "lucide-react":
    "import React from 'react'; const Icon=props=>React.createElement('svg',props); export {Icon as House,Icon as Store,Icon as Briefcase,Icon as Hotel,Icon as School,Icon as Warehouse,Icon as Landmark};",
});
test("CCTV offers four complete-installation enquiries rather than single-camera purchase cards", () => {
  for (const lang of ["en", "sw"]) {
    const html = renderToStaticMarkup(
      createElement(planner.CctvPlanner, { lang }),
    );
    assert.equal((html.match(/class="cctv-package package-/g) || []).length, 4);
    assert.equal((html.match(/class="cctv-package-price"/g) || []).length, 4);
    assert.match(html, /16\+/);
    assert.match(html, /CCTV%20%E2%80%94%208/);
    assert.match(html, /request-site-survey/);
    assert.doesNotMatch(html, /TZS\s*\d|Add to cart|Buy now|DS-2CD|TC-C34/);
    assert.match(html, lang === "sw" ? /HDD na nyaya/ : /HDD &amp; cabling/);
  }
});

test('CCTV premises panels preserve seven specific applications and contextual installed-solution enquiries', async()=>{
 const copy=JSON.parse(await (await import('node:fs/promises')).readFile('data/cctv-commercial.json','utf8'));
 for(const lang of ['en','sw']){
  const t=copy[lang],html=renderToStaticMarkup(createElement(planner.CctvPlanner,{lang}));
  assert.equal(t.cases.length,7);assert.equal((html.match(/class="cctv-application-panel"/g)||[]).length,7);
  assert.equal((html.match(/class="cctv-application-panel" hidden=""/g)||[]).length,6);
  for(const item of t.cases){
   assert(item.panelTitle&&item.short&&item.imageAlt&&item.points.length===2);
   assert.match(html,new RegExp('aria-controls="cctv-place-'+item.id+'"'));
   const link=new URL(cctvLinks(lang,`CCTV installation — ${item.name}`).quote,'http://local');assert.equal(link.searchParams.get('lang'),lang);assert.equal(link.searchParams.get('subject'),`CCTV installation — ${item.name}`);
   await (await import('node:fs/promises')).access('public'+item.image);
  }
  assert.match(t.cases.find(x=>x.id==='hotel').points.join(' '),lang==='en'?/Exclude guest bedrooms/:/vyumba vya kulala/);
 }
});
