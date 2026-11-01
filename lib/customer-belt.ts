import { prisma } from "@/lib/prisma";
import defaults from "@/data/cctv-customers.json";
import { CUSTOMER_BELT_KEY, parseBeltCustomers } from "./customer-belt-policy";
import { lstat, readFile, realpath } from "node:fs/promises";
import path from "node:path";
/** No remote fetches, uploads, SVGs, symlinks or filesystem traversal. */
export async function verifyCustomerLogo(imagePath: string) {
  if (
    !/^\/media\/customer-logos\/[a-zA-Z0-9_-]{1,100}\.(png|webp|jpe?g)$/.test(
      imagePath,
    )
  )
    return false;
  const root = path.resolve(process.cwd(), "public"),
    file = path.join(root, imagePath);
  try {
    const info = await lstat(file);
    if (!info.isFile() || info.isSymbolicLink() || info.size > 2 * 1024 * 1024)
      return false;
    const actual = await realpath(file);
    if (actual !== file || !actual.startsWith(root + path.sep)) return false;
    const bytes = await readFile(file);
    const ext = path.extname(file);
    return ext === ".png"
      ? bytes
          .subarray(0, 8)
          .equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))
      : ext === ".webp"
        ? bytes.toString("ascii", 0, 4) === "RIFF" &&
          bytes.toString("ascii", 8, 12) === "WEBP"
        : bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255;
  } catch {
    return false;
  }
}
export async function getCustomerBelt() {
  const setting = await prisma.siteSetting.findUnique({
    where: { key: CUSTOMER_BELT_KEY },
  });
  const items = parseBeltCustomers(setting ? setting.valueJson : defaults);
  const safeItems = await Promise.all(
    items.map(async (item) => ({
      ...item,
      imagePath:
        item.imagePath && (await verifyCustomerLogo(item.imagePath))
          ? item.imagePath
          : "",
    })),
  );
  return {
    items: safeItems,
    version: setting?.updatedAt.toISOString() ?? "initial",
  };
}
