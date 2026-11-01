import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { renderToStaticMarkup } from "react-dom/server";
import { bundle } from "./helpers.mjs";
const mocks = {
  "next/image":
    "import React from 'react';export default function Image({fill,preload,...p}){return React.createElement('img',p)}",
};
const belt = await bundle("components/premium/TrustBelt.tsx", mocks);
const footer = await bundle("components/site/Footer.tsx", mocks);
const work = await bundle("components/premium/WorkingApproach.tsx", mocks);
test("two bilingual belts disclose context and offer native pause controls with inert duplicate lists", () => {
  for (const lang of ["en", "sw"])
    for (const kind of ["sectors", "systems"]) {
      const html = renderToStaticMarkup(belt.TrustBelt({ lang, kind }));
      assert.match(html, new RegExp('id="belt-' + kind + '-pause"'));
      assert.match(html, /type="checkbox"/);
      assert.match(html, /aria-hidden="true" inert=""/);
      assert.match(html, /Pause movement|Sitisha mwendo/);
      assert.match(html, /Resume movement|Endelea na mwendo/);
      if (kind === "systems") {
        assert.match(html, new RegExp("/services/cctv\\?lang=" + lang));
        assert.match(html, new RegExp("/services/gate-motors\\?lang=" + lang));
        assert.doesNotMatch(html, /<img/);
      } else {
        assert.match(html, /AI/);
        assert.match(
          html,
          /not client or project records|si rekodi za wateja au miradi/,
        );
      }
      assert.doesNotMatch(
        html,
        /authorized distributor|official partner|mteja wetu|Hikvision|Cummins/,
      );
    }
});
test("footer exposes core specialties first, catalogue filters and confirmed offices without unsafe WhatsApp destinations", () => {
  for (const lang of ["en", "sw"]) {
    const html = renderToStaticMarkup(footer.Footer({ lang }));
    assert.match(html, /href="\/whatsapp"/);
    assert.match(html, /href="\/huduma" lang="sw"/);
    assert.doesNotMatch(html, /href="https:\/\/wa.me/);
    for (const [raw, label] of [
      ["+255760111880", "+255 760 111 880"],
      ["+255745778821", "+255 745 778 821"],
      ["+255799660068", "+255 799 660 068"],
    ]) {
      assert.ok(html.includes('href="tel:' + raw + '"'));
      assert.ok(html.includes(label));
    }
    assert.match(html, /55 Market Road, Vijana Street, Moshi/);
    assert.match(html, /Mianzini, Arusha/);
    assert.match(html, /sales@bmcontractorstz.com/);
    assert.ok(
      html.indexOf("/services/cctv?") < html.indexOf("/services/generators?"),
    );
    assert.ok(html.includes("/products?lang=" + lang + "&amp;q=CCTV"));
    for (const slug of [
      "telephone-systems",
      "air-conditioners",
      "maintenance-support",
      "institutional-procurement",
    ])
      assert.ok(html.includes("/services/" + slug + "?lang=" + lang));
  }
});
test("working approach explains four practical stages in both languages without credentials or fabricated projects", () => {
  for (const lang of ["en", "sw"]) {
    const html = renderToStaticMarkup(work.WorkingApproach({ lang }));
    assert.equal((html.match(/<li>/g) || []).length, 4);
    assert.match(html, /electrical-1440.webp/);
    assert.match(html, /AI/);
    assert.match(html, new RegExp("/request-site-survey\\?lang=" + lang));
    assert.doesNotMatch(
      html,
      /certified|years of experience|ISO|completed [0-9]+/,
    );
  }
});
test("motion CSS supplies opposite directions, hover/focus/persistent pause, keyboard static discovery and reduced-motion fallback", async () => {
  const css = await readFile("app/premium.css", "utf8");
  assert.match(css, /animation-direction: reverse/);
  assert.match(css, /animation-play-state: paused/);
  assert.match(css, /belt-pause-input:checked ~ \.belt-window \.belt-track/);
  assert.match(css, /system-belt:focus-within \.belt-track/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(
    css,
    /\.trust-belt \.belt-list\[aria-hidden\] \{\s*display: none/,
  );
  const source = await readFile("components/premium/Homepage.tsx", "utf8");
  assert.match(source, /<Footer lang=\{lang\}/);
  assert.doesNotMatch(source, /<footer>/);
  for (const kind of ["systems", "sectors"])
    assert.ok(source.includes('<TrustBelt kind="' + kind + '"'));
});
