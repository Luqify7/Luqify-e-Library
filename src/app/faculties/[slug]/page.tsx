import Link from "next/link";
import { faculties } from "@/data/faculties";

export default async function FacultyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {

  const { slug } = await params;

  const faculty = faculties.find(
    (item) => item.slug === slug
  );


  if (!faculty) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">
          Faculty Not Found
        </h1>
      </main>
    );
  }


  return (

    <main className="min-h-screen bg-slate-50 px-6 py-12">


      <section className="mx-auto max-w-7xl">


        <h1 className="text-5xl font-black text-slate-900">
          {faculty.name}
        </h1>


        <p className="mt-3 text-lg text-slate-500">
          Explore programmes and academic resources.
        </p>



        <div className="mt-10 grid gap-6 md:grid-cols-2">


          {faculty.programs.map((program) => (

            <Link
              key={program.slug}
              href={`/programs/${program.slug}`}
              className="rounded-2xl border bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl"
            >

              <h2 className="text-xl font-bold text-slate-900">
                {program.name}
              </h2>


              <p className="mt-3 text-blue-600 font-semibold">
                View Programme →
              </p>


            </Link>

          ))}


        </div>


      </section>


    </main>

  );
}