import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { renderToStaticMarkup } from "react-dom/server";
import { bundle } from "./helpers.mjs";
const { PreviewNotice } = await bundle("components/site/PreviewNotice.tsx");
test("staging notice is absent from Production and explicit in both Preview languages", () => {
  const previous = process.env.NEXT_PUBLIC_BM_PREVIEW;
  try {
    for (const flag of ["0", "1"])
      for (const lang of ["en", "sw"]) {
        process.env.NEXT_PUBLIC_BM_PREVIEW = flag;
        const html = renderToStaticMarkup(PreviewNotice({ lang }));
        if (flag === "0") assert.equal(html, "");
        else assert.match(html, /PROTECTED PREVIEW|ONYESHO LA MAJARIBIO/);
      }
  } finally {
    if (previous === undefined) delete process.env.NEXT_PUBLIC_BM_PREVIEW;
    else process.env.NEXT_PUBLIC_BM_PREVIEW = previous;
  }
});
test("homepage uses the shared environment-scoped header and image disclosures remain intact", async () => {
  const header = await readFile("components/site/Header.tsx", "utf8");
  const home = await readFile("components/premium/Homepage.tsx", "utf8");
  assert.match(header, /<PreviewNotice lang=\{lang\}/);
  assert.match(home, /<Header lang=\{lang\}/);
  assert.doesNotMatch(home + header, /<span>PHASE 1B \/ PRIVATE REVIEW/);
  const about = await readFile("app/about/page.tsx", "utf8");
  assert.match(about, /fictional people, not BM employees or clients/);
  const css = await readFile("app/premium.css", "utf8");
  assert.match(css, /\.premium-site \.people-photo figcaption \{\s*top: 100%/);
});
const disabledPage = await bundle(
  "app/preview-notifications-disabled/page.tsx",
  {
    "@/lib/preview-safety.mjs":
      "export const isPreview=()=>globalThis.__bmPresentationPreview;",
    "next/navigation": 'export function notFound(){throw Error("NOT_FOUND");}',
    "@/components/premium/Article":
      'import React from "react";export function PremiumArticle({title,intro,children}){return React.createElement("main",null,title,intro,children)}',
  },
);
test("internal notification-disabled notice cannot render in Production but remains bilingual in Preview", async () => {
  try {
    globalThis.__bmPresentationPreview = false;
    await assert.rejects(
      () =>
        disabledPage.default({ searchParams: Promise.resolve({ lang: "en" }) }),
      /NOT_FOUND/,
    );
    globalThis.__bmPresentationPreview = true;
    for (const lang of ["en", "sw"]) {
      const html = renderToStaticMarkup(
        await disabledPage.default({ searchParams: Promise.resolve({ lang }) }),
      );
      assert.match(
        html,
        /notifications are disabled|Arifa za SMS na WhatsApp zimezimwa/,
      );
    }
  } finally {
    delete globalThis.__bmPresentationPreview;
  }
});
