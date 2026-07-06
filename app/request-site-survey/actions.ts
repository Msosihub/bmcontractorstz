/**
 * Request Site Survey Server Actions
 * ----------------------------------
 * Handles customer site survey form submissions.
 *
 * What it does:
 * - Validates required customer fields.
 * - Saves the request into Neon Postgres.
 * - Sends SMS notification to BM office numbers through Africa's Talking.
 * - Includes selected CCTV package if customer came from package page.
 * - Redirects to a success page.
 */

"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { notifyBmOffice } from "@/lib/africasTalking";

function shortValue(value: string | null | undefined, fallback = "N/A") {
  return value && value.trim() ? value.trim() : fallback;
}

export async function createSiteSurveyRequest(formData: FormData) {
  const fullName = String(formData.get("fullName") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const location = String(formData.get("location") || "").trim();
  const serviceType = String(formData.get("serviceType") || "").trim();
  const propertyType = String(formData.get("propertyType") || "").trim();
  const selectedPackage = String(formData.get("selectedPackage") || "").trim();
  const selectedProduct = String(formData.get("selectedProduct") || "").trim();
  const selectedService = String(formData.get("selectedService") || "").trim();
  const rawMessage = String(formData.get("message") || "").trim();
  const lang = String(formData.get("lang") || "en").trim();

  if (!fullName || !phone) {
    throw new Error("Full name and phone number are required.");
  }

  /**
   * If customer selected a package or product, append it to the message.
   * This keeps the information without changing database schema yet.
   */
  const messageParts = [];

  if (selectedPackage) {
    messageParts.push(`Selected Package: ${selectedPackage}`);
  }

  if (selectedProduct) {
    messageParts.push(`Selected Product: ${selectedProduct}`);
  }

  if (selectedService) {
    messageParts.push(`Selected Service: ${selectedService}`);
  }

  if (rawMessage) {
    messageParts.push(rawMessage);
  }

  const message = messageParts.join("\n\n");

  const request = await prisma.siteSurveyRequest.create({
    data: {
      fullName,
      phone,
      email: email || null,
      location: location || null,
      serviceType: serviceType || null,
      propertyType: propertyType || null,
      message: message || null,
      status: "NEW",
    },
  });

  try {
    await notifyBmOffice(
      [
        "BM SITE SURVEY REQUEST",
        `Name: ${shortValue(fullName)}`,
        `Phone: ${shortValue(phone)}`,
        `Service: ${shortValue(serviceType)}`,
        selectedPackage ? `Package: ${selectedPackage}` : "",
        selectedProduct ? `Product: ${selectedProduct}` : "",
        selectedService ? `Selected: ${selectedService}` : "",
        `Location: ${shortValue(location)}`,
        `Ref: ${request.id.slice(-6)}`,
      ]
        .filter(Boolean)
        .join("\n"),
    );
  } catch (error) {
    console.error("Failed to send BM office SMS notification:", error);
  }

  redirect(`/request-site-survey/success?lang=${lang}`);
}
