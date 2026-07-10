/**
 * Admin Site Survey Actions
 * -------------------------
 * Server actions for managing site survey requests in the admin dashboard.
 *
 * Current features:
 * - Update request status.
 *
 * Future features:
 * - Add internal notes.
 * - Send customer SMS.
 * - Assign request to staff/technician.
 * - Convert request into quotation/job.
 */

"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

const allowedStatuses = [
  "NEW",
  "CONTACTED",
  "QUOTED",
  "COMPLETED",
  "CANCELLED",
] as const;

type SurveyStatus = (typeof allowedStatuses)[number];

function isAllowedStatus(value: string): value is SurveyStatus {
  return allowedStatuses.includes(value as SurveyStatus);
}

export async function updateSiteSurveyStatus(formData: FormData) {
  /**
   * Extract request ID and new status from submitted form.
   */
  const requestId = String(formData.get("requestId") || "").trim();
  const status = String(formData.get("status") || "").trim();

  if (!requestId) {
    throw new Error("Missing site survey request ID.");
  }

  if (!isAllowedStatus(status)) {
    throw new Error("Invalid site survey status.");
  }

  /**
   * Update status in Neon Postgres.
   */
  await prisma.siteSurveyRequest.update({
    where: {
      id: requestId,
    },
    data: {
      status,
    },
  });

  /**
   * Refresh admin page so the latest status appears immediately.
   */
  revalidatePath("/admin/site-surveys");
  revalidatePath("/admin");
}
