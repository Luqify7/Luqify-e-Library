import Link from "next/link";
import { BookOpen, GraduationCap, ChevronRight } from "lucide-react";
import { courses } from "@/data/courses";

export default async function SemesterPage({
  params,
}: {
  params: Promise<{
    slug: string;
    year: string;
    semester: string;
  }>;
}) {

  const { slug, year, semester } = await params;


  const semesterCourses = courses.filter(
    (course) =>
      course.program === slug &&
      course.year === year &&
      course.semester === semester
  );


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

      <section className="mx-auto max-w-6xl">


        {/* Header */}
        <div className="flex items-center gap-5">


          <div
            className="
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-2xl
              bg-slate-800
              text-white
            "
          >
            <BookOpen size={30} />
          </div>


          <div>

            <p
              className="
                text-sm
                font-bold
                text-[#C9A96E]
              "
            >
              Course Library
            </p>


            <h1
              className="
                mt-2
                text-4xl
                font-black
                capitalize
              "
            >
              {semester.replaceAll("-", " ")}
            </h1>


          </div>


        </div>



        <p
          className="
            mt-8
            text-slate-500
            dark:text-slate-400
          "
        >
          Select a course to view resources
        </p>



        {/* Courses */}
        <section
          className="
            mt-10
            grid
            gap-8
            md:grid-cols-2
          "
        >

          {semesterCourses.length > 0 ? (

            semesterCourses.map((course) => (

              <Link
                key={course.slug}
                href={`/programs/${slug}/${year}/${semester}/${course.slug}`}
                className="
                  group
                  rounded-[2.5rem]
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
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    bg-[#FAF7F0]
                    text-[#3B2412]

                    dark:bg-slate-800
                    dark:text-white
                  "
                >
                  <GraduationCap size={28} />
                </div>



                <h2
                  className="
                    mt-6
                    text-2xl
                    font-black
                    dark:text-white
                  "
                >
                  {course.name}
                </h2>



                <div
                  className="
                    mt-6
                    flex
                    items-center
                    gap-2
                    font-bold
                    text-[#C9A96E]
                    transition-all
                    group-hover:gap-4
                  "
                >

                  <span>
                    Open Course
                  </span>

                  <ChevronRight size={18} />

                </div>


              </Link>

            ))

          ) : (

            <div
              className="
                rounded-[2rem]
                border
                border-[#e8dcc8]
                bg-white
                p-8
                text-slate-500

                dark:border-slate-700
                dark:bg-slate-900
                dark:text-slate-400
              "
            >
              No courses uploaded yet
            </div>

          )}


        </section>


      </section>


    </main>
  );
}