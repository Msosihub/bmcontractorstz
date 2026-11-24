import { purposeOptions } from "./journey";
export type EnquiryState = {
  error?: "invalid" | "rate" | "unavailable";
  draft?: Record<string, string>;
};
export class EnquiryValidationError extends Error {}
export function field(
  form: FormData,
  key: string,
  max: number,
  required = false,
) {
  const value = form.get(key);
  if (value !== null && typeof value !== "string")
    throw new EnquiryValidationError("invalid");
  const text = (value || "").trim();
  if (text.length > max || (required && !text) || /[\u0000-\u0008]/.test(text))
    throw new EnquiryValidationError("invalid");
  return text;
}
export function parseEnquiry(form: FormData, kind: "contact" | "survey") {
  if (field(form, "website", 500)) throw new EnquiryValidationError("invalid");
  const fullName = field(form, "fullName", 120, true);
  const phone = field(form, "phone", 30, kind === "survey");
  const email = field(form, "email", 254);
  if (phone && !/^\+?[\d ()-]{7,30}$/.test(phone))
    throw new EnquiryValidationError("invalid");
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    throw new EnquiryValidationError("invalid");
  if (!phone && !email) throw new EnquiryValidationError("invalid");
  const preference = field(form, "preferredContactMethod", 50);
  if (preference && !["Phone", "Email", "WhatsApp"].includes(preference))
    throw new EnquiryValidationError("invalid");
  if (
    (preference === "Email" && !email) ||
    (["Phone", "WhatsApp"].includes(preference) && !phone)
  )
    throw new EnquiryValidationError("invalid");
  let message = field(form, "message", 3000, kind === "contact");
  const purpose = field(form, "purpose", 30);
  if (purpose && !purposeOptions.some((p) => p.value === purpose))
    throw new EnquiryValidationError("invalid");
  // Map optional journey context into the established model; never create per-stage records.
  const context: string[] = [];
  const selectedPurpose = purposeOptions.find((p) => p.value === purpose);
  if (selectedPurpose) context.push("Enquiry purpose: " + selectedPurpose.en);
  if (kind === "contact")
    for (const [name, label, limit] of [
      ["selectedProduct", "Product", 200],
      ["selectedPackage", "Package", 200],
      ["location", "Area", 200],
      ["propertyType", "Property type", 100],
      ["preferredContactMethod", "Contact preference", 50],
      ["urgency", "Timeframe", 50],
      ["budgetRange", "Budget", 100],
    ] as const) {
      const value = field(form, name, limit);
      if (value) context.push(label + ": " + value);
    }
  if (context.length)
    message = context.join("\n") + (message ? "\n\n" + message : "");
  if (message.length > 3000) throw new EnquiryValidationError("invalid");
  return {
    fullName,
    phone,
    email,
    message,
    subject: field(form, "subject", 200),
    location: field(form, "location", 200, kind === "survey"),
    serviceType: field(form, "serviceType", 100),
    propertyType: field(form, "propertyType", 100),
    budgetRange: field(form, "budgetRange", 100),
    urgency: field(form, "urgency", 50),
    preferredContactMethod: field(form, "preferredContactMethod", 50),
    selectedPackage: field(form, "selectedPackage", 200),
    selectedProduct: field(form, "selectedProduct", 200),
  };
}
export type EnquiryInput = ReturnType<typeof parseEnquiry>;

/** Return only bounded form fields to the same browser after a failed save; never action tokens or honeypots. */
export function enquiryDraft(form: FormData) {
  const limits: Record<string, number> = {
    fullName: 120,
    phone: 30,
    email: 254,
    message: 3000,
    subject: 200,
    location: 200,
    serviceType: 100,
    propertyType: 100,
    budgetRange: 100,
    urgency: 50,
    preferredContactMethod: 50,
    selectedPackage: 200,
    selectedProduct: 200,
    purpose: 30,
  };
  return Object.fromEntries(
    Object.entries(limits).map(([key, max]) => [
      key,
      typeof form.get(key) === "string"
        ? String(form.get(key)).slice(0, max)
        : "",
    ]),
  );
}
