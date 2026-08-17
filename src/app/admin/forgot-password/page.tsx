"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleReset(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setMessage("");
    setError("");

    const cleanEmail = email.trim();

    if (!cleanEmail) {
      setError("Please enter your admin email.");
      return;
    }

    setLoading(true);

    try {
      const { supabase } = await import("@/lib/supabase");

      const { error: resetError } =
        await supabase.auth.resetPasswordForEmail(
          cleanEmail,
          {
            redirectTo: `${window.location.origin}/admin/reset-password`,
          }
        );

      if (resetError) {
        setError(resetError.message);
        return;
      }

      setMessage(
        "Password reset link sent. Check your email."
      );
    } catch (err) {
      console.error("PASSWORD RESET ERROR:", err);

      setError(
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      className="
        flex
        min-h-screen
        items-center
        justify-center
        bg-[#FAF7F0]
        p-6
        dark:bg-slate-950
      "
    >
      <form
        onSubmit={handleReset}
        className="
          w-full
          max-w-md
          rounded-2xl
          border
          border-[#e8dcc8]
          bg-white
          p-8
          shadow-lg
          dark:border-slate-800
          dark:bg-slate-900
        "
      >
        <h1
          className="
            text-3xl
            font-bold
            text-[#3B2412]
            dark:text-white
          "
        >
          Forgot Password?
        </h1>

        <p
          className="
            mt-3
            text-gray-500
            dark:text-slate-400
          "
        >
          Enter your admin email and we will send you
          a reset link.
        </p>

        <input
          className="
            mt-8
            w-full
            rounded-lg
            border
            border-[#e8dcc8]
            bg-white
            p-3
            text-[#3B2412]
            outline-none
            focus:border-[#C9A96E]
            focus:ring-2
            focus:ring-[#C9A96E]/20
            dark:border-slate-700
            dark:bg-slate-950
            dark:text-white
          "
          type="email"
          placeholder="Admin email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />

        {message && (
          <p
            className="
              mt-4
              rounded-lg
              bg-green-50
              p-3
              text-sm
              text-green-700
              dark:bg-green-950/30
              dark:text-green-400
            "
          >
            {message}
          </p>
        )}

        {error && (
          <p
            className="
              mt-4
              rounded-lg
              bg-red-50
              p-3
              text-sm
              text-red-700
              dark:bg-red-950/30
              dark:text-red-400
            "
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="
            mt-6
            w-full
            rounded-lg
            bg-[#3B2412]
            py-3
            font-semibold
            text-white
            transition
            hover:bg-[#4d301b]
            disabled:cursor-not-allowed
            disabled:opacity-60
            dark:bg-[#C9A96E]
            dark:text-slate-950
          "
        >
          {loading
            ? "Sending..."
            : "Send Reset Link"}
        </button>

        <Link
          href="/admin/login"
          className="
            mt-5
            block
            text-center
            text-[#C9A96E]
            transition
            hover:underline
          "
        >
          Back to Login
        </Link>
      </form>
    </main>
  );
}