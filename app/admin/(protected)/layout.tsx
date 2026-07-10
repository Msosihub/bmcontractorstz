/**
 * Protected Admin Layout
 * ----------------------
 * Requires valid BM admin session before showing admin pages.
 */

import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { getCurrentAdminSession } from "@/lib/auth/admin-auth";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getCurrentAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <AdminShell
      title="Admin Dashboard"
      subtitle="Backend foundation for managing BM Contractors website data, requests, products and content."
    >
      {children}
    </AdminShell>
  );
}
