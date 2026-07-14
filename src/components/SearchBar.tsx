"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();

    if (!query.trim()) return;

    router.push(`/search?q=${query}`);
  }

  return (
    <form onSubmit={handleSearch} className="relative w-full">

      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
        🔍
      </span>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search lecture notes, tutorials, exams..."
        className="
          w-full
          p-4
          pl-12
          rounded-xl
          border
          border-slate-200
          bg-white
          text-slate-800
          placeholder:text-slate-400
          outline-none
          focus:border-blue-400
          focus:ring-2
          focus:ring-blue-100
          transition
        "
      />

    </form>
  );
}