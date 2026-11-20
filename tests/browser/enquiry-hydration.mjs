const { chromium } = await import(
  process.env.BM_PLAYWRIGHT_MODULE || "playwright"
);
import assert from "node:assert/strict";
import { writeFile } from "node:fs/promises";
const origin = new URL(
  process.env.BM_LOCAL_BASE_URL || "http://127.0.0.1:3024",
);
assert(
  origin.protocol === "http:" && origin.hostname === "127.0.0.1",
  "Local read-only verification only",
);
const b = await chromium.launch(
    process.env.BM_CHROME_PATH
      ? { executablePath: process.env.BM_CHROME_PATH }
      : {},
  ),
  rows = [];
try {
  for (const route of ["/contact", "/request-site-survey"])
    for (const lang of ["en", "sw"])
      for (const kind of ["untouched", "append", "replace", "clear"]) {
        let release;
        const gate = new Promise((r) => (release = r));
        const c = await b.newContext({ viewport: { width: 390, height: 900 } });
        await c.route("**/*", async (r) => {
          const u = new URL(r.request().url());
          if (u.origin !== origin.origin) return r.abort();
          if (r.request().method() === "POST") return r.abort();
          if (r.request().resourceType() === "script") await gate;
          return r.continue();
        });
        const p = await c.newPage(),
          initial = "Initial technical brief\nLocation:",
          url = new URL(route, origin);
        url.searchParams.set("lang", lang);
        url.searchParams.set("brief", initial);
        await p.goto(url.href, { waitUntil: "commit" });
        const field = p.locator("[name=message]");
        await field.waitFor();
        assert.equal(await field.inputValue(), initial);
        const desired =
          kind === "append"
            ? initial + "\nCustomer typed requirement"
            : kind === "replace"
              ? "Customer replacement"
              : kind === "clear"
                ? ""
                : initial;
        if (kind !== "untouched") await field.fill(desired);
        release();
        await p.waitForLoadState("networkidle");
        await p.waitForTimeout(300);
        assert.equal(
          await field.inputValue(),
          desired,
          lang + " " + kind + " changed during hydration",
        );
        assert.equal(await field.evaluate((e) => e.defaultValue), initial);
        await p.locator("form").evaluate((e) => e.reset());
        assert.equal(
          await field.inputValue(),
          initial,
          "Native reset lost default",
        );
        rows.push({
          route,
          lang,
          kind,
          preHydrationEditPreserved: true,
          nativeResetPreserved: true,
        });
        await c.close();
      }
  for (const route of ["/contact", "/request-site-survey"])
    for (const lang of ["en", "sw"]) {
      const c = await b.newContext({ javaScriptEnabled: false }),
        p = await c.newPage();
      await p.goto(
        new URL(
          route + "?lang=" + lang + "&brief=No-JavaScript%20brief",
          origin,
        ).href,
        { waitUntil: "networkidle" },
      );
      assert.equal(
        await p.locator("[name=message]").inputValue(),
        "No-JavaScript brief",
      );
      await c.close();
    }
} finally {
  await b.close();
}
if (process.env.BM_HYDRATION_RESULTS)
  await writeFile(
    process.env.BM_HYDRATION_RESULTS,
    JSON.stringify(
      { pass: true, rows, noJavaScriptCases: 4, writes: 0 },
      null,
      2,
    ),
  );
console.log({
  pass: true,
  delayedHydrationCases: rows.length,
  noJavaScriptCases: 4,
  writes: 0,
});
