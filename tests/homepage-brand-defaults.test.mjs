import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { renderToStaticMarkup } from "react-dom/server";
import { bundle } from "./helpers.mjs";
const { ManufacturerBelts } = await bundle(
  "components/premium/ManufacturerBelts.tsx",
  {
    "next/image":
      'import React from "react"; export default function Image({unoptimized,...props}){void unoptimized;return React.createElement("img",props)}',
    "@/lib/manufacturer-logos":
      'export const logoSlots=Array.from({length:10},(_,i)=>i+1);export async function getManufacturerLogos(){globalThis.__bmLogoReads++;if(globalThis.__bmLogoUnavailable)throw Error("Unavailable");return [{slot:1,name:"Approved override",version:123}]}',
  },
);
test("official local logos render in EN/SW without a database dependency or placeholders", async () => {
  const previous = process.env.BM_HOMEPAGE_LOGO_OVERRIDES;
  try {
    delete process.env.BM_HOMEPAGE_LOGO_OVERRIDES;
    globalThis.__bmLogoReads = 0;
    globalThis.__bmLogoUnavailable = true;
    for (const lang of ["en", "sw"]) {
      const html = renderToStaticMarkup(await ManufacturerBelts({ lang }));
      for (const brand of [
        "Hikvision",
        "Nemtek",
        "Tiandy",
        "CENTURION",
        "ZKTeco",
        "Dahua Technology",
        "TP-Link",
        "Grandstream",
        "Yeastar",
      ])
        assert.ok(html.includes(`alt="${brand}"`));
      assert.equal((html.match(/class="bm-logo-window"/g) || []).length, 2);
      assert.doesNotMatch(html, /placeholder|\/manufacturer-logo\//);
    }
    assert.equal(globalThis.__bmLogoReads, 0);
    process.env.BM_HOMEPAGE_LOGO_OVERRIDES = "1";
    const fallback = renderToStaticMarkup(
      await ManufacturerBelts({ lang: "en" }),
    );
    assert.match(fallback, /\/images\/brands\/hikvision.png/);
    globalThis.__bmLogoUnavailable = false;
    const managed = renderToStaticMarkup(
      await ManufacturerBelts({ lang: "en" }),
    );
    assert.match(managed, /\/manufacturer-logo\/1\?v=123/);
    assert.match(managed, /Approved override/);
  } finally {
    if (previous === undefined) delete process.env.BM_HOMEPAGE_LOGO_OVERRIDES;
    else process.env.BM_HOMEPAGE_LOGO_OVERRIDES = previous;
    delete globalThis.__bmLogoReads;
    delete globalThis.__bmLogoUnavailable;
  }
});
test("logo assets are local artwork with valid image signatures", async () => {
  const { manufacturerBrands } = await bundle("data/manufacturer-brands.ts");
  for (const item of manufacturerBrands) {
    const data = await readFile("public/images/brands/" + item.image);
    if (item.image.endsWith(".svg")) {
      assert.match(data.toString(), /<svg[\s>]/);
      assert.doesNotMatch(
        data.toString(),
        /<script|<foreignObject|(?:href|src)=["\']https?:/i,
      );
    } else
      assert.equal(data.subarray(0, 8).toString("hex"), "89504e470d0a1a0a");
  }
});
