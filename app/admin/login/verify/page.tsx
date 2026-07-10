/**
 * Admin OTP Verify Page
 * ---------------------
 * Verifies the 6-digit admin login OTP.
 */

import type { Metadata } from "next";
import { verifyAdminOtp } from "../actions";
import { SubmitButton } from "@/components/ui/SubmitButton";

export const metadata: Metadata = {
  title: "Verify Admin OTP",
  robots: {
    index: false,
    follow: false,
  },
};

type PageProps = {
  searchParams: Promise<{
    phone?: string;
    sent?: string;
    error?: string;
  }>;
};

function getErrorMessage(error?: string) {
  if (error === "expired") return "OTP expired. Please request a new code.";
  if (error === "wrong") return "Wrong OTP. Please check and try again.";
  if (error === "locked") return "Too many wrong attempts. Request a new OTP.";
  if (error === "otp") return "Enter a valid 6-digit OTP.";
  return "";
}

export default async function VerifyAdminOtpPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const phone = params.phone || "";
  const errorMessage = getErrorMessage(params.error);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-10 text-white">
      <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-black/30 backdrop-blur sm:p-8">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-600 text-xl font-black">
          BM
        </div>

        <h1 className="mt-6 text-3xl font-black">Enter OTP</h1>

        <p className="mt-3 text-sm leading-7 text-slate-300">
          If the phone number is authorized, a 6-digit OTP has been sent. Enter
          it below.
        </p>

        {params.sent ? (
          <div className="mt-5 rounded-2xl bg-green-500/10 p-4 text-sm font-bold text-green-200 ring-1 ring-green-500/20">
            OTP sent. It expires in 5 minutes.
          </div>
        ) : null}

        {errorMessage ? (
          <div className="mt-5 rounded-2xl bg-red-500/10 p-4 text-sm font-bold text-red-200 ring-1 ring-red-500/20">
            {errorMessage}
          </div>
        ) : null}

        <form action={verifyAdminOtp} className="mt-6 grid gap-4">
          <input type="hidden" name="phone" value={phone} />

          <input
            name="otp"
            required
            inputMode="numeric"
            maxLength={6}
            placeholder="6-digit OTP"
            className="rounded-2xl border border-white/10 bg-white px-4 py-3 text-center text-2xl font-black tracking-[0.4em] text-slate-950 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-500/20"
          />

          <SubmitButton>Verify & Login</SubmitButton>
        </form>
      </div>
    </main>
  );
}
