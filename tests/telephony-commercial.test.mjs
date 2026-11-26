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
    await readFile("lib/catalogue/telephony/products.json", "utf8"),
  ),
  media = JSON.parse(
    await readFile("data/telephony-equipment-images.json", "utf8"),
  );
const { telephonyLinks } = await bundle("lib/catalogue/telephony/links.ts");
test("telephony model authority preserves exact manufacturer/interface identities and no inventory claims", () => {
  assert.equal(products.length, 6);
  assert.equal(new Set(products.map((p) => p.slug)).size, 6);
  for (const p of products) {
    assert.equal(p.price, null);
    assert.equal(p.availability, "Quotation only; no stock claim");
    assert(
      ["www.yeastar.com", "www.yealink.com", "www.grandstream.com"].includes(
        new URL(p.source).hostname,
      ),
    );
    for (const l of ["en", "sw"]) {
      assert(p.summary[l].length > 35);
      assert(p.compatibility[l].length > 80);
    }
    for (const id of p.related) assert(products.some((x) => x.slug === id));
  }
  assert.equal(
    products.find((p) => p.slug === "yealink-sip-t31p").brand,
    "Yealink",
  );
  assert.equal(
    products.find((p) => p.slug === "yeastar-p550").brand,
    "Yeastar",
  );
});
test("handset-facing FXS and outside-line FXO are distinct, not interchangeable shopping choices", () => {
  const fxs = products.find((p) => p.slug === "yeastar-ta400"),
    fxo = products.find((p) => p.slug === "yeastar-ta410");
  assert(fxs.specs.some((s) => s.value.en === "4 FXS ports"));
  assert(fxo.specs.some((s) => s.value.en === "4 FXO ports"));
  assert.match(fxs.compatibility.en, /handset-facing/);
  assert.match(
    fxo.compatibility.en,
    /Do not connect ordinary analogue handsets/,
  );
  assert.match(
    products.find((p) => p.slug === "grandstream-ghp610").compatibility.en,
    /Wi-Fi belongs to W variants/,
  );
  assert.match(
    products.find((p) => p.slug === "grandstream-grp2602").compatibility.en,
    /no account-count promise/,
  );
});
test("official product rights and bytes are traceable; direct delivery is exact-source bounded", async () => {
  assert.equal(media.assets.length, 6);
  for (const a of media.assets) {
    assert.equal(a.productionApproved, true);
    assert(a.permissionEvidence.includes("Owner"));
    assert(new URL(a.source).protocol === "https:");
    const file = await readFile("public" + a.image);
    assert.equal(createHash("sha256").update(file).digest("hex"), a.sha256);
    assert(directProductImage(a.image));
  }
  assert(!directProductImage("/images/telephony/unreviewed.webp"));
  assert(!directProductImage("https://untrusted.example/phone.webp"));
  for (const name of ["reception", "guest-room", "maintenance"]) {
    const s = responsiveLocalScene("/images/telephony/" + name + ".webp");
    assert(s);
    for (const pair of s.srcSet.split(", ")) {
      const path = pair.split(" ")[0];
      assert((await stat("public" + path)).size > 1000);
    }
  }
});
test("all telephony intents preserve exact editable bilingual brief, model identity and approved short routes", () => {
  for (const lang of ["en", "sw"])
    for (const scope of [
      "Equipment only",
      "Hotel analogue upgrade",
      "PBX repairs",
      "Expansion",
      "New installation",
    ]) {
      const x = telephonyLinks(lang, scope, "Yeastar TA400");
      for (const [key, path] of [
        ["quote", "/contact"],
        ["survey", "/request-site-survey"],
      ]) {
        const u = new URL(x[key], "http://local");
        assert.equal(u.pathname, path);
        assert.equal(u.searchParams.get("lang"), lang);
        assert.equal(u.searchParams.get("product"), "Yeastar TA400");
        assert(u.searchParams.get("brief").includes(scope + "\n"));
        assert(u.searchParams.get("brief").split("\n").length >= 9);
      }
      assert.equal(new URL(x.whatsapp, "http://local").pathname, "/whatsapp");
      assert.equal(x.call, "tel:+255760111880");
    }
});
let record = null;
globalThis.__bmVoiceRecord = () => record;
const route = await bundle("app/services/telephone-systems/page.tsx", {
  "@/lib/services":
    "export async function getServiceRecord(){return globalThis.__bmVoiceRecord()}",
  "@/components/site/Header": "export function Header(){return null}",
  "@/components/site/Footer": "export function Footer(){return null}",
  "@/components/navigation/Breadcrumbs":
    "export function Breadcrumbs(){return null}",
  "@/components/media/ReliableLocalImage":
    "import React from 'react';export default function Image({src,alt,width,height}){return React.createElement('img',{src,alt,width,height})}",
  "next/navigation": "export function notFound(){throw Error('NOT_FOUND')}",
});
test("withdrawn telephony stays unavailable and nonindexable", async () => {
  record = { isPublished: false };
  try {
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
  } finally {
    record = null;
  }
});
test("EN/SW SEO retains original service URL and reciprocal alternates", async () => {
  const en = await route.generateMetadata({
      searchParams: Promise.resolve({ lang: "en" }),
    }),
    sw = await route.generateMetadata({
      searchParams: Promise.resolve({ lang: "sw" }),
    });
  assert.equal(
    en.alternates.canonical,
    "https://www.bmcontractorstz.com/services/telephone-systems",
  );
  assert.equal(sw.alternates.canonical, en.alternates.canonical + "?lang=sw");
  assert.deepEqual(en.alternates.languages, sw.alternates.languages);
  assert.notEqual(en.description, sw.description);
});
test("real server-rendered telephony content has useful bilingual call-flow, maintenance and enquiries without JS", async () => {
  for (const lang of ["en", "sw"]) {
    const h = renderToStaticMarkup(
      await route.default({ searchParams: Promise.resolve({ lang }) }),
    );
    assert.equal((h.match(/<h1[ >]/g) || []).length, 1);
    for (const id of [
      "systems",
      "hotels",
      "call-flow",
      "workplaces",
      "maintenance",
      "equipment",
      "delivery",
    ])
      assert(h.includes('id="' + id + '"'));
    assert.match(h, /FXS/);
    assert.match(h, /FXO/);
    assert.equal((h.match(/name="voice-scenario"/g) || []).length, 4);
    assert(h.includes("/request-site-survey?"));
    assert(h.includes("brief="));
    assert(h.includes("/catalogue/telephony?"));
    assert(!/TZS\s*[0-9]|Add to cart|Buy now/.test(h));
    assert(
      h.includes(
        lang === "en" ? "Keep what works." : "Hifadhi kinachofanya kazi.",
      ),
    );
  }
});

