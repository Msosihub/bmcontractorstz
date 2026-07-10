/**
 * Site Survey Server Actions
 * --------------------------
 * Handles public site survey requests.
 *
 * Current features:
 * - Saves request to Neon/Postgres.
 * - Sends useful SMS notification to BM office.
 * - Redirects customer to success page.
 */

"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { notifyBmOffice } from "@/lib/africasTalking";

function clean(value: FormDataEntryValue | null) {
  /**
   * Converts form values into safe trimmed strings.
   */
  return String(value || "").trim();
}

function optional(value: FormDataEntryValue | null) {
  /**
   * Returns null for empty optional form values.
   */
  const text = clean(value);
  return text || null;
}

export async function createSiteSurveyRequest(formData: FormData) {
  const fullName = clean(formData.get("fullName"));
  const phone = clean(formData.get("phone"));
  const email = optional(formData.get("email"));
  const location = clean(formData.get("location"));
  const serviceType = optional(formData.get("serviceType"));
  const propertyType = optional(formData.get("propertyType"));
  const budgetRange = optional(formData.get("budgetRange"));
  const urgency = optional(formData.get("urgency"));
  const preferredContactMethod = optional(
    formData.get("preferredContactMethod"),
  );
  const message = optional(formData.get("message"));

  const lang = clean(formData.get("lang")) === "sw" ? "sw" : "en";

  const selectedPackage = optional(formData.get("selectedPackage"));
  const selectedProduct = optional(formData.get("selectedProduct"));

  if (!fullName || !phone || !location) {
    throw new Error("Full name, phone and location are required.");
  }

  const request = await prisma.siteSurveyRequest.create({
    data: {
      fullName,
      phone,
      email,
      location,
      serviceType,
      propertyType,
      budgetRange,
      urgency,
      preferredContactMethod,
      message,
      selectedPackage,
      selectedProduct,
      status: "NEW",
    },
  });

  const meessage =
    `BM Site Survey Request\n` +
    `Name: ${fullName}\n` +
    `Phone: ${phone}\n` +
    `Location: ${location}\n` +
    `Service: ${serviceType || "Not specified"}\n` +
    `Package: ${selectedPackage || "None"}\n` +
    `Product: ${selectedProduct || "None"}\n` +
    `Property: ${propertyType || "Not specified"}\n` +
    `Budget: ${budgetRange || "Not specified"}\n` +
    `Urgency: ${urgency || "Not specified"}\n` +
    `Contact: ${preferredContactMethod || "Not specified"}\n` +
    `Msg: ${message || "-"}`;
  await notifyBmOffice(meessage);

  redirect(`/request-site-survey/success?lang=${lang}&id=${request.id}`);
}
