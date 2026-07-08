/**
 * AdminToggleButton Component
 * ---------------------------
 * Reusable publish/hide action button for admin records.
 *
 * Purpose:
 * - Shows loading state while server action is running.
 * - Used for Products, Services, Packages, Projects and Support Articles.
 */

"use client";

import { useFormStatus } from "react-dom";

type AdminToggleButtonProps = {
  isPublished: boolean;
};

export function AdminToggleButton({ isPublished }: AdminToggleButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-xs font-black transition disabled:cursor-not-allowed disabled:opacity-60 ${
        isPublished
          ? "bg-slate-950 text-white hover:bg-slate-800"
          : "bg-red-600 text-white hover:bg-red-700"
      }`}
    >
      {pending ? (
        <>
          <span className="h-3 w-3 animate-spin rounded-full border-2 border-white/40 border-t-white" />
          Saving
        </>
      ) : isPublished ? (
        "Hide"
      ) : (
        "Publish"
      )}
    </button>
  );
}
