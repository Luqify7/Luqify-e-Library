import {
  BookOpen,
  Video,
  FileText,
  ChevronRight,
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
    },
    {
      name: "Tutorials",
      slug: "tutorials",
      icon: <Video size={30} />,
      category: "tutorials",
    },
    {
      name: "Mid Semester Exam Papers",
      slug: "mid-semester-exams",
      icon: <FileText size={30} />,
      category: "mid-semester-exams",
    },
    {
      name: "End Semester Exam Papers",
      slug: "end-semester-exams",
      icon: <FileText size={30} />,
      category: "end-semester-exams",
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


        {/* Course Header */}
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
              Course Resources
            </p>


            <h1
              className="
                mt-2
                text-4xl
                font-black
                capitalize
                md:text-5xl
              "
            >
              {course.replaceAll("-", " ")}
            </h1>


            <p
              className="
                mt-3
                text-slate-500
                dark:text-slate-400
              "
            >
              {year.replaceAll("-", " ")} • {semester.replaceAll("-", " ")}
            </p>


          </div>


        </div>




        {/* Resource Categories */}
        <section
          className="
            mt-12
            grid
            gap-8
            md:grid-cols-2
          "
        >


          {categories.map((item) => {


            const count = resources.filter(
              (resource) =>
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



                <h2
                  className="
                    mt-6
                    text-2xl
                    font-black
                    dark:text-white
                  "
                >
                  {item.name}
                </h2>



                <p
                  className="
                    mt-3
                    text-sm
                    text-slate-500
                    dark:text-slate-400
                  "
                >

                  {count > 0
                    ? `${count} resource${count > 1 ? "s" : ""} available`
                    : "No resources uploaded yet"}

                </p>


              </Link>

            );


          })}


        </section>


      </section>


    </main>
  );
}