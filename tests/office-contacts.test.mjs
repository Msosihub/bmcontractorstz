import { test } from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import { bundle } from "./helpers.mjs";
const contacts = await bundle("components/premium/OfficeContacts.tsx");
const footer = await bundle("components/site/Footer.tsx", {
  "next/image":
    "import React from 'react';export default function Image({fill,...p}){return React.createElement('img',p)}",
});
const schema = await bundle("components/seo/LocalBusinessJsonLd.tsx");
const config = await bundle("data/site.ts");
const address = "55 Market Road, Vijana Street, Moshi, Kilimanjaro, Tanzania";
function verifyPhoneLinks(html) {
  const links = [
    ...html.matchAll(/<a[^>]+href="tel:([^"]+)"[^>]*>(.*?)<\/a>/gs),
  ];
  assert.ok(links.length);
  for (const [, raw, label] of links)
    assert.equal(
      raw.replace(/\D/g, ""),
      label.replace(/<[^>]*>/g, "").replace(/\D/g, ""),
    );
}
test("office and footer contacts match confirmed numbers in both languages", () => {
  for (const lang of ["en", "sw"]) {
    const offices = renderToStaticMarkup(contacts.OfficeLocations({ lang }));
    const fullFooter = renderToStaticMarkup(footer.Footer({ lang }));
    for (const html of [offices, fullFooter]) {
      verifyPhoneLinks(html);
      assert.match(html, /255799660068/);
      assert.match(html, /255745778821/);
      assert.ok(html.includes(address));
      assert.match(html, /Mianzini, Arusha, Tanzania/);
      assert.doesNotMatch(html, /supplied separately|itatolewa baadaye/);
      assert.doesNotMatch(
        html,
        /wa.me\/255799660068|wa.me\/255760111880|Dar es Salaam|Dodoma|openingHours|maps.google/,
      );
    }
    assert.match(fullFooter, /tel:\+255760111880/);
    assert.match(fullFooter, /mailto:sales@bmcontractorstz.com/);
    assert.match(offices, lang === "sw" ? /Ofisi ya Arusha/ : /Arusha office/);
  }
});
test("business structured data uses the confirmed Moshi address and distinct Arusha contact without invented address or hours", () => {
  const html = renderToStaticMarkup(schema.LocalBusinessJsonLd());
  const json = JSON.parse(html.match(/<script[^>]*>([\s\S]*)<\/script>/)[1]);
  assert.equal(json.telephone, "+255760111880");
  assert.equal(json.address.streetAddress, "55 Market Road, Vijana Street");
  assert.equal(json.address.addressLocality, "Moshi");
  assert.equal(json.address.addressRegion, "Kilimanjaro");
  assert.equal(json.address.addressCountry, "TZ");
  const arusha = json.contactPoint.find(
    (x) => x.name === "Arusha office — Mianzini",
  );
  assert.equal(arusha.telephone, "+255799660068");
  assert.equal(arusha.address.addressLocality, "Mianzini");
  assert.equal(arusha.address.addressRegion, "Arusha");
  assert.equal(arusha.address.addressCountry, "TZ");
  assert.equal(arusha.address.streetAddress, undefined);
  assert.equal(arusha.hoursAvailable, undefined);
  assert.equal(json.openingHours, undefined);
  assert.equal(json.sameAs, undefined);
  assert.equal(
    json.contactPoint.filter((x) => x.contactType === "WhatsApp").length,
    1,
  );
  assert.equal(
    json.contactPoint.find((x) => x.contactType === "WhatsApp").telephone,
    "+255745778821",
  );
  assert.ok(json.knowsAbout.includes("CCTV installation"));
});
test("display updates do not add Arusha to live notification recipients", () => {
  assert.deepEqual(config.siteConfig.notificationNumbers, [
    "+255745778821",
    "+255760111880",
  ]);
});
const seo = await bundle("lib/seo.ts");
test("contact metadata adds genuine local context while security URL canonicals are retained", () => {
  for (const lang of ["en", "sw"]) {
    const metadata = seo.pageMetadata("/contact", lang);
    assert.match(metadata.description, /Moshi/);
    assert.match(metadata.description, /Arusha/);
    assert.match(metadata.description, /Kilimanjaro/);
    for (const slug of ["cctv", "electric-fence", "gate-motors"])
      assert.equal(
        seo.pageMetadata("/services/" + slug, lang).alternates.canonical,
        "https://www.bmcontractorstz.com/services/" +
          slug +
          (lang === "sw" ? "?lang=sw" : ""),
      );
  }
});
