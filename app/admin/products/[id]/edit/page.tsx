/**
 * Admin Product Edit Page
 * -----------------------
 * Allows BM admin to edit an existing product.
 *
 * Current features:
 * - Reads product by ID from Neon.
 * - Updates name, brand, category, price and description.
 * - Uses loading submit button.
 *
 * Future:
 * - Image upload.
 * - Swahili description.
 * - Product visibility and delete actions.
 */

import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminShell } from "@/components/admin/AdminShell";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { updateProduct } from "../../actions";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminProductEditPage({ params }: PageProps) {
  const resolvedParams = await params;

  const product = await prisma.product.findUnique({
    where: {
      id: resolvedParams.id,
    },
    include: {
      category: true,
    },
  });

  if (!product) {
    notFound();
  }

  return (
    <AdminShell
      title="Edit Product"
      subtitle="Update product details, category, price and description."
    >
      <div className="grid items-start gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <form
          action={updateProduct}
          className="grid h-fit gap-4 rounded-[2rem] bg-white p-6 text-slate-950 shadow-2xl shadow-black/20"
        >
          <input type="hidden" name="productId" value={product.id} />

          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-red-600">
              Product Editor
            </p>

            <h2 className="mt-2 text-2xl font-black">{product.name}</h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Change product information shown in admin and public product
              catalog.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <input
              name="name"
              required
              defaultValue={product.name}
              placeholder="Product name"
              className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
            />

            <input
              name="brand"
              defaultValue={product.brand || ""}
              placeholder="Brand e.g. Hikvision"
              className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <input
              name="categoryName"
              required
              defaultValue={product.category?.nameEn || ""}
              placeholder="Category e.g. CCTV Cameras"
              className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
            />

            <input
              name="price"
              inputMode="numeric"
              defaultValue={product.price || ""}
              placeholder="Price TZS e.g. 65000"
              className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
            />
          </div>

          <input
            name="imageUrl"
            defaultValue={product.imageUrl || ""}
            placeholder="Image path e.g. /images/products/cctv-products.jpg"
            className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
          />

          <textarea
            name="description"
            defaultValue={product.description || ""}
            placeholder="Short product description"
            className="min-h-32 rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
          />

          <div className="flex flex-col gap-3 sm:flex-row">
            <SubmitButton loadingText="Saving changes...">
              Save Changes
            </SubmitButton>

            <Link
              href="/admin/products"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </Link>
          </div>
        </form>

        <section className="h-fit rounded-[2rem] bg-white p-6 text-slate-950 shadow-2xl shadow-black/20">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-red-600">
            Current Product
          </p>

          <h3 className="mt-3 text-2xl font-black">{product.name}</h3>

          <div className="mt-5 grid gap-3 text-sm text-slate-600">
            <p>
              <span className="font-black text-slate-950">Brand:</span>{" "}
              {product.brand || "N/A"}
            </p>

            <p>
              <span className="font-black text-slate-950">Category:</span>{" "}
              {product.category?.nameEn || "N/A"}
            </p>

            <p>
              <span className="font-black text-slate-950">Price:</span>{" "}
              {product.price
                ? `TZS ${product.price.toLocaleString("en-US")}`
                : "Request price"}
            </p>

            <p>
              <span className="font-black text-slate-950">Status:</span>{" "}
              {product.isPublished ? "Published" : "Hidden"}
            </p>
          </div>

          <p>
            <span className="font-black text-slate-950">Image:</span>{" "}
            {product.imageUrl || "No image yet"}
          </p>
          {product.imageUrl ? (
            <div className="mt-5 overflow-hidden rounded-[1.5rem] bg-slate-950">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="aspect-video w-full object-cover"
              />
            </div>
          ) : null}

          {product.description ? (
            <p className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm leading-7 text-slate-600">
              {product.description}
            </p>
          ) : null}
        </section>
      </div>
    </AdminShell>
  );
}
