import crypto from "node:crypto";
import { prisma } from "@/lib/prisma";
import type { EnquiryInput } from "./validation";

export class EnquiryRateError extends Error {}
const hash = (value: string) => crypto.createHash("sha256").update(value).digest("hex");
/** Database locks provide cross-instance rate limiting/deduplication, not process-local memory. */
export async function persistEnquiry(kind: "contact" | "survey", input: EnquiryInput) {
 const sender = hash((input.phone.replace(/[^\d]/g,"").replace(/^0/,"255") || input.email.toLowerCase()));
 const fingerprint = hash(JSON.stringify([kind, ...Object.values(input).map(value => value.toLowerCase())]));
 return prisma.$transaction(async tx => {
  await tx.$queryRaw`SELECT pg_advisory_xact_lock(hashtext(${sender}))::text`;
  const since = new Date(Date.now() - 10 * 60 * 1000);
  const existing = await tx.enquirySubmission.findFirst({ where: { fingerprint, createdAt: { gt: since } } });
  if (existing) return { id: existing.recordId, isNew: false };
  const recent = await tx.enquirySubmission.count({ where: { senderHash: sender, createdAt: { gt: since } } });
  if (recent >= 3) throw new EnquiryRateError("rate");
  const record = kind === "contact" ? await tx.contactMessage.create({ data: {
   fullName: input.fullName, phone: input.phone || null, email: input.email || null,
   subject: input.subject || null, message: input.message, status: "NEW",
  } }) : await tx.siteSurveyRequest.create({ data: {
   fullName: input.fullName, phone: input.phone, email: input.email || null, location: input.location,
   message: input.message || null, serviceType: input.serviceType || null, propertyType: input.propertyType || null,
   budgetRange: input.budgetRange || null, urgency: input.urgency || null,
   preferredContactMethod: input.preferredContactMethod || null, selectedPackage: input.selectedPackage || null,
   selectedProduct: input.selectedProduct || null, status: "NEW",
  } });
  await tx.enquirySubmission.create({ data: { fingerprint, senderHash: sender, kind, recordId: record.id } });
  return { id: record.id, isNew: true };
 }, { maxWait: 5000, timeout: 10000 });
}
