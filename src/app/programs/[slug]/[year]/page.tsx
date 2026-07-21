import Link from "next/link";
import {
  CalendarDays,
  BookOpen,
  ChevronRight,
  Home,
  GraduationCap,
} from "lucide-react";


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
      description:
        "Access lecture notes, tutorials and examination resources.",
    },

    {
      name: "Semester 2",
      slug: "semester-2",
      description:
        "Continue your academic journey with organised resources.",
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

          <Home size={16} />

          <span>
            Home
          </span>


          <ChevronRight size={16} />


          <span>
            Programmes
          </span>


          <ChevronRight size={16} />


          <span className="capitalize">
            {slug.replaceAll("-", " ")}
          </span>


          <ChevronRight size={16} />


          <span className="capitalize text-[#C9A96E]">
            {year.replaceAll("-", " ")}
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
              <GraduationCap size={38} />
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
                Academic Year
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
                {year.replaceAll("-", " ")}
              </h1>



              <p
                className="
                  mt-4
                  max-w-2xl
                  leading-7
                  text-[#6b5845]

                  dark:text-slate-400
                "
              >
                Select a semester to access courses, lecture notes,
                tutorials and examination resources.
              </p>

            </div>


          </div>


        </div>






        {/* Semester Section */}

        <div className="mt-14">


          <div className="mb-8">

            <h2
              className="
                text-4xl
                font-black
              "
            >
              Choose Semester
            </h2>


            <p
              className="
                mt-3
                text-[#6b5845]

                dark:text-slate-400
              "
            >
              Select your semester to view available courses.
            </p>


          </div>





          <div
            className="
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
                  <CalendarDays size={30} />
                </div>





                <h3
                  className="
                    mt-6

                    text-3xl

                    font-black
                  "
                >
                  {semester.name}
                </h3>




                <p
                  className="
                    mt-3

                    text-sm

                    leading-6

                    text-[#6b5845]

                    dark:text-slate-400
                  "
                >
                  {semester.description}
                </p>





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

                  <BookOpen size={18} />

                  <span>
                    Open Semester
                  </span>


                  <ChevronRight size={18} />

                </div>



              </Link>

            ))}


          </div>


        </div>


      </section>


    </main>
  );
}