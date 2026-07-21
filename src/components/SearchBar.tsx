"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSearch() {
    if (!query.trim()) return;

    router.push(`/search?q=${encodeURIComponent(query)}`);
  }

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-[#e8dcc8] bg-white px-5 py-4 shadow-sm transition focus-within:ring-2 focus-within:ring-[#C9A96E] dark:border-slate-700 dark:bg-slate-900">

      <Search
        size={22}
        className="text-[#C9A96E]"
      />

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
        placeholder="Search lecture notes, tutorials, exams..."
        className="w-full bg-transparent text-sm text-[#3B2412] outline-none placeholder:text-slate-400 dark:text-white"
      />

      <button
        onClick={handleSearch}
        className="rounded-xl bg-[#3B2412] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#C9A96E]"
      >
        Search
      </button>

    </div>
  );
}