import { readFile } from "node:fs/promises";
import {
  validateRuntimeArchive,
  REQUIRED_RUNTIME_FILES,
} from "../lib/runtime-archive.mjs";
if (process.argv[2] === "--list")
  console.log(JSON.stringify(REQUIRED_RUNTIME_FILES));
else {
  const [root, manifestFile] = process.argv.slice(2);
  if (!root) throw Error("Supply an extracted runtime source directory.");
  const manifest = manifestFile
    ? JSON.parse(await readFile(manifestFile, "utf8"))
    : undefined;
  console.log(
    JSON.stringify(
      await validateRuntimeArchive(root, { manifest, clean: true }),
    ),
  );
}
