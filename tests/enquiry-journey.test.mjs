import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { bundle, form } from "./helpers.mjs";
const validation = await bundle("lib/enquiries/validation.ts");
test("journey maps purpose and equipment into existing contact storage without losing customer text", () => {
  const text = "Keep my exact message.\nLocation: Moshi";
  const input = validation.parseEnquiry(
    form({
      lang: "sw",
      fullName: "Synthetic owner",
      phone: "0700000001",
      purpose: "equipment",
      subject: "UPS",
      selectedProduct: "APC model reference",
      selectedPackage: "Office continuity",
      message: text,
    }),
    "contact",
  );
  assert(input.message.endsWith(text));
  assert(input.message.includes("APC model reference"));
  assert(input.message.includes("Equipment & current price"));
  assert.equal(input.subject, "UPS");
  assert.equal(input.selectedProduct, "APC model reference");
});
test("legacy contracts remain byte-equivalent and clearing context is intentional", () => {
  const input = validation.parseEnquiry(
    form({
      fullName: "Synthetic",
      email: "synthetic@example.invalid",
      message: "Exact text",
      selectedProduct: "",
      selectedPackage: "",
      purpose: "",
    }),
    "contact",
  );
  assert.equal(input.message, "Exact text");
  assert.equal(input.selectedProduct, "");
  assert.equal(input.selectedPackage, "");
  assert.equal(input.subject, "");
});
test("invalid purpose, overlong composed briefs, honeypots and missing survey location cannot persist", () => {
  for (const data of [
    { purpose: "invented" },
    { purpose: "equipment", message: "x".repeat(3000) },
    { website: "bot" },
  ])
    assert.throws(() =>
      validation.parseEnquiry(
        form({
          fullName: "Synthetic",
          phone: "0700000001",
          message: "Brief",
          ...data,
        }),
        "contact",
      ),
    );
  assert.throws(() =>
    validation.parseEnquiry(
      form({ fullName: "Synthetic", phone: "0700000001" }),
      "survey",
    ),
  );
});
test("failed-save drafts contain bounded user fields and exclude arbitrary/action/security fields", () => {
  const d = validation.enquiryDraft(
    form({
      fullName: "Synthetic",
      message: "x".repeat(4000),
      website: "bot",
      DATABASE_URL: "not-a-real-secret",
      $ACTION_TOKEN: "not-a-token",
    }),
  );
  assert.equal(d.message.length, 3000);
  for (const k of ["website", "DATABASE_URL", "$ACTION_TOKEN"])
    assert(!(k in d));
});
let selection, lookup, point;
globalThis.__receipt = {
  get: () => point,
  set: () => {},
  find: async (args) => ((lookup = args), selection),
};
const receipt = await bundle("lib/enquiries/receipt.ts", {
  "next/headers":
    "export async function cookies(){return {get:()=>globalThis.__receipt.get(),set:(...a)=>globalThis.__receipt.set(...a)}}",
  "@/lib/prisma":
    "export const prisma={enquirySubmission:{findFirst:(a)=>globalThis.__receipt.find(a)}}",
});
test("success requires an existing recent kind-specific receipt, never a customer record lookup", async () => {
  point = undefined;
  assert.equal(await receipt.confirmedEnquiryReceipt("contact"), undefined);
  point = { value: "fixture_reference_123" };
  selection = null;
  assert.equal(await receipt.confirmedEnquiryReceipt("contact"), undefined);
  selection = { recordId: point.value };
  assert.equal(await receipt.confirmedEnquiryReceipt("contact"), point.value);
  assert.deepEqual(lookup.select, { recordId: true });
  assert.equal(lookup.where.kind, "contact");
  assert(lookup.where.createdAt.gt instanceof Date);
  assert.equal(lookup.where.recordId, point.value);
});
test("receipt lookup degrades only on recognized transport failure and propagates permission/identity errors", async () => {
  point = { value: "fixture_reference_123" };
  globalThis.__receipt.find = async () => {
    throw { code: "ETIMEDOUT" };
  };
  assert.equal(await receipt.confirmedEnquiryReceipt("survey"), undefined);
  globalThis.__receipt.find = async () => {
    throw { code: "42501" };
  };
  await assert.rejects(
    receipt.confirmedEnquiryReceipt("survey"),
    (e) => e.code === "42501",
  );
});
test("privacy hooks accept only categorical funnel values and make no network/storage calls", async () => {
  const s = await readFile("lib/enquiries/funnel.ts", "utf8");
  assert.match(s, /CustomEvent/);
  assert.doesNotMatch(
    s,
    /fetch\(|sendBeacon|localStorage|sessionStorage|phone|email|fullName|message/,
  );
});
const directory = await bundle("app/services/page.tsx", {
  "@/lib/navigation/server":
    "export async function navigationSnapshot(){if(globalThis.__directoryError)throw globalThis.__directoryError;return globalThis.__directoryState}",
  "@/components/site/Header": "export function Header(){return null}",
  "@/components/site/Footer": "export function Footer(){return null}",
  "next/image":
    "import React from 'react';export default function Image({fill,preload,...p}){return React.createElement('img',p)}",
});
const { renderToStaticMarkup } = await import("react-dom/server");
test("directory omits every service link on a transient snapshot and keeps independent enquiry/equipment routes", async () => {
  globalThis.__directoryState = { degraded: true, unpublished: new Set() };
  for (const lang of ["en", "sw"]) {
    const html = renderToStaticMarkup(
      await directory.default({ searchParams: Promise.resolve({ lang }) }),
    );
    assert.doesNotMatch(html, /href="\/services\//);
    assert.doesNotMatch(html, /id="division-navigation"/);
    for (const path of [
      "/products?lang=",
      "/contact?lang=",
      "/request-site-survey?lang=",
    ])
      assert(html.includes(path));
  }
});
test("directory filters withdrawn specialties including dependent Hikvision and never suppresses fatal errors", async () => {
  globalThis.__directoryState = {
    degraded: false,
    unpublished: new Set(["cctv", "institutional-procurement"]),
  };
  const html = renderToStaticMarkup(
    await directory.default({ searchParams: Promise.resolve({ lang: "en" }) }),
  );
  assert.doesNotMatch(
    html,
    /href="\/services\/(cctv|hikvision|institutional-procurement)\?/,
  );
  assert.match(html, /href="\/services\/electric-fence\?/);
  globalThis.__directoryError = { code: "42501" };
  await assert.rejects(
    directory.default({ searchParams: Promise.resolve({}) }),
    (e) => e.code === "42501",
  );
  delete globalThis.__directoryError;
});

const journey = await bundle("lib/enquiries/journey.ts");
test("session drafts reject stale, future, corrupt and unbounded data", () => {
  const now = 10000000,
    valid = { at: now - 1000, stage: 2, data: { message: "Synthetic draft" } };
  assert.equal(journey.decodeEnquiryDraft(JSON.stringify(valid), now).stage, 2);
  for (const data of [
    { ...valid, at: now + 1 },
    { ...valid, at: now - 1800001 },
    { ...valid, stage: 99 },
    { ...valid, data: { message: "x".repeat(3001) } },
  ])
    assert.equal(journey.decodeEnquiryDraft(JSON.stringify(data), now), null);
  assert.equal(journey.decodeEnquiryDraft("not JSON", now), null);
});
test("preferred channels must have a usable corresponding contact", () => {
  assert.throws(() =>
    validation.parseEnquiry(
      form({
        fullName: "Synthetic",
        email: "test@example.invalid",
        message: "Brief",
        preferredContactMethod: "WhatsApp",
      }),
      "contact",
    ),
  );
  assert.throws(() =>
    validation.parseEnquiry(
      form({
        fullName: "Synthetic",
        phone: "0700000001",
        message: "Brief",
        preferredContactMethod: "Email",
      }),
      "contact",
    ),
  );
});

test("directory belt opts into existing hidden/offscreen lifecycle while legacy defaults stay unchanged", async () => {
  const { TrustBelt } = await bundle("components/premium/TrustBelt.tsx", {
    "next/image":
      "import React from 'react';export default function Image({fill,preload,...p}){return React.createElement('img',p)}",
  });
  assert.match(
    renderToStaticMarkup(
      TrustBelt({ kind: "sectors", lang: "en", managedMotion: true }),
    ),
    /data-living="directory-belt"/,
  );
  assert.doesNotMatch(
    renderToStaticMarkup(TrustBelt({ kind: "sectors", lang: "en" })),
    /data-living=/,
  );
});
