import { readFile, readdir, stat } from "node:fs/promises";
import { spawn } from "node:child_process";
import path from "node:path";
import { verifyPreviewDatabase } from "../lib/preview-database.mjs";
import { assertPreviewEnvironment } from "../lib/preview-safety.mjs";
const [mode, credentialFile, port = "3005"] = process.argv.slice(2);
if (!/^\d{4,5}$/.test(port) || Number(port) > 65535)
  throw Error("Invalid local port.");
if (
  !["check", "preflight", "build", "start", "types", "lint", "test"].includes(
    mode,
  ) ||
  !credentialFile ||
  !path.isAbsolute(credentialFile)
)
  throw Error(
    "Use check/build/start/types/lint/test and an absolute restricted Preview URL file.",
  );
if ((await readdir(".")).some((name) => name.startsWith(".env")))
  throw Error(
    "Run only in the separate source copy without environment files.",
  );
if (((await stat(credentialFile)).mode & 0o077) !== 0)
  throw Error("Preview credential file must be owner-only.");
const url = (await readFile(credentialFile, "utf8")).trim();
const env = {
  PATH: process.env.PATH,
  HOME: process.env.HOME,
  TMPDIR: process.env.TMPDIR,
  LANG: "en_US.UTF-8",
  VERCEL_ENV: "preview",
  DATABASE_URL: url,
  BM_ISOLATED_PREVIEW: "1",
  BM_DISABLE_NOTIFICATIONS: "1",
  BM_PREVIEW_DB_HOST: "ep-broad-river-abhqdvw9.eu-west-2.aws.neon.tech",
  BM_PREVIEW_DB_NAME: "bm_preview_20261025",
  BM_PREVIEW_DB_ROLE: "bm_preview_runtime_20261025",
  ADMIN_ALLOWED_PHONES: "+255700000001",
  NEXT_TELEMETRY_DISABLED: "1",
  NODE_ENV: "production",
};
assertPreviewEnvironment(env);
// Shared bounded verification preserves identical build/runtime identity and privilege checks.
await verifyPreviewDatabase(env);
console.log(
  JSON.stringify({
    database: env.BM_PREVIEW_DB_NAME,
    role: env.BM_PREVIEW_DB_ROLE,
    restricted: true,
    notifications: "disabled",
    credentials: "not inherited",
  }),
);
if (mode !== "check") {
  const binaries = {
    preflight: ["../scripts/preview-build-preflight.mjs"],
    build: ["next/dist/bin/next", "build", "--webpack"],
    start: [
      "next/dist/bin/next",
      "start",
      "--hostname",
      "127.0.0.1",
      "--port",
      port,
    ],
    types: ["typescript/bin/tsc", "--noEmit", "--incremental", "false"],
    lint: ["eslint/bin/eslint.js", "."],
    test: [null, "--test", "--test-concurrency=1"],
  };
  let [bin, ...args] = binaries[mode];
  if (mode === "test") {
    const files = (await readdir("tests"))
      .filter((f) => f.endsWith(".test.mjs"))
      .map((f) => "tests/" + f);
    args.push(...files);
  }
  const executable = bin ? path.join("node_modules", bin) : null;
  const child = spawn(
    process.execPath,
    executable ? [executable, ...args] : args,
    { env, stdio: "inherit" },
  );
  child.on("error", () => {
    console.error("Preview process failed to start.");
    process.exitCode = 1;
  });
  child.on("exit", (code) => process.exit(code ?? 1));
}
