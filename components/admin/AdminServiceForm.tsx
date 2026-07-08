/**
 * AdminServiceForm Component
 * --------------------------
 * Form for creating BM Contractors service page records.
 *
 * Purpose:
 * - Add or update service pages from admin.
 * - Supports English and Swahili fields.
 * - Saves feature lists as one item per line.
 *
 * Future:
 * - Edit mode.
 * - Service image upload.
 * - Publish/unpublish control.
 */

import { SubmitButton } from "@/components/ui/SubmitButton";
import { createService } from "@/app/admin/services/actions";

export function AdminServiceForm() {
  return (
    <form
      action={createService}
      className="grid h-fit gap-4 rounded-[2rem] bg-white p-6 text-slate-950 shadow-2xl shadow-black/20"
    >
      <div>
        <p className="text-xs font-black uppercase tracking-[0.18em] text-red-600">
          Add Service
        </p>

        <h2 className="mt-2 text-2xl font-black">Create service page</h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Add services like CCTV, Electric Fence, Gate Motors, Access Control,
          Networking and Power Backup.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <input
          name="titleEn"
          required
          placeholder="English title e.g. CCTV Systems"
          className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
        />

        <input
          name="titleSw"
          placeholder="Swahili title e.g. Mifumo ya CCTV"
          className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <input
          name="eyebrowEn"
          placeholder="English label e.g. Security Camera Installation"
          className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
        />

        <input
          name="eyebrowSw"
          placeholder="Swahili label e.g. Installation ya Camera"
          className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
        />
      </div>

      <textarea
        name="descriptionEn"
        required
        placeholder="English short description"
        className="min-h-24 rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
      />

      <textarea
        name="descriptionSw"
        placeholder="Swahili short description"
        className="min-h-24 rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
      />

      <textarea
        name="contentEn"
        placeholder="English full service content"
        className="min-h-32 rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
      />

      <textarea
        name="contentSw"
        placeholder="Swahili full service content"
        className="min-h-32 rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
      />

      <input
        name="imageUrl"
        placeholder="Image URL/path e.g. /images/services/cctv.jpg"
        className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <textarea
          name="featuresEn"
          placeholder={`English features, one per line e.g.\nIndoor and outdoor cameras\nDVR/NVR setup\nRemote viewing`}
          className="min-h-36 rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
        />

        <textarea
          name="featuresSw"
          placeholder={`Swahili features, one per line e.g.\nCamera za ndani na nje\nSetup ya DVR/NVR\nKuangalia kwa simu`}
          className="min-h-36 rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-50"
        />
      </div>

      <SubmitButton loadingText="Saving service...">Save Service</SubmitButton>
    </form>
  );
}
