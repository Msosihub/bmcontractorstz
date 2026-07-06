/**
 * AdminStatusButton Component
 * ---------------------------
 * Reusable admin form button with loading state.
 *
 * Used for:
 * - Updating site survey request statuses.
 * - Future admin actions like product publish/unpublish.
 */

"use client";

import { useFormStatus } from "react-dom";

type AdminStatusButtonProps = {
  children: React.ReactNode;
};

export function AdminStatusButton({ children }: AdminStatusButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-3 py-1.5 text-xs font-black text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? (
        <>
          <span className="h-3 w-3 animate-spin rounded-full border-2 border-white/40 border-t-white" />
          Saving
        </>
      ) : (
        children
      )}
    </button>
  );
}
