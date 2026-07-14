import Link from "next/link";
import { faculties } from "@/data/faculties";

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const program = faculties
    .flatMap((faculty) => faculty.programs)
    .find((item) => item.slug === slug);

  if (!program) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">
          Programme Not Found
        </h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-10">

      <h1 className="text-5xl font-black text-slate-900">
        {program.name}
      </h1>

      <div className="grid md:grid-cols-3 gap-6 mt-10">

        <Link
          href={`/programs/${program.slug}/year-1`}
          className="p-6 rounded-xl shadow bg-white hover:shadow-lg"
        >
          <h2 className="text-2xl font-bold">
            Year 1
          </h2>
        </Link>


        <Link
          href={`/programs/${program.slug}/year-2`}
          className="p-6 rounded-xl shadow bg-white hover:shadow-lg"
        >
          <h2 className="text-2xl font-bold">
            Year 2
          </h2>
        </Link>


        <Link
          href={`/programs/${program.slug}/year-3`}
          className="p-6 rounded-xl shadow bg-white hover:shadow-lg"
        >
          <h2 className="text-2xl font-bold">
            Year 3
          </h2>
        </Link>

      </div>

    </main>
  );
}