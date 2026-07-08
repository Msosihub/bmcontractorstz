/**
 * Global Loading Page
 * -------------------
 * Displays when Next.js is loading a new route segment.
 *
 * Purpose:
 * - Gives visitors feedback while navigating between pages.
 * - Improves perceived speed and professional feel.
 * - Works with App Router route transitions.
 */

export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-red-600" />

        <p className="mt-5 text-sm font-black uppercase tracking-[0.2em] text-slate-500">
          Loading BM Contractors
        </p>
      </div>
    </main>
  );
}
