import { test } from "node:test";
import assert from "node:assert/strict";
import {
  mkdtemp,
  mkdir,
  copyFile,
  rm,
  rename,
  writeFile,
  readFile,
  symlink,
} from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { createHash } from "node:crypto";
import {
  REQUIRED_RUNTIME_FILES,
  validateRuntimeArchive,
} from "../lib/runtime-archive.mjs";
test("runtime package rejects every security entrypoint omission and altered/unreviewed source", async (t) => {
  const root = await mkdtemp(path.join(os.tmpdir(), "bm-archive-"));
  try {
    for (const file of REQUIRED_RUNTIME_FILES) {
      await mkdir(path.dirname(path.join(root, file)), { recursive: true });
      await copyFile(file, path.join(root, file));
    }
    const manifest = {
      includedFiles: await Promise.all(
        REQUIRED_RUNTIME_FILES.map(async (file) => ({
          path: file,
          sha256: createHash("sha256")
            .update(await readFile(path.join(root, file)))
            .digest("hex"),
        })),
      ),
    };
    await validateRuntimeArchive(root, { manifest, clean: true });
    for (const file of REQUIRED_RUNTIME_FILES)
      await t.test("reject missing " + file, async () => {
        await rename(path.join(root, file), root + "-held");
        try {
          await assert.rejects(
            validateRuntimeArchive(root, { manifest, clean: true }),
            { code: "ERR_RUNTIME_ARCHIVE" },
          );
        } finally {
          await rename(root + "-held", path.join(root, file));
        }
      });
    await t.test("reject changed security code", async () => {
      await writeFile(path.join(root, "instrumentation.ts"), "// altered");
      await assert.rejects(
        validateRuntimeArchive(root, { manifest }),
        /hash mismatch/,
      );
      await copyFile(
        "instrumentation.ts",
        path.join(root, "instrumentation.ts"),
      );
    });
    for (const name of [".env.local", "unreviewed.txt"])
      await t.test("reject extra " + name, async () => {
        await writeFile(path.join(root, name), "fixture");
        await assert.rejects(
          validateRuntimeArchive(root, { manifest, clean: true }),
          { code: "ERR_RUNTIME_ARCHIVE" },
        );
        await rm(path.join(root, name));
      });
    await t.test("reject security-file symlink", async () => {
      await rename(path.join(root, "instrumentation.ts"), root + "-held");
      try {
        await symlink(root + "-held", path.join(root, "instrumentation.ts"));
        await assert.rejects(validateRuntimeArchive(root), {
          code: "ERR_RUNTIME_ARCHIVE",
        });
      } finally {
        await rm(path.join(root, "instrumentation.ts"));
        await rename(root + "-held", path.join(root, "instrumentation.ts"));
      }
    });
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
