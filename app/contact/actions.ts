/**
 * Contact Form Server Actions
 * ---------------------------
 * Handles customer contact/inquiry messages from the public website.
 *
 * What it does:
 * - Receives customer form data.
 * - Validates required fields.
 * - Saves message to Neon Postgres through Prisma.
 * - Sends Africa's Talking SMS notification to BM office numbers.
 * - Redirects to a success page.
 */

"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { notifyBmOffice } from "@/lib/africasTalking";

function shortValue(value: string | null | undefined, fallback = "N/A") {
  return value && value.trim() ? value.trim() : fallback;
}

export async function createContactMessage(formData: FormData) {
  const fullName = String(formData.get("fullName") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const subject = String(formData.get("subject") || "").trim();
  const message = String(formData.get("message") || "").trim();
  const lang = String(formData.get("lang") || "en").trim();

  /**
   * Required fields.
   * We need at least name and message to create a meaningful inquiry.
   */
  if (!fullName || !message) {
    throw new Error("Full name and message are required.");
  }

  /**
   * Save the contact message first.
   * Even if SMS notification fails, the inquiry remains in the database.
   */
  const contactMessage = await prisma.contactMessage.create({
    data: {
      fullName,
      phone: phone || null,
      email: email || null,
      subject: subject || null,
      message,
      status: "NEW",
    },
  });

  /**
   * Notify BM office by SMS.
   * Keep the SMS short so it remains useful and cost-friendly.
   */
  try {
    await notifyBmOffice(
      [
        "BM WEBSITE MESSAGE",
        `Name: ${shortValue(fullName)}`,
        `Phone: ${shortValue(phone)}`,
        `Subject: ${shortValue(subject)}`,
        `Ref: ${contactMessage.id.slice(-6)}`,
      ].join("\n"),
    );
  } catch (error) {
    console.error("Failed to send BM contact SMS notification:", error);
  }

  redirect(`/contact/success?lang=${lang}`);
}
