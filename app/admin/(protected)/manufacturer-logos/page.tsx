import { requireAdminPage } from "@/lib/auth/admin-auth";
import { AdminShell } from "@/components/admin/AdminShell";
import { getManufacturerLogos } from "@/lib/manufacturer-logos";
import { saveManufacturerLogo } from "./actions";

export default async function ManufacturerLogoAdmin({
  searchParams,
}: {
  searchParams: Promise<{ result?: string }>;
}) {
  await requireAdminPage();
  const [slots, { result }] = await Promise.all([
    getManufacturerLogos(),
    searchParams,
  ]);
  const messages: Record<string, string> = {
    saved: "Logo published.",
    invalid:
      "Choose an approved PNG, JPEG or WebP up to 500 KB. Large dimensions or animated files are rejected.",
    conflict:
      "This slot changed. Review the current entry before saving again.",
    failed:
      "Save could not be confirmed. Review the current entry before trying again.",
  };
  return (
    <AdminShell
      title="Homepage manufacturer logos"
      subtitle="Upload artwork you have permission to publish. This strip does not represent certification or customer endorsements."
    >
      {result && messages[result] && (
        <p role="status" className="mb-4 text-white">
          {messages[result]}
        </p>
      )}
      <div className="grid gap-4 md:grid-cols-2">
        {slots.map((item) => (
          <form
            action={saveManufacturerLogo}
            key={item.slot}
            className="grid gap-3 rounded border border-slate-600 p-4 text-white"
          >
            <h2 className="font-bold">
              Row {item.slot <= 5 ? 1 : 2} · Slot {((item.slot - 1) % 5) + 1}
            </h2>
            <input type="hidden" name="slot" value={item.slot} />
            <input type="hidden" name="version" value={item.version} />
            <label className="grid gap-1">
              Manufacturer name
              <input
                required
                name="name"
                maxLength={70}
                defaultValue={item.name}
                className="rounded bg-slate-800 p-2"
              />
            </label>
            <label className="grid gap-1">
              Raster logo (500 KB max)
              <input
                required
                name="logo"
                type="file"
                accept="image/png,image/jpeg,image/webp"
              />
            </label>
            <label>
              <input required name="approved" type="checkbox" /> I have
              permission to publish this artwork.
            </label>
            <button className="rounded bg-white p-2 font-bold text-slate-900">
              Publish logo
            </button>
          </form>
        ))}
      </div>
    </AdminShell>
  );
}
