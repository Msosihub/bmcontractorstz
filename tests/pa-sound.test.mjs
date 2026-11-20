import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { renderToStaticMarkup } from "react-dom/server";
import { bundle } from "./helpers.mjs";
const page = await bundle("app/services/pa-sound-systems/page.tsx", {
  "./pa-sound.css": "",
  "@/lib/services":
    "export async function getServiceRecord(){return globalThis.__bmPaRecord}",
  "@/components/site/Header": "export function Header(){return null}",
  "@/components/site/Footer": "export function Footer(){return null}",
  "@/components/premium/ExperienceMotion":
    "export function ExperienceMotion(){return null}",
  "next/navigation": 'export function notFound(){throw Error("NOT_FOUND")}',
  "next/image":
    'import React from "react";export default function Image({fill,...props}){void fill;return React.createElement("img",props)}',
});
test("PA withdrawal overrides the local offering and approved reference content", async () => {
  try {
    globalThis.__bmPaRecord = { isPublished: false };
    await assert.rejects(
      () => page.default({ searchParams: Promise.resolve({ lang: "en" }) }),
      /NOT_FOUND/,
    );
  } finally {
    delete globalThis.__bmPaRecord;
  }
});
test("PA equipment and installation journeys stay bilingual, contextual and free of invented offers", async () => {
  for (const lang of ["en", "sw"]) {
    const html = renderToStaticMarkup(
      await page.default({ searchParams: Promise.resolve({ lang }) }),
    );
    for (const model of [
      "SSA-250M",
      "ACM-96CH",
      "CS-8151T",
      "SCM-15",
      "UHC XT Series",
      "APM-201RM",
    ])
      assert(html.includes(model));
    assert.match(html, /10% THD/);
    assert.match(html, /APM-202CU/);
    assert(
      html.includes(`href="/request-site-survey?lang=${lang}&amp;service=PA`),
    );
    assert(
      html.includes(
        `href="/contact?lang=${lang}&amp;subject=Equipment%20enquiry`,
      ),
    );
    assert.doesNotMatch(
      html,
      /"priceCurrency"|"availability"|TZS [0-9]|authorized dealer|official distributor/,
    );
  }
});
test("PA manufacturer image provenance is complete and references retain distinct connection versions", async () => {
  const { paEquipment } = await bundle("data/pa-sound.ts");
  assert.equal(paEquipment.length, 6);
  for (const item of paEquipment) {
    assert(item.en.type && item.en.detail && item.sw.type && item.sw.detail);
    assert.equal(new URL(item.source).hostname, "www.ahujaradios.com");
    assert(
      (await readFile(`public/images/pa-sound/${item.image}.webp`)).length >
        1000,
    );
  }
  assert.match(
    paEquipment.find((x) => x.image === "scm-15t").en.detail,
    /SCM-15 is 8 Ω; SCM-15T is the 100 V/,
  );
});
