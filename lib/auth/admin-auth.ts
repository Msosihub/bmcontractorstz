/**
 * Admin Auth Helpers
 * ------------------
 * Passwordless OTP authentication for BM website admin.
 *
 * Features:
 * - Tanzania phone normalization.
 * - Admin phone whitelist.
 * - OTP hashing.
 * - Session token hashing.
 * - Secure cookie settings.
 */

import crypto from "crypto";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export const ADMIN_SESSION_COOKIE = "bm_admin_session";

export function normalizeTanzaniaPhone(input: string) {
  const raw = input.trim().replace(/\s+/g, "");

  if (!raw) return "";

  const phone = raw.replace(/[^\d+]/g, "");

  if (phone.startsWith("+255")) {
    return phone;
  }

  if (phone.startsWith("255")) {
    return `+${phone}`;
  }

  if (phone.startsWith("0") && phone.length === 10) {
    return `+255${phone.slice(1)}`;
  }

  if (phone.startsWith("7") && phone.length === 9) {
    return `+255${phone}`;
  }

  if (phone.startsWith("6") && phone.length === 9) {
    return `+255${phone}`;
  }

  return phone;
}

export function getAllowedAdminPhones() {
  return (process.env.ADMIN_ALLOWED_PHONES || "")
    .split(",")
    .map((phone) => normalizeTanzaniaPhone(phone))
    .filter(Boolean);
}

export function isAllowedAdminPhone(phone: string) {
  const normalized = normalizeTanzaniaPhone(phone);
  return getAllowedAdminPhones().includes(normalized);
}

export function generateOtp() {
  return crypto.randomInt(100000, 999999).toString();
}

export function generateToken() {
  return crypto.randomBytes(32).toString("hex");
}

export function hashValue(value: string) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

export function addMinutes(date: Date, minutes: number) {
  return new Date(date.getTime() + minutes * 60 * 1000);
}

export function addDays(date: Date, days: number) {
  return new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
}

export async function createAdminSession(phone: string) {
  const token = generateToken();
  const sessionHash = hashValue(token);
  const days = Number(process.env.ADMIN_SESSION_DAYS || 7);
  const expiresAt = addDays(new Date(), days);

  await prisma.adminSession.create({
    data: {
      phone,
      sessionHash,
      expiresAt,
    },
  });

  const cookieStore = await cookies();

  cookieStore.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: expiresAt,
  });

  return token;
}

export async function getCurrentAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (!token) return null;

  const sessionHash = hashValue(token);

  const session = await prisma.adminSession.findUnique({
    where: {
      sessionHash,
    },
  });

  if (!session) return null;

  if (session.expiresAt <= new Date()) {
    await prisma.adminSession.delete({
      where: {
        id: session.id,
      },
    });

    return null;
  }

  return session;
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (token) {
    await prisma.adminSession.deleteMany({
      where: {
        sessionHash: hashValue(token),
      },
    });
  }

  cookieStore.delete(ADMIN_SESSION_COOKIE);
}
