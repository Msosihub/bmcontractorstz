import test from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import { bundle } from "./helpers.mjs";
const shell = {
  "@/components/site/Header": "export function Header(){return null}",
  "@/components/site/Footer": "export function Footer(){return null}",
  "@/components/premium/ExperienceMotion":
    "export function ExperienceMotion(){return null}",
  "next/image":
    "import React from 'react';export default function Image({fill,priority,...p}){void fill;void priority;return React.createElement('img',p)}",
};
const page = await bundle("app/services/electrical-contracting/page.tsx", {
  ...shell,
  "./electrical.css": "",
  "@/lib/services":
    "export async function getServiceRecord(){return globalThis.__electricalRecord}",
  "next/navigation": 'export function notFound(){throw Error("NOT_FOUND")}',
});
test("electrical editorial route respects CMS withdrawal", async () => {
  globalThis.__electricalRecord = { isPublished: false };
  try {
    await assert.rejects(
      () => page.default({ searchParams: Promise.resolve({ lang: "en" }) }),
      /NOT_FOUND/,
    );
  } finally {
    delete globalThis.__electricalRecord;
  }
});
test("electrical scope and all enquiry fields remain bilingual with no invented offers", async () => {
  for (const lang of ["en", "sw"]) {
    const html = renderToStaticMarkup(
      await page.default({ searchParams: Promise.resolve({ lang }) }),
    );
    for (const id of [
      "commercial",
      "panels",
      "industrial",
      "infrastructure",
      "reliability",
      "specialized",
      "interfaces",
    ])
      assert(html.includes(`id="${id}"`));
    const href = html
        .match(/href="(\/contact\?[^"]+)"/)[1]
        .replaceAll("&amp;", "&"),
      u = new URL(href, "https://www.bmcontractorstz.com");
    assert.equal(u.searchParams.get("lang"), lang);
    const brief = u.searchParams.get("brief");
    for (const text of lang === "en"
      ? [
          "Project location",
          "Building/facility",
          "Existing or proposed supply",
          "Voltage",
          "Equipment loads",
          "BOQ",
          "Timeframe",
        ]
      : [
          "Eneo la mradi",
          "Aina ya jengo",
          "Umeme uliopo",
          "Voltage",
          "Mizigo",
          "BOQ",
          "Muda",
        ])
      assert(brief.includes(text));
    assert.doesNotMatch(
      html,
      /TZS [0-9]|Class I\b|ISO 9001|Registered Professional Engineer|24\/7 emergency|lifti zilizokamilika/,
    );
    const schema = JSON.parse(html.match(/<script[^>]*>(.*?)<\/script>/s)[1]);
    assert.equal(
      schema["@graph"][0].provider["@id"],
      "https://www.bmcontractorstz.com/#business",
    );
    assert.equal(schema["@graph"][1].itemListElement.length, 3);
  }
});
test("electrical metadata remains localized and self canonical", async () => {
  for (const lang of ["en", "sw"]) {
    const m = await page.generateMetadata({
      searchParams: Promise.resolve({ lang }),
    });
    assert.equal(
      m.alternates.canonical,
      "https://www.bmcontractorstz.com/services/electrical-contracting" +
        (lang === "sw" ? "?lang=sw" : ""),
    );
    assert(m.alternates.languages.en && m.alternates.languages.sw);
  }
});
const contact = await bundle("app/contact/page.tsx", {
    "./actions": "export async function createContactMessage(){}",
    "@/components/premium/Enquiry":
      "export function PremiumEnquiry(props){return props}",
  }),
  survey = await bundle("app/request-site-survey/page.tsx", {
    "./actions": "export async function createSiteSurveyRequest(){}",
    "@/components/premium/Enquiry":
      "export function PremiumEnquiry(props){return props}",
  });
test("optional electrical brief prefill is bounded and does not change ordinary enquiries", async () => {
  for (const p of [contact, survey]) {
    let element = await p.default({
      searchParams: Promise.resolve({ lang: "sw", brief: "x".repeat(2500) }),
    });
    assert.equal(element.props.initialMessage.length, 2000);
    assert.equal(element.props.lang, "sw");
    element = await p.default({
      searchParams: Promise.resolve({ lang: "en" }),
    });
    assert.equal(element.props.initialMessage, "");
  }
});
const enquiry = await bundle("components/premium/Enquiry.tsx", {
  ...shell,
  "@/components/site/EnquiryForm":
    "export function EnquiryForm({children}){return children}",
  "@/components/ui/SubmitButton": "export function SubmitButton(){return null}",
});
test("prefilled brief is escaped text, not executable markup", () => {
  const html = renderToStaticMarkup(
    enquiry.PremiumEnquiry({
      lang: "en",
      action: async () => ({}),
      initialMessage: "<script>alert(1)</script>",
    }),
  );
  assert.match(html, /&lt;script&gt;alert\(1\)&lt;\/script&gt;/);
  assert.doesNotMatch(html, /<script>alert/);
});
