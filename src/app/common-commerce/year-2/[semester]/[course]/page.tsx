import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";

import {
  FileText,
  ClipboardList,
  GraduationCap,
  BookOpen,
} from "lucide-react";


const categories = [
  {
    name: "Lecture Notes",
    slug: "lecture-notes",
    description: "Access uploaded lecture materials.",
    icon: FileText,
  },
  {
    name: "Tutorials",
    slug: "tutorials",
    description: "Practice materials and tutorial resources.",
    icon: ClipboardList,
  },
  {
    name: "Mid-Semester Exams",
    slug: "mid-semester-exams",
    description: "Previous mid-semester examination papers.",
    icon: BookOpen,
  },
  {
    name: "End-of-Semester Exams",
    slug: "end-of-semester-exams",
    description: "Previous final examination papers.",
    icon: GraduationCap,
  },
];


export default async function CoursePage({
  params,
}: {
  params: Promise<{
    semester: string;
    course: string;
  }>;
}) {

  const { semester, course } = await params;


  const courseName = course
    .replaceAll("-", " ")
    .replace(/\b\w/g, (char) =>
      char.toUpperCase()
    );


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
            {
              name: courseName,
              href: `/common-commerce/year-2/${semester}/${course}`,
            },
          ]}
        />



        <div className="mb-10">

          <h1 className="text-4xl font-bold text-stone-900 dark:text-white">
            {courseName}
          </h1>


          <p className="mt-3 text-lg text-stone-600 dark:text-slate-400">
            Select a resource category below.
          </p>

        </div>



        <div className="grid gap-6 md:grid-cols-2">


          {categories.map((category) => {

            const Icon = category.icon;


            return (

              <Link
                key={category.slug}
                href={`/resources?course=${encodeURIComponent(
                  courseName
                )}&category=${category.slug}`}

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

                  <Icon
                    className="
                    h-7
                    w-7
                    text-amber-700
                    dark:text-amber-300
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
                  {category.name}
                </h2>


                <p
                  className="
                  mt-3
                  text-stone-600
                  dark:text-slate-400
                  "
                >
                  {category.description}
                </p>


              </Link>

            );

          })}


        </div>


      </section>

    </main>

  );
}