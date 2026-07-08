/**
 * SubmitButton Component
 * ----------------------
 * Reusable form submit button with loading state.
 *
 * Purpose:
 * - Shows spinner while server action is processing.
 * - Prevents double submit.
 * - Gives users clear action feedback.
 */

"use client";

import { useFormStatus } from "react-dom";

type SubmitButtonProps = {
  children: React.ReactNode;
  loadingText?: string;
  className?: string;
};

export function SubmitButton({
  children,
  loadingText = "Submitting...",
  className = "",
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-red-600 px-6 py-3 text-sm font-black text-white shadow-sm transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70 ${className}`}
    >
      {pending ? (
        <>
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
          {loadingText}
        </>
      ) : (
        children
      )}
    </button>
  );
}
