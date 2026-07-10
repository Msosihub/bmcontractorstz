/**
 * Admin Project Actions
 * ---------------------
 * Server actions for managing BM Contractors project/gallery records.
 *
 * Current features:
 * - Create or update project by slug.
 * - Save English and Swahili title/description.
 * - Save category, location and optional image URL.
 * - Revalidate public/admin project pages.
 *
 * Future:
 * - Upload project photos.
 * - Edit existing project from detail form.
 * - Delete project.
 * - Publish/unpublish project.
 */

"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

function slugify(value: string) {
  /**
   * Converts project title into URL-safe slug.
   */
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export async function createProject(formData: FormData) {
  const titleEn = String(formData.get("titleEn") || "").trim();
  const titleSw = String(formData.get("titleSw") || "").trim();
  const category = String(formData.get("category") || "").trim();
  const location = String(formData.get("location") || "").trim();
  const imageUrl = String(formData.get("imageUrl") || "").trim();
  const descriptionEn = String(formData.get("descriptionEn") || "").trim();
  const descriptionSw = String(formData.get("descriptionSw") || "").trim();

  if (!titleEn) {
    throw new Error("English project title is required.");
  }

  if (!category) {
    throw new Error("Project category is required.");
  }

  const slug = slugify(titleEn);

  await prisma.project.upsert({
    where: {
      slug,
    },
    update: {
      titleEn,
      titleSw: titleSw || null,
      category,
      location: location || null,
      imageUrl: imageUrl || null,
      descriptionEn: descriptionEn || null,
      descriptionSw: descriptionSw || null,
      isPublished: true,
    },
    create: {
      slug,
      titleEn,
      titleSw: titleSw || null,
      category,
      location: location || null,
      imageUrl: imageUrl || null,
      descriptionEn: descriptionEn || null,
      descriptionSw: descriptionSw || null,
      isPublished: true,
    },
  });

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
}

export async function toggleProjectPublished(formData: FormData) {
  /**
   * Publish or hide a project/gallery record without deleting it.
   */
  const projectId = String(formData.get("projectId") || "").trim();
  const nextValue = String(formData.get("nextValue") || "") === "true";

  if (!projectId) {
    throw new Error("Missing project ID.");
  }

  await prisma.project.update({
    where: {
      id: projectId,
    },
    data: {
      isPublished: nextValue,
    },
  });

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
}

export async function updateProject(formData: FormData) {
  /**
   * Updates an existing project/gallery record.
   *
   * Used by:
   * - /admin/projects/[id]/edit
   */
  const projectId = String(formData.get("projectId") || "").trim();

  const titleEn = String(formData.get("titleEn") || "").trim();
  const titleSw = String(formData.get("titleSw") || "").trim();

  const category = String(formData.get("category") || "").trim();
  const location = String(formData.get("location") || "").trim();
  const imageUrl = String(formData.get("imageUrl") || "").trim();

  const descriptionEn = String(formData.get("descriptionEn") || "").trim();
  const descriptionSw = String(formData.get("descriptionSw") || "").trim();

  if (!projectId) {
    throw new Error("Missing project ID.");
  }

  if (!titleEn) {
    throw new Error("English project title is required.");
  }

  if (!category) {
    throw new Error("Project category is required.");
  }

  await prisma.project.update({
    where: {
      id: projectId,
    },
    data: {
      titleEn,
      titleSw: titleSw || null,
      category,
      location: location || null,
      imageUrl: imageUrl || null,
      descriptionEn: descriptionEn || null,
      descriptionSw: descriptionSw || null,
    },
  });

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
}
