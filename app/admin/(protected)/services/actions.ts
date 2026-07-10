/**
 * Admin Service Actions
 * ---------------------
 * Server actions for managing BM Contractors service pages.
 *
 * Current features:
 * - Create or update service by slug.
 * - Save English and Swahili content.
 * - Save feature lists as JSON arrays.
 * - Revalidate public/admin service pages.
 *
 * Future:
 * - Edit existing service from detail form.
 * - Delete service.
 * - Publish/unpublish service.
 * - Upload service images.
 */

"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

function slugify(value: string) {
  /**
   * Converts service title into URL-safe slug.
   */
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function parseLines(value: string) {
  /**
   * Converts textarea lines into string array.
   */
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

export async function createService(formData: FormData) {
  const titleEn = String(formData.get("titleEn") || "").trim();
  const titleSw = String(formData.get("titleSw") || "").trim();

  const eyebrowEn = String(formData.get("eyebrowEn") || "").trim();
  const eyebrowSw = String(formData.get("eyebrowSw") || "").trim();

  const descriptionEn = String(formData.get("descriptionEn") || "").trim();
  const descriptionSw = String(formData.get("descriptionSw") || "").trim();

  const contentEn = String(formData.get("contentEn") || "").trim();
  const contentSw = String(formData.get("contentSw") || "").trim();

  const imageUrl = String(formData.get("imageUrl") || "").trim();

  const featuresEnRaw = String(formData.get("featuresEn") || "").trim();
  const featuresSwRaw = String(formData.get("featuresSw") || "").trim();

  if (!titleEn) {
    throw new Error("English service title is required.");
  }

  if (!descriptionEn) {
    throw new Error("English service description is required.");
  }

  const slug = slugify(titleEn);

  await prisma.service.upsert({
    where: {
      slug,
    },
    update: {
      titleEn,
      titleSw: titleSw || null,
      eyebrowEn: eyebrowEn || null,
      eyebrowSw: eyebrowSw || null,
      descriptionEn: descriptionEn || null,
      descriptionSw: descriptionSw || null,
      contentEn: contentEn || null,
      contentSw: contentSw || null,
      imageUrl: imageUrl || null,
      featuresEn: parseLines(featuresEnRaw),
      featuresSw: parseLines(featuresSwRaw),
      isPublished: true,
    },
    create: {
      slug,
      titleEn,
      titleSw: titleSw || null,
      eyebrowEn: eyebrowEn || null,
      eyebrowSw: eyebrowSw || null,
      descriptionEn: descriptionEn || null,
      descriptionSw: descriptionSw || null,
      contentEn: contentEn || null,
      contentSw: contentSw || null,
      imageUrl: imageUrl || null,
      featuresEn: parseLines(featuresEnRaw),
      featuresSw: parseLines(featuresSwRaw),
      isPublished: true,
    },
  });

  revalidatePath("/admin/services");
  revalidatePath("/services");
  revalidatePath(`/services/${slug}`);
}

export async function toggleServicePublished(formData: FormData) {
  /**
   * Publish or hide a service page without deleting it.
   */
  const serviceId = String(formData.get("serviceId") || "").trim();
  const nextValue = String(formData.get("nextValue") || "") === "true";

  if (!serviceId) {
    throw new Error("Missing service ID.");
  }

  await prisma.service.update({
    where: {
      id: serviceId,
    },
    data: {
      isPublished: nextValue,
    },
  });

  revalidatePath("/admin/services");
  revalidatePath("/services");
}

export async function updateService(formData: FormData) {
  /**
   * Updates an existing service record.
   *
   * Used by:
   * - /admin/services/[id]/edit
   */
  const serviceId = String(formData.get("serviceId") || "").trim();

  const titleEn = String(formData.get("titleEn") || "").trim();
  const titleSw = String(formData.get("titleSw") || "").trim();

  const eyebrowEn = String(formData.get("eyebrowEn") || "").trim();
  const eyebrowSw = String(formData.get("eyebrowSw") || "").trim();

  const descriptionEn = String(formData.get("descriptionEn") || "").trim();
  const descriptionSw = String(formData.get("descriptionSw") || "").trim();

  const contentEn = String(formData.get("contentEn") || "").trim();
  const contentSw = String(formData.get("contentSw") || "").trim();

  const imageUrl = String(formData.get("imageUrl") || "").trim();

  const featuresEnRaw = String(formData.get("featuresEn") || "").trim();
  const featuresSwRaw = String(formData.get("featuresSw") || "").trim();

  if (!serviceId) {
    throw new Error("Missing service ID.");
  }

  if (!titleEn) {
    throw new Error("English service title is required.");
  }

  if (!descriptionEn) {
    throw new Error("English service description is required.");
  }

  const service = await prisma.service.update({
    where: {
      id: serviceId,
    },
    data: {
      titleEn,
      titleSw: titleSw || null,
      eyebrowEn: eyebrowEn || null,
      eyebrowSw: eyebrowSw || null,
      descriptionEn: descriptionEn || null,
      descriptionSw: descriptionSw || null,
      contentEn: contentEn || null,
      contentSw: contentSw || null,
      imageUrl: imageUrl || null,
      featuresEn: parseLines(featuresEnRaw),
      featuresSw: parseLines(featuresSwRaw),
    },
  });

  revalidatePath("/admin/services");
  revalidatePath("/services");
  revalidatePath(`/services/${service.slug}`);
}
