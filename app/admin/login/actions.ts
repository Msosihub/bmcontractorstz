/**
 * Admin Login Actions
 * -------------------
 * Handles admin OTP request and verification.
 */

"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  addMinutes,
  createAdminSession,
  generateOtp,
  hashValue,
  isAllowedAdminPhone,
  normalizeTanzaniaPhone,
} from "@/lib/auth/admin-auth";
import { sendSms } from "@/lib/africasTalking";

function clean(value: FormDataEntryValue | null) {
  return String(value || "").trim();
}

export async function requestAdminOtp(formData: FormData) {
  const phone = normalizeTanzaniaPhone(clean(formData.get("phone")));

  /**
   * Do not reveal whether a phone is allowed.
   * For security, redirect to OTP page with generic message.
   */
  if (!isAllowedAdminPhone(phone)) {
    redirect(`/admin/login/verify?phone=${encodeURIComponent(phone)}`);
  }

  const recentOtp = await prisma.adminOtp.findFirst({
    where: {
      phone,
      createdAt: {
        gt: new Date(Date.now() - 60 * 1000),
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (recentOtp) {
    redirect(
      `/admin/login/verify?phone=${encodeURIComponent(phone)}&sent=recent`,
    );
  }

  const otp = generateOtp();

  await prisma.adminOtp.create({
    data: {
      phone,
      otpHash: hashValue(otp),
      expiresAt: addMinutes(new Date(), 5),
    },
  });

  await sendSms(
    phone,
    `BM Admin OTP: ${otp}. Expires in 5 minutes. Do not share except with trusted BM admin user.`,
  );

  redirect(`/admin/login/verify?phone=${encodeURIComponent(phone)}&sent=1`);
}

export async function verifyAdminOtp(formData: FormData) {
  const phone = normalizeTanzaniaPhone(clean(formData.get("phone")));
  const otp = clean(formData.get("otp"));

  if (!isAllowedAdminPhone(phone)) {
    redirect("/admin/login?error=invalid");
  }

  if (!otp || otp.length !== 6) {
    redirect(
      `/admin/login/verify?phone=${encodeURIComponent(phone)}&error=otp`,
    );
  }

  const otpRecord = await prisma.adminOtp.findFirst({
    where: {
      phone,
      usedAt: null,
      expiresAt: {
        gt: new Date(),
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!otpRecord) {
    redirect(
      `/admin/login/verify?phone=${encodeURIComponent(phone)}&error=expired`,
    );
  }

  if (otpRecord.attempts >= 5) {
    redirect(
      `/admin/login/verify?phone=${encodeURIComponent(phone)}&error=locked`,
    );
  }

  const isValid = otpRecord.otpHash === hashValue(otp);

  if (!isValid) {
    await prisma.adminOtp.update({
      where: {
        id: otpRecord.id,
      },
      data: {
        attempts: {
          increment: 1,
        },
      },
    });

    redirect(
      `/admin/login/verify?phone=${encodeURIComponent(phone)}&error=wrong`,
    );
  }

  await prisma.adminOtp.update({
    where: {
      id: otpRecord.id,
    },
    data: {
      usedAt: new Date(),
    },
  });

  await createAdminSession(phone);

  redirect("/admin");
}
