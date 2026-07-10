/**
 * Admin CCTV Package Actions
 * --------------------------
 * Server actions for managing CCTV packages from admin.
 *
 * Current features:
 * - Create new CCTV package.
 * - Upsert by slug to prevent duplicates.
 * - Revalidate public and admin package pages.
 *
 * Future:
 * - Edit package.
 * - Delete package.
 * - Publish/unpublish package.
 * - Upload package image.
 */

"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

function slugify(value: string) {
  /**
   * Converts package title into a safe URL slug.
   */
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function parseNumber(value: FormDataEntryValue | null) {
  const raw = String(value || "")
    .replace(/,/g, "")
    .trim();

  if (!raw) return null;

  const number = Number(raw);

  if (Number.isNaN(number) || number < 0) return null;

  return Math.round(number);
}

function parseIncludedItems(value: string) {
  /**
   * Allows admin to enter one item per line.
   */
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

export async function createCctvPackage(formData: FormData) {
  const titleEn = String(formData.get("titleEn") || "").trim();
  const titleSw = String(formData.get("titleSw") || "").trim();
  const cameras = parseNumber(formData.get("cameras"));
  const priceFrom = parseNumber(formData.get("priceFrom"));
  const descriptionEn = String(formData.get("descriptionEn") || "").trim();
  const descriptionSw = String(formData.get("descriptionSw") || "").trim();
  const includedItemsRaw = String(formData.get("includedItems") || "").trim();

  if (!titleEn) {
    throw new Error("English package title is required.");
  }

  if (!cameras) {
    throw new Error("Camera count is required.");
  }

  const slug = slugify(titleEn);
  const includedItems = parseIncludedItems(includedItemsRaw);

  await prisma.cctvPackage.upsert({
    where: {
      slug,
    },
    update: {
      titleEn,
      titleSw: titleSw || null,
      cameras,
      priceFrom,
      descriptionEn: descriptionEn || null,
      descriptionSw: descriptionSw || null,
      includedItems,
      isPublished: true,
    },
    create: {
      slug,
      titleEn,
      titleSw: titleSw || null,
      cameras,
      priceFrom,
      descriptionEn: descriptionEn || null,
      descriptionSw: descriptionSw || null,
      includedItems,
      isPublished: true,
    },
  });

  revalidatePath("/admin/packages");
  revalidatePath("/cctv-packages");
}

export async function toggleCctvPackagePublished(formData: FormData) {
  /**
   * Publish or hide a CCTV package without deleting it.
   */
  const packageId = String(formData.get("packageId") || "").trim();
  const nextValue = String(formData.get("nextValue") || "") === "true";

  if (!packageId) {
    throw new Error("Missing CCTV package ID.");
  }

  await prisma.cctvPackage.update({
    where: {
      id: packageId,
    },
    data: {
      isPublished: nextValue,
    },
  });

  revalidatePath("/admin/packages");
  revalidatePath("/cctv-packages");
}

export async function updateCctvPackage(formData: FormData) {
  /**
   * Updates an existing CCTV package record.
   *
   * Used by:
   * - /admin/packages/[id]/edit
   */
  const packageId = String(formData.get("packageId") || "").trim();

  const titleEn = String(formData.get("titleEn") || "").trim();
  const titleSw = String(formData.get("titleSw") || "").trim();

  const cameras = parseNumber(formData.get("cameras"));
  const priceFrom = parseNumber(formData.get("priceFrom"));

  const descriptionEn = String(formData.get("descriptionEn") || "").trim();
  const descriptionSw = String(formData.get("descriptionSw") || "").trim();

  const includedItemsRaw = String(formData.get("includedItems") || "").trim();

  if (!packageId) {
    throw new Error("Missing CCTV package ID.");
  }

  if (!titleEn) {
    throw new Error("English package title is required.");
  }

  if (!cameras) {
    throw new Error("Camera count is required.");
  }

  const pkg = await prisma.cctvPackage.update({
    where: {
      id: packageId,
    },
    data: {
      titleEn,
      titleSw: titleSw || null,
      cameras,
      priceFrom,
      descriptionEn: descriptionEn || null,
      descriptionSw: descriptionSw || null,
      includedItems: parseIncludedItems(includedItemsRaw),
    },
  });

  revalidatePath("/admin/packages");
  revalidatePath("/cctv-packages");
  revalidatePath(`/request-site-survey`);
}
