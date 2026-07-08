/**
 * Admin Support Article Actions
 * -----------------------------
 * Server actions for managing BM Contractors help center articles.
 *
 * Current features:
 * - Create or update support article by slug.
 * - Save English and Swahili article content.
 * - Publish article by default.
 * - Revalidate public and admin support pages.
 *
 * Future:
 * - Edit existing article from detail form.
 * - Delete article.
 * - Publish/unpublish toggle.
 * - Add article image and categories.
 */

"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

function slugify(value: string) {
  /**
   * Converts article title into a URL-safe slug.
   * Example: "How to request site survey" -> "how-to-request-site-survey"
   */
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export async function createSupportArticle(formData: FormData) {
  const categoryEn = String(formData.get("categoryEn") || "").trim();
  const categorySw = String(formData.get("categorySw") || "").trim();

  const titleEn = String(formData.get("titleEn") || "").trim();
  const titleSw = String(formData.get("titleSw") || "").trim();

  const summaryEn = String(formData.get("summaryEn") || "").trim();
  const summarySw = String(formData.get("summarySw") || "").trim();

  const contentEn = String(formData.get("contentEn") || "").trim();
  const contentSw = String(formData.get("contentSw") || "").trim();

  if (!categoryEn) {
    throw new Error("English category is required.");
  }

  if (!titleEn) {
    throw new Error("English title is required.");
  }

  if (!contentEn) {
    throw new Error("English article content is required.");
  }

  const slug = slugify(titleEn);

  /**
   * Upsert allows us to create new articles or update an article
   * if another article with the same English title already exists.
   */
  await prisma.supportArticle.upsert({
    where: {
      slug,
    },
    update: {
      categoryEn,
      categorySw: categorySw || null,
      titleEn,
      titleSw: titleSw || null,
      summaryEn: summaryEn || null,
      summarySw: summarySw || null,
      contentEn,
      contentSw: contentSw || null,
      isPublished: true,
    },
    create: {
      slug,
      categoryEn,
      categorySw: categorySw || null,
      titleEn,
      titleSw: titleSw || null,
      summaryEn: summaryEn || null,
      summarySw: summarySw || null,
      contentEn,
      contentSw: contentSw || null,
      isPublished: true,
    },
  });

  revalidatePath("/admin/support");
  revalidatePath("/support");
  revalidatePath(`/support/${slug}`);
}

export async function toggleSupportArticlePublished(formData: FormData) {
  /**
   * Publish or hide a support article without deleting it.
   */
  const articleId = String(formData.get("articleId") || "").trim();
  const nextValue = String(formData.get("nextValue") || "") === "true";

  if (!articleId) {
    throw new Error("Missing support article ID.");
  }

  const article = await prisma.supportArticle.update({
    where: {
      id: articleId,
    },
    data: {
      isPublished: nextValue,
    },
  });

  revalidatePath("/admin/support");
  revalidatePath("/support");
  revalidatePath(`/support/${article.slug}`);
}
