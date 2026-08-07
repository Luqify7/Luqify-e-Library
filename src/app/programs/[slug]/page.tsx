import Breadcrumbs from "@/components/Breadcrumbs";
import Link from "next/link";

import {
  GraduationCap,
  CalendarDays,
  ChevronRight,
} from "lucide-react";

import { programs } from "@/data/programs";


export default async function ProgramPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {

  const { slug } = await params;


  const program = programs.find(
    (item) => item.slug === slug
  );


  if (!program) {

    return (

      <main
        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-[#FAF7F0]
          dark:bg-slate-950
        "
      >

        <h1
          className="
            text-3xl
            font-black
            text-[#3B2412]
            dark:text-white
          "
        >
          Programme Not Found
        </h1>

      </main>

    );

  }



  const years = program.years.map((year) =>
    year.slug.replace("year-", "")
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


      <section
        className="
          mx-auto
          max-w-7xl
        "
      >


        <Breadcrumbs

          items={[

            {
              name: "Faculties",
              href: "/faculties",
            },


            {
              name: program.faculty,
              href: `/faculties/${program.faculty}`,
            },


            {
              name: program.name,
            },

          ]}

        />





        <div
          className="
            mt-10
            flex
            items-center
            gap-5
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
              bg-slate-800
              text-white
            "
          >

            <GraduationCap size={30}/>

          </div>




          <div>

            <p
              className="
                text-sm
                font-bold
                text-[#C9A96E]
              "
            >
              Programme Library
            </p>



            <h1
              className="
                mt-2
                text-4xl
                font-black
                md:text-5xl
              "
            >

              {program.name}

            </h1>


          </div>


        </div>







        <section
          className="
            mt-14
            grid
            gap-8
            md:grid-cols-2
            lg:grid-cols-4
          "
        >


          {
            years.map((year)=>(


              <Link

                key={year}

                href={`/programs/${slug}/year-${year}`}

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

                  <CalendarDays size={28}/>

                </div>




                <h2
                  className="
                    mt-6
                    text-3xl
                    font-black
                    dark:text-white
                  "
                >

                  Year {year}

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
                    Enter Library
                  </span>


                  <ChevronRight size={18}/>


                </div>



              </Link>


            ))
          }



        </section>




      </section>


    </main>

  );

}