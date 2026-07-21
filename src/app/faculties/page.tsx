import Link from "next/link";
import { GraduationCap, ArrowRight } from "lucide-react";

import { faculties } from "@/data/faculties";

export default function FacultiesPage() {
  return (
    <main className="min-h-screen bg-[#FAF7F0] px-6 py-16 text-[#3B2412] dark:bg-slate-950 dark:text-white">

      <section className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-12 max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#C9A96E]">
            Explore Academics
          </p>

          <h1 className="text-4xl font-bold md:text-5xl">
            Choose Your Faculty
          </h1>

          <p className="mt-4 text-lg text-[#6b4b2a] dark:text-slate-300">
            Select your faculty to access programmes, courses, lecture notes,
            tutorials and academic resources.
          </p>
        </div>


        {/* Faculty Cards */}
        <div className="grid gap-8 md:grid-cols-2">

          {faculties.map((faculty) => (
            <Link
              key={faculty.slug}
              href={`/faculties/${faculty.slug}`}
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
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    bg-[#C9A96E]/20
                    text-[#3B2412]
                    dark:text-white
                  "
                >
                  <GraduationCap size={30} />
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


              <h2 className="mt-8 text-2xl font-bold">
                {faculty.name}
              </h2>


              <p className="mt-3 text-sm text-[#6b4b2a] dark:text-slate-400">
                {faculty.programs.length} programmes available
              </p>


              <div className="mt-6 space-y-2">

                {faculty.programs.slice(0, 3).map((program) => (
                  <div
                    key={program.slug}
                    className="
                      rounded-xl
                      bg-[#FAF7F0]
                      px-4
                      py-2
                      text-sm
                      dark:bg-slate-800
                    "
                  >
                    {program.name}
                  </div>
                ))}


                {faculty.programs.length > 3 && (
                  <p className="pt-2 text-sm font-medium text-[#C9A96E]">
                    + {faculty.programs.length - 3} more programmes
                  </p>
                )}

              </div>


            </Link>
          ))}

        </div>

      </section>

    </main>
  );
}