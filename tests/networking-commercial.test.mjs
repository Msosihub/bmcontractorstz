import test from "node:test";
import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import {
  networkingProductImages,
  directProductImage,
  responsiveLocalScene,
} from "../lib/local-image-policy.mjs";
const products = JSON.parse(
  await readFile(
    new URL("../lib/catalogue/networking/products.json", import.meta.url),
  ),
);
test("networking references have one unique canonical identity and no invented stock or prices", () => {
  assert.equal(products.length, 6);
  assert.equal(new Set(products.map((p) => p.slug)).size, 6);
  for (const p of products) {
    assert.equal(p.price, null);
    assert.equal(p.classification, "current");
    assert.equal(p.availability, "Quotation only; no stock claim");
    for (const lang of ["en", "sw"]) {
      assert(p.summary[lang].length > 35);
      assert(p.compatibility[lang].length > 50);
    }
    assert(
      ["mikrotik.com", "www.omadanetworks.com", "www.tp-link.com"].includes(
        new URL(p.source).hostname,
      ),
    );
    for (const r of p.related) assert(products.some((x) => x.slug === r));
  }
});
test("router references do not silently become Wi-Fi APs or PoE output supplies", () => {
  const hex = products.find((p) => p.slug === "mikrotik-hex-e50ug");
  assert(hex.compatibility.en.includes("no built-in Wi-Fi"));
  assert(hex.compatibility.en.includes("passive PoE"));
  const rb = products.find((p) => p.slug === "mikrotik-rb5009ug-s-in");
  assert(rb.compatibility.en.includes("not PoE output"));
  const plain = products.find((p) => p.slug === "tp-link-tl-sg1024d");
  assert(plain.compatibility.en.includes("unmanaged, non-PoE"));
});
test("new product image delivery is exact-source bounded and leaves arbitrary scenes/uploads alone", async () => {
  assert.equal(networkingProductImages.length, 6);
  for (const p of products) {
    assert(networkingProductImages.includes(p.images[0].src));
    assert(directProductImage(p.images[0].src));
    assert(
      (await stat(new URL("../public" + p.images[0].src, import.meta.url)))
        .size > 1000,
    );
  }
  for (const src of [
    "/images/networking/unknown.webp",
    "https://example.org/router.webp",
    "/uploads/networking/router.webp",
    "/images/networking/workplace.webp",
  ])
    assert.equal(directProductImage(src), false);
});
test("network scenes have real native-capped renditions and a static fallback", async () => {
  for (const name of [
    "workplace",
    "rack-detail",
    "fibre-work",
    "hotel-wifi",
    "connected-campus",
  ]) {
    const s = responsiveLocalScene("/images/networking/" + name + ".webp");
    assert(s);
    const candidates = s.srcSet.split(", ").map((x) => x.split(" "));
    assert.equal(Number(candidates.at(-1)[1].slice(0, -1)), s.width);
    assert(s.width >= 1280);
    for (const [src] of candidates)
      assert(
        (await stat(new URL("../public" + src, import.meta.url))).size > 1000,
      );
    assert(s.fallback.endsWith("-640.webp"));
  }
  assert.equal(responsiveLocalScene("/images/networking/unknown.webp"), null);
});
test("quotation context round-trips bilingual text, product identity and editable multiline scope", async () => {
  const { transform } = await import("esbuild");
  const source = await readFile(
    new URL("../lib/catalogue/networking/index.ts", import.meta.url),
    "utf8",
  );
  const body = source.slice(source.indexOf("export function networkingLinks"));
  const code = (await transform(body, { loader: "ts", format: "esm" })).code;
  const { networkingLinks } = await import(
    "data:text/javascript;base64," + Buffer.from(code).toString("base64")
  );
  for (const lang of ["en", "sw"]) {
    const scope = "Office & campus — 2 buildings / fibre",
      product = "MikroTik RB5009UG+S+IN";
    const links = networkingLinks(lang, scope, product);
    for (const [key, path] of [
      ["quote", "/contact"],
      ["survey", "/request-site-survey"],
    ]) {
      const u = new URL(links[key], "https://www.bmcontractorstz.com");
      assert.equal(u.pathname, path);
      assert.equal(u.searchParams.get("lang"), lang);
      assert.equal(u.searchParams.get("product"), product);
      assert(u.searchParams.get("brief").includes(scope));
      assert(u.searchParams.get("brief").includes("\n"));
    }
    assert.equal(
      new URL(links.whatsapp, "https://www.bmcontractorstz.com").pathname,
      "/whatsapp",
    );
    assert.equal(links.call, "tel:+255760111880");
  }
});

test("withdrawing networking removes its new catalogue from shared discovery", async () => {
  const { bundle } = await import("./helpers.mjs");
  const navigation = await bundle("lib/navigation/resolve.ts");
  const all = navigation.resolveNavigation(new Set());
  const flatten = (groups) =>
    groups.flatMap((g) => [
      g.directory,
      ...g.sections.flatMap((s) => s.items),
      ...(g.feature ? [g.feature.destination] : []),
    ]);
  assert(flatten(all).some((x) => x.id === "catalogue-networking"));
  const hidden = flatten(navigation.resolveNavigation(new Set(["networking"])));
  assert(
    !hidden.some(
      (x) => x.id === "catalogue-networking" || x.id === "networking",
    ),
  );
  assert(hidden.some((x) => x.id === "catalogue-hikvision"));
});
test("service withdrawal and identity failures block all new networking views server-side", async () => {
  const { bundle } = await import("./helpers.mjs");
  const mocks = {
    "@/components/site/Header": "export function Header(){return null}",
    "@/components/site/Footer": "export function Footer(){return null}",
    "@/components/media/ReliableLocalImage":
      "export default function Image(){return null}",
    "@/components/catalogue/ReferenceCard":
      "export function ReferenceCard(){return null}",
    "@/components/catalogue/ReferenceCatalogue":
      "export function ReferenceCatalogue(){return null}",
    "@/components/premium/RecordImage":
      "export function RecordImage(){return null}",
    "@/lib/approved-record-media": "export const approvedRecordMedia=()=>null",
    "@/lib/services":
      'export async function getServiceRecord(){if(globalThis.__networkingGuardError)throw Error("IDENTITY_REJECTED");return {isPublished:false}}',
    "next/navigation": 'export function notFound(){throw Error("WITHDRAWN")}',
  };
  const routes = [
    "app/services/networking/page.tsx",
    "app/catalogue/networking/page.tsx",
    "app/catalogue/networking/[slug]/page.tsx",
  ];
  for (const file of routes) {
    const page = await bundle(file, mocks);
    for (const lang of ["en", "sw"]) {
      const props = {
        searchParams: Promise.resolve({ lang }),
        params: Promise.resolve({ slug: "mikrotik-rb5009ug-s-in" }),
      };
      await assert.rejects(() => page.default(props), /WITHDRAWN/);
      globalThis.__networkingGuardError = true;
      try {
        await assert.rejects(() => page.default(props), /IDENTITY_REJECTED/);
      } finally {
        delete globalThis.__networkingGuardError;
      }
    }
  }
});
