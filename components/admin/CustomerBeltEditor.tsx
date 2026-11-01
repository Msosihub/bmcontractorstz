"use client";
import { useActionState, useState } from "react";
import type { BeltCustomer } from "@/lib/customer-belt-policy";
import { saveCustomerBelt } from "@/app/admin/(protected)/customers/actions";
export function CustomerBeltEditor({
  items,
  version,
}: {
  items: BeltCustomer[];
  version: string;
}) {
  const [draft, setDraft] = useState(items),
    [state, action, pending] = useActionState(saveCustomerBelt, {
      message: "",
      version,
    });
  const update = (id: string, patch: Partial<BeltCustomer>) =>
    setDraft((xs) => xs.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  const move = (i: number, delta: number) =>
    setDraft((xs) => {
      const result = [...xs],
        target = i + delta;
      if (target < 0 || target >= xs.length) return xs;
      [result[i], result[target]] = [result[target], result[i]];
      return result;
    });
  return (
    <form action={action} className="grid gap-5">
      <input
        type="hidden"
        name="customersContent"
        value={JSON.stringify(draft)}
      />
      <input type="hidden" name="version" value={state.version} />
      <fieldset disabled={pending} className="grid gap-5">
        <legend className="sr-only">Customer names and logos</legend>
        {draft.map((x, i) => (
          <section
            key={x.id}
            className="grid gap-4 rounded-2xl bg-white p-5 text-slate-950"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="font-bold">Customer {i + 1}</h3>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => move(i, -1)}
                  disabled={i === 0}
                  aria-label={"Move " + x.name + " up"}
                  className="min-h-11 rounded border px-3 disabled:opacity-40"
                >
                  ↑ Up
                </button>
                <button
                  type="button"
                  onClick={() => move(i, 1)}
                  disabled={i === draft.length - 1}
                  aria-label={"Move " + x.name + " down"}
                  className="min-h-11 rounded border px-3 disabled:opacity-40"
                >
                  ↓ Down
                </button>
              </div>
            </div>
            <label className="grid gap-2">
              Customer / office name
              <input
                value={x.name}
                maxLength={90}
                onChange={(e) => update(x.id, { name: e.target.value })}
                required
                className="rounded border p-3"
              />
            </label>
            <label className="grid gap-2">
              Official logo / image path (optional)
              <input
                value={x.imagePath}
                placeholder="/media/customer-logos/customer-name.webp"
                maxLength={160}
                onChange={(e) => update(x.id, { imagePath: e.target.value })}
                className="rounded border p-3"
              />
            </label>
            <p className="text-sm text-slate-600">
              Leave blank for an initials/name placeholder. Use a prepared local
              PNG, JPEG or WebP up to 2 MB. This form does not upload files or
              fetch remote images.
            </p>
            <label className="flex min-h-11 items-center gap-3">
              <input
                type="checkbox"
                checked={x.approved}
                onChange={(e) => update(x.id, { approved: e.target.checked })}
              />
              Public use of this customer name is approved
            </label>
            <label className="flex min-h-11 items-center gap-3">
              <input
                type="checkbox"
                checked={x.imageApproved}
                onChange={(e) =>
                  update(x.id, { imageApproved: e.target.checked })
                }
              />
              Permission to use this logo/image is confirmed
            </label>
            <label className="flex min-h-11 items-center gap-3">
              <input
                type="checkbox"
                checked={x.enabled}
                onChange={(e) => update(x.id, { enabled: e.target.checked })}
              />
              Show in the CCTV customer belt
            </label>
          </section>
        ))}
        <button
          type="button"
          disabled={draft.length >= 30}
          onClick={() =>
            setDraft((xs) => [
              ...xs,
              {
                id: crypto.randomUUID(),
                name: "",
                imagePath: "",
                imageApproved: false,
                approved: false,
                enabled: false,
              },
            ])
          }
          className="min-h-12 justify-self-start rounded-xl border border-white/40 px-5"
        >
          + Add customer
        </button>
        <button
          type="submit"
          className="min-h-12 justify-self-start rounded-xl bg-white px-6 font-bold text-slate-950"
        >
          {pending ? "Saving…" : "Save customer belt"}
        </button>
      </fieldset>
      <p role="status" className="min-h-8">
        {state.message}
      </p>
    </form>
  );
}
