/**
 * Protected Admin Layout
 * ----------------------
 * Requires valid BM admin session before showing admin pages.
 */

import { redirect } from "next/navigation";
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

  return children;
}
