import test from "node:test";
import assert from "node:assert/strict";
import { readdir } from "node:fs/promises";
import { renderToStaticMarkup } from "react-dom/server";
import { bundle } from "./helpers.mjs";

// URL contract from main abae7f8779f101848309b1ce12090da3da1e8742.
// No Git history fetch, real provider call or database connection is required by these tests.
const legacyRoutes = [
  "/",
  "/about",
  "/appointments",
  "/cctv-packages",
  "/cctv-packages/[slug]",
  "/contact",
  "/contact/success",
  "/products",
  "/products/[slug]",
  "/projects",
  "/request-site-survey",
  "/request-site-survey/success",
  "/services",
  "/support",
  "/support/[slug]",
  "/privacy-policy",
  "/terms",
  ...[
    "access-control",
    "air-conditioners",
    "cctv",
    "electric-fence",
    "fire-alarm-systems",
    "gate-motors",
    "maintenance-support",
    "networking",
    "power-backup",
    "solar-panel-systems",
    "solar-street-lights",
    "video-intercom",
  ].map((s) => "/services/" + s),
  "/admin",
  "/admin/login",
  "/admin/login/verify",
  "/admin/logout",
  "/admin/messages",
  "/admin/settings",
  "/admin/site-surveys",
  ...["products", "projects", "services", "packages", "support"].flatMap(
    (s) => ["/admin/" + s, "/admin/" + s + "/[id]/edit"],
  ),
];
async function routes(dir = "app") {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries
      .filter((x) => x.isDirectory())
      .map((x) => routes(dir + "/" + x.name)),
  );
  if (entries.some((x) => x.name === "page.tsx"))
    nested.push([
      "/" +
        dir
          .split("/")
          .slice(1)
          .filter((x) => !x.startsWith("("))
          .join("/"),
    ]);
  return nested.flat();
}
test("all 46 baseline public and admin URL patterns remain, regardless of route-group file changes", async () => {
  const current = new Set(await routes());
  assert.equal(new Set(legacyRoutes).size, 46);
  for (const route of legacyRoutes)
    assert.ok(current.has(route), "Missing legacy URL pattern " + route);
});

test("shortcuts target SW services and the approved WhatsApp contact, with a safe Preview alternative", async () => {
  for (const preview of [true, false]) {
    const config = (
      await bundle("next.config.ts", {
        "./lib/preview-safety.mjs": `export function isPreview(){return ${preview}};export function assertPreviewEnvironment(){}`,
      })
    ).default;
    const redirects = await config.redirects();
    assert.deepEqual(
      redirects.find((x) => x.source === "/huduma"),
      { source: "/huduma", destination: "/services?lang=sw", permanent: true },
    );
    const whatsapp = redirects.find((x) => x.source === "/whatsapp");
    assert.deepEqual(whatsapp, {
      source: "/whatsapp",
      destination: preview
        ? "/preview-notifications-disabled"
        : "https://wa.me/255745778821",
      permanent: !preview,
    });
    assert.ok(
      !redirects.some((x) => x.source === whatsapp.destination),
      "Unexpected redirect chain",
    );
    const old = process.env.NEXT_PUBLIC_BM_PREVIEW;
    try {
      process.env.NEXT_PUBLIC_BM_PREVIEW = preview ? "1" : "0";
      const { siteConfig } = await bundle("data/site.ts");
      assert.equal(siteConfig.whatsapp.url, whatsapp.destination);
      assert.equal(
        siteConfig.whatsapp.raw.replace(/\D/g, ""),
        siteConfig.whatsapp.label.replace(/\D/g, ""),
      );
    } finally {
      if (old === undefined) delete process.env.NEXT_PUBLIC_BM_PREVIEW;
      else process.env.NEXT_PUBLIC_BM_PREVIEW = old;
    }
    if (preview)
      assert.equal(
        (await config.headers())[0].headers[0].value,
        "noindex, nofollow, noarchive",
      );
  }
});

