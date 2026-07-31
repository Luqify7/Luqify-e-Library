import Breadcrumbs from "@/components/Breadcrumbs";
import Link from "next/link";

import {
  BookOpen,
  FileText,
  GraduationCap,
  ClipboardList,
} from "lucide-react";

export default async function CoursePage({
  params,
}: {
  params: Promise<{
    slug: string;
    year: string;
    semester: string;
    course: string;
  }>;
}) {
  const {
    slug,
    year,
    semester,
    course,
  } = await params;

  const courseName = decodeURIComponent(course);

  const categories = [
    {
      name: "Lecture Notes",
      description:
        "Course materials and lecture resources",
      icon: BookOpen,
      category: "lecture-notes",
    },

    {
      name: "Tutorials",
      description:
        "Tutorial sheets and practice materials",
      icon: ClipboardList,
      category: "tutorials",
    },

    {
      name: "Mid-Semester Exams",
      description:
        "Previous mid-semester examination papers",
      icon: FileText,
      category: "mid-semester-exams",
    },

    {
      name: "End-of-Semester Exams",
      description:
        "Previous final examination papers",
      icon: GraduationCap,
      category: "end-semester-exams",
    },
  ];

  const formattedYear = year
    .replace("-", " ")
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase()
    );

  const formattedSemester =
    semester === "semester-1"
      ? "Semester 1"
      : "Semester 2";

  return (
    <main
      className="
        min-h-screen
        bg-[#FAF7F0]
        px-6
        py-16
        text-[#3B2412]
        dark:bg-slate-950
        dark:text-white
      "
    >
      <section className="mx-auto max-w-7xl">

        <Breadcrumbs
          items={[
            {
              name: "Programs",
              href: "/programs",
            },

            {
              name: formattedYear,
              href: `/programs/${slug}/${year}`,
            },

            {
              name: formattedSemester,
              href: `/programs/${slug}/${year}/${semester}`,
            },

            {
              name: courseName,
            },
          ]}
        />


        <div className="mb-10">

          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-[#e8dcc8]
              bg-white
              px-4
              py-2
              text-sm
              font-semibold
              text-[#6b5845]
              dark:border-slate-700
              dark:bg-slate-900
              dark:text-slate-300
            "
          >
            <GraduationCap
              className="
                h-4
                w-4
                text-[#C9A96E]
              "
            />

            {formattedYear}

          </div>


          <h1
            className="
              mt-6
              text-4xl
              font-black
              tracking-tight
              md:text-6xl
            "
          >
            {courseName}
          </h1>


          <p
            className="
              mt-3
              text-[#6b5845]
              dark:text-slate-400
            "
          >
            Select a resource category to continue.
          </p>

        </div>



        <div
          className="
            grid
            gap-8
            md:grid-cols-2
          "
        >

          {categories.map((item) => {

            const Icon = item.icon;

            return (

              <Link
                key={item.category}

                href={
                  `/resources?programme=${slug}` +
                  `&year=${year}` +
                  `&semester=${semester}` +
                  `&course=${encodeURIComponent(courseName)}` +
                  `&category=${item.category}`
                }

                className="
                  group
                  rounded-3xl
                  border
                  border-[#e8dcc8]
                  bg-white
                  p-8
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  hover:shadow-xl
                  dark:border-slate-700
                  dark:bg-slate-900
                "
              >

                <div
                  className="
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-2xl
                    bg-[#FAF7F0]
                    text-[#C9A96E]
                    dark:bg-slate-800
                  "
                >

                  <Icon
                    className="
                      h-7
                      w-7
                    "
                  />

                </div>


                <h2
                  className="
                    mt-6
                    text-2xl
                    font-black
                  "
                >
                  {item.name}
                </h2>


                <p
                  className="
                    mt-2
                    leading-7
                    text-[#6b5845]
                    dark:text-slate-400
                  "
                >
                  {item.description}
                </p>


                <div
                  className="
                    mt-6
                    font-bold
                    text-[#C9A96E]
                  "
                >
                  Browse resources →
                </div>


              </Link>

            );

          })}

        </div>

      </section>

    </main>
  );
}