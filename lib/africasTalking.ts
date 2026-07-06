/**
 * Africa's Talking SMS Helper
 * ---------------------------
 * Reusable server-side helper for sending SMS notifications.
 *
 * Used for:
 * - Site survey request alerts
 * - Contact form alerts
 * - Appointment request alerts
 * - Future order/product inquiry alerts
 *
 * Important:
 * - Keep AT_API_KEY in .env.local / Vercel env only.
 * - Do not expose this helper in client components.
 */

import { siteConfig } from "@/data/site";

type SendSmsResult = {
  ok: boolean;
  status: number;
  data: unknown;
};

function normalizePhoneForSms(phone: string) {
  /**
   * Convert local Tanzania numbers like 0745778821 to +255745778821.
   * If already starts with +, keep it.
   */
  const cleaned = phone.trim().replace(/\s+/g, "");

  if (cleaned.startsWith("+")) return cleaned;

  if (cleaned.startsWith("0")) {
    return `+255${cleaned.slice(1)}`;
  }

  if (cleaned.startsWith("255")) {
    return `+${cleaned}`;
  }

  return cleaned;
}

export async function sendSms(
  to: string,
  message: string,
): Promise<SendSmsResult> {
  const username = process.env.AT_USERNAME;
  const apiKey = process.env.AT_API_KEY;
  const senderId = process.env.AT_SENDER_ID || "BM SECURITY";

  if (!username || !apiKey) {
    throw new Error("Africa's Talking SMS config is missing.");
  }

  const url = "https://api.africastalking.com/version1/messaging";

  const body = new URLSearchParams({
    username,
    to: normalizePhoneForSms(to),
    message,
    from: senderId,
  });

  const res = await fetch(url, {
    method: "POST",
    headers: {
      apiKey,
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    body,
  });

  const data = await res.json().catch(() => null);

  console.log("Africa's Talking response:", {
    status: res.status,
    data,
  });

  if (!res.ok) {
    throw new Error(`Africa's Talking SMS failed with status ${res.status}`);
  }

  return {
    ok: true,
    status: res.status,
    data,
  };
}

export async function notifyBmOffice(message: string) {
  /**
   * Send one notification message to all BM office numbers.
   * Priority:
   * 1. BM_NOTIFY_NUMBERS env
   * 2. siteConfig.notificationNumbers fallback
   */
  const envNumbers = process.env.BM_NOTIFY_NUMBERS;

  const numbers = envNumbers
    ? envNumbers
        .split(",")
        .map((number) => number.trim())
        .filter(Boolean)
    : siteConfig.notificationNumbers;

  const results = await Promise.allSettled(
    numbers.map((number) => sendSms(number, message)),
  );

  console.log("BM office SMS notification results:", results);

  return results;
}
