/**
 * Admin Messages Actions
 * ----------------------
 * Server actions for managing customer contact messages.
 *
 * Current features:
 * - Update message status.
 *
 * Future features:
 * - Add internal notes.
 * - Reply by SMS/WhatsApp/email.
 * - Convert message into a lead/job.
 */

"use server";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth/admin-auth";
import { validateAdminForm } from "@/lib/admin-validation";

const allowedStatuses = ["NEW", "CONTACTED", "CLOSED"] as const;

type MessageStatus = (typeof allowedStatuses)[number];

function isAllowedStatus(value: string): value is MessageStatus {
  return allowedStatuses.includes(value as MessageStatus);
}

export async function updateContactMessageStatus(formData: FormData) {
  await requireAdmin();
  validateAdminForm(formData);
  const messageId = String(formData.get("messageId") || "").trim();
  const status = String(formData.get("status") || "").trim();

  if (!messageId) {
    throw new Error("Missing contact message ID.");
  }

  if (!isAllowedStatus(status)) {
    throw new Error("Invalid contact message status.");
  }

  await prisma.contactMessage.update({
    where: {
      id: messageId,
    },
    data: {
      status,
    },
  });

  // AdminActionForm explicitly refreshes after the write has completed.
}
