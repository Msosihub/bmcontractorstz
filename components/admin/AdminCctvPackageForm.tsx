/**
 * AdminCctvPackageForm Component
 * ------------------------------
 * Form for creating CCTV packages from BM admin.
 *
 * Purpose:
 * - Add packages like 4 Camera, 8 Camera, 16 Camera package.
 * - Supports English and Swahili basic content.
 * - Allows included items as one item per line.
 *
 * Future:
 * - Add edit mode.
 * - Add image upload.
 * - Add package items table.
 */

import { SubmitButton } from "@/components/ui/SubmitButton";
import { createCctvPackage } from "@/app/admin/packages/actions";

export function AdminCctvPackageForm() {
  return (
    <form
      action={createCctvPackage}
      className="grid h-fit gap-4 rounded-[2rem] bg-white p-6 text-slate-950 shadow-2xl shadow-black/20"
    >
      <div>
        <p className="text-xs font-black uppercase tracking-[0.18em] text-red-600">
          Add CCTV Package
        </p>
        <h2 className="mt-2 text-2xl font-black">Create CCTV package</h2>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Create packages like 4 Camera Package, 8 Camera Package, 16 Camera
          Package and more.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <input
          name="titleEn"
          required
          placeholder="English title e.g. 8 Camera CCTV Package"
          className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
        />

        <input
          name="titleSw"
          placeholder="Swahili title e.g. Package ya CCTV Camera 8"
          className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <input
          name="cameras"
          required
          inputMode="numeric"
          placeholder="Camera count e.g. 8"
          className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
        />

        <input
          name="priceFrom"
          inputMode="numeric"
          placeholder="Price from TZS e.g. 850000"
          className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
        />
      </div>

      <textarea
        name="descriptionEn"
        placeholder="English description"
        className="min-h-24 rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
      />

      <textarea
        name="descriptionSw"
        placeholder="Swahili description"
        className="min-h-24 rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
      />

      <textarea
        name="includedItems"
        placeholder={`Included items, one per line e.g.\n8 CCTV cameras\n8 channel DVR/NVR\nHDD storage\nCables and connectors\nInstallation option`}
        className="min-h-36 rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
      />

      <SubmitButton loadingText="Saving package...">Save Package</SubmitButton>
    </form>
  );
}
