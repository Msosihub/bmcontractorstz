/**
 * Admin Login Page
 * ----------------
 * First step of BM admin OTP login.
 */

import type { Metadata } from "next";
import { requestAdminOtp } from "./actions";
import { SubmitButton } from "@/components/ui/SubmitButton";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: {
    index: false,
    follow: false,
  },
};

type PageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function AdminLoginPage({ searchParams }: PageProps) {
  const params = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-10 text-white">
      <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-black/30 backdrop-blur sm:p-8">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-600 text-xl font-black">
          BM
        </div>

        <h1 className="mt-6 text-3xl font-black">BM Admin Login</h1>

        <p className="mt-3 text-sm leading-7 text-slate-300">
          Enter an authorized BM admin phone number. An OTP will be sent to that
          number.
        </p>

        {params.error ? (
          <div className="mt-5 rounded-2xl bg-red-500/10 p-4 text-sm font-bold text-red-200 ring-1 ring-red-500/20">
            Login failed. Please try again.
          </div>
        ) : null}

        <form action={requestAdminOtp} className="mt-6 grid gap-4">
          <input
            name="phone"
            required
            placeholder="0760111880 or +255760111880"
            className="rounded-2xl border border-white/10 bg-white px-4 py-3 font-bold text-slate-950 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-500/20"
          />

          <SubmitButton>Send OTP</SubmitButton>
        </form>
      </div>
    </main>
  );
}
