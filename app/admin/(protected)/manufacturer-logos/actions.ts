"use server";

import { requireAdmin } from "@/lib/auth/admin-auth";
import { logoKey } from "@/lib/manufacturer-logos";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import sharp from "sharp";

export async function saveManufacturerLogo(form: FormData) {
  await requireAdmin();
  const key = logoKey(String(form.get("slot") ?? ""));
  const name = String(form.get("name") ?? "").trim();
  const version = Number(form.get("version"));
  const file = form.get("logo");
  let result = "invalid";
  if (
    key &&
    name.length > 0 &&
    name.length <= 70 &&
    form.get("approved") === "on" &&
    file instanceof File &&
    file.size > 0 &&
    file.size <= 512_000
  ) {
    try {
      const input = sharp(Buffer.from(await file.arrayBuffer()), {
        limitInputPixels: 4_000_000,
      });
      const metadata = await input.metadata();
      if (
        ["png", "jpeg", "webp"].includes(metadata.format ?? "") &&
        (metadata.pages ?? 1) === 1
      ) {
        const bytes = await input
          .rotate()
          .resize(440, 180, { fit: "inside", withoutEnlargement: true })
          .webp({ quality: 84 })
          .toBuffer();
        if (bytes.length <= 48_000) {
          const data = {
            value: name,
            valueJson: bytes.toString("base64"),
            updatedAt: new Date(Math.max(Date.now(), version + 1)),
          };
          if (version === 0) {
            await prisma.siteSetting.create({ data: { key, ...data } });
            result = "saved";
          } else if (Number.isSafeInteger(version) && version > 0) {
            const update = await prisma.siteSetting.updateMany({
              where: { key, updatedAt: new Date(version) },
              data,
            });
            result = update.count === 1 ? "saved" : "conflict";
          }
        }
      }
    } catch {
      result = "failed";
    }
  }
  if (result === "saved") revalidatePath("/");
  redirect("/admin/manufacturer-logos?result=" + result);
}
