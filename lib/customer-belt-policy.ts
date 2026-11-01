export class CustomerBeltError extends Error {}

export type BeltCustomer = {
  id: string;
  name: string;
  enabled: boolean;
  approved: boolean;
  imagePath: string;
  imageApproved: boolean;
};
export const CUSTOMER_BELT_KEY = "cctv_customers_v1";
export function parseBeltCustomers(value: unknown): BeltCustomer[] {
  if (!Array.isArray(value) || value.length > 30)
    throw new CustomerBeltError("Use at most 30 customer entries.");
  const ids = new Set<string>();
  return value.map((x) => {
    if (
      !x ||
      typeof x !== "object" ||
      typeof x.id !== "string" ||
      !/^[a-zA-Z0-9_-]{1,80}$/.test(x.id) ||
      ids.has(x.id)
    )
      throw new CustomerBeltError("Customer IDs must be unique.");
    ids.add(x.id);
    if (
      typeof x.name !== "string" ||
      !x.name.trim() ||
      x.name.trim().length > 90 ||
      /[<>\x00-\x1f]/.test(x.name)
    )
      throw new CustomerBeltError(
        "Customer names must contain 1–90 plain-text characters.",
      );
    for (const field of ["enabled", "approved", "imageApproved"])
      if (typeof x[field] !== "boolean")
        throw new CustomerBeltError("Invalid customer publication setting.");
    if (x.enabled && !x.approved)
      throw new CustomerBeltError(
        "Confirm permission to display each enabled customer name.",
      );
    if (typeof x.imagePath !== "string")
      throw new CustomerBeltError("Invalid logo path.");
    const imagePath = x.imagePath.trim();
    if (
      imagePath &&
      !/^\/media\/customer-logos\/[a-zA-Z0-9_-]{1,100}\.(png|webp|jpe?g)$/.test(
        imagePath,
      )
    )
      throw new CustomerBeltError(
        "Use a local PNG, JPEG or WebP under /media/customer-logos/.",
      );
    if (imagePath && !x.imageApproved)
      throw new CustomerBeltError("Confirm permission to use the logo/image.");
    return {
      id: x.id,
      name: x.name.trim(),
      enabled: x.enabled,
      approved: x.approved,
      imagePath,
      imageApproved: x.imageApproved,
    };
  });
}
