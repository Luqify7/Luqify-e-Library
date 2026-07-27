"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();

    setMessage("");
    setError("");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/admin/reset-password`,
    });

    if (error) {
      setError(error.message);
      return;
    }

    setMessage(
      "Password reset link sent. Check your email."
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF7F0] flex items-center justify-center p-6">
      <form
        onSubmit={handleReset}
        className="
        w-full
        max-w-md
        rounded-2xl
        bg-white
        p-8
        shadow
        border
        border-[#e8dcc8]
        "
      >
        <h1 className="text-3xl font-bold text-[#3B2412]">
          Forgot Password?
        </h1>

        <p className="mt-3 text-gray-500">
          Enter your admin email and we will send you a reset link.
        </p>

        <input
          className="
          mt-8
          w-full
          rounded-lg
          border
          p-3
          "
          type="email"
          placeholder="Admin email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {message && (
          <p className="mt-4 text-green-600">
            {message}
          </p>
        )}

        {error && (
          <p className="mt-4 text-red-600">
            {error}
          </p>
        )}

        <button
          className="
          mt-6
          w-full
          rounded-lg
          bg-[#3B2412]
          py-3
          text-white
          font-semibold
          "
        >
          Send Reset Link
        </button>

        <Link
          href="/admin/login"
          className="
          mt-5
          block
          text-center
          text-[#C9A96E]
          "
        >
          Back to Login
        </Link>
      </form>
    </main>
  );
}