/**
 * AdminProductForm Component
 * --------------------------
 * Product creation form for BM Contractors admin.
 *
 * Purpose:
 * - Add products to Neon database.
 * - Supports basic product details and price.
 * - Uses server action from /admin/products/actions.
 *
 * Future:
 * - Add image upload.
 * - Add Swahili fields.
 * - Add product category dropdown from database.
 * - Add validation messages/toasts.
 */

import { SubmitButton } from "@/components/ui/SubmitButton";
import { createProduct } from "@/app/admin/products/actions";

export function AdminProductForm() {
  return (
    <form
      action={createProduct}
      className="grid gap-4 rounded-[2rem] bg-white p-6 text-slate-950 shadow-2xl shadow-black/20"
    >
      <div>
        <p className="text-xs font-black uppercase tracking-[0.18em] text-red-600">
          Add Product
        </p>
        <h2 className="mt-2 text-2xl font-black">Create new product</h2>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Add products like CCTV cameras, DVR/NVR, HDD, UPS, gate motors,
          electric fence items, routers and accessories.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <input
          name="name"
          required
          placeholder="Product name"
          className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
        />

        <input
          name="brand"
          placeholder="Brand e.g. Hikvision"
          className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <input
          name="categoryName"
          required
          placeholder="Category e.g. CCTV Cameras"
          className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
        />

        <input
          name="price"
          inputMode="numeric"
          placeholder="Price TZS e.g. 65000"
          className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
        />
      </div>

      <textarea
        name="description"
        placeholder="Short product description"
        className="min-h-28 rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
      />

      <SubmitButton loadingText="Saving product...">Save Product</SubmitButton>
    </form>
  );
}
