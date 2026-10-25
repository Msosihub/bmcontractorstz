import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { specificationEntries } from "../lib/product-specifications.mjs";
const json = async (file) =>
  JSON.parse(
    await readFile(new URL("../data/" + file, import.meta.url), "utf8"),
  );
test("all existing specialist routes have bilingual technical choices and valid primary references", async () => {
  const [core, secondary, content, research] = await Promise.all(
    [
      "premium-services.json",
      "secondary-services.json",
      "specialist-technical-content.json",
      "manufacturer-research.json",
    ].map(json),
  );
  assert.deepEqual(
    Object.keys(content).sort(),
    [...core, ...secondary].map((x) => x.slug).sort(),
  );
  for (const [slug, entry] of Object.entries(content)) {
    for (const lang of ["en", "sw"]) {
      const t = entry[lang];
      assert.ok(
        t.title &&
          t.intro &&
          t.comparison.length >= 3 &&
          t.notes.length >= 2 &&
          t.faq.answer,
        slug + " " + lang,
      );
      assert.ok(t.comparison.every((x) => x.option && x.consideration));
    }
    for (const id of entry.references) {
      const r = research.find((x) => x.id === id);
      assert.equal(r?.identityStatus, "primary-source verified");
      assert.match(r.source, /^https:\/\//);
      assert.equal(r.bmSupplyStatus, "not verified per model");
    }
  }
});
test("farm and wildlife guidance stays on the existing fence route with scope and evidence limits", async () => {
  const c = (await json("specialist-technical-content.json"))["electric-fence"];
  assert.match(c.en.comparison[1].consideration, /not interchangeable/);
  assert.match(c.en.comparison[2].consideration, /not evidence/);
  assert.match(c.sw.notes[2].body, /vithibitishwe/);
  const publicDraft = JSON.stringify(
    await json("specialist-technical-content.json"),
  );
  assert.doesNotMatch(publicDraft, /CCBRT|Project T|62 CCTV|47 CCTV/);
});
test("ambiguous identities cannot enter the public manufacturer reference list", async () => {
  const research = await json("manufacturer-research.json");
  for (const id of ["lanstar", "starfix", "lux", "sundar", "hikvision-gates"])
    assert.equal(research.find((x) => x.id === id).identityStatus, "hold");
  const component = await readFile(
    new URL("../components/premium/SpecialistDetail.tsx", import.meta.url),
    "utf8",
  );
  assert.match(component, /identityStatus === "primary-source verified"/);
});
test("public specifications accept actual admin rows and legacy scalar objects without inventing missing values", () => {
  assert.deepEqual(
    specificationEntries([
      { label: "Model", value: "ABC-123" },
      { label: "Ports", value: 0 },
      { label: "Managed", value: false },
    ]),
    [
      ["Model", "ABC-123"],
      ["Ports", "0"],
      ["Managed", "false"],
    ],
  );
  assert.deepEqual(specificationEntries({ Model: "ABC-123", Ports: 8 }), [
    ["Model", "ABC-123"],
    ["Ports", "8"],
  ]);
  assert.deepEqual(
    specificationEntries([
      null,
      [],
      { label: "", value: 4 },
      { label: "X", value: null },
      { label: "X", value: { a: 1 } },
    ]),
    [],
  );
  assert.deepEqual(specificationEntries(null), []);
});
