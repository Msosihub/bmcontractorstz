/**
 * Admin Products Page
 * -------------------
 * Backend product management foundation for BM Contractors.
 *
 * Current features:
 * - Shows products from Neon database.
 * - Shows product categories.
 * - Allows admin to create new products.
 *
 * Future features:
 * - Admin login protection.
 * - Edit/delete products.
 * - Upload product images.
 * - Manage prices and publish status.
 * - Add Swahili product fields.
 */

import { prisma } from "@/lib/prisma";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminStatCard } from "@/components/admin/AdminStatCard";
import { AdminProductForm } from "@/components/admin/AdminProductForm";
import { AdminToggleButton } from "@/components/admin/AdminToggleButton";
import { toggleProductPublished } from "./actions";
import Link from "next/link";

function formatMoney(value: number | null) {
  /**
   * Formats TZS prices cleanly for admin view.
   */
  if (!value) return "Request price";

  return `TZS ${value.toLocaleString("en-US")}`;
}

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 50,
  });

  const productCount = await prisma.product.count();
  const categoryCount = await prisma.productCategory.count();

  const publishedCount = await prisma.product.count({
    where: {
      isPublished: true,
    },
  });

  return (
    <AdminShell
      title="Products"
      subtitle="Manage BM Contractors product catalog, prices, brands and categories."
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <AdminStatCard
          label="Products"
          value={productCount}
          hint="Total products in catalog"
        />

        <AdminStatCard
          label="Categories"
          value={categoryCount}
          hint="Product categories"
        />

        <AdminStatCard
          label="Published"
          value={publishedCount}
          hint="Visible products"
        />
      </div>

      <div className="mt-6 grid items-start gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <AdminProductForm />

        <section className="overflow-hidden rounded-[2rem] bg-white text-slate-950 shadow-2xl shadow-black/20">
          <div className="border-b border-slate-200 p-5">
            <h2 className="text-xl font-black">Latest Products</h2>
            <p className="mt-1 text-sm text-slate-500">
              Recently added products and prices.
            </p>
          </div>

          {products.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-lg font-black">No products yet</p>
              <p className="mt-2 text-sm text-slate-500">
                Add your first product using the form.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {products.map((product) => (
                <article
                  key={product.id}
                  className="grid gap-4 p-5 transition hover:bg-slate-50 sm:grid-cols-[1fr_auto]"
                >
                  <div>
                    <p className="font-black">{product.name}</p>

                    <div className="mt-2 flex flex-wrap gap-2 text-xs font-bold">
                      {product.brand ? (
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">
                          {product.brand}
                        </span>
                      ) : null}

                      <span className="rounded-full bg-red-50 px-3 py-1 text-red-700">
                        {product.category?.nameEn || "No category"}
                      </span>

                      <span
                        className={`rounded-full px-3 py-1 ${
                          product.isPublished
                            ? "bg-green-50 text-green-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {product.isPublished ? "Published" : "Hidden"}
                      </span>
                    </div>

                    {product.description ? (
                      <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">
                        {product.description}
                      </p>
                    ) : null}
                  </div>

                  <div className="sm:text-right">
                    <p className="text-sm font-black text-slate-950">
                      {formatMoney(product.price)}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {product.createdAt.toLocaleDateString("en-GB")}
                    </p>

                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="mt-3 inline-flex rounded-full border border-slate-300 px-4 py-2 text-xs font-black text-slate-700 transition hover:bg-slate-50"
                    >
                      Edit
                    </Link>

                    <form
                      action={toggleProductPublished}
                      className="mt-3 sm:mt-4"
                    >
                      <input
                        type="hidden"
                        name="productId"
                        value={product.id}
                      />
                      <input
                        type="hidden"
                        name="nextValue"
                        value={String(!product.isPublished)}
                      />

                      <AdminToggleButton isPublished={product.isPublished} />
                    </form>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </AdminShell>
  );
}
