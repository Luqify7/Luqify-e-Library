import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { notFound } from "next/navigation";

import {
  ChevronRight,
  BookOpen,
} from "lucide-react";

import { commonCommerceCurriculum } from "@/data/common-commerce-curriculum";


export default async function SemesterPage({
  params,
}: {
  params: Promise<{ semester: string }>;
}) {

  const { semester } = await params;


  const courses =
    commonCommerceCurriculum["year-2"][
      semester as keyof typeof commonCommerceCurriculum["year-2"]
    ];


  if (!courses) {
    notFound();
  }


  return (
    <main className="min-h-screen bg-stone-50 dark:bg-slate-950">

      <section className="mx-auto max-w-7xl px-6 py-10">


        <Breadcrumbs
          items={[
            {
              name: "Common Commerce",
              href: "/common-commerce",
            },
            {
              name: "Year 2",
              href: "/common-commerce/year-2",
            },
            {
              name:
                semester === "semester-1"
                  ? "Semester 1"
                  : "Semester 2",
              href: `/common-commerce/year-2/${semester}`,
            },
          ]}
        />


        <div className="mb-10">

          <h1 className="text-4xl font-bold text-stone-900 dark:text-white">
            Common Commerce • Year 2
          </h1>


          <p className="mt-3 text-lg text-stone-600 dark:text-slate-400">
            {semester === "semester-1"
              ? "Semester 1 Courses"
              : "Semester 2 Courses"}
          </p>

        </div>



        <div className="grid gap-6 md:grid-cols-2">


          {courses.map((course) => (

            <Link
              key={course.name}
              href={`/common-commerce/year-2/${semester}/${encodeURIComponent(
                course.name.toLowerCase().replaceAll(" ", "-")
              )}`}

              className="
              group
              rounded-3xl
              border
              border-stone-200
              bg-white
              p-7
              shadow-sm
              transition
              hover:-translate-y-1
              hover:border-amber-500
              hover:shadow-xl
              dark:border-slate-800
              dark:bg-slate-900
              "
            >

              <div className="flex items-center justify-between">

                <div
                  className="
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  bg-amber-100
                  dark:bg-amber-500/10
                  "
                >

                  <BookOpen
                    className="
                    h-7
                    w-7
                    text-amber-700
                    dark:text-amber-300
                    "
                  />

                </div>


                <ChevronRight
                  className="
                  h-5
                  w-5
                  text-stone-400
                  transition
                  group-hover:translate-x-1
                  "
                />

              </div>



              <h2
                className="
                mt-6
                text-xl
                font-bold
                text-stone-900
                dark:text-white
                "
              >
                {course.name}
              </h2>



              <p
                className="
                mt-3
                text-sm
                text-stone-500
                dark:text-slate-400
                "
              >
                View available resources
              </p>


            </Link>

          ))}


        </div>


      </section>

    </main>
  );
}