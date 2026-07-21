import {
  BookOpen,
  Video,
  FileText,
  ChevronRight,
  Home,
  Layers,
} from "lucide-react";

import Link from "next/link";
import { resources } from "@/data/resources";


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

  const { slug, year, semester, course } = await params;



  const categories = [
    {
      name: "Lecture Notes",
      slug: "lecture-notes",
      icon: <BookOpen size={30} />,
      category: "lecture-notes",
      description: "Study materials and course notes.",
    },

    {
      name: "Tutorials",
      slug: "tutorials",
      icon: <Video size={30} />,
      category: "tutorials",
      description: "Practice questions and exercises.",
    },

    {
      name: "Mid Semester Exam Papers",
      slug: "mid-semester-exams",
      icon: <FileText size={30} />,
      category: "mid-semester-exams",
      description: "Previous mid-semester examinations.",
    },

    {
      name: "End Semester Exam Papers",
      slug: "end-semester-exams",
      icon: <FileText size={30} />,
      category: "end-semester-exams",
      description: "Previous final examinations.",
    },
  ];




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

          <Home size={16}/>

          <span>
            Home
          </span>


          <ChevronRight size={16}/>


          <span>
            Courses
          </span>


          <ChevronRight size={16}/>


          <span className="capitalize text-[#C9A96E]">
            {course.replaceAll("-", " ")}
          </span>

        </div>







        {/* Course Header */}

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
                Course Resources
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
                {course.replaceAll("-", " ")}
              </h1>




              <p
                className="
                  mt-4

                  text-[#6b5845]

                  dark:text-slate-400
                "
              >
                {year.replaceAll("-", " ")}
                {" • "}
                {semester.replaceAll("-", " ")}
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

            Learning Resources

          </div>


        </div>







        {/* Categories */}


        <section className="mt-14">


          <h2
            className="
              text-4xl
              font-black
            "
          >
            Available Resources
          </h2>



          <p
            className="
              mt-3

              text-[#6b5845]

              dark:text-slate-400
            "
          >
            Access notes, tutorials and examination materials.
          </p>





          <div
            className="
              mt-8

              grid

              gap-8

              md:grid-cols-2
            "
          >



            {categories.map((item)=>{


              const count = resources.filter(
                (resource)=>
                  resource.program === slug &&
                  resource.year === year &&
                  resource.semester === semester &&
                  resource.course === course &&
                  resource.category === item.category
              ).length;




              return (

                <Link
                  key={item.slug}
                  href={`/programs/${slug}/${year}/${semester}/${course}/${item.slug}`}

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
                      items-center
                      justify-between
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

                      {item.icon}

                    </div>



                    <ChevronRight
                      size={22}
                      className="
                        text-slate-400
                        transition-all
                        group-hover:translate-x-1
                      "
                    />

                  </div>





                  <h3
                    className="
                      mt-6

                      text-2xl

                      font-black

                      capitalize
                    "
                  >
                    {item.name}
                  </h3>





                  <p
                    className="
                      mt-3

                      text-sm

                      text-[#6b5845]

                      dark:text-slate-400
                    "
                  >
                    {item.description}
                  </p>





                  <p
                    className="
                      mt-5

                      font-bold

                      text-[#C9A96E]
                    "
                  >

                    {count > 0
                      ? `${count} resource${count > 1 ? "s" : ""} available`
                      : "No resources uploaded yet"}

                  </p>


                </Link>

              );


            })}


          </div>


        </section>


      </section>


    </main>
  );
}