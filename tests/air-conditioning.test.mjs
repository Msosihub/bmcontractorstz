import test from "node:test";
import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import { createHash } from "node:crypto";
import { renderToStaticMarkup } from "react-dom/server";
import { bundle } from "./helpers.mjs";
import {
  directProductImage,
  responsiveLocalScene,
} from "../lib/local-image-policy.mjs";
const products = JSON.parse(
    await readFile("lib/catalogue/air-conditioning/products.json"),
  ),
  media = JSON.parse(
    await readFile("data/air-conditioning-equipment-images.json"),
  );
const { climateLinks } = await bundle(
  "lib/catalogue/air-conditioning/links.ts",
);
const mocks = {
  "@/components/media/ReliableLocalImage":
    "import React from 'react';export default function Image({src,alt,width,height}){return React.createElement('img',{src,alt,width,height})}",
  "@/lib/services":
    'export async function getServiceRecord(){if(globalThis.__climateIdentityError)throw Error("IDENTITY_REJECTED");return globalThis.__climateWithdrawn?{isPublished:false}:null}',
  "@/components/site/Header": "export function Header(){return null}",
  "@/components/site/Footer": "export function Footer(){return null}",
  "@/components/navigation/Breadcrumbs":
    "export function Breadcrumbs(){return null}",
  "next/navigation": 'export function notFound(){throw Error("WITHDRAWN")}',
};
const routes = await Promise.all(
  [
    "app/services/air-conditioners/page.tsx",
    "app/catalogue/air-conditioning/page.tsx",
    "app/catalogue/air-conditioning/[slug]/page.tsx",
    "app/blog/[slug]/page.tsx",
  ].map((file) => bundle(file, mocks)),
);
const props = (lang = "en", slug = "gree-pular") => ({
  params: Promise.resolve({ slug }),
  searchParams: Promise.resolve({ lang }),
});
test("AC references are identifiable manufacturer families with no price, stock or SKU invention", () => {
  assert.equal(products.length, 8);
  assert.equal(new Set(products.map((x) => x.slug)).size, 8);
  for (const p of products) {
    assert.equal(p.price, null);
    assert.equal(p.classification, "current");
    assert.match(p.generation, /family reference/);
    assert(
      ["global.gree.com", "www.hisensehvac.com", "www.lg.com"].includes(
        new URL(p.source).hostname,
      ),
    );
    for (const lang of ["en", "sw"]) {
      assert(p.summary[lang].length > 40);
      assert(p.compatibility[lang].length > 80);
    }
    for (const id of p.related) assert(products.some((x) => x.slug === id));
  }
  assert.match(
    products.find((x) => x.slug === "hisense-s5").compatibility.en,
    /not the same product/,
  );
  assert.match(
    products.find((x) => x.slug === "lg-multi-v-s").compatibility.en,
    /PWFMDD200/,
  );
});
test("official AC media hashes and rights are recorded; only exact reviewed files bypass optimization", async () => {
  assert.equal(media.assets.length, 8);
  for (const a of media.assets) {
    assert.equal(a.productionApproved, true);
    assert.match(a.permissionEvidence, /Owner/);
    const b = await readFile("public" + a.image);
    assert.equal(createHash("sha256").update(b).digest("hex"), a.sha256);
    assert(directProductImage(a.image));
  }
  assert(!directProductImage("/images/air-conditioning/unreviewed.webp"));
  assert(!directProductImage("https://untrusted.example/ac.webp"));
  for (const name of [
    "hero",
    "hero-mobile",
    "commercial",
    "maintenance",
    "multiroom",
  ]) {
    const r = responsiveLocalScene(
      "/images/air-conditioning/" + name + ".webp",
    );
    assert(r);
    for (const entry of r.srcSet.split(", "))
      assert((await stat("public" + entry.split(" ")[0])).size > 1000);
  }
});
test("AC quotation and survey links preserve full EN/SW scope, model and multiline project brief", () => {
  for (const lang of ["en", "sw"])
    for (const scope of [
      "Equipment only",
      "Installation",
      "Multi-room design",
      "AC repairs",
      "VRF feasibility",
      "Planned maintenance",
    ]) {
      const links = climateLinks(lang, scope, "Gree U-Match");
      for (const [key, path] of [
        ["quote", "/contact"],
        ["survey", "/request-site-survey"],
      ]) {
        const u = new URL(links[key], "http://local");
        assert.equal(u.pathname, path);
        assert.equal(u.searchParams.get("lang"), lang);
        assert.equal(u.searchParams.get("product"), "Gree U-Match");
        assert(u.searchParams.get("brief").includes(scope + "\n"));
        assert(u.searchParams.get("brief").split("\n").length >= 10);
      }
      assert.equal(
        new URL(links.whatsapp, "http://local").pathname,
        "/whatsapp",
      );
      assert.equal(links.call, "tel:+255760111880");
    }
});
test("withdrawing AC or rejecting identity blocks service, catalogue, model and new article without swallowing errors", async () => {
  for (let i = 0; i < routes.length; i++)
    for (const lang of ["en", "sw"]) {
      const p = props(
        lang,
        i === 3 ? "multi-split-ac-for-tanzanian-buildings" : "gree-pular",
      );
      globalThis.__climateWithdrawn = true;
      try {
        await assert.rejects(() => routes[i].default(p), /WITHDRAWN/);
        const meta = await routes[i].generateMetadata(p);
        assert.equal(meta.robots.index, false);
      } finally {
        delete globalThis.__climateWithdrawn;
      }
      globalThis.__climateIdentityError = true;
      try {
        await assert.rejects(() => routes[i].default(p), /IDENTITY_REJECTED/);
      } finally {
        delete globalThis.__climateIdentityError;
      }
    }
});
test("bilingual canonical and alternates retain the existing service URL and unique catalogue routes", async () => {
  for (const lang of ["en", "sw"])
    for (let i = 0; i < 3; i++) {
      const m = await routes[i].generateMetadata(props(lang)),
        path =
          i === 0
            ? "/services/air-conditioners"
            : i === 1
              ? "/catalogue/air-conditioning"
              : "/catalogue/air-conditioning/gree-pular";
      assert.equal(
        m.alternates.canonical,
        "https://www.bmcontractorstz.com" +
          path +
          (lang === "sw" ? "?lang=sw" : ""),
      );
      assert.equal(
        m.alternates.languages.en,
        "https://www.bmcontractorstz.com" + path,
      );
      assert.equal(
        m.alternates.languages.sw,
        "https://www.bmcontractorstz.com" + path + "?lang=sw",
      );
    }
});
test("server-rendered diagram and service explanations remain useful before hydration", async () => {
  for (const lang of ["en", "sw"]) {
    const html = renderToStaticMarkup(await routes[0].default(props(lang)));
    for (const id of [
      "solutions",
      "multiroom",
      "places",
      "equipment",
      "maintenance",
      "technologies",
      "quotation",
      "hv-all",
      "hv-evening",
      "hv-work",
    ])
      assert(html.includes('id="' + id + '"'));
    assert(html.includes("GREE FREE MATCH"));
    assert(html.includes("PWFMDD200"));
    assert(!html.includes("<video"));
    assert(!html.includes("application/x-shader"));
    assert(!/TZS\s*[0-9]/.test(html));
  }
});
test("shared catalogue accepts an explicit context link while retaining its default behaviour for released catalogues", async () => {
  const { ReferenceCard } = await bundle(
    "components/catalogue/ReferenceCard.tsx",
    {
      "@/components/media/ReliableLocalImage":
        "import React from 'react';export default function Image({src,alt}){return React.createElement('img',{src,alt})}",
    },
  );
  const p = products[0],
    custom = climateLinks("sw", "Vifaa pekee", p.brand + " " + p.name).quote;
  const { createElement } = await import("react");
  const explicit = renderToStaticMarkup(
    createElement(ReferenceCard, {
      p,
      lang: "sw",
      namespace: "/catalogue/air-conditioning",
      quoteHref: custom,
    }),
  );
  assert(explicit.includes("product=Gree+Pular"));
  assert(explicit.includes("brief="));
  const legacy = renderToStaticMarkup(
    createElement(ReferenceCard, {
      p,
      lang: "en",
      namespace: "/catalogue/existing",
    }),
  );
  assert(legacy.includes("/contact?lang=en"));
  assert(!legacy.includes("brief="));
});
test("AC withdrawal removes its catalogue discovery and sitemap entries without hiding existing services", async () => {
  const { resolveNavigation } = await bundle("lib/navigation/resolve.ts");
  const all = (g) =>
    g.flatMap((x) => [
      x.directory,
      ...x.sections.flatMap((y) => y.items),
      ...(x.feature ? [x.feature.destination] : []),
    ]);
  assert(
    all(resolveNavigation(new Set())).some(
      (x) => x.id === "catalogue-air-conditioning",
    ),
  );
  const hidden = all(resolveNavigation(new Set(["air-conditioners"])));
  assert(
    !hidden.some((x) =>
      ["air-conditioners", "catalogue-air-conditioning"].includes(x.id),
    ),
  );
  assert(hidden.some((x) => x.id === "catalogue-fire-safety"));
  assert(hidden.some((x) => x.id === "catalogue-telephony"));
  const sitemapModule = await bundle("app/sitemap.ts", {
    "@/lib/preview-safety.mjs": "export const isPreview=()=>false",
    "@/lib/prisma":
      'const e={findMany:async()=>[]};export const prisma={product:e,cctvPackage:e,supportArticle:e,service:{findMany:async()=>[{slug:"air-conditioners",isPublished:false}]}}',
    "@/lib/catalogue/provider":
      "export async function centurionProducts(){return []}",
  });
  const sitemap = await sitemapModule.default();
  assert(
    !sitemap.some(
      (x) =>
        x.url.includes("/catalogue/air-conditioning") ||
        x.url.includes("multi-split-ac-for-tanzanian-buildings"),
    ),
  );
  assert(sitemap.some((x) => x.url.includes("/catalogue/telephony")));
});
