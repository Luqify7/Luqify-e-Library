import Link from "next/link";
import { GraduationCap, ArrowRight } from "lucide-react";

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
      <main className="flex min-h-screen items-center justify-center bg-[#FAF7F0] text-[#3B2412] dark:bg-slate-950 dark:text-white">
        <h1 className="text-3xl font-bold">
          Faculty Not Found
        </h1>
      </main>
    );
  }


  return (
    <main className="min-h-screen bg-[#FAF7F0] px-6 py-16 text-[#3B2412] dark:bg-slate-950 dark:text-white">

      <section className="mx-auto max-w-7xl">


        {/* Header */}
        <div className="max-w-3xl">

          <div
            className="
              mb-6
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-2xl
              bg-[#C9A96E]/20
              text-[#3B2412]
              dark:text-white
            "
          >
            <GraduationCap size={34} />
          </div>


          <h1 className="text-4xl font-black md:text-5xl">
            {faculty.name}
          </h1>


          <p className="mt-4 text-lg text-[#6b4b2a] dark:text-slate-300">
            Explore available programmes and access academic resources
            including lecture notes, tutorials and examinations.
          </p>

        </div>



        {/* Programme Cards */}
        <div className="mt-12 grid gap-8 md:grid-cols-2">


          {faculty.programs.map((program) => (

            <Link
              key={program.slug}
              href={`/programs/${program.slug}`}
              className="
                group
                rounded-[2rem]
                border
                border-[#e8dcc8]
                bg-white
                p-8
                shadow-sm
                transition
                duration-300
                hover:-translate-y-2
                hover:shadow-xl
                dark:border-slate-800
                dark:bg-slate-900
              "
            >


              <div className="flex items-start justify-between">


                <div
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#FAF7F0]
                    text-[#C9A96E]
                    dark:bg-slate-800
                  "
                >
                  <GraduationCap size={24} />
                </div>


                <ArrowRight
                  className="
                    text-[#C9A96E]
                    transition
                    duration-300
                    group-hover:translate-x-2
                  "
                />


              </div>



              <h2 className="mt-8 text-xl font-bold">
                {program.name}
              </h2>



              <p className="mt-4 font-semibold text-[#C9A96E]">
                View Programme
              </p>


            </Link>

          ))}


        </div>


      </section>

    </main>
  );
}