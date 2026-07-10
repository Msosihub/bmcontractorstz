/**
 * Admin Logout Page
 * -----------------
 * Logs out admin user.
 */

import { logoutAdmin } from "./actions";
import { SubmitButton } from "@/components/ui/SubmitButton";

export default function AdminLogoutPage() {
  return (
    <main className="grid gap-4">
      <h1 className="text-3xl font-black text-white">Logout</h1>

      <form action={logoutAdmin}>
        <SubmitButton>Logout Admin</SubmitButton>
      </form>
    </main>
  );
}
