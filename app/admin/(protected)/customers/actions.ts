"use server";
import { requireAdmin } from "@/lib/auth/admin-auth";
import { validateAdminForm } from "@/lib/admin-validation";
import { prisma } from "@/lib/prisma";
import {
  CustomerBeltError,
  CUSTOMER_BELT_KEY,
  parseBeltCustomers,
} from "@/lib/customer-belt-policy";
import { verifyCustomerLogo } from "@/lib/customer-belt";
import { revalidatePath } from "next/cache";
export async function saveCustomerBelt(
  _previous: { message: string; version: string },
  form: FormData,
) {
  await requireAdmin();
  try {
    validateAdminForm(form);
    const raw = form.get("customersContent");
    if (typeof raw !== "string" || raw.length > 20000)
      throw new CustomerBeltError("Invalid customer list.");
    const items = parseBeltCustomers(JSON.parse(raw));
    for (const item of items)
      if (item.imagePath && !(await verifyCustomerLogo(item.imagePath)))
        throw new CustomerBeltError(
          "Logo file is missing, unsafe or larger than 2 MB. Use a prepared local raster asset.",
        );
    const version = String(form.get("version") || "");
    const current = await prisma.siteSetting.findUnique({
      where: { key: CUSTOMER_BELT_KEY },
    });
    const now = new Date(
      Math.max(Date.now(), current ? current.updatedAt.getTime() + 1 : 0),
    );
    if (current) {
      if (current.updatedAt.toISOString() !== version)
        throw new CustomerBeltError(
          "This list changed in another session. Refresh before saving.",
        );
      const result = await prisma.siteSetting.updateMany({
        where: { key: CUSTOMER_BELT_KEY, updatedAt: current.updatedAt },
        data: { valueJson: items, updatedAt: now },
      });
      if (result.count !== 1)
        throw new CustomerBeltError(
          "This list changed in another session. Refresh before saving.",
        );
    } else {
      if (version !== "initial")
        throw new CustomerBeltError(
          "This list changed. Refresh before saving.",
        );
      await prisma.siteSetting.create({
        data: { key: CUSTOMER_BELT_KEY, valueJson: items, updatedAt: now },
      });
    }
    revalidatePath("/services/cctv");
    revalidatePath("/admin/customers");
    return {
      message: "Saved. Customer names and approved logos now follow this list.",
      version: now.toISOString(),
    };
  } catch (error) {
    const message =
      error instanceof CustomerBeltError
        ? error.message
        : "Save could not be confirmed. Refresh and check the list before retrying.";
    return { message, version: String(form.get("version") || "initial") };
  }
}
