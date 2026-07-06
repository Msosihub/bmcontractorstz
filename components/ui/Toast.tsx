/**
 * Reusable Toast Component
 * ------------------------
 * Small notification box for success, info, warning, and error messages.
 *
 * Current use:
 * - Show success after form submission.
 *
 * Future use:
 * - Admin actions
 * - Product updates
 * - Contact form status
 * - Appointment request status
 */

type ToastType = "success" | "error" | "info" | "warning";

type ToastProps = {
  type?: ToastType;
  title: string;
  message?: string;
};

const styles: Record<ToastType, string> = {
  success: "border-green-200 bg-green-50 text-green-900",
  error: "border-red-200 bg-red-50 text-red-900",
  info: "border-sky-200 bg-sky-50 text-sky-900",
  warning: "border-amber-200 bg-amber-50 text-amber-900",
};

export function Toast({ type = "info", title, message }: ToastProps) {
  return (
    <div
      className={`rounded-2xl border px-4 py-3 text-sm shadow-sm ${styles[type]}`}
      role="status"
    >
      <p className="font-black">{title}</p>
      {message ? <p className="mt-1 leading-6 opacity-80">{message}</p> : null}
    </div>
  );
}
