import { lstat, readdir, readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";

// Required independently of the packager's inclusion rules: omissions must fail closed.
export const REQUIRED_RUNTIME_FILES = Object.freeze([
  "instrumentation.ts",
  "next.config.ts",
  "proxy.ts",
  "package.json",
  "package-lock.json",
  "tsconfig.json",
  "postcss.config.mjs",
  "prisma.config.ts",
  "prisma/schema.prisma",
  "scripts/preview-build-preflight.mjs",
  "scripts/validate-runtime-archive.mjs",
  "lib/runtime-archive.mjs",
  "lib/prisma.ts",
  "lib/preview-safety.mjs",
  "lib/preview-safety.d.mts",
  "lib/preview-database.mjs",
  "lib/preview-database.d.mts",
  "lib/preview-pg-options.mjs",
  "lib/database-diagnostics.mjs",
  "lib/africasTalking.ts",
  "lib/auth/admin-auth.ts",
  "lib/auth/admin-policy.ts",
  "lib/enquiries/store.ts",
  "lib/enquiries/validation.ts",
  "lib/enquiries/retention.ts",
  "app/admin/login/actions.ts",
  "app/admin/(protected)/layout.tsx",
  "app/admin/(protected)/logout/actions.ts",
  "app/contact/actions.ts",
  "app/request-site-survey/actions.ts",
  "app/layout.tsx",
  "app/robots.ts",
  "app/sitemap.ts",
  "lib/seo.ts",
  "components/site/PreviewNotice.tsx",
  "app/preview-notifications-disabled/page.tsx",
]);
function reject(detail) {
  const error = new Error("Runtime archive rejected: " + detail);
  error.code = "ERR_RUNTIME_ARCHIVE";
  throw error;
}
export async function validateRuntimeArchive(
  root,
  { manifest, clean = false } = {},
) {
  root = path.resolve(root);
  for (const file of REQUIRED_RUNTIME_FILES) {
    const info = await lstat(path.join(root, file)).catch(() => null);
    if (!info?.isFile() || info.isSymbolicLink())
      reject("missing or non-regular required file " + file);
    if (info.size === 0) reject("empty required file " + file);
  }
  if (clean || manifest) {
    const actual = [];
    async function walk(dir = "") {
      for (const item of await readdir(path.join(root, dir), {
        withFileTypes: true,
      })) {
        const file = dir ? dir + "/" + item.name : item.name;
        if (
          item.name.startsWith(".env") ||
          [".git", ".vercel", "node_modules", ".next", ".test-cache"].includes(
            item.name,
          )
        )
          reject("forbidden upload path " + file);
        if (item.isSymbolicLink()) reject("symbolic link " + file);
        if (item.isDirectory()) await walk(file);
        else if (item.isFile()) actual.push(file);
        else reject("non-regular upload path " + file);
      }
    }
    await walk();
    if (manifest) {
      const expected = manifest.includedFiles;
      if (!Array.isArray(expected) || expected.length !== actual.length)
        reject("manifest file inventory mismatch");
      const paths = new Set(expected.map((row) => row.path));
      if (
        paths.size !== actual.length ||
        actual.some((file) => !paths.has(file))
      )
        reject("unreviewed or missing manifest path");
      for (const row of expected) {
        const hash = createHash("sha256")
          .update(await readFile(path.join(root, row.path)))
          .digest("hex");
        if (hash !== row.sha256) reject("source hash mismatch " + row.path);
      }
    }
  }
  return {
    requiredFiles: REQUIRED_RUNTIME_FILES.length,
    hashCheckedFiles: manifest?.includedFiles.length || 0,
    clean,
  };
}
