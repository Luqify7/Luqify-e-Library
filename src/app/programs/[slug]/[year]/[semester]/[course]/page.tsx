import {
  BookOpen,
  Video,
  FileText,
  ChevronRight,
  Layers,
} from "lucide-react";

import Link from "next/link";

import { supabase } from "@/lib/supabase";
import Breadcrumbs from "@/components/Breadcrumbs";
import { maguCommerce } from "@/data/magu-commerce";


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



  const cleanYear =
    year.replace("year-", "");



  const cleanSemester =
    semester.replace("semester-", "");




  const currentProgram =
    maguCommerce.programmes[
      slug as keyof typeof maguCommerce.programmes
    ];



  const facultyName =
    maguCommerce.faculty;



  const programName =
    currentProgram?.name ??
    slug.replaceAll("-", " ");




  const yearName =
    year.replaceAll("-", " ");



  const semesterName =
    semester.replaceAll("-", " ");




  const courseDisplayName =
    course
      .replaceAll("-", " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());






  const { data: uploadedResources } = await supabase

    .from("resources")

    .select("*")

    .eq("programme", slug)

    .eq("year", cleanYear)

    .eq("semester", cleanSemester)

    .ilike("course", courseDisplayName);







  const categories = [

    {
      name: "Lecture Notes",
      slug: "lecture-notes",
      icon: <BookOpen size={30} />,
      category: "lecture notes",
      description:
        "Study materials and course notes.",
    },


    {
      name: "Tutorials",
      slug: "tutorials",
      icon: <Video size={30} />,
      category: "tutorial",
      description:
        "Practice questions and exercises.",
    },


    {
      name: "Study Guides",
      slug: "study-guides",
      icon: <BookOpen size={30} />,
      category: "study guide",
      description:
        "Helpful study materials and summaries.",
    },


    {
      name: "Exam Papers",
      slug: "exam-papers",
      icon: <FileText size={30} />,
      category: "exam",
      description:
        "Previous examination materials.",
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



        <Breadcrumbs

          items={[

            {
              name: "Faculties",
              href: "/faculties",
            },


            {
              name: facultyName,
              href: "/faculties/commerce",
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
              href:
                `/programs/${slug}/${year}/${semester}`,
            },


            {
              name: courseDisplayName,
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

                {courseDisplayName}

              </h1>




              <p
                className="
                  mt-4
                  text-[#6b5845]
                  dark:text-slate-400
                "
              >

                {yearName}
                {" • "}
                {semesterName}

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



            {
              categories.map((item)=>{


                const count =
                  uploadedResources?.filter(
                    (resource)=>
                      resource.category
                        ?.toLowerCase()
                        .includes(item.category)
                  ).length ?? 0;



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


              })
            }



          </div>



        </section>



      </section>



    </main>

  );

}