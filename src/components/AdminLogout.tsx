"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

export default function AdminLogout() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleLogout() {
    setLoading(true);

    await supabase.auth.signOut();

    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="
        rounded-xl
        bg-[#3B2412]
        px-5
        py-2.5
        font-semibold
        text-white
        transition
        hover:-translate-y-0.5
        disabled:opacity-50
      "
    >
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
}