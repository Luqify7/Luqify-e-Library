import Link from "next/link";

export default async function YearPage({
  params,
}: {
  params: Promise<{
    slug: string;
    year: string;
  }>;
}) {
  const { slug, year } = await params;

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">

      <h1 className="text-3xl font-bold capitalize">
        {year.replaceAll("-", " ")}
      </h1>

      <p className="mt-2 text-slate-500">
        Select a semester
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">

        <Link
          href={`/programs/${slug}/${year}/semester-1`}
          className="rounded-2xl border p-6 transition hover:bg-slate-50 dark:hover:bg-slate-800"
        >
          📘 Semester 1
        </Link>

        <Link
          href={`/programs/${slug}/${year}/semester-2`}
          className="rounded-2xl border p-6 transition hover:bg-slate-50 dark:hover:bg-slate-800"
        >
          📗 Semester 2
        </Link>

      </div>

    </main>
  );
}