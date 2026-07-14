import Link from "next/link";
import { faculties } from "@/data/faculties";

export default async function YearPage({
  params,
}: {
  params: Promise<{
    slug: string;
    year: string;
  }>;
}) {
  const { slug, year } = await params;

  const program = faculties
    .flatMap((faculty) => faculty.programs)
    .find((item) => item.slug === slug);

  if (!program) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold text-red-600">
          Programme Not Found
        </h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-10 bg-slate-50">

      <h1 className="text-5xl font-black capitalize text-blue-900">
        {year.replace("-", " ")}
      </h1>

      <h2 className="text-2xl font-bold mt-4 text-slate-700">
        {program.name}
      </h2>


      <div className="grid md:grid-cols-2 gap-6 mt-10">

        <Link
          href={`/programs/${slug}/${year}/semester-1`}
          className="p-6 rounded-xl border border-slate-200 bg-white hover:bg-blue-50 hover:border-blue-400 hover:shadow-lg transition"
        >
          <h3 className="text-2xl font-bold text-slate-800">
            Semester 1
          </h3>

          <p className="mt-2 text-slate-500">
            View semester resources →
          </p>
        </Link>


        <Link
          href={`/programs/${slug}/${year}/semester-2`}
          className="p-6 rounded-xl border border-slate-200 bg-white hover:bg-blue-50 hover:border-blue-400 hover:shadow-lg transition"
        >
          <h3 className="text-2xl font-bold text-slate-800">
            Semester 2
          </h3>

          <p className="mt-2 text-slate-500">
            View semester resources →
          </p>
        </Link>

      </div>

    </main>
  );
}