test("voice enhancement suspends on hidden/reduced/offscreen states and removes lifecycle listeners", async () => {
  const previous = {
    document: globalThis.document,
    matchMedia: globalThis.matchMedia,
    IntersectionObserver: globalThis.IntersectionObserver,
  };
  const doc = new EventTarget();
  doc.hidden = false;
  const media = new EventTarget();
  media.matches = false;
  const node = { dataset: {} };
  let effect,
    callback,
    disconnected = false;
  globalThis.__bmVoiceHooks = {
    node,
    effect: (f) => {
      effect = f;
    },
  };
  globalThis.document = doc;
  globalThis.matchMedia = () => media;
  globalThis.IntersectionObserver = class {
    constructor(f) {
      callback = f;
    }
    observe() {}
    disconnect() {
      disconnected = true;
    }
  };
  try {
    const { VoiceMotion } = await bundle(
      "app/services/telephone-systems/VoiceMotion.tsx",
      {
        react:
          "export function useRef(){return {current:globalThis.__bmVoiceHooks.node}};export function useEffect(f){globalThis.__bmVoiceHooks.effect(f)}",
      },
    );
    VoiceMotion({ children: null });
    const cleanup = effect();
    assert.equal(node.dataset.motion, "static");
    callback([{ isIntersecting: true }]);
    assert.equal(node.dataset.motion, "running");
    doc.hidden = true;
    doc.dispatchEvent(new Event("visibilitychange"));
    assert.equal(node.dataset.motion, "static");
    assert.equal(node.dataset.reason, "hidden");
    doc.hidden = false;
    doc.dispatchEvent(new Event("visibilitychange"));
    assert.equal(node.dataset.motion, "running");
    media.matches = true;
    media.dispatchEvent(new Event("change"));
    assert.equal(node.dataset.motion, "static");
    assert.equal(node.dataset.reason, "reduced");
    media.matches = false;
    media.dispatchEvent(new Event("change"));
    assert.equal(node.dataset.motion, "running");
    callback([{ isIntersecting: false }]);
    assert.equal(node.dataset.motion, "static");
    assert.equal(node.dataset.reason, "offscreen");
    cleanup();
    assert(disconnected);
    assert.equal(node.dataset.motion, "static");
  } finally {
    for (const [k, v] of Object.entries(previous)) {
      if (v === undefined) delete globalThis[k];
      else globalThis[k] = v;
    }
    delete globalThis.__bmVoiceHooks;
  }
});
