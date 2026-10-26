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
test("both headers share the environment-scoped notice and image disclosures remain intact", async () => {
  for (const path of [
    "components/site/Header.tsx",
    "components/premium/Homepage.tsx",
  ]) {
    const source = await readFile(path, "utf8");
    assert.match(source, /<PreviewNotice lang=\{lang\}/);
    assert.doesNotMatch(source, /<span>PHASE 1B \/ PRIVATE REVIEW/);
  }
  const about = await readFile("app/about/page.tsx", "utf8");
  assert.match(about, /fictional people, not BM employees or clients/);
  const css = await readFile("app/premium.css", "utf8");
  assert.match(css, /\.premium-site \.people-photo figcaption \{\s*top: 100%/);
});
