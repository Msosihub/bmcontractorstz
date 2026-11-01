import { validateRuntimeArchive } from "../lib/runtime-archive.mjs";
import { readdir } from "node:fs/promises";
import { isPreview } from "../lib/preview-safety.mjs";
import { verifyDatabaseEnvironment } from "../lib/production-database.mjs";
await validateRuntimeArchive(process.cwd());
if (isPreview()) {
  if ((await readdir(".")).some((name) => name.startsWith(".env")))
    throw Error("Preview build must not contain environment files.");
}
await verifyDatabaseEnvironment();
