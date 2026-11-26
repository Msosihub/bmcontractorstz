import test from "node:test";
import assert from "node:assert/strict";
import { bundle } from "./helpers.mjs";

test("withdrawal of either integrated service keeps the other catalogue discoverable", async () => {
  const { resolveNavigation } = await bundle("lib/navigation/resolve.ts");
  for (const withdrawn of [[], ["fire-alarm-systems"], ["telephone-systems"], ["fire-alarm-systems", "telephone-systems"]]) {
    const groups = resolveNavigation(new Set(withdrawn));
    const ids = new Set(groups.flatMap(group => [group.directory, ...group.sections.flatMap(section => section.items), ...(group.feature ? [group.feature.destination] : [])]).map(item => item.id));
    assert.equal(ids.has("catalogue-fire-safety"), !withdrawn.includes("fire-alarm-systems"));
    assert.equal(ids.has("catalogue-telephony"), !withdrawn.includes("telephone-systems"));
    assert(ids.has("catalogue-networking"));
    assert(ids.has("equipment"));
  }
});

test("integrated production sitemap preserves both bilingual catalogues and independently excludes withdrawn equipment", async () => {
  globalThis.__bmIntegratedServices = [];
  const { default: sitemap } = await bundle("app/sitemap.ts", {
    "@/lib/preview-safety.mjs": "export const isPreview=()=>false",
    "@/lib/prisma": "const empty={findMany:async()=>[]};export const prisma={product:empty,cctvPackage:empty,supportArticle:empty,service:{findMany:async()=>globalThis.__bmIntegratedServices}}",
    "@/lib/catalogue/provider": "export async function centurionProducts(){return []}",
  });
  try {
    for (const withdrawn of [[], ["fire-alarm-systems"], ["telephone-systems"], ["fire-alarm-systems", "telephone-systems"]]) {
      globalThis.__bmIntegratedServices = withdrawn.map(slug => ({ slug, isPublished: false }));
      const map = await sitemap();
      for (const [service, catalogue] of [["fire-alarm-systems", "fire-safety"], ["telephone-systems", "telephony"]]) {
        const entries = map.filter(item => item.url.includes("/catalogue/" + catalogue));
        assert.equal(entries.length, withdrawn.includes(service) ? 0 : 14);
        for (const item of entries) assert(item.alternates.languages.en && item.alternates.languages.sw);
      }
      assert(map.some(item => item.url.includes("/catalogue/networking")));
    }
  } finally { delete globalThis.__bmIntegratedServices; }
});
