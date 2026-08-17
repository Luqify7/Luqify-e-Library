"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setError(null);
    setLoading(true);

    try {
      const { createClient } = await import(
        "@/lib/supabase"
      );

      const supabase = createClient();

      const { error: signInError } =
        await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

      if (signInError) {
        setError(signInError.message);
        return;
      }

      await router.push("/admin");
      router.refresh();
    } catch (err) {
      console.error("ADMIN LOGIN ERROR:", err);

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
        px-4
        dark:bg-slate-950
      "
    >
      <div
        className="
          w-full
          max-w-md
          rounded-[2.5rem]
          border
          border-[#e8dcc8]
          bg-white
          p-8
          shadow-xl
          dark:border-slate-800
          dark:bg-slate-900
        "
      >
        <h1
          className="
            mb-2
            text-3xl
            font-bold
            text-[#3B2412]
            dark:text-white
          "
        >
          Admin Login
        </h1>

        <p
          className="
            mb-6
            text-sm
            text-gray-500
            dark:text-slate-400
          "
        >
          Sign in to manage Luqify e-Library resources.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label
              htmlFor="admin-email"
              className="
                mb-2
                block
                font-semibold
                text-[#3B2412]
                dark:text-white
              "
            >
              Email
            </label>

            <input
              id="admin-email"
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
              disabled={loading}
              autoComplete="email"
              className="
                w-full
                rounded-2xl
                border
                border-[#d9c7aa]
                bg-[#FAF7F0]
                px-4
                py-3
                text-[#3B2412]
                outline-none
                transition
                focus:border-[#3B2412]
                focus:ring-2
                focus:ring-[#C9A96E]/30
                disabled:cursor-not-allowed
                disabled:opacity-60
                dark:border-slate-700
                dark:bg-slate-950
                dark:text-white
              "
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="admin-password"
                className="
                  block
                  font-semibold
                  text-[#3B2412]
                  dark:text-white
                "
              >
                Password
              </label>

              <a
                href="/admin/forgot-password"
                className="
                  text-sm
                  font-semibold
                  text-[#C9A96E]
                  transition
                  hover:underline
                "
              >
                Forgot password?
              </a>
            </div>

            <input
              id="admin-password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
              disabled={loading}
              autoComplete="current-password"
              className="
                w-full
                rounded-2xl
                border
                border-[#d9c7aa]
                bg-[#FAF7F0]
                px-4
                py-3
                text-[#3B2412]
                outline-none
                transition
                focus:border-[#3B2412]
                focus:ring-2
                focus:ring-[#C9A96E]/30
                disabled:cursor-not-allowed
                disabled:opacity-60
                dark:border-slate-700
                dark:bg-slate-950
                dark:text-white
              "
            />
          </div>

          {error && (
            <div
              className="
                rounded-xl
                bg-red-50
                p-3
                text-sm
                font-semibold
                text-red-600
                dark:bg-red-950/30
                dark:text-red-400
              "
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              rounded-2xl
              bg-[#3B2412]
              py-3
              font-bold
              text-white
              transition
              hover:-translate-y-1
              hover:bg-[#4d301b]
              disabled:cursor-not-allowed
              disabled:opacity-50
              dark:bg-[#C9A96E]
              dark:text-slate-950
              dark:hover:bg-[#d8b97d]
            "
          >
            {loading
              ? "Signing in..."
              : "Sign In"}
          </button>
        </form>
      </div>
    </main>
  );
}