const shell = {
  "@/components/site/Header": "export function Header(){return null}",
  "@/components/site/Footer": "export function Footer(){return null}",
  "@/components/site/EnquiryForm":
    "import React from 'react';export function EnquiryForm({children}){return React.createElement('form',null,children)}",
  "@/components/ui/SubmitButton":
    "import React from 'react';export function SubmitButton({children}){return React.createElement('button',null,children)}",
  "next/image":
    "import React from 'react';export default function Image({fill,preload,...props}){return React.createElement('img',props)}",
  "./actions":
    'export async function createSiteSurveyRequest(){throw Error("No writes permitted in rendering test")}',
};
const survey = await bundle("app/request-site-survey/page.tsx", shell);
test("legacy survey links retain language, service, product and package context in the actual form", async () => {
  for (const lang of ["en", "sw"]) {
    const html = renderToStaticMarkup(
      await survey.default({
        searchParams: Promise.resolve({
          lang,
          service: "cctv",
          product: "synthetic-camera",
          package: "synthetic-package",
        }),
      }),
    );
    for (const [name, value] of [
      ["lang", lang],
      ["serviceType", "cctv"],
      ["selectedProduct", "synthetic-camera"],
      ["selectedPackage", "synthetic-package"],
    ])
      assert.match(
        html,
        new RegExp('name="' + name + '"[^>]*value="' + value + '"'),
      );
    assert.match(html, /name="urgency"/);
    assert.match(html, /name="preferredContactMethod"/);
    if (lang === "sw") {
      assert.match(html, /<option value="Phone">Simu<\/option>/);
      assert.match(html, /<option value="Email">Barua pepe<\/option>/);
    }
  }
});
const appointments = await bundle("app/appointments/page.tsx", shell);
test("appointments remains an assessment enquiry bridge, without claiming a confirmed booking", async () => {
  for (const lang of ["en", "sw"]) {
    const html = renderToStaticMarkup(
      await appointments.default({ searchParams: Promise.resolve({ lang }) }),
    );
    assert.match(html, new RegExp("/request-site-survey\\?lang=" + lang));
    assert.match(
      html,
      lang === "sw"
        ? /si uthibitisho wa miadi/
        : /does not confirm an appointment/,
    );
    assert.doesNotMatch(html, /<form|type="datetime-local"/);
  }
});
const support = await bundle("data/support.ts");
test("all six baseline support-guide slugs remain available to the editorial fallback", () => {
  for (const slug of [
    "how-to-request-site-survey",
    "what-is-included-in-cctv-package",
    "ip-vs-analog-cctv",
    "electric-fence-basics",
    "gate-motor-service-guide",
    "how-to-contact-bm-support",
  ]) {
    const article = support.getSupportArticleBySlug(slug);
    assert.ok(article, slug);
    assert.ok(
      article.titleEn &&
        article.contentEn &&
        article.titleSw &&
        article.contentSw,
      slug,
    );
  }
});

test("each independent Preview suppression flag blocks both SMS helpers before any transport", async () => {
  const keys = [
    "VERCEL_ENV",
    "BM_ISOLATED_PREVIEW",
    "BM_DISABLE_NOTIFICATIONS",
  ];
  const old = Object.fromEntries(keys.map((k) => [k, process.env[k]])),
    originalFetch = globalThis.fetch;
  let transportCalls = 0;
  try {
    globalThis.fetch = async () => {
      transportCalls++;
      throw Error("Network prohibited in compatibility tests");
    };
    const sms = await bundle("lib/africasTalking.ts");
    for (const [key, value] of [
      ["VERCEL_ENV", "preview"],
      ["BM_ISOLATED_PREVIEW", "1"],
      ["BM_DISABLE_NOTIFICATIONS", "1"],
    ]) {
      for (const name of keys) delete process.env[name];
      process.env[key] = value;
      assert.equal(
        (await sms.sendSms("+255700000001", "Synthetic fixture")).status,
        204,
      );
      assert.deepEqual(await sms.notifyBmOffice("Synthetic fixture"), []);
    }
    assert.equal(transportCalls, 0);
  } finally {
    globalThis.fetch = originalFetch;
    for (const key of keys) {
      if (old[key] === undefined) delete process.env[key];
      else process.env[key] = old[key];
    }
  }
});
