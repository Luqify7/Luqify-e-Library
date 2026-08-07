import Link from "next/link";

import {
  BookOpen,
  GraduationCap,
  ChevronRight,
  Layers,
} from "lucide-react";

import Breadcrumbs from "@/components/Breadcrumbs";
import { programs } from "@/data/programs";
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



  const currentProgram = programs.find(
    (program) => program.slug === slug
  );



  const semesterCourses = courses.filter(
    (course) =>
      course.program === slug &&
      course.year === year &&
      course.semester === semester
  );



  const facultyName =
    currentProgram?.faculty ??
    "Faculty";



  const programName =
    currentProgram?.name ??
    slug.replaceAll("-", " ");



  const yearName =
    year.replaceAll("-", " ");



  const semesterName =
    semester.replaceAll("-", " ");



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
              name: "Faculties",
              href: "/faculties",
            },


            {
              name: facultyName,
              href: `/faculties/${facultyName}`,
            },


            {
              name: programName,
              href: `/programs/${slug}`,
            },


            {
              name: yearName,
              href: `/programs/${slug}/${year}`,
            },


            {
              name: semesterName,
            },

          ]}

        />






        <div
          className="
            mt-10
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

                {semesterName}

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


            {
              semesterCourses.length > 0 ? (

                semesterCourses.map((course)=>(


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
                      "
                    >

                      <span>
                        Open Course
                      </span>


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

                  No courses available yet.

                </div>


              )
            }


          </div>


        </section>


      </section>


    </main>

  );

}