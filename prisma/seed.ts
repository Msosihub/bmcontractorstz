/**
 * Prisma Seed Script
 * ------------------
 * Seeds BM Contractors database with sample startup data.
 *
 * Current seed:
 * - CCTV packages.
 * - Product categories.
 * - Products.
 *
 * Future seed:
 * - Services.
 * - Support articles.
 * - Projects.
 * - Site settings.
 */

import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { cctvPackageSeeds } from "./seed/cctv-packages";
import { productCategorySeeds, productSeeds } from "./seed/products";
import { supportArticleSeeds } from "./seed/support";
import { projectSeeds } from "./seed/projects";
import { serviceSeeds } from "./seed/services";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is missing.");
}

const pool = new Pool({
  connectionString,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});

async function seedCctvPackages() {
  /**
   * Upsert keeps seed safe to run multiple times.
   * Existing packages are updated, missing packages are created.
   */
  for (const item of cctvPackageSeeds) {
    await prisma.cctvPackage.upsert({
      where: {
        slug: item.slug,
      },
      update: {
        titleEn: item.titleEn,
        titleSw: item.titleSw,
        cameras: item.cameras,
        descriptionEn: item.descriptionEn,
        descriptionSw: item.descriptionSw,
        priceFrom: item.priceFrom,
        includedItems: item.includedItems,
        isPublished: true,
      },
      create: {
        slug: item.slug,
        titleEn: item.titleEn,
        titleSw: item.titleSw,
        cameras: item.cameras,
        descriptionEn: item.descriptionEn,
        descriptionSw: item.descriptionSw,
        priceFrom: item.priceFrom,
        includedItems: item.includedItems,
        isPublished: true,
      },
    });
  }

  console.log(`Seeded ${cctvPackageSeeds.length} CCTV packages.`);
}

async function seedProductCategories() {
  /**
   * Creates/updates product categories first.
   * Products depend on these categories.
   */
  for (const category of productCategorySeeds) {
    await prisma.productCategory.upsert({
      where: {
        slug: category.slug,
      },
      update: {
        nameEn: category.nameEn,
        nameSw: category.nameSw,
        description: category.description,
      },
      create: {
        slug: category.slug,
        nameEn: category.nameEn,
        nameSw: category.nameSw,
        description: category.description,
      },
    });
  }

  console.log(`Seeded ${productCategorySeeds.length} product categories.`);
}

async function seedProducts() {
  /**
   * Creates/updates products and connects each product to its category.
   */
  for (const product of productSeeds) {
    const category = await prisma.productCategory.findUnique({
      where: {
        slug: product.categorySlug,
      },
    });

    if (!category) {
      console.warn(`Skipped product ${product.name}: category not found.`);
      continue;
    }

    await prisma.product.upsert({
      where: {
        slug: product.slug,
      },
      update: {
        name: product.name,
        brand: product.brand,
        categoryId: category.id,
        description: product.description,
        price: product.price,
        imageUrl: product.imageUrl || null,
        specifications: product.specifications || [],
        isPublished: true,
      },
      create: {
        slug: product.slug,
        name: product.name,
        brand: product.brand,
        categoryId: category.id,
        description: product.description,
        price: product.price,
        imageUrl: product.imageUrl || null,
        specifications: product.specifications || [],
        isPublished: true,
      },
    });
  }

  console.log(`Seeded ${productSeeds.length} products.`);
}

async function seedSupportArticles() {
  /**
   * Creates/updates support articles for the public help center.
   */
  for (const article of supportArticleSeeds) {
    await prisma.supportArticle.upsert({
      where: {
        slug: article.slug,
      },
      update: {
        categoryEn: article.categoryEn,
        categorySw: article.categorySw,
        titleEn: article.titleEn,
        titleSw: article.titleSw,
        summaryEn: article.summaryEn,
        summarySw: article.summarySw,
        contentEn: article.contentEn,
        contentSw: article.contentSw,
        isPublished: true,
      },
      create: {
        slug: article.slug,
        categoryEn: article.categoryEn,
        categorySw: article.categorySw,
        titleEn: article.titleEn,
        titleSw: article.titleSw,
        summaryEn: article.summaryEn,
        summarySw: article.summarySw,
        contentEn: article.contentEn,
        contentSw: article.contentSw,
        isPublished: true,
      },
    });
  }

  console.log(`Seeded ${supportArticleSeeds.length} support articles.`);
}

async function seedProjects() {
  /**
   * Creates/updates project gallery records.
   */
  for (const project of projectSeeds) {
    await prisma.project.upsert({
      where: {
        slug: project.slug,
      },
      update: {
        titleEn: project.titleEn,
        titleSw: project.titleSw,
        category: project.category,
        location: project.location,
        imageUrl: project.imageUrl,
        descriptionEn: project.descriptionEn,
        descriptionSw: project.descriptionSw,
        isPublished: true,
      },
      create: {
        slug: project.slug,
        titleEn: project.titleEn,
        titleSw: project.titleSw,
        category: project.category,
        location: project.location,
        imageUrl: project.imageUrl,
        descriptionEn: project.descriptionEn,
        descriptionSw: project.descriptionSw,
        isPublished: true,
      },
    });
  }

  console.log(`Seeded ${projectSeeds.length} projects.`);
}

async function seedServices() {
  /**
   * Creates/updates service pages for BM Contractors.
   */
  for (const service of serviceSeeds) {
    await prisma.service.upsert({
      where: {
        slug: service.slug,
      },
      update: {
        titleEn: service.titleEn,
        titleSw: service.titleSw,
        eyebrowEn: service.eyebrowEn,
        eyebrowSw: service.eyebrowSw,
        descriptionEn: service.descriptionEn,
        descriptionSw: service.descriptionSw,
        contentEn: service.contentEn,
        contentSw: service.contentSw,
        imageUrl: service.imageUrl,
        featuresEn: service.featuresEn,
        featuresSw: service.featuresSw,
        isPublished: true,
      },
      create: {
        slug: service.slug,
        titleEn: service.titleEn,
        titleSw: service.titleSw,
        eyebrowEn: service.eyebrowEn,
        eyebrowSw: service.eyebrowSw,
        descriptionEn: service.descriptionEn,
        descriptionSw: service.descriptionSw,
        contentEn: service.contentEn,
        contentSw: service.contentSw,
        imageUrl: service.imageUrl,
        featuresEn: service.featuresEn,
        featuresSw: service.featuresSw,
        isPublished: true,
      },
    });
  }

  console.log(`Seeded ${serviceSeeds.length} services.`);
}

async function main() {
  await seedCctvPackages();
  await seedProductCategories();
  await seedProducts();
  await seedSupportArticles();
  await seedProjects();
  await seedServices();
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (error) => {
    console.error("Seed failed:", error);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
