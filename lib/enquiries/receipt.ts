import { isPublicationTransportFailure } from "@/lib/navigation/publication-failure";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
const cookieName = (kind: "contact" | "survey") => "bm_enquiry_receipt_" + kind;
/** This is a short-lived receipt pointer, never an authentication token or a customer-data lookup. */
export async function setEnquiryReceipt(
  kind: "contact" | "survey",
  id: string,
) {
  (await cookies()).set(cookieName(kind), id, {
    httpOnly: true,
    secure: process.env.VERCEL === "1",
    sameSite: "lax",
    path: "/",
    maxAge: 30 * 60,
  });
}
export async function confirmedEnquiryReceipt(kind: "contact" | "survey") {
  const id = (await cookies()).get(cookieName(kind))?.value;
  if (!id || !/^[a-zA-Z0-9_-]{12,100}$/.test(id)) return undefined;
  // A forged, absent or expired pointer cannot produce a successful receipt.
  // Only a reference is selected: no contact names, phone numbers or briefs are read.
  try {
    const receipt = await prisma.enquirySubmission.findFirst({
      where: {
        recordId: id,
        kind,
        createdAt: { gt: new Date(Date.now() - 30 * 60 * 1000) },
      },
      select: { recordId: true },
    });
    return receipt?.recordId;
  } catch (error) {
    if (isPublicationTransportFailure(error)) return undefined;
    throw error;
  }
}
