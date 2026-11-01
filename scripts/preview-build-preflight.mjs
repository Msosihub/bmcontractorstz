import { assertEquipmentMediaPublication } from "../lib/equipment-media-policy.mjs";
import { validateRuntimeArchive } from "../lib/runtime-archive.mjs";
import { readdir, readFile } from "node:fs/promises";
import { isPreview } from "../lib/preview-safety.mjs";
import { verifyDatabaseEnvironment } from "../lib/production-database.mjs";
await validateRuntimeArchive(process.cwd());
assertEquipmentMediaPublication(process.env, JSON.parse(await readFile("data/electric-fence-product-images.json", "utf8")));
if (isPreview()) {
  if ((await readdir(".")).some((name) => name.startsWith(".env")))
    throw Error("Preview build must not contain environment files.");
}
await verifyDatabaseEnvironment();
