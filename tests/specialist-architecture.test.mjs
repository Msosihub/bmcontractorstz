import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { renderToStaticMarkup } from "react-dom/server";
import { bundle } from "./helpers.mjs";
import {
  databaseFailureCategory,
  reportPreviewDatabaseFailure,
} from "../lib/database-diagnostics.mjs";
const divisions = JSON.parse(
  await readFile("data/service-divisions.json", "utf8"),
);
const core = JSON.parse(await readFile("data/premium-services.json", "utf8"));
const secondary = JSON.parse(
  await readFile("data/secondary-services.json", "utf8"),
);
test("each of the existing sixteen routes has one division, with security specialists first", () => {
  const slugs = divisions.flatMap((x) => x.slugs);
  assert.equal(divisions.length, 5);
  assert.equal(slugs.length, 16);
  assert.equal(new Set(slugs).size, 16);
  assert.deepEqual(
    new Set(slugs),
    new Set([...core, ...secondary].map((x) => x.slug)),
  );
  assert.deepEqual(slugs.slice(0, 3), [
    "cctv",
    "electric-fence",
    "gate-motors",
  ]);
});
const nav = await bundle("components/site/SecurityNavigation.tsx");
test("security navigation exposes the established URLs in both languages", () => {
  for (const lang of ["en", "sw"]) {
    const html = renderToStaticMarkup(nav.SecurityNavigation({ lang }));
    for (const slug of ["cctv", "electric-fence", "gate-motors"])
      assert.match(html, new RegExp("/services/" + slug + "\\?lang=" + lang));
    assert.match(html, /<summary>/);
  }
});
globalThis.__bmTest = {
  prisma: { service: { findMany: async () => [{ slug: "cctv" }] } },
};
const directory = await bundle("app/services/page.tsx", {
  "@/components/site/Header": "export function Header(){return null}",
  "@/components/site/Footer": "export function Footer(){return null}",
  "next/image":
    "import React from 'react';export default function Image({fill,...p}){return React.createElement('img',p)}",
});
test("division directory respects withdrawn service records while exposing other specialists", async () => {
  const html = renderToStaticMarkup(
    await directory.default({ searchParams: Promise.resolve({ lang: "sw" }) }),
  );
  assert.doesNotMatch(html, /href="\/services\/cctv\?/);
  assert.match(html, /href="\/services\/electric-fence\?lang=sw/);
  assert.match(html, /kibayometriki/);
  assert.match(html, /uvamizi/);
  assert.match(html, /id="power"/);
});
test("diagnostics classify known failures without exposing messages or custom fields", () => {
  assert.equal(
    databaseFailureCategory({
      cause: { code: "ECONNRESET", message: "SECRET" },
    }),
    "connection-reset",
  );
  assert.equal(
    databaseFailureCategory({ code: "P2028" }),
    "transaction-failure",
  );
  assert.equal(
    databaseFailureCategory({
      code: "SECRET_VALUE",
      message: "postgresql://secret",
    }),
    "unclassified",
  );
  let logs = [];
  reportPreviewDatabaseFailure(
    { code: "P2024", message: "SECRET_PASSWORD", query: "SECRET_QUERY" },
    "survey",
    { BM_ISOLATED_PREVIEW: "1" },
    (x) => logs.push(x),
  );
  assert.deepEqual(JSON.parse(logs[0]), {
    event: "preview-database-failure",
    stage: "survey",
    category: "pool-timeout",
  });
  assert.doesNotMatch(logs[0], /SECRET/);
  reportPreviewDatabaseFailure({}, "contact", {}, (x) => logs.push(x));
  assert.equal(logs.length, 1);
});
