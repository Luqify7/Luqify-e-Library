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
      <main className="flex min-h-screen items-center justify-center bg-[#FAF7F0]">
        <h1 className="text-3xl font-black text-[#3B2412]">
          Programme Not Found
        </h1>
      </main>
    );
  }

  const years = [
    {
      year: "Year 1",
      slug: "year-1",
      icon: "🌱",
    },
    {
      year: "Year 2",
      slug: "year-2",
      icon: "📚",
    },
    {
      year: "Year 3",
      slug: "year-3",
      icon: "🎓",
    },
  ];

  return (
    <main className="min-h-screen bg-[#FAF7F0] px-6 py-16 text-[#3B2412] dark:bg-slate-950 dark:text-white">

      {/* Header */}
      <section className="mx-auto max-w-7xl">

        <span className="rounded-full border border-[#C9A96E] bg-[#fff8ea] px-4 py-2 text-sm font-semibold text-[#3B2412] dark:bg-slate-900 dark:text-[#C9A96E]">
          📖 Programme Library
        </span>

        <h1 className="mt-8 text-5xl font-black">
          {program.name}
        </h1>

      </section>


      {/* Academic Years */}
      <section className="mx-auto mt-14 grid max-w-7xl gap-8 md:grid-cols-3">

        {years.map((item) => (

          <Link
            key={item.slug}
            href={`/programs/${program.slug}/${item.slug}`}
            className="
              group
              rounded-[2rem]
              border
              border-[#e8dcc8]
              bg-white
              p-8
              shadow-sm
              transition
              hover:-translate-y-2
              hover:border-[#C9A96E]
              hover:shadow-xl

              dark:border-slate-800
              dark:bg-slate-900
            "
          >

            <div className="text-5xl">
              {item.icon}
            </div>

            <h2 className="mt-6 text-3xl font-black text-[#3B2412] dark:text-white">
              {item.year}
            </h2>

            <div className="mt-6 font-bold text-[#C9A96E]">
              Enter Library →
            </div>

          </Link>

        ))}

      </section>

    </main>
  );
}