import { test } from "node:test";
import assert from "node:assert/strict";
import { bundle, form } from "./helpers.mjs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
let stored = null,
  writes = 0,
  authorized = true;
globalThis.__bmTest = {
  prisma: {
    siteSetting: {
      findUnique: async () => stored,
      create: async ({ data }) => {
        writes++;
        stored = { ...data };
        return stored;
      },
      updateMany: async ({ where, data }) => {
        if (stored.updatedAt.getTime() !== where.updatedAt.getTime())
          return { count: 0 };
        writes++;
        stored = { ...stored, ...data };
        return { count: 1 };
      },
    },
  },
};
const policy = await bundle("lib/customer-belt-policy.ts");
const entry = {
  id: "test-office",
  name: "Synthetic office",
  enabled: true,
  approved: true,
  imagePath: "",
  imageApproved: false,
};
const actions = await bundle("app/admin/(protected)/customers/actions.ts", {
  "@/lib/auth/admin-auth":
    "export async function requireAdmin(){if(!globalThis.__authorized)throw Error('Unauthorized')}",
  "@/lib/customer-belt":
    "export async function verifyCustomerLogo(){return false}",
});
test("customer policy blocks unknown image sources, unapproved claims and duplicate IDs", () => {
  assert.throws(() =>
    policy.parseBeltCustomers([
      {
        ...entry,
        imagePath: "https://private.example/secret",
        imageApproved: true,
      },
    ]),
  );
  assert.throws(() =>
    policy.parseBeltCustomers([
      {
        ...entry,
        imagePath: "/media/customer-logos/../secret.png",
        imageApproved: true,
      },
    ]),
  );
  assert.throws(() =>
    policy.parseBeltCustomers([
      {
        ...entry,
        imagePath: "/media/customer-logos/logo.svg",
        imageApproved: true,
      },
    ]),
  );
  assert.throws(() =>
    policy.parseBeltCustomers([{ ...entry, approved: false }]),
  );
  assert.throws(() => policy.parseBeltCustomers([entry, entry]));
  assert.throws(() => policy.parseBeltCustomers(Array(31).fill(entry)));
  assert.deepEqual(policy.parseBeltCustomers([]), []);
  assert.equal(
    policy.parseBeltCustomers([{ ...entry, name: "  Office  " }])[0].name,
    "Office",
  );
});
test("customer admin denies unauthenticated writes and rejects bad logos before persistence", async () => {
  globalThis.__authorized = false;
  await assert.rejects(
    () =>
      actions.saveCustomerBelt(
        { message: "", version: "initial" },
        form({ version: "initial", customersContent: JSON.stringify([entry]) }),
      ),
    /Unauthorized/,
  );
  assert.equal(writes, 0);
  globalThis.__authorized = true;
  const result = await actions.saveCustomerBelt(
    { message: "", version: "initial" },
    form({
      version: "initial",
      customersContent: JSON.stringify([
        {
          ...entry,
          imagePath: "/media/customer-logos/missing.webp",
          imageApproved: true,
        },
      ]),
    }),
  );
  assert.match(result.message, /Logo file/);
  assert.equal(writes, 0);
});
test("customer admin saves one fixed settings key and prevents stale overwrites", async () => {
  globalThis.__authorized = true;
  const saved = await actions.saveCustomerBelt(
    { message: "", version: "initial" },
    form({ version: "initial", customersContent: JSON.stringify([entry]) }),
  );
  assert.match(saved.message, /Saved/);
  assert.equal(writes, 1);
  assert.equal(stored.key, "cctv_customers_v1");
  const stale = await actions.saveCustomerBelt(
    { message: "", version: "initial" },
    form({ version: "initial", customersContent: "[]" }),
  );
  assert.match(stale.message, /changed/);
  assert.equal(writes, 1);
  const hidden = await actions.saveCustomerBelt(
    saved,
    form({ version: saved.version, customersContent: "[]" }),
  );
  assert.match(hidden.message, /Saved/);
  assert.equal(writes, 2);
  assert.deepEqual(stored.valueJson, []);
});
const belt = await bundle("components/premium/cctv/CustomerBelt.tsx", {
  "next/image":
    "import React from 'react';export default function Image(props){return React.createElement('img',props)}",
});
test("customer belt displays approved names, excludes hidden entries and hides inert duplicates from accessibility", () => {
  for (const lang of ["en", "sw"]) {
    const html = renderToStaticMarkup(
      createElement(belt.CustomerBelt, {
        lang,
        items: [
          entry,
          { ...entry, id: "hidden", name: "Hidden customer", enabled: false },
        ],
      }),
    );
    assert.match(html, /Synthetic office/);
    assert.doesNotMatch(html, /Hidden customer/);
    assert.match(html, /aria-hidden="true" inert=""/);
    assert.match(html, /cctv-customers-pause/);
    assert.doesNotMatch(html, /<img/);
  }
  assert.equal(
    renderToStaticMarkup(
      createElement(belt.CustomerBelt, { lang: "en", items: [] }),
    ),
    "",
  );
});

test("unexpected database failures return a safe message rather than internal details", async () => {
  const original = globalThis.__bmTest.prisma.siteSetting.findUnique;
  globalThis.__bmTest.prisma.siteSetting.findUnique = async () => {
    throw Error("Invalid database detail DO_NOT_ECHO");
  };
  globalThis.__authorized = true;
  try {
    const result = await actions.saveCustomerBelt(
      { message: "", version: "initial" },
      form({ version: "initial", customersContent: JSON.stringify([entry]) }),
    );
    assert.match(result.message, /Save could not be confirmed/);
    assert.doesNotMatch(result.message, /DO_NOT_ECHO/);
  } finally {
    globalThis.__bmTest.prisma.siteSetting.findUnique = original;
  }
});
const media = await bundle("lib/customer-belt.ts");
test("local logo approval checks raster signatures, rejects symlinks and bounds file size", async () => {
  const { mkdir, writeFile, symlink, unlink } = await import(
    "node:fs/promises"
  );
  const path = await import("node:path");
  const crypto = await import("node:crypto");
  const dir = path.resolve("public/media/customer-logos");
  await mkdir(dir, { recursive: true });
  const id = "synthetic-" + crypto.randomUUID();
  const files = [
    id + ".png",
    id + "-bad.jpg",
    id + "-link.png",
    id + "-large.png",
  ];
  try {
    await writeFile(
      path.join(dir, files[0]),
      Buffer.from(
        "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jM6UAAAAASUVORK5CYII=",
        "base64",
      ),
    );
    await writeFile(path.join(dir, files[1]), "not a JPEG");
    await symlink(path.join(dir, files[0]), path.join(dir, files[2]));
    await writeFile(
      path.join(dir, files[3]),
      Buffer.alloc(2 * 1024 * 1024 + 1),
    );
    assert.equal(
      await media.verifyCustomerLogo("/media/customer-logos/" + files[0]),
      true,
    );
    for (const file of files.slice(1))
      assert.equal(
        await media.verifyCustomerLogo("/media/customer-logos/" + file),
        false,
      );
    assert.equal(
      await media.verifyCustomerLogo("/media/customer-logos/../secret.png"),
      false,
    );
  } finally {
    for (const file of files)
      await unlink(path.join(dir, file)).catch(() => {});
  }
});
