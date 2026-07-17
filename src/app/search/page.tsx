import SearchBar from "@/components/SearchBar";

export default function SearchPage() {
  return (
    <main className="min-h-screen bg-[#FAF7F0] px-6 py-20 dark:bg-slate-950">

      <div className="mx-auto max-w-3xl">

        <h1 className="text-4xl font-black">
          Search Luqify e-Library
        </h1>

        <p className="mt-3 text-slate-500">
          Find courses, lecture notes, tutorials and past papers.
        </p>

        <div className="mt-10">
          <SearchBar />
        </div>

      </div>

    </main>
  );
}