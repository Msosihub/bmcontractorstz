/**
 * AdminStatCard Component
 * -----------------------
 * Small reusable dashboard card for showing admin statistics.
 *
 * Examples:
 * - Total site survey requests
 * - New requests
 * - Contacted requests
 * - Completed requests
 */

type AdminStatCardProps = {
  label: string;
  value: string | number;
  hint?: string;
};

export function AdminStatCard({ label, value, hint }: AdminStatCardProps) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-5">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
        {label}
      </p>
      <p className="mt-3 text-3xl font-black text-white">{value}</p>
      {hint ? <p className="mt-2 text-sm text-slate-400">{hint}</p> : null}
    </div>
  );
}
