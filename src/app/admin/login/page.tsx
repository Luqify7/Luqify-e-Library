"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setError(null);
    setLoading(true);

    try {
      const { error: signInError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (signInError) {
        setError(signInError.message);
        setLoading(false);
        return;
      }

      await router.push("/admin");
      router.refresh();

    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);

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
        "
      >
        <h1
          className="
            mb-2
            text-3xl
            font-bold
            text-[#3B2412]
          "
        >
          Admin Login
        </h1>

        <p className="mb-6 text-sm text-gray-500">
          Sign in to manage Luqify e-Library resources.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label
              className="
                mb-2
                block
                font-semibold
                text-[#3B2412]
              "
            >
              Email
            </label>

            <input
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="
                w-full
                rounded-2xl
                border
                border-[#d9c7aa]
                bg-[#FAF7F0]
                px-4
                py-3
                outline-none
                focus:border-[#3B2412]
              "
            />
          </div>


          <div>
            <label
              className="
                mb-2
                block
                font-semibold
                text-[#3B2412]
              "
            >
              Password
            </label>

            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="
                w-full
                rounded-2xl
                border
                border-[#d9c7aa]
                bg-[#FAF7F0]
                px-4
                py-3
                outline-none
                focus:border-[#3B2412]
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
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

        </form>
      </div>
    </main>
  );
}