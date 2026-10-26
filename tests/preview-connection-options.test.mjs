import test from "node:test";
import assert from "node:assert/strict";
import { Socket, getDefaultAutoSelectFamilyAttemptTimeout } from "node:net";
import {
  previewPgOptions,
  PREVIEW_CONNECTION_BUDGET_MS,
  PREVIEW_ADDRESS_ATTEMPT_MS,
} from "../lib/preview-pg-options.mjs";
const env = {
  VERCEL_ENV: "preview",
  BM_ISOLATED_PREVIEW: "1",
  BM_DISABLE_NOTIFICATIONS: "1",
  DATABASE_URL:
    "postgresql://bm_preview_runtime_20261025:synthetic@ep-broad-river-abhqdvw9.eu-west-2.aws.neon.tech/bm_preview_20261025",
  BM_PREVIEW_DB_HOST: "ep-broad-river-abhqdvw9.eu-west-2.aws.neon.tech",
  BM_PREVIEW_DB_NAME: "bm_preview_20261025",
  BM_PREVIEW_DB_ROLE: "bm_preview_runtime_20261025",
};
test("connection correction is Preview-only and retains strict identity checks", () => {
  assert.deepEqual(previewPgOptions({ VERCEL_ENV: "production" }), {});
  assert.throws(() =>
    previewPgOptions({
      ...env,
      DATABASE_URL: env.DATABASE_URL.replace("bm_preview_20261025", "neondb"),
    }),
  );
  assert.throws(() =>
    previewPgOptions({ ...env, BM_DISABLE_NOTIFICATIONS: "0" }),
  );
  assert.equal(previewPgOptions(env).connectionTimeoutMillis, 15000);
  assert.equal(previewPgOptions(env).max, 1);
});
test("approved pg socket uses a finite per-address window without modifying process defaults or TLS", () => {
  const previous = Socket.prototype.connect,
    globalBudget = getDefaultAutoSelectFamilyAttemptTimeout();
  let options;
  Socket.prototype.connect = function (value) {
    options = value;
    return this;
  };
  try {
    const socket = previewPgOptions(env).stream();
    socket.connect(5432, "approved-host");
    assert.equal(
      options.autoSelectFamilyAttemptTimeout,
      PREVIEW_ADDRESS_ATTEMPT_MS,
    );
    assert.equal(options.autoSelectFamily, true);
    assert.equal(options.host, "approved-host");
    assert.equal(options.port, 5432);
    assert.equal(getDefaultAutoSelectFamilyAttemptTimeout(), globalBudget);
    assert.equal(PREVIEW_CONNECTION_BUDGET_MS, 15000);
    assert.equal("ssl" in previewPgOptions(env), false);
    socket.destroy();
  } finally {
    Socket.prototype.connect = previous;
  }
});
