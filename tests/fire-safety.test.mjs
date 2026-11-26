import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import {
  fireSafetyProductImages,
  directProductImage,
  responsiveLocalScene,
} from "../lib/local-image-policy.mjs";
const require = createRequire(import.meta.url),
  esbuild = require("esbuild"),
  source = await readFile("data/fire-safety.ts", "utf8");
const compiled = esbuild.transformSync(source, {
  loader: "ts",
  format: "esm",
}).code;
const { fireLinks, fireScenarios, fireFaqs } = await import(
  "data:text/javascript;base64," + Buffer.from(compiled).toString("base64")
);
const products = JSON.parse(
  await readFile("lib/catalogue/fire-safety/products.json", "utf8"),
);
test("fire enquiries preserve bilingual scope and exact product in editable contact and survey context", () => {
  for (const lang of ["en", "sw"])
    for (const product of [
      "ABC DCP 6 kg",
      "ABC DCP 9 kg",
      "CO₂ 5 kg",
      "ASENWARE AW-FP300",
    ]) {
      const links = fireLinks(
        lang,
        "School / dormitory & maintenance",
        product,
      );
      for (const [kind, path] of [
        ["quote", "/contact"],
        ["survey", "/request-site-survey"],
      ]) {
        const u = new URL(links[kind], "https://example.invalid");
        assert.equal(u.pathname, path);
        assert.equal(u.searchParams.get("lang"), lang);
        assert.equal(u.searchParams.get("product"), product);
        assert.match(
          u.searchParams.get("brief"),
          /School \/ dormitory & maintenance/,
        );
        assert.ok(u.searchParams.get("brief").includes(product));
        assert.ok(u.searchParams.get("brief").includes("\n"));
      }
      assert.equal(links.call, "tel:+255760111880");
      assert.equal(
        new URL(links.whatsapp, "https://example.invalid").pathname,
        "/whatsapp",
      );
    }
});
test("six distinct references have evidence, compatibility, no invented prices or stock", () => {
  assert.equal(products.length, 6);
  assert.equal(new Set(products.map((x) => x.slug)).size, 6);
  for (const p of products) {
    assert.equal(p.price, null);
    assert.equal(p.classification, "current");
    assert.ok(new URL(p.source).protocol === "https:");
    for (const l of ["en", "sw"]) {
      assert.ok(p.summary[l].length > 50);
      assert.ok(p.compatibility[l].length > 70);
    }
    assert.ok(p.images.every((i) => directProductImage(i.src)));
    assert.ok(p.related.every((s) => products.some((x) => x.slug === s)));
  }
  assert.equal(
    products.find((x) => x.name === "AW-D306").specs[1].value.en,
    "Addressable loop plus separate 24 V supply",
  );
});
test("fire imagery uses exact local allowlist and responsive scenes without a global optimizer bypass", async () => {
  assert.equal(fireSafetyProductImages.length, 8);
  assert.equal(
    directProductImage("/images/fire-safety/unreviewed.webp"),
    false,
  );
  for (const src of fireSafetyProductImages)
    assert.ok((await readFile("public" + src)).length > 1000);
  for (const name of [
    "safety-architecture",
    "boarding-assessment",
    "maintenance",
    "healthcare",
    "kitchen",
  ]) {
    const scene = responsiveLocalScene("/images/fire-safety/" + name + ".webp");
    assert.ok(scene);
    assert.match(scene.srcSet, /384w/);
    assert.ok((await readFile("public" + scene.fallback)).length > 1000);
  }
});
test("school and extinguisher guidance distinguishes capacity options from statutory requirements", () => {
  assert.equal(fireScenarios.length, 6);
  assert.ok(fireScenarios.some((x) => x.id === "boarding"));
  const faq = fireFaqs.find((x) => x.en[0].includes("6 kg"));
  assert.match(faq.en[1], /must not be assumed/);
  assert.match(faq.en[1], /9 kg/);
  assert.match(faq.sw[1], /Kanuni 244/);
  assert.ok(fireFaqs.some((x) => x.en[1].includes("approximately 30-day")));
  assert.ok(
    fireFaqs.some((x) =>
      x.en[1].includes("not government inspection certificates"),
    ),
  );
});
test("withdrawing fire safety hides its catalogue from shared discovery without hiding independent routes", async () => {
  const { bundle } = await import("./helpers.mjs");
  const nav = await bundle("lib/navigation/resolve.ts");
  const flatten = (groups) =>
    groups.flatMap((g) => [
      g.directory,
      ...g.sections.flatMap((c) => c.items),
      ...(g.feature ? [g.feature.destination] : []),
    ]);
  assert.ok(
    flatten(nav.resolveNavigation(new Set())).some(
      (x) => x.id === "catalogue-fire-safety",
    ),
  );
  const hidden = flatten(
    nav.resolveNavigation(new Set(["fire-alarm-systems"])),
  );
  assert.ok(
    !hidden.some((x) =>
      ["catalogue-fire-safety", "fire-alarm-systems"].includes(x.id),
    ),
  );
  assert.ok(hidden.some((x) => x.id === "catalogue-networking"));
});
test("withdrawal and identity failure block fire service and all catalogue entry points", async () => {
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
    "@/lib/services":
      'export async function getServiceRecord(){if(globalThis.__fireIdentityError)throw Error("IDENTITY_REJECTED");return {isPublished:false}}',
    "next/navigation": 'export function notFound(){throw Error("WITHDRAWN")}',
  };
  for (const file of [
    "app/services/fire-alarm-systems/page.tsx",
    "app/catalogue/fire-safety/page.tsx",
    "app/catalogue/fire-safety/[slug]/page.tsx",
  ]) {
    const p = await bundle(file, mocks);
    for (const lang of ["en", "sw"]) {
      const props = {
        searchParams: Promise.resolve({ lang }),
        params: Promise.resolve({ slug: "asenware-aw-fp300" }),
      };
      await assert.rejects(() => p.default(props), /WITHDRAWN/);
      globalThis.__fireIdentityError = true;
      try {
        await assert.rejects(() => p.default(props), /IDENTITY_REJECTED/);
      } finally {
        delete globalThis.__fireIdentityError;
      }
    }
  }
});
