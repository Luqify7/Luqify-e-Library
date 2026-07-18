import Link from "next/link";
import { CalendarDays, BookOpen, ChevronRight } from "lucide-react";

export default async function YearPage({
  params,
}: {
  params: Promise<{
    slug: string;
    year: string;
  }>;
}) {
  const { slug, year } = await params;


  const semesters = [
    {
      name: "Semester 1",
      slug: "semester-1",
    },
    {
      name: "Semester 2",
      slug: "semester-2",
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
            <CalendarDays size={30} />
          </div>


          <div>

            <p
              className="
                text-sm
                font-bold
                text-[#C9A96E]
              "
            >
              Academic Year
            </p>


            <h1
              className="
                mt-2
                text-4xl
                font-black
                capitalize
              "
            >
              {year.replaceAll("-", " ")}
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
          Select a semester to continue
        </p>



        {/* Semester Cards */}
        <section
          className="
            mt-10
            grid
            gap-8
            md:grid-cols-2
          "
        >

          {semesters.map((semester) => (

            <Link
              key={semester.slug}
              href={`/programs/${slug}/${year}/${semester.slug}`}
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
                <BookOpen size={28} />
              </div>



              <h2
                className="
                  mt-6
                  text-3xl
                  font-black
                  dark:text-white
                "
              >
                {semester.name}
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
                  Open Semester
                </span>

                <ChevronRight size={18} />

              </div>


            </Link>

          ))}


        </section>


      </section>


    </main>
  );
}