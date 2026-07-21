import Link from "next/link";
import {
  BookOpen,
  GraduationCap,
  ChevronRight,
  Home,
  Layers,
} from "lucide-react";

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

      <section className="mx-auto max-w-7xl">



        {/* Breadcrumb */}

        <div
          className="
            mb-10
            flex
            flex-wrap
            items-center
            gap-2

            text-sm
            text-[#6b5845]

            dark:text-slate-400
          "
        >

          <Home size={16} />

          <span>
            Home
          </span>


          <ChevronRight size={16} />


          <span>
            Library
          </span>


          <ChevronRight size={16} />


          <span className="capitalize">
            {year.replaceAll("-", " ")}
          </span>


          <ChevronRight size={16} />


          <span className="capitalize text-[#C9A96E]">
            {semester.replaceAll("-", " ")}
          </span>


        </div>






        {/* Header */}

        <div
          className="
            rounded-[3rem]

            border
            border-[#e8dcc8]

            bg-white

            p-10

            shadow-sm


            dark:border-slate-800
            dark:bg-slate-900
          "
        >

          <div
            className="
              flex
              flex-col
              gap-6

              md:flex-row
              md:items-center
            "
          >


            <div
              className="
                flex
                h-20
                w-20
                items-center
                justify-center

                rounded-3xl

                bg-[#3B2412]

                text-white
              "
            >
              <BookOpen size={38}/>
            </div>




            <div>

              <p
                className="
                  text-sm
                  font-bold
                  uppercase
                  tracking-wider

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

                  md:text-6xl
                "
              >
                {semester.replaceAll("-", " ")}
              </h1>




              <p
                className="
                  mt-4
                  text-[#6b5845]

                  dark:text-slate-400
                "
              >
                Browse available courses and access academic resources.
              </p>


            </div>


          </div>



          <div
            className="
              mt-8

              flex
              items-center
              gap-3

              text-sm
              font-semibold

              text-[#C9A96E]
            "
          >

            <Layers size={18}/>

            {semesterCourses.length} Courses Available

          </div>


        </div>







        {/* Courses */}

        <section className="mt-14">


          <h2
            className="
              text-4xl
              font-black
            "
          >
            Courses
          </h2>



          <div
            className="
              mt-8

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
                      h-16
                      w-16
                      items-center
                      justify-center

                      rounded-2xl

                      bg-[#FAF7F0]

                      text-[#3B2412]

                      dark:bg-slate-800
                      dark:text-white
                    "
                  >

                    <GraduationCap size={30}/>

                  </div>




                  <h3
                    className="
                      mt-6

                      text-2xl

                      font-black
                    "
                  >
                    {course.name}
                  </h3>




                  <div
                    className="
                      mt-6

                      flex
                      items-center
                      gap-3

                      font-bold

                      text-[#C9A96E]

                      transition-all

                      group-hover:gap-5
                    "
                  >

                    Open Course

                    <ChevronRight size={18}/>

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


          </div>


        </section>


      </section>


    </main>
  );
}