export type EnquiryState = { error?: "invalid" | "rate" | "unavailable" };
export class EnquiryValidationError extends Error {}
export function field(form: FormData, key: string, max: number, required = false) {
 const value = form.get(key);
 if (value !== null && typeof value !== "string") throw new EnquiryValidationError("invalid");
 const text = (value || "").trim();
 if (text.length > max || (required && !text) || /[\u0000-\u0008]/.test(text)) throw new EnquiryValidationError("invalid");
 return text;
}
export function parseEnquiry(form: FormData, kind: "contact" | "survey") {
 if (field(form,"website",500)) throw new EnquiryValidationError("invalid");
 const fullName = field(form,"fullName",120,true);
 const phone = field(form,"phone",30,kind === "survey");
 const email = field(form,"email",254);
 if (phone && !/^\+?[\d ()-]{7,30}$/.test(phone)) throw new EnquiryValidationError("invalid");
 if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new EnquiryValidationError("invalid");
 if (!phone && !email) throw new EnquiryValidationError("invalid");
 const message = field(form,"message",3000,kind === "contact");
 return { fullName, phone, email, message, subject: field(form,"subject",200),
 location: field(form,"location",200,kind === "survey"),
 serviceType: field(form,"serviceType",100), propertyType: field(form,"propertyType",100),
 budgetRange: field(form,"budgetRange",100), urgency: field(form,"urgency",50),
 preferredContactMethod: field(form,"preferredContactMethod",50),
 selectedPackage: field(form,"selectedPackage",200), selectedProduct: field(form,"selectedProduct",200) };
}
export type EnquiryInput = ReturnType<typeof parseEnquiry>;
