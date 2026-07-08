/**
 * Admin Product Actions
 * ---------------------
 * Server actions for managing BM Contractors products.
 *
 * Current features:
 * - Create product category if it does not exist.
 * - Create product with name, brand, category, description and price.
 * - Revalidate admin products page after saving.
 *
 * Future features:
 * - Edit product.
 * - Delete product.
 * - Upload product images.
 * - Publish/unpublish products.
 * - Manage Swahili/English descriptions separately.
 */

"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

function slugify(value: string) {
  /**
   * Converts product/category names into safe URL slugs.
   * Example: "Hikvision 2MP Camera" -> "hikvision-2mp-camera"
   */
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function parsePrice(value: FormDataEntryValue | null) {
  /**
   * Converts price input to number.
   * Empty price becomes null so product can show "Request price".
   */
  const raw = String(value || "")
    .replace(/,/g, "")
    .trim();

  if (!raw) return null;

  const price = Number(raw);

  if (Number.isNaN(price) || price < 0) return null;

  return Math.round(price);
}

export async function createProduct(formData: FormData) {
  const name = String(formData.get("name") || "").trim();
  const brand = String(formData.get("brand") || "").trim();
  const categoryName = String(formData.get("categoryName") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const price = parsePrice(formData.get("price"));
  const imageUrl = String(formData.get("imageUrl") || "").trim();

  if (!name) {
    throw new Error("Product name is required.");
  }

  if (!categoryName) {
    throw new Error("Category name is required.");
  }

  /**
   * Find or create the selected category.
   * For now, Swahili name can be added later from edit screen.
   */
  const category = await prisma.productCategory.upsert({
    where: {
      slug: slugify(categoryName),
    },
    update: {},
    create: {
      slug: slugify(categoryName),
      nameEn: categoryName,
    },
  });

  /**
   * Product slug includes name and timestamp to reduce duplicate slug conflicts.
   */
  const productSlug = `${slugify(name)}-${Date.now().toString().slice(-6)}`;

  await prisma.product.create({
    data: {
      slug: productSlug,
      name,
      brand: brand || null,
      categoryId: category.id,
      description: description || null,
      imageUrl: imageUrl || null,
      price,
      isPublished: true,
    },
  });

  revalidatePath("/admin/products");
  revalidatePath("/products");
}

export async function toggleProductPublished(formData: FormData) {
  /**
   * Publish or hide a product without deleting it.
   */
  const productId = String(formData.get("productId") || "").trim();
  const nextValue = String(formData.get("nextValue") || "") === "true";

  if (!productId) {
    throw new Error("Missing product ID.");
  }

  await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      isPublished: nextValue,
    },
  });

  revalidatePath("/admin/products");
  revalidatePath("/products");
}

export async function updateProduct(formData: FormData) {
  /**
   * Updates an existing product record.
   *
   * Used by:
   * - /admin/products/[id]/edit
   */
  const productId = String(formData.get("productId") || "").trim();

  const name = String(formData.get("name") || "").trim();
  const brand = String(formData.get("brand") || "").trim();
  const categoryName = String(formData.get("categoryName") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const price = parsePrice(formData.get("price"));
  const imageUrl = String(formData.get("imageUrl") || "").trim();

  if (!productId) {
    throw new Error("Missing product ID.");
  }

  if (!name) {
    throw new Error("Product name is required.");
  }

  if (!categoryName) {
    throw new Error("Category name is required.");
  }

  /**
   * Find or create category during edit.
   * This keeps editing fast even if the category does not exist yet.
   */
  const category = await prisma.productCategory.upsert({
    where: {
      slug: slugify(categoryName),
    },
    update: {
      nameEn: categoryName,
    },
    create: {
      slug: slugify(categoryName),
      nameEn: categoryName,
    },
  });

  await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      name,
      brand: brand || null,
      categoryId: category.id,
      description: description || null,
      price,
      imageUrl: imageUrl || null,
    },
  });

  revalidatePath("/admin/products");
  revalidatePath("/products");
}
