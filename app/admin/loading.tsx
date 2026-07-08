/**
 * Admin Loading Page
 * ------------------
 * Loading feedback for BM admin dashboard pages.
 *
 * Purpose:
 * - Shows admin users that data is being fetched.
 * - Useful for pages that read from Neon database.
 */

export default function AdminLoading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">
      <div className="text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-red-500" />

        <p className="mt-5 text-sm font-black uppercase tracking-[0.2em] text-slate-300">
          Loading admin
        </p>
      </div>
    </main>
  );
}
