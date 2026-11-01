import { requireAdminPage } from "@/lib/auth/admin-auth";
import { AdminShell } from "@/components/admin/AdminShell";
import { CustomerBeltEditor } from "@/components/admin/CustomerBeltEditor";
import { getCustomerBelt } from "@/lib/customer-belt";
export default async function CustomerBeltAdmin() {
  await requireAdminPage();
  const data = await getCustomerBelt();
  return (
    <AdminShell
      title="Customer names & logos"
      subtitle="Manage the CCTV customer belt. Publish only verified customer relationships and logos you have permission to use."
    >
      <CustomerBeltEditor items={data.items} version={data.version} />
    </AdminShell>
  );
}
